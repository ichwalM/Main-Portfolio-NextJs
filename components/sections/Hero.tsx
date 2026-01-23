'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import type { Profile } from '@/types/profile';
import MagneticButton from '@/components/animations/MagneticButton';
// import FloatingParticles from '@/components/animations/FloatingParticles';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
// import { BackgroundBeams } from '@/components/ui/background-beams';
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
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full py-20 lg:py-0">
      {/* Background Beams and Particles */}
      <div className="absolute inset-0 z-0 bg-black">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/30 to-background pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl h-full flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8 lg:text-left text-center mt-8 lg:mt-0"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-primary to-transparent" />
              <p className="text-primary font-bold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                Available for freelance
              </p>
            </motion.div>

            {/* Name with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-2 sm:mb-4 tracking-tighter leading-none">
                <span className="text-shimmer inline-block">
                  {name}
                </span>
                <span className="text-primary">.</span>
              </h1>
            </motion.div>

            {/* Bio with text generate effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl mx-auto lg:mx-0"
            >
              <TextGenerateEffect
                words={bio}
                className="text-sm sm:text-base lg:text-xl text-foreground/80 leading-relaxed font-light"
                duration={1.5}
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-2 justify-center lg:justify-start"
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
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass flex items-center justify-center group overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300"
                      aria-label={key}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:text-primary transition-colors" />
                    </motion.a>
                  </MagneticButton>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3 sm:gap-4 pt-4 justify-center lg:justify-start"
            >
              <HoverBorderGradient
                as="a"
                href="#projects"
                containerClassName="rounded-2xl"
                className="px-6 py-3 sm:px-8 sm:py-4 text-white font-bold text-base sm:text-lg bg-surface"
              >
                <span className="flex items-center gap-2">
                  View Projects
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </HoverBorderGradient>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl glass border-2 border-white/10 hover:border-primary/50 font-bold text-base sm:text-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/5"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image with 3D Card Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mb-8 lg:mb-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:max-w-md aspect-square">
              {/* Rotating gradient ring */}
              <motion.div
                className="absolute -inset-4 rounded-[2rem] sm:rounded-[2.5rem] opacity-70 blur-2xl"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0) 0deg, rgba(6, 182, 212, 0.5) 120deg, rgba(168, 85, 247, 0.5) 240deg, rgba(6, 182, 212, 0) 360deg)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Image container with border gradient */}
              <HoverBorderGradient
                containerClassName="rounded-[1.5rem] sm:rounded-[2rem] w-full h-full shadow-2xl shadow-primary/20"
                className="w-full h-full p-0 overflow-hidden bg-surface"
                duration={3}
              >
                <motion.div
                  className="relative w-full h-full group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {heroImage ? (
                    <Image
                      src={heroImage}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center">
                      <span className="text-7xl sm:text-9xl font-black gradient-text opacity-50">{name[0]}</span>
                    </div>
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                </motion.div>
              </HoverBorderGradient>

              {/* Status Badge */}
              <motion.div
                className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 sm:px-6 sm:py-3 rounded-full glass border border-primary/30 backdrop-blur-xl shadow-xl shadow-primary/10 whitespace-nowrap z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Available for work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none hidden sm:flex"
      >
        <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-medium">Scroll to explore</span>
        <motion.div
          className="w-5 h-9 rounded-full border border-foreground/20 flex items-start justify-center p-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-primary"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
