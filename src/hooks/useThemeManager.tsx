
import { useState } from 'react';
import { useAppTheme } from '@/components/providers/ThemeProvider';
import { supabase } from '@/integrations/supabase/client';
import { Theme, ThemeConfig, ThemeVersion, ThemeAuditLog, ThemeStatus } from '@/types/theme';
import { toast } from '@/components/ui/use-toast';
import { useRole } from './useRole';

type ThemeUpdateData = {
  name?: string;
  description?: string;
  theme_config?: Partial<ThemeConfig>;
  is_public?: boolean;
  status?: ThemeStatus;
};

export function useThemeManager() {
  const { activeTheme, refreshTheme } = useAppTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [versions, setVersions] = useState<ThemeVersion[]>([]);
  const [auditLogs, setAuditLogs] = useState<ThemeAuditLog[]>([]);
  const { isAdmin } = useRole();

  // Fetch all themes
  const fetchThemes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setThemes(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching themes:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch themes',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch theme versions
  const fetchThemeVersions = async (themeId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('theme_versions')
        .select('*')
        .eq('theme_id', themeId)
        .order('version', { ascending: false });

      if (error) throw error;
      setVersions(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching theme versions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch theme versions',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch audit logs
  const fetchAuditLogs = async (themeId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('theme_audit_logs')
        .select('*')
        .eq('theme_id', themeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuditLogs(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch audit logs',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create a new theme
  const createTheme = async (theme: {
    name: string;
    description?: string;
    theme_config: ThemeConfig;
    is_public?: boolean;
    is_default?: boolean;
  }) => {
    if (!isAdmin) {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can create themes',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('themes')
        .insert({
          name: theme.name,
          description: theme.description || null,
          theme_config: theme.theme_config,
          is_public: theme.is_public || false,
          is_default: theme.is_default || false,
          status: 'active' as ThemeStatus,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Theme created successfully',
      });
      
      await fetchThemes();
      return data;
    } catch (error) {
      console.error('Error creating theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to create theme',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a theme
  const updateTheme = async (themeId: string, updateData: ThemeUpdateData) => {
    if (!isAdmin) {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can update themes',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('themes')
        .update(updateData)
        .eq('id', themeId)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Theme updated successfully',
      });
      
      // If we updated the active theme, refresh it
      if (activeTheme?.id === themeId) {
        await refreshTheme();
      }
      
      return data;
    } catch (error) {
      console.error('Error updating theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to update theme',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a theme
  const deleteTheme = async (themeId: string) => {
    if (!isAdmin) {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can delete themes',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setLoading(true);
      
      // Don't allow deleting the active theme
      if (activeTheme?.id === themeId) {
        toast({
          title: 'Error',
          description: 'Cannot delete the active theme',
          variant: 'destructive',
        });
        return false;
      }
      
      const { error } = await supabase
        .from('themes')
        .delete()
        .eq('id', themeId);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Theme deleted successfully',
      });
      
      await fetchThemes();
      return true;
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete theme',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Apply a specific theme version
  const applyThemeVersion = async (themeId: string, version?: number) => {
    if (!isAdmin) {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can apply theme versions',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .rpc('apply_theme_version', {
          p_theme_id: themeId,
          p_version: version || null,
        });

      if (error) throw error;
      
      if (data.success) {
        toast({
          title: 'Success',
          description: `Theme version ${data.version} applied successfully`,
        });
        
        // Refresh theme if we changed the active theme
        if (activeTheme?.id === themeId) {
          await refreshTheme();
        }
        
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error applying theme version:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to apply theme version',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Set a theme as default
  const setDefaultTheme = async (themeId: string) => {
    if (!isAdmin) {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can set default themes',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setLoading(true);
      
      // First, unset all default themes
      const { error: updateError } = await supabase
        .from('themes')
        .update({ is_default: false })
        .neq('id', themeId);

      if (updateError) throw updateError;
      
      // Set the new default theme
      const { error } = await supabase
        .from('themes')
        .update({ is_default: true })
        .eq('id', themeId);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Default theme updated successfully',
      });
      
      // Refresh the theme
      await refreshTheme();
      await fetchThemes();
      
      return true;
    } catch (error) {
      console.error('Error setting default theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to set default theme',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clone a theme
  const cloneTheme = async (themeId: string, newName: string) => {
    if (!isAdmin) {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can clone themes',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      
      // Get the theme to clone
      const { data: sourceTheme, error: sourceError } = await supabase
        .from('themes')
        .select('*')
        .eq('id', themeId)
        .single();

      if (sourceError) throw sourceError;
      
      // Create a new theme based on the source
      const { data, error } = await supabase
        .from('themes')
        .insert({
          name: newName,
          description: `Clone of ${sourceTheme.name}`,
          theme_config: sourceTheme.theme_config,
          is_public: false, // Clones are private by default
          is_default: false,
          status: 'draft' as ThemeStatus,
          parent_theme_id: themeId,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Theme cloned successfully',
      });
      
      await fetchThemes();
      return data;
    } catch (error) {
      console.error('Error cloning theme:', error);
      toast({
        title: 'Error',
        description: 'Failed to clone theme',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    themes,
    versions,
    auditLogs,
    fetchThemes,
    fetchThemeVersions,
    fetchAuditLogs,
    createTheme,
    updateTheme,
    deleteTheme,
    applyThemeVersion,
    setDefaultTheme,
    cloneTheme,
  };
}
