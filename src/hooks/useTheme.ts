
import { useAtom } from 'jotai';
import { 
  glassMorphismLevelAtom, 
  sidebarStyleAtom, 
  neonColorAtom, 
  accentColorAtom 
} from '@/atoms';

export function useTheme() {
  const [glassMorphismLevel, setGlassMorphismLevel] = useAtom(glassMorphismLevelAtom);
  const [sidebarStyle, setSidebarStyle] = useAtom(sidebarStyleAtom);
  const [neonColor, setNeonColor] = useAtom(neonColorAtom);
  const [accentColor, setAccentColor] = useAtom(accentColorAtom);

  const setTheme = (theme: {
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

  return {
    glassMorphismLevel,
    sidebarStyle,
    neonColor,
    accentColor,
    setGlassMorphismLevel,
    setSidebarStyle,
    setNeonColor,
    setAccentColor,
    setTheme,
  };
}
