/**
 * Framer Motion animation presets for Brutalist design
 * All animations use linear easing and discrete steps (no smooth transitions)
 */

import { Variants, Transition } from 'framer-motion';
import { ANIMATION_DURATIONS, EASING } from './constants';

/**
 * Staggered container for multiple children
 * Use with staggerChild variant
 */
export const staggerContainerVariant = (delayStart = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_DURATIONS.stagger / 1000,
      delayChildren: delayStart,
    },
  },
  exit: { opacity: 0 },
});

/**
 * Staggered child - slides up with fade
 */
export const staggerChildVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, y: -10 },
};

/**
 * Slide in from left
 */
export const slideInLeftVariant: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, x: -40 },
};

/**
 * Slide in from right
 */
export const slideInRightVariant: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, x: 40 },
};

/**
 * Slide in from top
 */
export const slideInTopVariant: Variants = {
  initial: { opacity: 0, y: -40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, y: -40 },
};

/**
 * Slide in from bottom
 */
export const slideInBottomVariant: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, y: 40 },
};

/**
 * Scale up entrance
 */
export const scaleUpVariant: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, scale: 0.85 },
};

/**
 * Fade in/out only
 */
export const fadeVariant: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.fast / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0 },
};

/**
 * Border color pulse (for attention)
 */
export const borderPulseVariant: Variants = {
  animate: {
    borderColor: [
      'rgb(255, 255, 255)',
      'rgb(255, 255, 0)',
      'rgb(255, 255, 255)',
    ],
    transition: {
      duration: 2,
      ease: EASING.linear,
      repeat: Infinity,
    },
  },
};

/**
 * Hover state for buttons (no smoothing)
 */
export const buttonHoverVariant: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 0.98,
    transition: {
      duration: 0,
    },
  },
};

/**
 * Hover state for cards (border change)
 */
export const cardHoverVariant: Variants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: {
      duration: 0,
    },
  },
};

/**
 * Reveal content upward (used in text reveals)
 */
export const revealUpVariant: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: ANIMATION_DURATIONS.normal / 1000,
      ease: EASING.linear,
    },
  },
  exit: { opacity: 0, height: 0 },
};

/**
 * Transition configuration for all animations
 */
export const brutalistTransition: Transition = {
  duration: ANIMATION_DURATIONS.normal / 1000,
  ease: EASING.linear,
};

/**
 * Fast transition
 */
export const fastTransition: Transition = {
  duration: ANIMATION_DURATIONS.fast / 1000,
  ease: EASING.linear,
};

/**
 * Slow transition
 */
export const slowTransition: Transition = {
  duration: ANIMATION_DURATIONS.slow / 1000,
  ease: EASING.linear,
};

/**
 * Helper function to get staggered delay
 */
export const getStaggerDelay = (index: number): number => {
  return index * (ANIMATION_DURATIONS.stagger / 1000);
};

/**
 * Helper function to create custom staggered transition
 */
export const createStaggerTransition = (
  delayStart: number = 0,
  staggerAmount: number = ANIMATION_DURATIONS.stagger / 1000
): Transition => ({
  staggerChildren: staggerAmount,
  delayChildren: delayStart,
});
