'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const startTime = performance.now();
    // 2.2 seconds smooth progress duration + 0.4s hold/reveal = ~2.6s total intro sequence
    const duration = 2200;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const current = Math.min(100, Math.round(easeInOutCubic(t) * 100));

      setProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('portfolio_intro_complete'));
          }
        }, 350);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // Prevent scrolling during opening animation
    document.body.style.overflow = 'hidden';

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  if (!mounted || !isLoading) return null;

  const isComplete = progress === 100;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="cinematic-intro-curtain"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999] bg-background text-foreground flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/0.12),transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Status Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full flex items-center justify-between text-xs font-mono text-muted-foreground z-10"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-bold text-foreground">WALLLDEV // ARCHITECTURE</span>
            </div>
            <div className="hidden sm:block">
              <span>MAKASSAR, ID · 2026</span>
            </div>
          </motion.div>

          {/* Centerpiece: Wordmark, Expanding Laser Beam & Telemetry */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
            
            {/* Wordmark with smooth blur-to-sharp entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-1"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground">
                ICHWAL
              </h1>
              <span className="text-5xl sm:text-7xl md:text-8xl font-black text-primary animate-pulse">
                .
              </span>
            </motion.div>

            {/* Expanding Laser Beam Line */}
            <div className="relative w-48 sm:w-80 md:w-96 my-5 h-[2px] bg-border overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>

            {/* Role Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-muted-foreground"
            >
              Full Stack Developer · DevOps Engineer
            </motion.p>

            {/* Minimal Digital Counter */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="text-3xl sm:text-4xl font-mono font-black text-foreground tabular-nums">
                {String(progress).padStart(2, '0')}
                <span className="text-primary font-sans text-xl sm:text-2xl ml-1">%</span>
              </div>
              <p className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                {isComplete ? 'SYSTEM READY · ENTERING...' : 'INITIALIZING WORKSPACE'}
              </p>
            </div>
          </div>

          {/* Bottom Progress Track */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md mx-auto z-10"
          >
            <div className="h-1 w-full bg-muted/60 overflow-hidden rounded-full">
              <div
                className="h-full bg-primary transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
