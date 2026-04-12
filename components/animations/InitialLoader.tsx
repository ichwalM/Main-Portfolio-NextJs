'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if already visited this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const duration = 1800; // 1.8 seconds loading
    const intervalTime = 30; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    // Ease-out function for counting
    const easeOutQuad = (t: number) => t * (2 - t);

    const interval = setInterval(() => {
      currentStep++;
      const timeFraction = Math.min(currentStep / steps, 1);
      const currentProgress = Math.floor(easeOutQuad(timeFraction) * 100);
      
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('hasVisited', 'true');
        }, 500); // Rest a bit on 100%
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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transform-gpu"
        >
          {/* Logo Name */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-baseline">
            <motion.h1 
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-none"
            >
              ICHWAL
            </motion.h1>
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 12 }}
              className="text-primary text-6xl md:text-9xl font-black"
            >
              .
            </motion.span>
          </div>

          {/* Progress Section */}
          <div className="absolute bottom-12 right-12 md:bottom-20 md:right-20 flex flex-col items-end gap-2">
            <div className="text-4xl md:text-6xl font-mono font-black text-foreground">
              {progress}<span className="text-primary">%</span>
            </div>
            
            {/* Minimalist Progress Bar */}
            <div className="w-40 md:w-64 h-1 bg-border relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
