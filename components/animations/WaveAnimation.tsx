'use client';

import { motion } from 'framer-motion';

export default function WaveAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Multiple wave layers for depth */}
        <motion.path
          d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
          fill="url(#gradient1)"
          initial={{ d: "M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z" }}
          animate={{
            d: [
              "M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z",
              "M0,200 Q300,300 600,200 T1200,200 L1200,400 L0,400 Z",
              "M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z"
          fill="url(#gradient2)"
          initial={{ d: "M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z" }}
          animate={{
            d: [
              "M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z",
              "M0,250 Q300,350 600,250 T1200,250 L1200,400 L0,400 Z",
              "M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.path
          d="M0,220 Q300,120 600,220 T1200,220 L1200,400 L0,400 Z"
          fill="url(#gradient3)"
          initial={{ d: "M0,220 Q300,120 600,220 T1200,220 L1200,400 L0,400 Z" }}
          animate={{
            d: [
              "M0,220 Q300,120 600,220 T1200,220 L1200,400 L0,400 Z",
              "M0,220 Q300,320 600,220 T1200,220 L1200,400 L0,400 Z",
              "M0,220 Q300,120 600,220 T1200,220 L1200,400 L0,400 Z",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.2)" />
          </linearGradient>
          
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.15)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.15)" />
          </linearGradient>

          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.1)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
