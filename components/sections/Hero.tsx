'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import type { Profile } from '@/types/profile';
import MagneticButton from '@/components/animations/MagneticButton';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Threads from '@/components/ui/Threads';
import FloatingParticles from '@/components/animations/FloatingParticles';
import HeroTechStack from '@/components/sections/HeroTechStack';
import { memo } from 'react';
import type { SkillsByCategory } from '@/types/skill';

interface HeroProps {
  profile: Profile | null;
  skills?: SkillsByCategory;
}

const socialIcons: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
};

const Hero = memo(function Hero({ profile, skills }: HeroProps) {
  const name = profile?.name || 'Ichwal';
  const bio = profile?.bio || 'Passionate Full Stack Developer with 5+ years of experience in building scalable web applications. I specialize in Laravel, React, and Modern Cloud Architecture.';
  const heroImage = profile?.hero_image;
  const socialLinks = profile?.social_links || {};

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full py-20 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-background">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        <FloatingParticles count={28} />
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 bg-primary/10 blur-[90px] pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60 pointer-events-none" />
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 right-0 text-[20vw] font-black text-border/10 leading-none select-none pointer-events-none z-0 tracking-tighter" aria-hidden="true">
        DEV
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl h-full flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-20">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8 lg:text-left text-center mt-8 lg:mt-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/5 text-primary text-xs font-mono font-semibold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span>Full Stack Developer</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                HI, I&apos;M <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  {name.toUpperCase()}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              <TextGenerateEffect words={bio} className="font-normal" />
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 web3-glow"
              >
                View Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <div className="flex items-center gap-3">
                {Object.entries(socialLinks).map(([key, url]) => {
                  if (!url || !socialIcons[key]) return null;
                  const Icon = socialIcons[key];

                  return (
                    <MagneticButton key={key}>
                      <motion.a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 border border-border flex items-center justify-center group hover:border-primary hover:text-primary hover:shadow-[0_0_16px_2px_hsl(var(--primary)/0.4)] transition-all duration-200"
                        aria-label={`${key} profile`}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    </MagneticButton>
                  );
                })}
              </div>
            </div>

            {/* System Stack Strip */}
            <HeroTechStack skills={skills} />
          </motion.div>

          {/* Image / Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full sm:w-3/4 lg:w-1/2 max-w-md lg:max-w-none relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-square w-full">
              {/* Decorative brackets */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary z-20" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary z-20" />

              <div className="absolute inset-0 bg-surface border border-border overflow-hidden group">
                {/* Glitch overlay on hover */}
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={`${name} — Full Stack Developer`}
                    fill
                    priority
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl font-black text-foreground/10" aria-hidden="true">{name[0]}</span>
                  </div>
                )}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
              </div>

              {/* Floating mono labels */}
              <motion.div
                className="absolute -right-2 top-8 px-3 py-1.5 bg-background border border-border text-xs text-primary font-mono z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                SYS.ONLINE
              </motion.div>

              <motion.div
                className="absolute -left-2 bottom-12 px-3 py-1.5 bg-background border border-border text-xs text-muted-foreground font-mono z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                NET.SECURE
              </motion.div>

              {/* Available badge */}
              {profile?.open_work && (
                <motion.div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-background border border-primary z-30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 bg-green-500" />
                    </span>
                    <span className="font-bold text-xs text-white tracking-[0.12em] uppercase font-mono">
                      Available for work
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none hidden sm:flex"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-border to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-4 bg-primary will-change-transform"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
});

export default Hero;
