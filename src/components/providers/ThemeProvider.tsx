
import React, { createContext, useContext, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { activeThemeAtom, userThemeModeAtom } from '@/atoms';

// Theme context for components that need theme info but don't want to use jotai directly
type ThemeContextType = {
  mode: 'light' | 'dark' | 'system';
  glassMorphismLevel: 'default' | 'enhanced' | 'cyber';
  sidebarStyle: 'glass' | 'solid' | 'circuit' | 'matrix';
  neonColor: 'blue' | 'purple' | 'green' | 'pink' | 'yellow';
  accentColor: 'cyberpunk' | 'toxic' | 'neon';
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

  return (
    <ThemeContext.Provider value={{ 
      mode: userThemeMode,
      glassMorphismLevel: activeTheme.glassMorphismLevel,
      sidebarStyle: activeTheme.sidebarStyle,
      neonColor: activeTheme.neonColor,
      accentColor: activeTheme.accentColor,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
