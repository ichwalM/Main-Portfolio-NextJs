'use client';

import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '@/lib/animations/variants';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  className?: string;
}

const variantMap = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
};

// Memoized to prevent unnecessary re-renders during scroll
const ScrollReveal = memo(function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      // once: true = animate only once — critical for scroll jank prevention
      viewport={{ once: true, margin: '-80px' }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default ScrollReveal;
