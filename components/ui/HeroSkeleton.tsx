'use client';

import React from 'react';

interface HeroSkeletonProps {
  fullPage?: boolean;
}

export default function HeroSkeleton({ fullPage = true }: HeroSkeletonProps) {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden select-none">
      {/* Top Header Placeholder */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-28 skeleton-shimmer border border-border" />
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-ping" />
        </div>
        <div className="hidden md:flex items-center gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 w-16 skeleton-shimmer border border-border/50" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 skeleton-shimmer border border-border" />
          <div className="h-8 w-24 skeleton-shimmer border border-primary/30" />
        </div>
      </header>

      {/* Main Hero Stage Skeleton */}
      <section className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        
        {/* Background Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none" aria-hidden="true">
          <span className="text-[20vw] font-black uppercase tracking-tighter">
            ICHWAL
          </span>
        </div>

        {/* Diagonal Wireframe Ribbons Skeleton (Crossing 'X' behind person) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden" aria-hidden="true">
          {/* Ribbon 1: -9deg */}
          <div className="absolute w-[180vw] -rotate-[9deg] bg-card/60 border-y border-dashed border-primary/25 py-2 flex items-center justify-around opacity-60">
            <div className="flex items-center gap-8 text-xs font-mono tracking-widest text-primary/40 uppercase">
              <span>INITIALIZING CORE // FULL STACK DEV</span>
              <span>/</span>
              <span>DEVOPS PIPELINE // DOCKER &amp; K8S</span>
              <span>/</span>
              <span>SYSTEM ARCHITECTURE // NEXT.JS</span>
              <span>/</span>
            </div>
          </div>
          {/* Ribbon 2: +9deg */}
          <div className="absolute w-[180vw] rotate-[9deg] bg-muted/40 border-y border-dashed border-border py-2 flex items-center justify-around opacity-60">
            <div className="flex items-center gap-8 text-xs font-mono tracking-widest text-muted-foreground/40 uppercase">
              <span>CLOUD &amp; LINUX INFRASTRUCTURE</span>
              <span>/</span>
              <span>AUTOMATED CI/CD // NGINX TUNING</span>
              <span>/</span>
              <span>15+ GCP SKILL BADGES // RESILIENT DEPLOY</span>
              <span>/</span>
            </div>
          </div>
        </div>

        {/* Main Hero Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between items-center py-2 sm:py-4">

          {/* Top Header Bar / Kicker */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-pulse" />
              <div className="h-7 w-72 sm:w-96 skeleton-shimmer border border-border" />
            </div>
            <div className="h-5 w-48 skeleton-shimmer border border-border/60" />
          </div>

          {/* Interactive Hero Stage: Center Silhouette + 4 Surrounding Cards */}
          <div className="relative w-full flex-1 min-h-[540px] sm:min-h-[620px] md:min-h-[700px] lg:min-h-[760px] xl:min-h-[820px] flex items-center justify-center my-2 sm:my-4">

            {/* Center Cutout Silhouette Placeholder */}
            <div className="relative z-30 flex flex-col items-center justify-center">
              {/* Grounding Halo Glow */}
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-90 -z-10 animate-pulse" />

              {/* Silhouette Box with Technical Crosshairs */}
              <div className="relative w-[320px] sm:w-[420px] md:w-[500px] lg:w-[580px] xl:w-[660px] h-[460px] sm:h-[560px] md:h-[660px] lg:h-[740px] xl:h-[820px] border-2 border-dashed border-primary/30 bg-primary/[0.02] flex flex-col items-center justify-end overflow-hidden">
                {/* Corner crosshairs */}
                <span className="absolute top-2 left-2 text-primary/40 font-mono text-xs">+</span>
                <span className="absolute top-2 right-2 text-primary/40 font-mono text-xs">+</span>
                <span className="absolute bottom-2 left-2 text-primary/40 font-mono text-xs">+</span>
                <span className="absolute bottom-2 right-2 text-primary/40 font-mono text-xs">+</span>

                {/* Laser scanline animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[beam_3s_ease-in-out_infinite]" />

                {/* Stylized Silhouette Geometry */}
                <div className="w-[70%] h-[82%] bg-muted/70 skeleton-shimmer border-t-2 border-x-2 border-primary/20 rounded-t-[100px] relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-muted-foreground/10 border border-primary/20 mb-4 animate-pulse" />
                  <div className="h-3 w-32 skeleton-shimmer rounded mb-2" />
                  <div className="h-2 w-20 skeleton-shimmer rounded" />
                </div>
              </div>

              {/* Center Grounding Pedestal Status Pill */}
              <div className="mt-[-16px] sm:mt-[-20px] z-40 px-5 sm:px-6 py-2 sm:py-2.5 bg-card border-2 border-primary/40 text-xs sm:text-sm font-mono tracking-wider text-primary flex items-center gap-2.5 shadow-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                <span className="font-bold">SYSTEM BOOT // FULL STACK &amp; DEVOPS</span>
              </div>
            </div>

            {/* Desktop 4 Technical Card Skeletons with Angular Leader Lines (Behind Silhouette) */}
            
            {/* CARD 1: TOP LEFT */}
            <div className="hidden lg:block absolute top-4 xl:top-8 left-4 xl:left-12 z-20 w-[310px] xl:w-[340px] p-5 bg-card/80 border-2 border-border/80">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-5 skeleton-shimmer border border-primary/30" />
                <div className="h-4 w-36 skeleton-shimmer" />
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="h-3 w-full skeleton-shimmer" />
                <div className="h-3 w-4/5 skeleton-shimmer" />
              </div>
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-5 w-14 skeleton-shimmer" />
                ))}
              </div>

              {/* Angular leader line */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none w-40 xl:w-52 h-24 overflow-visible opacity-50">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 150 80" fill="none">
                  <rect x="0" y="16" width="4.5" height="4.5" fill="hsl(var(--primary))" />
                  <path d="M 0,18 L 55,18 L 135,58" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* CARD 2: BOTTOM LEFT */}
            <div className="hidden lg:block absolute bottom-4 xl:bottom-8 left-4 xl:left-12 z-20 w-[310px] xl:w-[340px] p-5 bg-card/80 border-2 border-border/80">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-5 skeleton-shimmer border border-primary/30" />
                <div className="h-4 w-36 skeleton-shimmer" />
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="h-3 w-full skeleton-shimmer" />
                <div className="h-3 w-3/4 skeleton-shimmer" />
              </div>
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-5 w-14 skeleton-shimmer" />
                ))}
              </div>

              {/* Angular leader line */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none w-40 xl:w-52 h-24 overflow-visible opacity-50">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 150 80" fill="none">
                  <rect x="0" y="58" width="4.5" height="4.5" fill="hsl(var(--primary))" />
                  <path d="M 0,60 L 55,60 L 135,20" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* CARD 3: TOP RIGHT */}
            <div className="hidden lg:block absolute top-4 xl:top-8 right-4 xl:right-12 z-20 w-[310px] xl:w-[340px] p-5 bg-card/80 border-2 border-border/80">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-5 skeleton-shimmer border border-primary/30" />
                <div className="h-4 w-36 skeleton-shimmer" />
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="h-3 w-full skeleton-shimmer" />
                <div className="h-3 w-4/5 skeleton-shimmer" />
              </div>
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-5 w-14 skeleton-shimmer" />
                ))}
              </div>

              {/* Angular leader line */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none w-40 xl:w-52 h-24 overflow-visible opacity-50">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 150 80" fill="none">
                  <rect x="145.5" y="16" width="4.5" height="4.5" fill="hsl(var(--primary))" />
                  <path d="M 150,18 L 95,18 L 15,58" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* CARD 4: BOTTOM RIGHT */}
            <div className="hidden lg:block absolute bottom-4 xl:bottom-8 right-4 xl:right-12 z-20 w-[310px] xl:w-[340px] p-5 bg-card/80 border-2 border-border/80">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-5 skeleton-shimmer border border-primary/30" />
                <div className="h-4 w-36 skeleton-shimmer" />
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="h-3 w-full skeleton-shimmer" />
                <div className="h-3 w-3/4 skeleton-shimmer" />
              </div>
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 w-16 skeleton-shimmer" />
                ))}
              </div>

              {/* Angular leader line */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none w-40 xl:w-52 h-24 overflow-visible opacity-50">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 150 80" fill="none">
                  <rect x="145.5" y="58" width="4.5" height="4.5" fill="hsl(var(--primary))" />
                  <path d="M 150,60 L 95,60 L 15,20" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

          </div>

          {/* Mobile / Tablet 2x2 Grid Skeletons */}
          <div className="lg:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 z-30">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 bg-card/80 border-2 border-border/80">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 skeleton-shimmer" />
                  <div className="h-4 w-32 skeleton-shimmer" />
                </div>
                <div className="h-3 w-full skeleton-shimmer mb-1.5" />
                <div className="h-3 w-3/4 skeleton-shimmer mb-3" />
                <div className="flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 w-12 skeleton-shimmer" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Controls Skeleton */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border z-30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-36 skeleton-shimmer bg-primary/20 border border-primary/40" />
              <div className="h-10 w-32 skeleton-shimmer border border-border" />
              <div className="h-10 w-28 skeleton-shimmer border border-primary/20" />
            </div>
            <div className="flex items-center gap-2.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-9 h-9 skeleton-shimmer border border-border" />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Optional Below-the-Fold Teaser Skeleton */}
      {fullPage && (
        <section className="py-20 border-t border-border bg-card/30">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="space-y-3">
              <div className="h-4 w-28 skeleton-shimmer border border-primary/30" />
              <div className="h-10 w-80 skeleton-shimmer" />
              <div className="h-4 w-96 skeleton-shimmer" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 border-2 border-border bg-card p-6 space-y-4">
                  <div className="h-6 w-36 skeleton-shimmer" />
                  <div className="h-4 w-full skeleton-shimmer" />
                  <div className="h-4 w-4/5 skeleton-shimmer" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
