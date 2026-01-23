
"use client";

import React, { useRef, useEffect } from 'react';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const draw = () => {
      time += 0.005; // speed of wave movement
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = ['#06b6d4', '#8b5cf6', '#ffffff']; // Cyan, Purple, White
      const lineCount = 40;
      const baseAmplitude = 50 * amplitude;
      const separation = 15; // distance between lines

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 1.5;
        // ctx.globalAlpha = 0.5;

        // Add some variation based on mouse y
        const mouseFactor = enableMouseInteraction 
          ? (mouseRef.current.y / canvas.height) * 2 - 1 
          : 0;

        for (let x = 0; x < canvas.width; x += 5) {
          // Complex wave formula calculation
          // Base wave + time offset + index offset + mouse influence
          const yOffset = Math.sin(x * 0.003 + time + i * 0.2) * baseAmplitude;
          const yMouse = enableMouseInteraction 
             ? Math.sin(x * 0.01 + time) * ((mouseRef.current.x - x) * 0.001) * 20
             : 0;
             
          const y = canvas.height / 2 + (i - lineCount/2) * separation + yOffset + yMouse;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude, distance, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  );
}
