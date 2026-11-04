import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-baseline gap-1 animate-pulse">
          <span className="text-4xl sm:text-5xl font-black tracking-tighter text-foreground">
            ICHWAL
          </span>
          <span className="text-4xl sm:text-5xl font-black text-primary">.</span>
        </div>
        <div className="w-24 h-0.5 bg-border overflow-hidden">
          <div className="w-full h-full bg-primary animate-[beam_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
