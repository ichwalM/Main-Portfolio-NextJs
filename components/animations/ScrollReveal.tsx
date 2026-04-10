'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, blurIn } from '@/lib/animations/variants';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'blurIn';
  delay?: number;
  className?: string;
}

const variantMap = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  blurIn,
};

export default function ScrollReveal({
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
      viewport={{ once: false, margin: '-60px' }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

