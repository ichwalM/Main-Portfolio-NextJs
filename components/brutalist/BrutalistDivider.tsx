'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrutalistDividerProps {
  label?: string;
  weight?: 'thin' | 'medium' | 'thick';
  className?: string;
}

const WEIGHT_MAP = {
  thin: 'h-px',
  medium: 'h-0.5',
  thick: 'h-1',
};

export default function BrutalistDivider({
  label,
  weight = 'medium',
  className,
}: BrutalistDividerProps) {
  if (!label) {
    return (
      <div
        className={cn(
          WEIGHT_MAP[weight],
          'w-full bg-border',
          className
        )}
      />
    );
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className={cn('flex-1', WEIGHT_MAP[weight], 'bg-border')} />
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, ease: 'linear' }}
        className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground border border-border px-3 py-1 whitespace-nowrap"
      >
        {label}
      </motion.span>
      <div className={cn('flex-1', WEIGHT_MAP[weight], 'bg-border')} />
    </div>
  );
}
