'use client';

import { cn } from '@/lib/utils';

interface BrutalistTagProps {
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'accent';
  size?: 'xs' | 'sm';
  className?: string;
}

export default function BrutalistTag({
  children,
  variant = 'outline',
  size = 'xs',
  className,
}: BrutalistTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-bold uppercase tracking-wider leading-none',
        size === 'xs' ? 'text-[9px] px-2 py-1' : 'text-[11px] px-3 py-1.5',
        variant === 'outline' && 'border border-border text-muted-foreground hover:border-primary hover:text-primary transition-none',
        variant === 'solid' && 'bg-primary text-primary-foreground',
        variant === 'accent' && 'border border-primary text-primary',
        className
      )}
    >
      {children}
    </span>
  );
}
