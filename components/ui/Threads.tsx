
"use client";

import React, { useRef, useEffect, useCallback } from 'react';

interface ThreadsProps {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

export default function Threads({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  // Throttle mousemove to max 60fps
  const lastMouseUpdate = useRef(0);

  const draw = useCallback((
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    timeRef: React.MutableRefObject<number>,
    animFrameRef: React.MutableRefObject<number>
  ) => {
    // Pause animation when tab is hidden (saves CPU)
    if (document.hidden) {
      animFrameRef.current = requestAnimationFrame(() =>
        draw(ctx, canvas, timeRef, animFrameRef)
      );
      return;
    }

    timeRef.current += 0.004; // Slightly slower wave for less CPU
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reduced from 40 to 22 lines — 45% less draw calls
    const lineCount = 22;
    const baseAmplitude = 50 * amplitude;
    const separation = 18;
    // Step from 5 to 8 — 37% fewer lineTo calls per line
    const step = 8;

    const colors = ['#06b6d4', '#8b5cf6', '#ffffff'];

    const mouseFactor = enableMouseInteraction
      ? (mouseRef.current.y / canvas.height) * 2 - 1
      : 0;

    for (let i = 0; i < lineCount; i++) {
      ctx.beginPath();
      ctx.strokeStyle = colors[i % colors.length];
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.28;

      for (let x = 0; x < canvas.width; x += step) {
        const yOffset = Math.sin(x * 0.003 + timeRef.current + i * 0.2) * baseAmplitude;
        const yMouse = enableMouseInteraction
          ? Math.sin(x * 0.01 + timeRef.current) * ((mouseRef.current.x - x) * 0.001) * 15
          : 0;

        const y = canvas.height / 2 + (i - lineCount / 2) * separation + yOffset + yMouse;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    animFrameRef.current = requestAnimationFrame(() =>
      draw(ctx, canvas, timeRef, animFrameRef)
    );
  }, [amplitude, enableMouseInteraction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const animFrameRef = { current: 0 };
    const timeRef = { current: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      // Throttle to ~60fps max
      const now = performance.now();
      if (now - lastMouseUpdate.current < 16) return;
      lastMouseUpdate.current = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Pause/resume on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Resume — reset time to avoid jump
        animFrameRef.current = requestAnimationFrame(() =>
          draw(ctx, canvas, timeRef, animFrameRef)
        );
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    draw(ctx, canvas, timeRef, animFrameRef);

    return () => {
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [amplitude, distance, enableMouseInteraction, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30 will-change-[contents]"
      aria-hidden="true"
    />
  );
}
