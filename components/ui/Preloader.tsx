
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Determine loading duration (e.g., 2000ms)
    const duration = 2000;
    const steps = 100;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background Gradient/Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 tracking-tighter"
            >
              {count}%
            </motion.div>
            
            {/* Loading text or Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl md:text-2xl font-light text-foreground/60 uppercase tracking-[0.5em]"
            >
              Loading Experience
            </motion.div>
          </div>

          {/* Decorative Lines */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
