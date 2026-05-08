/**
 * Brutalist Design System Constants
 * Centralized configuration for all brutalist theme values
 */

export const BORDER_WEIGHTS = {
  thin: '1px',
  medium: '2px',
  thick: '3px',
  heavy: '4px',
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  stagger: 60,
} as const;

export const COLORS = {
  dark: {
    // Surfaces
    background: 'rgb(var(--brutalist-dark-bg) / <alpha-value>)',
    surface1: 'hsl(var(--brutalist-dark-surface-1))',
    surface2: 'hsl(var(--brutalist-dark-surface-2))',
    surfaceAccent: 'hsl(var(--brutalist-dark-surface-accent))',
    
    // Text
    textPrimary: 'hsl(var(--brutalist-dark-text-primary))',
    textSecondary: 'hsl(var(--brutalist-dark-text-secondary))',
    textMuted: 'hsl(var(--brutalist-dark-text-muted))',
    
    // Borders
    borderPrimary: 'hsl(var(--brutalist-dark-border-primary))',
    borderPrimaryHover: 'hsl(var(--brutalist-dark-border-primary-hover))',
    borderSecondary: 'hsl(var(--brutalist-dark-border-secondary))',
    borderSecondaryHover: 'hsl(var(--brutalist-dark-border-secondary-hover))',
    
    // Accents
    accentPrimary: 'hsl(var(--brutalist-dark-accent-primary))',
    accentYellow: 'hsl(var(--brutalist-dark-accent-yellow))',
    accentCyan: 'hsl(var(--brutalist-dark-accent-cyan))',
    
    // Status
    statusError: 'hsl(var(--brutalist-dark-status-error))',
    statusSuccess: 'hsl(var(--brutalist-dark-status-success))',
    statusWarning: 'hsl(var(--brutalist-dark-status-warning))',
  },
  light: {
    // Same names, but will use light mode CSS variables
    background: 'hsl(var(--brutalist-dark-bg))',
    surface1: 'hsl(var(--brutalist-dark-surface-1))',
    surface2: 'hsl(var(--brutalist-dark-surface-2))',
    surfaceAccent: 'hsl(var(--brutalist-dark-surface-accent))',
    
    textPrimary: 'hsl(var(--brutalist-dark-text-primary))',
    textSecondary: 'hsl(var(--brutalist-dark-text-secondary))',
    textMuted: 'hsl(var(--brutalist-dark-text-muted))',
    
    borderPrimary: 'hsl(var(--brutalist-dark-border-primary))',
    borderPrimaryHover: 'hsl(var(--brutalist-dark-border-primary-hover))',
    borderSecondary: 'hsl(var(--brutalist-dark-border-secondary))',
    borderSecondaryHover: 'hsl(var(--brutalist-dark-border-secondary-hover))',
    
    accentPrimary: 'hsl(var(--brutalist-dark-accent-primary))',
    accentYellow: 'hsl(var(--brutalist-dark-accent-yellow))',
    accentCyan: 'hsl(var(--brutalist-dark-accent-cyan))',
    
    statusError: 'hsl(var(--brutalist-dark-status-error))',
    statusSuccess: 'hsl(var(--brutalist-dark-status-success))',
    statusWarning: 'hsl(var(--brutalist-dark-status-warning))',
  },
} as const;

/**
 * Irregular spacing for brutalist aesthetic
 * Use pt, pr, pb, pl notation: [top right bottom left]
 */
export const SPACING = {
  tight: {
    // Compact
    padding: 'px-2 py-1',
    margin: 'mx-2 my-1',
  },
  regular: {
    // Standard
    padding: 'px-4 py-3',
    margin: 'mx-4 my-3',
  },
  loose: {
    // Spacious
    padding: 'px-6 py-4',
    margin: 'mx-6 my-4',
  },
  irregular: {
    // Brutalist: asymmetric padding
    // Format: [top right bottom left]
    smPadding: 'pt-2 pr-3 pb-1 pl-4',
    mdPadding: 'pt-4 pr-6 pb-2 pl-8',
    lgPadding: 'pt-6 pr-10 pb-4 pl-12',
  },
} as const;

/**
 * Easing functions
 * Brutalist uses linear and step functions (no smooth easing)
 */
export const EASING = {
  linear: 'linear',
  step: 'steps(1)',
  stepSmooth: 'steps(3)',
} as const;

/**
 * Border variants for different brutalist styles
 */
export const BORDER_VARIANTS = {
  outlined: {
    border: 'border-[3px]',
    color: 'border-[hsl(var(--brutalist-dark-border-primary))]',
  },
  doubleBorder: {
    // Double border effect with gap
    outer: 'border-[2px] border-[hsl(var(--brutalist-dark-border-primary))]',
    inner: 'after:border-[2px] after:border-[hsl(var(--brutalist-dark-border-secondary))]',
    gap: 'after:inset-[4px]',
  },
  heavy: {
    border: 'border-[4px]',
    color: 'border-[hsl(var(--brutalist-dark-border-primary))]',
  },
  accent: {
    border: 'border-[3px]',
    color: 'border-[hsl(var(--brutalist-dark-accent-primary))]',
  },
} as const;

/**
 * Animation variants
 */
export const ANIMATION_VARIANTS = {
  staggerSmall: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.06,
          delayChildren: 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  staggerMedium: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
} as const;

/**
 * Transition settings for brutalist (linear, no smoothing)
 */
export const TRANSITIONS = {
  fast: {
    duration: ANIMATION_DURATIONS.fast / 1000,
    ease: 'linear',
  },
  normal: {
    duration: ANIMATION_DURATIONS.normal / 1000,
    ease: 'linear',
  },
  slow: {
    duration: ANIMATION_DURATIONS.slow / 1000,
    ease: 'linear',
  },
  stagger: {
    duration: ANIMATION_DURATIONS.normal / 1000,
    delay: ANIMATION_DURATIONS.stagger / 1000,
    ease: 'linear',
  },
} as const;

export type BorderWeight = keyof typeof BORDER_WEIGHTS;
export type AnimationDuration = keyof typeof ANIMATION_DURATIONS;
export type EasingType = keyof typeof EASING;
export type BorderVariant = keyof typeof BORDER_VARIANTS;
