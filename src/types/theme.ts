
export type ThemeStatus = 'active' | 'draft' | 'archived' | 'pending_approval';

export interface Theme {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  theme_config: ThemeConfig;
  created_at: string;
  updated_at: string;
  version: number;
  status: ThemeStatus;
  is_public: boolean;
  created_by: string | null;
  preview_image: string | null;
  validation_status: ThemeValidation;
  parent_theme_id: string | null;
}

export interface ThemeVersion {
  id: string;
  theme_id: string;
  version: number;
  theme_config: ThemeConfig;
  created_at: string;
  created_by: string | null;
  notes: string | null;
  status: ThemeStatus;
  is_active: boolean;
}

export interface ThemeAuditLog {
  id: string;
  theme_id: string;
  user_id: string | null;
  action: string;
  previous_state: Record<string, any> | null;
  new_state: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ThemeValidation {
  is_valid: boolean;
  messages: ThemeValidationMessage[];
}

export interface ThemeValidationMessage {
  type: 'error' | 'warning';
  message: string;
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
