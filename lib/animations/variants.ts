import { Variants } from 'framer-motion';

// Easing curves
export const EASING = {
  ease: [0.22, 1, 0.36, 1],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  smooth: [0.43, 0.13, 0.23, 0.96],
} as const;

// Fade in from bottom — reduced y offset for smoother feel
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING.ease },
  },
};

// Fade in from top
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING.ease },
  },
};

// Fade in from left — reduced x offset
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASING.ease },
  },
};

// Fade in from right — reduced x offset
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASING.ease },
  },
};

// Scale in
export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Stagger container — faster stagger for snappier feel
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,  // Was 0.1 — faster stagger
      delayChildren: 0.1,     // Was 0.2 — quicker start
    },
  },
};

// Stagger item — lighter animation
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },  // Was y: 20
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING.ease },  // Was 0.5
  },
};

// Slide up reveal
export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASING.ease },
  },
};

// NOTE: blurIn removed — filter:blur() is GPU-expensive and causes paint storms.
// Use fadeInUp instead wherever blurIn was used.

// Rotate in
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: EASING.ease },
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: EASING.smooth },
  },
};
