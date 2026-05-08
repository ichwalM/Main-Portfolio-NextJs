'use client';

import React from 'react';
import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BORDER_WEIGHTS } from '@/lib/brutalist/constants';
import { createIrregularStyle } from '@/lib/brutalist/spacing-utils';
import { BORDER_COLORS, TEXT_COLORS } from '@/lib/brutalist/color-utils';
import { useTheme } from '@/lib/context/ThemeContext';

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Border weight
   */
  borderWeight?: 'thin' | 'medium' | 'thick' | 'heavy';

  /**
   * Show loading state
   */
  isLoading?: boolean;

  /**
   * Enable full width
   */
  fullWidth?: boolean;

  /**
   * Icon component
   */
  icon?: React.ReactNode;

  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';

  children: React.ReactNode;
}

const VARIANT_STYLES = {
  primary: (theme: 'dark' | 'light') => ({
    border: BORDER_COLORS.accent.dark,
    text: 'text-white',
    bg: 'bg-[hsl(var(--brutalist-dark-accent-primary))]',
    hover: 'hover:bg-[hsl(var(--brutalist-dark-surface-accent))]',
  }),
  secondary: (theme: 'dark' | 'light') => ({
    border: BORDER_COLORS.primary[theme],
    text: TEXT_COLORS.primary[theme],
    bg: 'bg-transparent',
    hover: 'hover:bg-[hsl(var(--brutalist-dark-surface-accent))]',
  }),
  accent: (theme: 'dark' | 'light') => ({
    border: theme === 'dark' 
      ? 'border-[hsl(var(--brutalist-dark-accent-yellow))]'
      : 'border-[hsl(var(--brutalist-dark-accent-cyan))]',
    text: theme === 'dark'
      ? 'text-black'
      : 'text-[hsl(var(--brutalist-dark-accent-cyan))]',
    bg: 'bg-transparent',
    hover: 'hover:bg-[hsl(var(--brutalist-dark-surface-accent))]',
  }),
  outline: (theme: 'dark' | 'light') => ({
    border: BORDER_COLORS.secondary[theme],
    text: TEXT_COLORS.secondary[theme],
    bg: 'bg-transparent',
    hover: `hover:${BORDER_COLORS.primary[theme]}`,
  }),
};

const SIZE_STYLES = {
  sm: {
    paddingStyle: createIrregularStyle(1, 2, 1, 2),
    fontSize: 'text-xs',
    height: 'h-8',
  },
  md: {
    paddingStyle: createIrregularStyle(2, 3, 2, 3),
    fontSize: 'text-sm',
    height: 'h-10',
  },
  lg: {
    paddingStyle: createIrregularStyle(3, 4, 3, 4),
    fontSize: 'text-base',
    height: 'h-12',
  },
};

export default function BrutalistButton({
  variant = 'primary',
  size = 'md',
  borderWeight = 'thick',
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  className,
  children,
  disabled,
  ...props
}: BrutalistButtonProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const variantStyle = VARIANT_STYLES[variant](theme);
  const sizeStyle = SIZE_STYLES[size];
  const borderWeightValue = BORDER_WEIGHTS[borderWeight];

  const buttonClasses = cn(
    // Base
    'inline-flex items-center justify-center gap-2',
    'font-bold uppercase tracking-wider',
    'transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[hsl(var(--brutalist-dark-accent-primary))]',

    // Border
    'border-[var(--brutalist-border-weight)]',
    variantStyle.border,

    // Sizing
    sizeStyle.fontSize,
    'rounded-none',

    // Colors
    variantStyle.text,
    variantStyle.bg,

    // Hover state (abrupt, no transition)
    variantStyle.hover,

    // Disabled
    disabled && 'opacity-50 cursor-not-allowed',

    // Full width
    fullWidth && 'w-full',

    className
  );

  return (
    <motion.button
      className={buttonClasses}
      style={
        {
          ...(props.style ?? {}),
          ...sizeStyle.paddingStyle,
          ['--brutalist-border-weight' as any]: borderWeightValue,
        } as React.CSSProperties
      }
      whileHover={!reduceMotion && !disabled && !isLoading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0 }}
      disabled={disabled || isLoading}
      {...(props as MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {isLoading ? (
        <>
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}
