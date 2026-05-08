'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import type { Profile } from '@/types/profile';
import MagneticButton from '@/components/animations/MagneticButton';
import Link from 'next/link';
import { memo } from 'react';

interface HeroProps {
  profile: Profile | null;
}

const socialIcons: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } as any,
  },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'linear' as const } },
};

const Hero = memo(function Hero({ profile }: HeroProps) {
  const name = profile?.name || 'Ichwal';
  const bio = profile?.bio || 'Full Stack Developer & Network Administrator — Building scalable web apps and managing modern network infrastructure.';
  const heroImage = profile?.hero_image;
  const socialLinks = profile?.social_links || {};

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full bg-background">

      {/* Brutalist grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large decorative text — brutalist watermark */}
      <div
        className="absolute bottom-0 right-0 font-black leading-none select-none pointer-events-none z-0 tracking-tighter text-[22vw] text-foreground/[0.04]"
        aria-hidden="true"
      >
        DEV
      </div>

      {/* Top border bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary z-20" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl pt-28 pb-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ── TEXT CONTENT ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Number tag */}
            <motion.div variants={staggerItem} className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-black text-primary tracking-[0.3em] border border-primary px-2 py-0.5">
                01
              </span>
              <div className="h-px w-10 bg-primary" />
              <span className="font-mono text-[10px] text-primary tracking-[0.25em] uppercase">
                Portfolio
              </span>
            </motion.div>

            {/* Name — h1 */}
            <motion.div variants={staggerItem}>
              <h1 className="text-[14vw] sm:text-[12vw] lg:text-[9vw] font-black tracking-tighter leading-none uppercase">
                {name}
                <span className="text-primary">.</span>
              </h1>
            </motion.div>

            {/* Role strip */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-0 overflow-hidden border border-border"
            >
              <span className="bg-primary text-primary-foreground font-mono text-[10px] font-black tracking-[0.15em] uppercase px-4 py-2 whitespace-nowrap">
                Full Stack Dev
              </span>
              <span className="text-muted-foreground font-mono text-[10px] px-4 py-2 border-l border-border whitespace-nowrap">
                &amp;
              </span>
              <span className="bg-foreground text-background font-mono text-[10px] font-black tracking-[0.15em] uppercase px-4 py-2 border-l border-border whitespace-nowrap">
                Network Admin
              </span>
            </motion.div>

            {/* Bio */}
            <motion.div variants={staggerItem} className="border-l-4 border-primary pl-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {bio}
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItem} className="flex gap-0 border border-border w-fit">
              {Object.entries(socialLinks).map(([key, url], i) => {
                const Icon = socialIcons[key];
                if (!Icon || !url) return null;
                return (
                  <MagneticButton key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-none ${i > 0 ? 'border-l border-border' : ''}`}
                      aria-label={`${key} profile`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </MagneticButton>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-black text-xs tracking-[0.15em] uppercase border-4 border-primary hover:bg-transparent hover:text-primary transition-none"
              >
                View Projects
                <span className="text-base leading-none">→</span>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-foreground font-black text-xs tracking-[0.15em] uppercase border-4 border-foreground hover:bg-foreground hover:text-background transition-none"
              >
                Hire Me
              </Link>
            </motion.div>
          </motion.div>

          {/* ── PROFILE FRAME ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'linear', delay: 0.2 }}
            className="w-full lg:w-5/12 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Offset shadow — brutalist style */}
              <div className="absolute top-4 left-4 w-full h-full border-4 border-primary z-0" />

              {/* Main image frame */}
              <div className="relative w-72 sm:w-80 md:w-96 aspect-[3/4] border-4 border-foreground bg-surface overflow-hidden z-10">
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={`${name} — Full Stack Developer`}
                    fill
                    priority
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl font-black text-foreground/10">{name[0]}</span>
                  </div>
                )}

                {/* Bottom info strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-primary p-4 flex items-center justify-between">
                  <div>
                    <p className="font-black text-primary-foreground text-sm uppercase tracking-wider">{name}</p>
                    <p className="font-mono text-primary-foreground/70 text-[10px] uppercase tracking-[0.2em]">Full Stack Dev</p>
                  </div>
                  {profile?.open_work && (
                    <div className="flex items-center gap-1.5 border border-primary-foreground/30 px-2 py-1">
                      <span className="w-1.5 h-1.5 bg-green-400 animate-pulse" />
                      <span className="text-[9px] font-black text-primary-foreground uppercase tracking-wider font-mono">Available</span>
                    </div>
                  )}
                </div>

                {/* Corner labels */}
                <div className="absolute top-3 right-3 bg-background border border-border px-2 py-1 font-mono text-[9px] font-black uppercase tracking-wider text-primary">
                  SYS.ONLINE
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3, ease: 'linear' }}
          className="mt-20 border-t-4 border-border pt-6 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-8">
            {[
              { label: 'Projects', value: '20+' },
              { label: 'Experience', value: '3 yrs' },
              { label: 'Certs', value: '10+' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-black text-2xl leading-none">{stat.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Scroll to explore</span>
            <span className="text-primary animate-bounce">↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Hero;
