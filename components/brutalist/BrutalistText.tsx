'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TEXT_COLORS } from '@/lib/brutalist/color-utils';
import { useTheme } from '@/lib/context/ThemeContext';

interface BrutalistTextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Text variant (semantic)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

  /**
   * Text size
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

  /**
   * Font weight
   */
  weight?: 'normal' | 'semibold' | 'bold' | 'extrabold';

  /**
   * Text color variant
   */
  color?: keyof typeof TEXT_COLORS;

  /**
   * High contrast mode (more aggressive)
   */
  highContrast?: boolean;

  /**
   * Uppercase transformation
   */
  uppercase?: boolean;

  /**
   * Letter spacing
   */
  tracking?: 'tight' | 'normal' | 'wide' | 'wider';

  /**
   * Line height
   */
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';

  children: React.ReactNode;
}

const SIZE_STYLES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const WEIGHT_STYLES = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const TRACKING_STYLES = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
};

const LEADING_STYLES = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

const HEADING_SIZES = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
  p: 'text-base',
  span: 'text-base',
  label: 'text-sm',
};

const HEADING_WEIGHTS = {
  h1: 'font-extrabold',
  h2: 'font-bold',
  h3: 'font-bold',
  h4: 'font-bold',
  h5: 'font-semibold',
  h6: 'font-semibold',
  p: 'font-normal',
  span: 'font-normal',
  label: 'font-semibold',
};

export default function BrutalistText({
  as = 'p',
  size,
  weight,
  color = 'primary',
  highContrast = false,
  uppercase = false,
  tracking,
  leading = 'normal',
  className,
  children,
  ...props
}: BrutalistTextProps) {
  const { theme } = useTheme();
  
  // Determine size (explicit size prop takes precedence over semantic)
  const textSize = size ? SIZE_STYLES[size] : HEADING_SIZES[as];
  
  // Determine weight
  const textWeight = weight ? WEIGHT_STYLES[weight] : HEADING_WEIGHTS[as];
  
  // Determine tracking (headings get wider tracking)
  const textTracking = tracking ? TRACKING_STYLES[tracking] : 
    (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as) ? 'tracking-wide' : 'tracking-normal');
  
  // Determine leading
  const textLeading = LEADING_STYLES[leading];
  
  const textClasses = cn(
    // Size
    textSize,
    // Weight
    textWeight,
    // Color
    TEXT_COLORS[color][theme],
    // Tracking
    textTracking,
    // Leading
    textLeading,
    // High contrast (add text-shadow or darker color)
    highContrast && 'text-opacity-100',
    // Uppercase
    uppercase && 'uppercase',
    className
  );

  const Component = as as React.ElementType;

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
}
