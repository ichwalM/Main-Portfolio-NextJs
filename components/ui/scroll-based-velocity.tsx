"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const directionFactor = useRef<number>(1);
  useTransform(scrollY, (v) => {
    // Reset baseX on scroll direction change can be implemented here if needed
    return v;
  });

  React.useEffect(() => {
    let lastTime = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000; // Convert to seconds
      lastTime = time;

      let moveBy = baseVelocity * delta * (directionFactor.current);

      // Apply velocity factor from scroll
      const velocity = velocityFactor.get();
      if (velocity < 0) {
        directionFactor.current = -1;
      } else if (velocity > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocity;

      // Update baseX
      let currentBaseX = baseX.get();
      currentBaseX += moveBy / 50; // Adjust speed scaling

      // Loop effect: reset when it goes too far
      if (currentBaseX <= -100) {
        currentBaseX = 0;
      } else if (currentBaseX >= 0) {
        currentBaseX = -100;
      }

      baseX.set(currentBaseX);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [baseVelocity, velocityFactor, baseX]);

  return (
    <div className="parallax overflow-hidden tracking-tighter m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className={cn("font-bold uppercase flex flex-nowrap whitespace-nowrap", className)} style={{ x }}>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
      </motion.div>
    </div>
  );
}

export const VelocityScroll = ({
  text,
  default_velocity = 5,
  className,
}: VelocityScrollProps) => {
  return (
    <section className="relative w-full overflow-hidden">
      <ParallaxText baseVelocity={default_velocity} className={className}>
        {text}
      </ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={className}>
        {text}
      </ParallaxText>
    </section>
  );
};
