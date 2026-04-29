'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import type { Profile } from '@/types/profile';
import MagneticButton from '@/components/animations/MagneticButton';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Threads from '@/components/ui/Threads';

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  const socialIcons: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    instagram: Instagram,
  };

  const name = profile?.name || 'Ichwal';
  const bio = profile?.bio || 'Passionate Full Stack Developer with 5+ years of experience in building scalable web applications. I specialize in Laravel, React, and Modern Cloud Architecture.';
  const heroImage = profile?.hero_image;
  const socialLinks = profile?.social_links || {};

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full py-20 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-background">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60 pointer-events-none" />
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 right-0 text-[20vw] font-black text-border/10 leading-none select-none pointer-events-none z-0 tracking-tighter">
        DEV
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl h-full flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-20">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8 lg:text-left text-center mt-8 lg:mt-0"
          >
            {/* Section label */}
            {profile?.open_work && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <span className="tag-solid flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 animate-pulse inline-block" />
                  Available for freelance
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none">
                {name}
                <span className="text-primary">.</span>
              </h1>
            </motion.div>

            {/* Role label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="h-px w-10 bg-primary" />
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-primary">
                Full Stack Developer
              </span>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl mx-auto lg:mx-0"
            >
              <TextGenerateEffect
                words={bio}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal"
                duration={1.5}
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3 pt-2 justify-center lg:justify-start"
            >
              {Object.entries(socialLinks).map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon || !url) return null;

                return (
                  <MagneticButton key={key}>
                    <motion.a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 border border-border flex items-center justify-center group hover:border-primary hover:text-primary transition-all duration-200"
                      aria-label={key}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  </MagneticButton>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start"
            >
              <motion.a
                href="projects"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 bg-primary text-white font-bold text-sm tracking-wide flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                View Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 border border-border text-foreground font-bold text-sm tracking-wide hover:border-foreground transition-colors"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Frame — Sharp Square with Corner Brackets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mb-12 lg:mb-0"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px]">

              {/* Corner bracket decorations */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary z-20" />
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary z-20" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary z-20" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary z-20" />

              {/* Main image frame — sharp square */}
              <div className="absolute inset-0 overflow-hidden border border-border bg-surface z-10 group">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 z-10" />

                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl font-black text-foreground/10">{name[0]}</span>
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
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none hidden sm:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-border to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-4 bg-primary"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
