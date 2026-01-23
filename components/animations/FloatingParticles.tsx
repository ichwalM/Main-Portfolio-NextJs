'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

export default function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
}
