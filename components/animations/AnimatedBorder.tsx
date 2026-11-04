'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  colors?: string[];
}

export default function AnimatedBorder({
  children,
  className = '',
  borderWidth = 2,
  duration = 3,
  colors = ['rgba(6, 182, 212, 0.8)', 'rgba(168, 85, 247, 0.8)'],
}: AnimatedBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Rotating gradient border - positioned absolutely behind content */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[0]})`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner background to create border effect */}
      <div 
        className="absolute rounded-2xl bg-background -z-10"
        style={{
          inset: `${borderWidth}px`,
        }}
      />

      {/* Content - takes full height */}
      {children}
    </div>
  );
}
