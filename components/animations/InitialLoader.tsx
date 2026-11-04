'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import HeroSkeleton from '@/components/ui/HeroSkeleton';
import { Terminal, CheckCircle2 } from 'lucide-react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const startTime = performance.now();
    const duration = 480; // 480ms ultra-smooth 60fps interpolation

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const current = Math.min(100, Math.round(easeOutCubic(t) * 100));

      setProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // Prevent body scroll during initial boot
    document.body.style.overflow = 'clip';

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
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="initial-skeleton-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-background flex flex-col justify-between overflow-hidden pointer-events-none select-none"
        >
          {/* Top Real-time HUD Telemetry Bar */}
          <div className="w-full bg-card/95 border-b border-border px-4 py-2 flex items-center justify-between text-xs font-mono z-50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-primary font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>WALLLDEV // OS</span>
              </span>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <span className="text-muted-foreground hidden sm:inline">
                {isComplete ? 'CORE HYDRATED' : 'HYDRATING FULL STACK & DEVOPS RUNTIME...'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-24 sm:w-36 h-2 bg-muted border border-border overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-bold text-primary w-10 text-right">
                {progress}%
              </span>
              {isComplete && (
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              )}
            </div>
          </div>

          {/* High-Fidelity Blueprint / Skeleton Component */}
          <div className="flex-1 overflow-hidden relative">
            <HeroSkeleton fullPage={false} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
