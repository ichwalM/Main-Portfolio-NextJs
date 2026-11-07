import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 relative animate-pulse drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Image
            src="/aset/svg/logo_ic_badge.svg"
            alt="Ichwal Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        <div className="flex items-baseline gap-1 animate-pulse">
          <span className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground">
            ICHWAL
          </span>
          <span className="text-3xl sm:text-4xl font-black text-primary">.</span>
        </div>
        <div className="w-24 h-0.5 bg-border overflow-hidden">
          <div className="w-full h-full bg-primary animate-[beam_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
