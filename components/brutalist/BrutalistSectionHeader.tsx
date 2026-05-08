'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrutalistSectionHeaderProps {
  number: string;
  label: string;
  title: string;
  accentTitle?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 } as any,
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'linear' } },
};

export default function BrutalistSectionHeader({
  number,
  label,
  title,
  accentTitle,
  subtitle,
  align = 'left',
  className,
}: BrutalistSectionHeaderProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn('mb-16 md:mb-24', align === 'center' && 'text-center', className)}
    >
      {/* Section number + label row */}
      <motion.div variants={item} className={cn('flex items-center gap-4 mb-6', align === 'center' && 'justify-center')}>
        <span className="font-mono text-[11px] font-black text-primary tracking-[0.25em] uppercase border border-primary px-2 py-0.5">
          {number}
        </span>
        <div className="h-px w-12 bg-primary" />
        <span className="font-mono text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
          {label}
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h2
        variants={item}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
      >
        {title}
        {accentTitle && (
          <>
            <br />
            <span className="text-primary">{accentTitle}</span>
          </>
        )}
      </motion.h2>

      {/* Divider bar */}
      <motion.div
        variants={item}
        className={cn('flex mt-6 mb-6', align === 'center' && 'justify-center')}
      >
        <div className="h-1 w-16 bg-primary" />
        <div className="h-1 w-4 bg-primary/40 ml-1" />
        <div className="h-1 w-2 bg-primary/20 ml-1" />
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={item}
          className={cn(
            'text-muted-foreground text-base max-w-xl border-l-4 border-border pl-4 font-mono text-sm',
            align === 'center' && 'mx-auto border-l-0 border-t-4 pt-4 pl-0'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
