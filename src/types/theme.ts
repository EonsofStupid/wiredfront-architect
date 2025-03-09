
export type ThemeMode = 'light' | 'dark' | 'system';

export type GlassMorphismLevel = 'default' | 'enhanced' | 'cyber';

export type SidebarStyle = 'glass' | 'solid' | 'circuit' | 'matrix';

export type NeonColor = 'blue' | 'purple' | 'green' | 'pink' | 'yellow';

export type AccentColor = 'cyberpunk' | 'toxic' | 'neon';

export interface ThemeConfig {
  colors: Record<string, string>;
  effects: {
    glass: GlassEffects;
    cyber: CyberEffects;
    scientist: ScientistEffects;
  };
  animations: AnimationConfig;
}

export interface GlassEffects {
  opacity: string;
  blur: string;
  saturation: string;
  borderOpacity: string;
  shadowOpacity: string;
}

export interface CyberEffects {
  gridOpacity: string;
  lineThickness: string;
  glowStrength: string;
  scanlineSpeed: string;
}

export interface ScientistEffects {
  bubbleSize: string;
  bubbleDensity: string;
  liquidOpacity: string;
  glowColor: string;
}

export interface AnimationConfig {
  pulseGlow: string;
  dataFlow: string;
  scan: string;
  flicker: string;
}

export interface Theme {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  theme_config: ThemeConfig;
  created_at: string;
  updated_at: string;
}

export interface UserThemePreference {
  user_id: string;
  theme_id?: string;
  mode: ThemeMode;
  updated_at: string;
}
