
import { useAtom } from 'jotai';
import { 
  glassMorphismLevelAtom, 
  sidebarStyleAtom, 
  neonColorAtom, 
  accentColorAtom,
  userThemeModeAtom,
  isAdminThemeEditModeAtom,
  adminThemeConfigAtom,
  activeThemeAtom
} from '@/atoms';

export function useTheme() {
  const [glassMorphismLevel, setGlassMorphismLevel] = useAtom(glassMorphismLevelAtom);
  const [sidebarStyle, setSidebarStyle] = useAtom(sidebarStyleAtom);
  const [neonColor, setNeonColor] = useAtom(neonColorAtom);
  const [accentColor, setAccentColor] = useAtom(accentColorAtom);
  const [userThemeMode, setUserThemeMode] = useAtom(userThemeModeAtom);
  const [isAdminEditMode, setIsAdminEditMode] = useAtom(isAdminThemeEditModeAtom);
  const [adminThemeConfig] = useAtom(adminThemeConfigAtom);
  const [activeTheme] = useAtom(activeThemeAtom);

  // For admin use only
  const setAdminTheme = (theme: {
    glassMorphismLevel?: typeof glassMorphismLevel;
    sidebarStyle?: typeof sidebarStyle;
    neonColor?: typeof neonColor;
    accentColor?: typeof accentColor;
  }) => {
    if (theme.glassMorphismLevel) setGlassMorphismLevel(theme.glassMorphismLevel);
    if (theme.sidebarStyle) setSidebarStyle(theme.sidebarStyle);
    if (theme.neonColor) setNeonColor(theme.neonColor);
    if (theme.accentColor) setAccentColor(theme.accentColor);
  };

  // For user preference (only controls light/dark mode)
  const setUserPreference = (mode: typeof userThemeMode) => {
    setUserThemeMode(mode);
  };

  // Toggle admin edit mode - should be restricted to admin users
  const toggleAdminEditMode = () => {
    setIsAdminEditMode(!isAdminEditMode);
  };

  return {
    // Admin theme settings
    glassMorphismLevel,
    sidebarStyle,
    neonColor,
    accentColor,
    setGlassMorphismLevel,
    setSidebarStyle,
    setNeonColor,
    setAccentColor,
    setAdminTheme,
    isAdminEditMode,
    toggleAdminEditMode,
    adminThemeConfig,
    
    // User preference (only light/dark)
    userThemeMode,
    setUserPreference,
    
    // Combined active theme
    activeTheme,
  };
}
