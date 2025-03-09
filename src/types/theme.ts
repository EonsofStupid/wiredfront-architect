
export interface Theme {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  theme_config: ThemeConfig;
  created_at: string;
  updated_at: string;
}

export interface ThemeConfig {
  colors: Record<string, string>;
  effects: {
    glass: {
      opacity: string;
      blur: string;
      saturation: string;
      borderOpacity: string;
      shadowOpacity: string;
    };
    cyber: {
      gridOpacity: string;
      lineThickness: string;
      glowStrength: string;
      scanlineSpeed: string;
    };
    scientist: {
      bubbleSize: string;
      bubbleDensity: string;
      liquidOpacity: string;
      glowColor: string;
    };
  };
  animations: {
    pulseGlow: string;
    dataFlow: string;
    scan: string;
    flicker: string;
  };
}

export interface UserThemePreference {
  user_id: string;
  theme_id: string | null;
  mode: 'light' | 'dark' | 'system';
  updated_at: string;
}
