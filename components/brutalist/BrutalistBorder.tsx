'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BORDER_WEIGHTS } from '@/lib/brutalist/constants';
import { BORDER_COLORS } from '@/lib/brutalist/color-utils';
import { useTheme } from '@/lib/context/ThemeContext';

interface BrutalistBorderProps extends HTMLMotionProps<'div'> {
  /**
   * Position of border
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'all' | 'horizontal' | 'vertical';

  /**
   * Border weight (1-4)
   */
  weight?: 1 | 2 | 3 | 4;

  /**
   * Border color variant
   */
  color?: keyof typeof BORDER_COLORS;

  /**
   * Animate border
   */
  animated?: boolean;

  /**
   * Animation type
   */
  animationType?: 'pulse' | 'slide' | 'shift' | 'scale';

  /**
   * Custom height for vertical lines
   */
  height?: string;

  /**
   * Custom width for horizontal lines
   */
  width?: string;

  children?: React.ReactNode;
}

const POSITION_STYLES = {
  all: 'border',
  top: 'border-x-0 border-b-0',
  bottom: 'border-x-0 border-t-0',
  left: 'border-y-0 border-r-0',
  right: 'border-y-0 border-l-0',
  horizontal: 'border-x-0',
  vertical: 'border-y-0',
};

export default function BrutalistBorder({
  position = 'bottom',
  weight = 3,
  color = 'primary',
  animated = false,
  animationType = 'pulse',
  height = 'h-auto',
  width = 'w-full',
  className,
  children,
  ...props
}: BrutalistBorderProps) {
  const { theme } = useTheme();
  const borderWeight = BORDER_WEIGHTS[weight === 1 ? 'thin' : weight === 2 ? 'medium' : weight === 3 ? 'thick' : 'heavy'] as string;
  const borderColorClass = BORDER_COLORS[color][theme];

  const borderClasses = cn(
    // Position
    POSITION_STYLES[position],
    // Weight
    'border-[var(--brutalist-border-weight)]',
    // Color
    borderColorClass,
    // Size
    width,
    height,
    // Animation
    animated && `animate-brutalist-${animationType}`,
    className
  );

  if (!children) {
    // Standalone border line
    const { style, ...restProps } = props;
    return (
      <motion.div
        className={borderClasses}
        style={
          {
            ...(style ?? {}),
            ['--brutalist-border-weight' as any]: borderWeight,
          } as React.CSSProperties
        }
        {...restProps}
        animate={animated ? { opacity: [1, 0.5, 1] } : undefined}
        transition={
          animated
            ? {
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
              }
            : undefined
        }
        data-testid="brutalist-border"
      />
    );
  }

  // Border wrapping children
  return (
    <motion.div
      className={borderClasses}
      style={
        {
          ...(props.style ?? {}),
          ['--brutalist-border-weight' as any]: borderWeight,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
