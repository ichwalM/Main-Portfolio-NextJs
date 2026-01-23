'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedBorder from '@/components/animations/AnimatedBorder';

interface ProfileCardProps {
  name: string;
  image?: string;
  className?: string;
}

export default function ProfileCard({ name, image, className = '' }: ProfileCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <AnimatedBorder className="w-full aspect-[3/4]" borderWidth={3} duration={4}>
        <div className="relative w-full h-full rounded-2xl overflow-hidden glass border border-white/10 bg-background">
          {/* Profile Image */}
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-xl">
              <span className="text-9xl font-black gradient-text">{name[0]}</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

          {/* Name badge at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="glass rounded-xl p-4 border border-white/20 backdrop-blur-xl">
              <p className="text-sm text-foreground/60 mb-1">Portfolio Owner</p>
              <h3 className="text-2xl font-bold gradient-text">{name}</h3>
            </div>
          </div>
        </div>
      </AnimatedBorder>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-20 h-20 rounded-full bg-primary/20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -bottom-2 -left-2 w-20 h-20 rounded-full bg-accent/20 blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
    </motion.div>
  );
}
