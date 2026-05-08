/**
 * Color utilities for brutalist theme
 * Handles theme-aware color selection
 */

import { useTheme } from '@/lib/context/ThemeContext';

export type Theme = 'dark' | 'light';
export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'yellow'
  | 'cyan'
  | 'error'
  | 'success'
  | 'warning';

interface ThemeColorMap {
  dark: string;
  light: string;
}

/**
 * Brutalist color mapping for dark and light modes
 */
export const BRUTALIST_COLOR_MAP: Record<'border' | 'text' | 'bg' | 'accent', ThemeColorMap> = {
  border: {
    dark: 'hsl(var(--brutalist-dark-border-primary))',      // White
    light: 'hsl(var(--brutalist-dark-border-primary))',     // Black
  },
  text: {
    dark: 'hsl(var(--brutalist-dark-text-primary))',        // Light gray
    light: 'hsl(var(--brutalist-dark-text-primary))',       // Dark blue
  },
  bg: {
    dark: 'hsl(var(--brutalist-dark-bg))',                  // Near black
    light: 'hsl(var(--brutalist-dark-bg))',                 // White
  },
  accent: {
    dark: 'hsl(var(--brutalist-dark-accent-primary))',      // Blue
    light: 'hsl(var(--brutalist-dark-accent-primary))',     // Blue
  },
};

/**
 * Get color based on theme
 * @param theme 'dark' or 'light'
 * @param colorType Type of color (border, text, bg, accent)
 */
export function getColor(theme: Theme, colorType: keyof typeof BRUTALIST_COLOR_MAP): string {
  return BRUTALIST_COLOR_MAP[colorType][theme];
}

/**
 * Hook to use theme-aware colors in components
 */
export function useBrutalistColors() {
  const { theme } = useTheme();
  
  const getThemeColor = (colorType: keyof typeof BRUTALIST_COLOR_MAP): string => {
    return getColor(theme, colorType);
  };

  return {
    borderColor: getThemeColor('border'),
    textColor: getThemeColor('text'),
    bgColor: getThemeColor('bg'),
    accentColor: getThemeColor('accent'),
    theme,
  };
}

/**
 * Border color variants
 */
export const BORDER_COLORS = {
  primary: {
    dark: 'border-[hsl(var(--brutalist-dark-border-primary))]',
    light: 'border-[hsl(var(--brutalist-dark-border-primary))]',
  },
  secondary: {
    dark: 'border-[hsl(var(--brutalist-dark-border-secondary))]',
    light: 'border-[hsl(var(--brutalist-dark-border-secondary))]',
  },
  accent: {
    dark: 'border-[hsl(var(--brutalist-dark-accent-primary))]',
    light: 'border-[hsl(var(--brutalist-dark-accent-primary))]',
  },
  yellow: {
    dark: 'border-[hsl(var(--brutalist-dark-accent-yellow))]',
    light: 'border-[hsl(var(--brutalist-dark-accent-yellow))]',
  },
  cyan: {
    dark: 'border-[hsl(var(--brutalist-dark-accent-cyan))]',
    light: 'border-[hsl(var(--brutalist-dark-accent-cyan))]',
  },
  error: {
    dark: 'border-[hsl(var(--brutalist-dark-status-error))]',
    light: 'border-[hsl(var(--brutalist-dark-status-error))]',
  },
} as const;

/**
 * Text color variants
 */
export const TEXT_COLORS = {
  primary: {
    dark: 'text-[hsl(var(--brutalist-dark-text-primary))]',
    light: 'text-[hsl(var(--brutalist-dark-text-primary))]',
  },
  secondary: {
    dark: 'text-[hsl(var(--brutalist-dark-text-secondary))]',
    light: 'text-[hsl(var(--brutalist-dark-text-secondary))]',
  },
  muted: {
    dark: 'text-[hsl(var(--brutalist-dark-text-muted))]',
    light: 'text-[hsl(var(--brutalist-dark-text-muted))]',
  },
  accent: {
    dark: 'text-[hsl(var(--brutalist-dark-accent-primary))]',
    light: 'text-[hsl(var(--brutalist-dark-accent-primary))]',
  },
} as const;

/**
 * Background color variants
 */
export const BG_COLORS = {
  default: {
    dark: 'bg-[hsl(var(--brutalist-dark-bg))]',
    light: 'bg-[hsl(var(--brutalist-dark-bg))]',
  },
  surface1: {
    dark: 'bg-[hsl(var(--brutalist-dark-surface-1))]',
    light: 'bg-[hsl(var(--brutalist-dark-surface-1))]',
  },
  surface2: {
    dark: 'bg-[hsl(var(--brutalist-dark-surface-2))]',
    light: 'bg-[hsl(var(--brutalist-dark-surface-2))]',
  },
  accent: {
    dark: 'bg-[hsl(var(--brutalist-dark-surface-accent))]',
    light: 'bg-[hsl(var(--brutalist-dark-surface-accent))]',
  },
  primary: {
    dark: 'bg-[hsl(var(--brutalist-dark-accent-primary))]',
    light: 'bg-[hsl(var(--brutalist-dark-accent-primary))]',
  },
} as const;

/**
 * Get border color class based on theme
 */
export function getBorderColorClass(
  variant: keyof typeof BORDER_COLORS,
  theme: Theme
): string {
  return BORDER_COLORS[variant][theme];
}

/**
 * Get text color class based on theme
 */
export function getTextColorClass(
  variant: keyof typeof TEXT_COLORS,
  theme: Theme
): string {
  return TEXT_COLORS[variant][theme];
}

/**
 * Get background color class based on theme
 */
export function getBgColorClass(
  variant: keyof typeof BG_COLORS,
  theme: Theme
): string {
  return BG_COLORS[variant][theme];
}

/**
 * Helper to invert colors between dark and light
 * Useful for ensuring contrast
 */
export function getContrastColor(theme: Theme): string {
  return theme === 'dark' 
    ? 'hsl(var(--brutalist-dark-border-primary))'      // White in dark mode
    : 'hsl(var(--brutalist-dark-border-primary))';    // Black in light mode
}

/**
 * Get contrasting text color for backgrounds
 */
export function getContrastTextColor(bgVariant: keyof typeof BG_COLORS, theme: Theme): string {
  // In dark mode, light backgrounds need dark text; in light mode, all need dark text
  if (theme === 'dark' && bgVariant !== 'default' && bgVariant !== 'surface1') {
    return TEXT_COLORS.muted.dark;
  }
  return TEXT_COLORS.primary[theme];
}
