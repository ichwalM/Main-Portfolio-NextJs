'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
