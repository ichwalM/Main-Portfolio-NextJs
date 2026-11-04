'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import HeroSkeleton from '@/components/ui/HeroSkeleton';
import { Terminal, CheckCircle2 } from 'lucide-react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fast, responsive boot sequence (400ms duration)
    const duration = 400;
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const interval = setInterval(() => {
      currentStep++;
      const timeFraction = Math.min(currentStep / steps, 1);
      const currentProgress = Math.floor(easeOutCubic(timeFraction) * 100);

      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 120);
      }
    }, intervalTime);

    // Prevent scroll during initial 400ms boot
    document.body.style.overflow = 'clip';

    return () => {
      clearInterval(interval);
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
            scale: 1.02,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
                <motion.div
                  className="h-full bg-primary"
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
