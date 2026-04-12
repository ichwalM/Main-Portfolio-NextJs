'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Loader2, Check } from 'lucide-react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const duration = 2000; // 2 seconds loading
    const intervalTime = 30; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    // Custom ease-out function
    const easeOutStr = (t: number) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const interval = setInterval(() => {
      currentStep++;
      const timeFraction = Math.min(currentStep / steps, 1);
      const currentProgress = Math.floor(easeOutStr(timeFraction) * 100);
      
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 800); // Tahan sebentar di 100% supaya user baca
      }
    }, intervalTime);

    document.body.style.overflow = 'hidden';
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && mounted) {
      document.body.style.overflow = '';
    }
  }, [isLoading, mounted]);

  if (!mounted || !isLoading) return null;

  const isComplete = progress === 100;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transform-gpu overflow-hidden"
        >
          {/* Main Container mirroring the image */}
          <div className="relative border border-border/20 p-12 md:p-24 flex flex-col items-center justify-center min-w-[300px] md:min-w-[600px]">
            
            {/* Top Left Status Badge */}
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold tracking-wider uppercase font-mono">
              {isComplete ? 'RENDER COMPLETE' : 'RENDERING...'}
            </div>

            {/* Small Circle Indicator (Top Center) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[1.5px] border-foreground/50 flex items-center justify-center">
              {!isComplete && (
                <motion.div 
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>

            {/* Corner Decorative Dots */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border border-primary/50 -translate-x-1/2 -translate-y-1/2 bg-background" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border border-primary/50 translate-x-1/2 -translate-y-1/2 bg-background" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border border-primary/50 -translate-x-1/2 translate-y-1/2 bg-background" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border border-primary/50 translate-x-1/2 translate-y-1/2 bg-background" />

            {/* Massive Percentage Text */}
            <div className="text-[25vw] md:text-[200px] font-black tracking-tighter text-foreground leading-[0.8] select-none py-8">
              {progress}<span className="text-primary">%</span>
            </div>

            {/* Bottom Status Box */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <div className="bg-foreground text-background px-4 py-2 flex items-center gap-3 font-mono">
                {isComplete ? (
                  <Check className="w-4 h-4 text-green-400" strokeWidth={3} />
                ) : (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                )}
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                  {isComplete ? 'WAITING FOR USER INPUT...' : 'INITIALIZING SYSTEM...'}
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
