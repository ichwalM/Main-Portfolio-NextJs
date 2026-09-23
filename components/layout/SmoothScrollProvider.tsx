'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/**
 * Inertia-based smooth scroll for the whole site. Skipped entirely under
 * `prefers-reduced-motion` — native instant scroll is the correct
 * accessible behavior there, not a slowed-down version of the same effect.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
