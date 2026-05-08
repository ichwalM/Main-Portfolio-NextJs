'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainerVariant, staggerChildVariant } from '@/lib/brutalist/animation-presets';
import { IRREGULAR_GAPS } from '@/lib/brutalist/spacing-utils';

type GridCols = 1 | 2 | 3 | 4 | 6;

interface BrutalistGridProps extends HTMLMotionProps<"div"> {
  /**
   * Number of columns
   */
  columns?: GridCols;

  /**
   * Gap variant
   */
  gap?: keyof typeof IRREGULAR_GAPS | string;

  /**
   * Enable overlapping for dramatic effect
   */
  overlap?: boolean;

  /**
   * Enable staggered animation
   */
  staggered?: boolean;

  /**
   * Animation delay start
   */
  delayStart?: number;

  /**
   * Responsive columns
   */
  responsiveColumns?: {
    sm?: GridCols;
    md?: GridCols;
    lg?: GridCols;
    xl?: GridCols;
  };

  children: React.ReactNode;
}

const COLUMN_STYLES = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
};

const RESPONSIVE_COLUMN_STYLES = {
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    6: 'sm:grid-cols-6',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    6: 'md:grid-cols-6',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    6: 'lg:grid-cols-6',
  },
  xl: {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    6: 'xl:grid-cols-6',
  },
} as const;

export default function BrutalistGrid({
  columns = 3,
  gap = 'default',
  overlap = false,
  staggered = false,
  delayStart = 0,
  responsiveColumns,
  className,
  children,
  ...props
}: BrutalistGridProps) {
  // Get gap value
  const gapValue = gap in IRREGULAR_GAPS ? IRREGULAR_GAPS[gap as keyof typeof IRREGULAR_GAPS] : gap;

  // Build responsive classes
  const responsiveClasses = cn(
    responsiveColumns?.sm && RESPONSIVE_COLUMN_STYLES.sm[responsiveColumns.sm],
    responsiveColumns?.md && RESPONSIVE_COLUMN_STYLES.md[responsiveColumns.md],
    responsiveColumns?.lg && RESPONSIVE_COLUMN_STYLES.lg[responsiveColumns.lg],
    responsiveColumns?.xl && RESPONSIVE_COLUMN_STYLES.xl[responsiveColumns.xl]
  );

  const gridClasses = cn(
    // Base
    'grid',
    COLUMN_STYLES[columns],
    responsiveClasses,
    // Gap
    gapValue,
    // Overlap
    overlap && 'relative',
    className
  );

  const childrenArray = React.Children.toArray(children);

  if (!staggered) {
    return (
      <motion.div className={gridClasses} {...props}>
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={overlap ? 'relative' : undefined}
            style={overlap ? ({ zIndex: Math.floor(index / columns) } as React.CSSProperties) : undefined}
          >
            {child}
          </div>
        ))}
      </motion.div>
    );
  }

  // Staggered animation
  return (
    <motion.div
      className={gridClasses}
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariant(delayStart)}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={staggerChildVariant}
          className={overlap ? 'relative' : undefined}
          style={overlap ? ({ zIndex: Math.floor(index / columns) } as React.CSSProperties) : undefined}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
