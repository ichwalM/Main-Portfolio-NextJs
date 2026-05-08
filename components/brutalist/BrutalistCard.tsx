'use client';

import React from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BORDER_WEIGHTS } from '@/lib/brutalist/constants';
import { createIrregularStyle } from '@/lib/brutalist/spacing-utils';
import { BORDER_COLORS, BG_COLORS } from '@/lib/brutalist/color-utils';
import { useTheme } from '@/lib/context/ThemeContext';

interface BrutalistCardProps extends HTMLMotionProps<"div"> {
  /**
   * Card variant
   */
  variant?: 'outlined' | 'double-border' | 'inset' | 'filled';

  /**
   * Border weight
   */
  borderWeight?: 'medium' | 'thick' | 'heavy';

  /**
   * Border color variant
   */
  borderColor?: 'primary' | 'secondary' | 'accent';

  /**
   * Enable hover animation
   */
  hoverable?: boolean;

  /**
   * Custom padding className(s)
   */
  padding?: string;

  /**
   * Custom padding style (use for irregular spacing)
   */
  paddingStyle?: React.CSSProperties;

  children: React.ReactNode;
}

export default function BrutalistCard({
  variant = 'outlined',
  borderWeight = 'thick',
  borderColor = 'primary',
  hoverable = false,
  padding,
  paddingStyle = createIrregularStyle(3, 4, 2, 5),
  className,
  children,
  ...props
}: BrutalistCardProps) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const borderWeightValue = BORDER_WEIGHTS[borderWeight];
  const borderColorClass = BORDER_COLORS[borderColor][theme];

  const cardClasses = cn(
    // Base
    'relative',
    'rounded-none',
    'transition-none',
    'border-[var(--brutalist-border-weight)]',

    // Variant
    variant === 'double-border' &&
      "after:content-[''] after:absolute after:inset-[6px] after:pointer-events-none after:border-[2px] after:border-[hsl(var(--brutalist-dark-border-secondary))]",
    variant === 'inset' &&
      "after:content-[''] after:absolute after:inset-[2px] after:pointer-events-none after:border-[1px] after:border-[hsl(var(--brutalist-dark-border-secondary))]",

    // Border
    borderColorClass,
    variant === 'filled' && BG_COLORS.surface1[theme],

    // Padding
    padding,

    // Hover
    hoverable && 'hover:border-[hsl(var(--brutalist-dark-accent-primary))]',

    className
  );

  return (
    <motion.div
      className={cardClasses}
      style={
        {
          ...(props.style ?? {}),
          ...paddingStyle,
          ['--brutalist-border-weight' as any]: borderWeightValue,
        } as React.CSSProperties
      }
      whileHover={!reduceMotion && hoverable ? { y: -2 } : undefined}
      transition={{ duration: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
