
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { activeThemeAtom, userThemeModeAtom } from '@/atoms';
import ThemeErrorBoundary from './ThemeErrorBoundary';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Theme context for components that need theme info but don't want to use jotai directly
export type Theme = {
  mode: 'light' | 'dark' | 'system';
  glassMorphismLevel: 'default' | 'enhanced' | 'cyber';
  sidebarStyle: 'glass' | 'solid' | 'circuit' | 'matrix';
  neonColor: 'blue' | 'purple' | 'green' | 'pink' | 'yellow';
  accentColor: 'cyberpunk' | 'toxic' | 'neon';
  name?: string;
  cssVars?: Record<string, string>;
};

// Theme context type
type ThemeContextType = {
  theme: Theme;
  themeError: Error | null;
  isLoading: boolean;
  dynamicColors: Record<string, string>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const activeTheme = useAtomValue(activeThemeAtom);
  const userThemeMode = useAtomValue(userThemeModeAtom);
  const [themeError, setThemeError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicTheme, setDynamicTheme] = useState<any>(null);
  const [dynamicColors, setDynamicColors] = useState<Record<string, string>>({});

  // Fetch theme from database
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setIsLoading(true);
        // Get the default theme from Supabase
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .eq('is_default', true)
          .single();

        if (error) throw error;
        if (data) {
          setDynamicTheme(data.theme_config);
          
          // Extract colors from theme config
          if (data.theme_config.colors) {
            setDynamicColors(data.theme_config.colors);
          }
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
        setThemeError(error instanceof Error ? error : new Error('Failed to load theme'));
        toast({
          title: "Theme Error",
          description: "Failed to load theme from database. Using fallback theme.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);

  // Apply CSS variables from dynamic theme
  useEffect(() => {
    if (!dynamicTheme) return;
    
    try {
      const root = document.documentElement;
      
      // Apply colors
      if (dynamicTheme.colors) {
        Object.entries(dynamicTheme.colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value as string);
        });
      }
      
      // Apply effects
      if (dynamicTheme.effects) {
        // Glass effects
        if (dynamicTheme.effects.glass) {
          Object.entries(dynamicTheme.effects.glass).forEach(([key, value]) => {
            root.style.setProperty(`--glass-${key}`, value as string);
          });
        }
        
        // Cyber effects
        if (dynamicTheme.effects.cyber) {
          Object.entries(dynamicTheme.effects.cyber).forEach(([key, value]) => {
            root.style.setProperty(`--cyber-${key}`, value as string);
          });
        }
        
        // Scientist effects
        if (dynamicTheme.effects.scientist) {
          Object.entries(dynamicTheme.effects.scientist).forEach(([key, value]) => {
            root.style.setProperty(`--scientist-${key}`, value as string);
          });
        }
      }
      
      // Apply animations
      if (dynamicTheme.animations) {
        Object.entries(dynamicTheme.animations).forEach(([key, value]) => {
          root.style.setProperty(`--animation-${key}`, value as string);
        });
      }
    } catch (error) {
      console.error("Error applying dynamic theme:", error);
      setThemeError(error instanceof Error ? error : new Error('Failed to apply theme'));
    }
  }, [dynamicTheme]);

  // Apply theme classes to the document element
  useEffect(() => {
    // Apply light/dark mode
    const isDark = userThemeMode === 'dark' || 
      (userThemeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
    
    // Apply glass morphism level
    document.documentElement.dataset.glassMorphism = activeTheme.glassMorphismLevel;
    
    // Apply sidebar style
    document.documentElement.dataset.sidebarStyle = activeTheme.sidebarStyle;
    
    // Apply neon color
    document.documentElement.dataset.neonColor = activeTheme.neonColor;
    
    // Apply accent color
    document.documentElement.dataset.accentColor = activeTheme.accentColor;
    
    // Listen for system preference changes if mode is 'system'
    if (userThemeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle('dark', e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [activeTheme, userThemeMode]);

  const theme: Theme = {
    mode: userThemeMode,
    glassMorphismLevel: activeTheme.glassMorphismLevel,
    sidebarStyle: activeTheme.sidebarStyle,
    neonColor: activeTheme.neonColor,
    accentColor: activeTheme.accentColor,
    name: dynamicTheme?.name || 'WFPulse',
    cssVars: dynamicTheme
  };

  return (
    <ThemeErrorBoundary>
      <ThemeContext.Provider value={{ 
        theme,
        themeError,
        isLoading,
        dynamicColors
      }}>
        {children}
      </ThemeContext.Provider>
    </ThemeErrorBoundary>
  );
}

export default ThemeProvider;
