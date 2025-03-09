
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRole } from '@/hooks';
import { PaletteSwatch, Save, Trash2, Eye, RefreshCw } from 'lucide-react';
import { useAppTheme } from '../providers/ThemeProvider';

export function ThemeManager() {
  const { isAdmin, isLoading: roleLoading } = useRole();
  const { toast } = useToast();
  const { theme, dynamicColors } = useAppTheme();
  const [themes, setThemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState<any>(null);
  const [editedTheme, setEditedTheme] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin && !roleLoading) {
      toast({
        title: "Access Denied",
        description: "You need admin permissions to access the theme manager.",
        variant: "destructive"
      });
      return;
    }

    const fetchThemes = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .order('name');

        if (error) throw error;
        setThemes(data || []);
        
        // Get the default theme
        const defaultTheme = data?.find(t => t.is_default) || data?.[0];
        if (defaultTheme) {
          setActiveTheme(defaultTheme);
          setEditedTheme(JSON.parse(JSON.stringify(defaultTheme)));
        }
      } catch (error) {
        console.error("Error fetching themes:", error);
        toast({
          title: "Error",
          description: "Failed to load themes. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      fetchThemes();
    }
  }, [isAdmin, roleLoading, toast]);

  const handleSaveTheme = async () => {
    if (!isAdmin || !editedTheme) return;
    
    try {
      setIsSaving(true);
      
      // Make a copy of the editedTheme to avoid modifying the original
      const themeToSave = { ...editedTheme };
      
      // Update theme in database
      const { error } = await supabase
        .from('themes')
        .update({ 
          name: themeToSave.name,
          description: themeToSave.description,
          theme_config: themeToSave.theme_config
        })
        .eq('id', themeToSave.id);
        
      if (error) throw error;
      
      // Refresh themes list
      const { data: updatedThemes, error: fetchError } = await supabase
        .from('themes')
        .select('*')
        .order('name');
        
      if (fetchError) throw fetchError;
      
      setThemes(updatedThemes || []);
      toast({
        title: "Success",
        description: "Theme saved successfully.",
      });
      
      // If this was the default theme, refresh the page to apply changes
      if (themeToSave.is_default) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error saving theme:", error);
      toast({
        title: "Error",
        description: "Failed to save theme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const setAsDefault = async (themeId: string) => {
    if (!isAdmin) return;
    
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
      
      // Refresh themes list
      const { data: updatedThemes, error: fetchError } = await supabase
        .from('themes')
        .select('*')
        .order('name');
        
      if (fetchError) throw fetchError;
      
      setThemes(updatedThemes || []);
      toast({
        title: "Success",
        description: "Default theme updated. The page will refresh.",
      });
      
      // Refresh the page to apply the new default theme
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error setting default theme:", error);
      toast({
        title: "Error",
        description: "Failed to set default theme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeUpdate = (section: string, key: string, value: any) => {
    if (!editedTheme) return;
    
    const updatedTheme = { ...editedTheme };
    
    if (section === 'root') {
      updatedTheme[key] = value;
    } else {
      if (!updatedTheme.theme_config) {
        updatedTheme.theme_config = {};
      }
      
      if (!updatedTheme.theme_config[section]) {
        updatedTheme.theme_config[section] = {};
      }
      
      updatedTheme.theme_config[section][key] = value;
    }
    
    setEditedTheme(updatedTheme);
  };

  // If not admin, don't render the component
  if (!isAdmin && !roleLoading) return null;
  
  // Show loading state
  if (isLoading || roleLoading) {
    return (
      <Card className="w-full glass-neo">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PaletteSwatch className="h-5 w-5" />
            <span>Theme Manager</span>
          </CardTitle>
          <CardDescription>Loading theme settings...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={theme.glassMorphismLevel === 'cyber' ? "w-full cyber-panel" : "w-full glass-neo"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PaletteSwatch className="h-5 w-5" />
          <span>Theme Manager</span>
        </CardTitle>
        <CardDescription>Customize the appearance of the entire application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {themes.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {themes.map((themeItem) => (
                <Button
                  key={themeItem.id}
                  variant={themeItem.id === activeTheme?.id ? "default" : "outline"}
                  size="sm"
                  className={themeItem.is_default ? "border-yellow-500" : ""}
                  onClick={() => {
                    setActiveTheme(themeItem);
                    setEditedTheme(JSON.parse(JSON.stringify(themeItem)));
                  }}
                >
                  {themeItem.name}
                  {themeItem.is_default && (
                    <span className="ml-2 text-xs bg-yellow-500/20 px-1 rounded text-yellow-500">Default</span>
                  )}
                </Button>
              ))}
            </div>

            {editedTheme && (
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4 pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="theme-name">Theme Name</Label>
                    <Input
                      id="theme-name"
                      value={editedTheme.name}
                      onChange={(e) => handleThemeUpdate('root', 'name', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="theme-description">Description</Label>
                    <Input
                      id="theme-description"
                      value={editedTheme.description || ''}
                      onChange={(e) => handleThemeUpdate('root', 'description', e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="colors" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editedTheme.theme_config?.colors && Object.entries(editedTheme.theme_config.colors).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ 
                            backgroundColor: `hsl(${value as string})`
                          }}
                        />
                        <Label htmlFor={`color-${key}`} className="w-1/3">{key}</Label>
                        <Input
                          id={`color-${key}`}
                          value={value as string}
                          onChange={(e) => handleThemeUpdate('colors', key, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="effects" className="space-y-4 pt-4">
                  <div className="space-y-6">
                    <h3 className="text-md font-medium">Glass Effects</h3>
                    {editedTheme.theme_config?.effects?.glass && Object.entries(editedTheme.theme_config.effects.glass).map(([key, value]) => {
                      if (typeof value === 'string' && !value.endsWith('%') && !isNaN(parseFloat(value as string))) {
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor={`glass-${key}`}>{key}</Label>
                              <span className="text-sm text-muted-foreground">{value}</span>
                            </div>
                            <Slider
                              id={`glass-${key}`}
                              min={0}
                              max={1}
                              step={0.01}
                              value={[parseFloat(value as string)]}
                              onValueChange={(vals) => handleThemeUpdate('effects.glass', key, vals[0].toString())}
                            />
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="grid gap-2">
                          <Label htmlFor={`glass-${key}`}>{key}</Label>
                          <Input
                            id={`glass-${key}`}
                            value={value as string}
                            onChange={(e) => handleThemeUpdate('effects.glass', key, e.target.value)}
                          />
                        </div>
                      );
                    })}
                    
                    <h3 className="text-md font-medium mt-6">Cyber Effects</h3>
                    {editedTheme.theme_config?.effects?.cyber && Object.entries(editedTheme.theme_config.effects.cyber).map(([key, value]) => {
                      if (typeof value === 'string' && !value.endsWith('px') && !value.endsWith('s') && !isNaN(parseFloat(value as string))) {
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor={`cyber-${key}`}>{key}</Label>
                              <span className="text-sm text-muted-foreground">{value}</span>
                            </div>
                            <Slider
                              id={`cyber-${key}`}
                              min={0}
                              max={1}
                              step={0.01}
                              value={[parseFloat(value as string)]}
                              onValueChange={(vals) => handleThemeUpdate('effects.cyber', key, vals[0].toString())}
                            />
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="grid gap-2">
                          <Label htmlFor={`cyber-${key}`}>{key}</Label>
                          <Input
                            id={`cyber-${key}`}
                            value={value as string}
                            onChange={(e) => handleThemeUpdate('effects.cyber', key, e.target.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            disabled={isSaving || activeTheme?.is_default}
            onClick={() => activeTheme && setAsDefault(activeTheme.id)}
          >
            Set as Default
          </Button>
          <Button 
            variant="destructive" 
            disabled={isSaving || themes.length <= 1}
            className="hidden" // Hide delete for now
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            onClick={handleSaveTheme} 
            disabled={isSaving}
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ThemeManager;
