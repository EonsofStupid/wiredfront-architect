
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Theme, ThemeConfig } from '@/types/theme';

export function useThemeManager() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const { toast } = useToast();

  const fetchThemes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('is_default', { ascending: false });

      if (error) throw error;
      
      setThemes(data as Theme[]);
      
      // Set current theme to default
      const defaultTheme = data.find((theme: Theme) => theme.is_default);
      if (defaultTheme) {
        setCurrentTheme(defaultTheme as Theme);
      }
    } catch (error) {
      console.error('Error fetching themes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load themes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const createTheme = async (
    name: string,
    description: string,
    themeConfig: ThemeConfig,
    isDefault: boolean = false
  ) => {
    try {
      // If setting this theme as default, update other themes
      if (isDefault) {
        const { error } = await supabase
          .from('themes')
          .update({ is_default: false })
          .neq('id', 'dummy'); // Just to make sure it updates all

        if (error) throw error;
      }

      // Insert new theme
      const { data, error } = await supabase
        .from('themes')
        .insert([
          {
            name,
            description,
            theme_config: themeConfig,
            is_default: isDefault,
          },
        ])
        .select();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Theme created successfully',
      });

      // Refresh themes
      fetchThemes();
      return data[0];
    } catch (error) {
      console.error('Error creating theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to create theme',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateTheme = async (
    id: string,
    updates: Partial<{
      name: string;
      description: string;
      theme_config: ThemeConfig;
      is_default: boolean;
    }>
  ) => {
    try {
      // If setting this theme as default, update other themes
      if (updates.is_default) {
        const { error } = await supabase
          .from('themes')
          .update({ is_default: false })
          .neq('id', id);

        if (error) throw error;
      }

      // Update the theme
      const { error } = await supabase
        .from('themes')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Theme updated successfully',
      });

      // Refresh themes
      fetchThemes();
      return true;
    } catch (error) {
      console.error('Error updating theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to update theme',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteTheme = async (id: string) => {
    try {
      // Check if it's the default theme
      const themeToDelete = themes.find((theme) => theme.id === id);
      if (themeToDelete?.is_default) {
        toast({
          title: 'Error',
          description: 'Cannot delete the default theme',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase.from('themes').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Theme deleted successfully',
      });

      // Refresh themes
      fetchThemes();
      return true;
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete theme',
        variant: 'destructive',
      });
      return false;
    }
  };

  const setAsDefault = async (id: string) => {
    return updateTheme(id, { is_default: true });
  };

  const setUserPreference = async (themeId: string | null, mode: 'light' | 'dark' | 'system') => {
    try {
      const { error } = await supabase
        .from('user_theme_preferences')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          theme_id: themeId,
          mode,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Theme preference updated',
      });

      return true;
    } catch (error) {
      console.error('Error setting user preference:', error);
      toast({
        title: 'Error',
        description: 'Failed to update theme preference',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    themes,
    isLoading,
    currentTheme,
    fetchThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    setAsDefault,
    setUserPreference,
  };
}
