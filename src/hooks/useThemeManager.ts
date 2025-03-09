
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Theme, ThemeMode } from '@/types/theme';
import { useTheme } from './useTheme';
import { useRole } from './useRole';

export function useThemeManager() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useRole();
  const { setUserPreference, userThemeMode } = useTheme();

  const fetchThemes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setThemes(data || []);
      return data || [];
    } catch (error) {
      console.error("Error fetching themes:", error);
      toast({
        title: "Error",
        description: "Failed to load themes. Please try again later.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const saveTheme = async (theme: Theme) => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can modify themes.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsSaving(true);
      
      const { data, error } = await supabase
        .from('themes')
        .update({
          name: theme.name,
          description: theme.description,
          theme_config: theme.theme_config,
        })
        .eq('id', theme.id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh the themes list
      await fetchThemes();
      
      toast({
        title: "Theme Saved",
        description: "The theme has been updated successfully.",
      });
      
      return data;
    } catch (error) {
      console.error("Error saving theme:", error);
      toast({
        title: "Error",
        description: "Failed to save theme. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const createTheme = async (name: string, themeConfig: any) => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can create themes.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsSaving(true);
      
      const { data, error } = await supabase
        .from('themes')
        .insert({
          name,
          description: `Custom theme created on ${new Date().toLocaleDateString()}`,
          is_default: false,
          theme_config: themeConfig,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh the themes list
      await fetchThemes();
      
      toast({
        title: "Theme Created",
        description: `The theme "${name}" has been created successfully.`,
      });
      
      return data;
    } catch (error) {
      console.error("Error creating theme:", error);
      toast({
        title: "Error",
        description: "Failed to create theme. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const setDefaultTheme = async (themeId: string) => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can set the default theme.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      setIsSaving(true);
      
      // First, set all themes to non-default
      await supabase
        .from('themes')
        .update({ is_default: false })
        .not('id', 'is', null);
      
      // Then set this theme as default
      const { error } = await supabase
        .from('themes')
        .update({ is_default: true })
        .eq('id', themeId);
      
      if (error) throw error;
      
      // Refresh the themes list
      await fetchThemes();
      
      toast({
        title: "Default Theme Updated",
        description: "The default theme has been updated. Changes will apply on reload.",
      });
      
      return true;
    } catch (error) {
      console.error("Error setting default theme:", error);
      toast({
        title: "Error",
        description: "Failed to set default theme. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTheme = async (themeId: string) => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can delete themes.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Check if this is the default theme - can't delete default
      const themeToDelete = themes.find(t => t.id === themeId);
      if (themeToDelete?.is_default) {
        toast({
          title: "Cannot Delete Default Theme",
          description: "Please set another theme as default first.",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if this is the last theme - can't delete last theme
      if (themes.length <= 1) {
        toast({
          title: "Cannot Delete Last Theme",
          description: "At least one theme must exist in the system.",
          variant: "destructive",
        });
        return false;
      }
      
      setIsSaving(true);
      
      const { error } = await supabase
        .from('themes')
        .delete()
        .eq('id', themeId);
      
      if (error) throw error;
      
      // Refresh the themes list
      await fetchThemes();
      
      toast({
        title: "Theme Deleted",
        description: "The theme has been deleted successfully.",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting theme:", error);
      toast({
        title: "Error",
        description: "Failed to delete theme. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateUserThemePreference = async (mode: ThemeMode, themeId?: string) => {
    try {
      // First update local state for immediate feedback
      setUserPreference(mode);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // If not authenticated, we just use local storage (handled by setUserPreference)
        return;
      }
      
      // Save preference to database for authenticated users
      const { error } = await supabase
        .from('user_theme_preferences')
        .upsert({
          user_id: user.id,
          mode,
          theme_id: themeId,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
    } catch (error) {
      console.error("Error saving theme preference:", error);
      // Don't show error toast for this, as it's not critical
    }
  };

  return {
    themes,
    isLoading,
    isSaving,
    fetchThemes,
    saveTheme,
    createTheme,
    setDefaultTheme,
    deleteTheme,
    updateUserThemePreference,
    currentMode: userThemeMode,
  };
}
