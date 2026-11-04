"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [beams, setBeams] = useState<{ style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const newBeams = [...Array(5)].map((_, i) => ({
      style: {
        "--left": `${i * 20}%`,
        "--opacity": 0.2 + Math.random() * 0.3,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
      } as React.CSSProperties,
    }));
    setBeams(newBeams);
  }, []);

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 bg-transparent [mask-image:radial-gradient(transparent,white)] pointer-events-none",
        className
      )}
    >
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden  [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <div className="absolute inset-y-0 right-0 w-[200%] h-full transform translate-x-1/2 skew-x-12 bg-inherit origin-bottom-left" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <div className="absolute inset-y-0 right-0 w-[200%] h-full transform translate-x-1/2 -skew-x-12 bg-inherit origin-bottom-left" />
        </div>
        
        {/* Animated Beams */}
        {beams.map((beam, i) => (
          <div
            key={i}
            className={cn(
              "absolute h-[100vh] w-[1px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent",
              "left-[var(--left)] opacity-[var(--opacity)] animate-beam",
            )}
            style={beam.style}
          />
        ))}
      </div>
    </div>
  );
};
