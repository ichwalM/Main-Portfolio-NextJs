"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
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
  isVisible: boolean;
}

function ParallaxText({ children, baseVelocity = 100, className, isVisible }: ParallaxProps) {
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

  useEffect(() => {
    // Only run animation when section is visible — saves CPU when scrolled past
    if (!isVisible) return;

    let lastTime = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      let moveBy = baseVelocity * delta * directionFactor.current;

      const velocity = velocityFactor.get();
      if (velocity < 0) {
        directionFactor.current = -1;
      } else if (velocity > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocity;

      let currentBaseX = baseX.get();
      currentBaseX += moveBy / 50;

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
  }, [baseVelocity, velocityFactor, baseX, isVisible]);

  return (
    <div className="parallax overflow-hidden tracking-tighter m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={cn("font-bold uppercase flex flex-nowrap whitespace-nowrap will-change-transform", className)}
        style={{ x }}
      >
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Pause rAF loop when section is not in viewport
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <ParallaxText baseVelocity={default_velocity} className={className} isVisible={isVisible}>
        {text}
      </ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={className} isVisible={isVisible}>
        {text}
      </ParallaxText>
    </section>
  );
};
