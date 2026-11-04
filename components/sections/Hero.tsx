'use client';

import { useState, useRef, memo, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  FileText,
  Code2,
  Server,
  Cloud,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { Profile } from '@/types/profile';
import type { About } from '@/types/about';

interface HeroProps {
  profile: Profile | null;
  about?: About | null;
}

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
};

export const Hero = memo(function Hero({ profile, about }: HeroProps) {
  const name = profile?.name || 'Ichwal';
  const resumeLink = profile?.resume_link;
  const socialLinks = profile?.social_links || {};
  const gpa = about?.GPA || '3.90';
  const univ = about?.about_univ ? about.about_univ.split('-')[0].trim() : 'Universitas Muslim Indonesia';

  // State for card interactions
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    setIsPointerFine(window.matchMedia('(pointer: fine)').matches);
  }, []);

  // Mouse parallax motion for 3D depth on center figure
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-350, 350], [-6, 6]);
  const rotateX = useTransform(smoothY, [-350, 350], [6, -6]);
  const translateX = useTransform(smoothX, [-350, 350], [-8, 8]);
  const translateY = useTransform(smoothY, [-350, 350], [-6, 6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!isPointerFine || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [isPointerFine, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Pointing containers data matching mockup in frontend/docs/design/home-section.png
  const calloutCards = [
    {
      id: 1,
      title: 'Full Stack Engineer',
      role: 'Core Architecture',
      description: 'Building end-to-end web apps with Laravel, Next.js, and TypeScript. Focus on clean code and scalable architecture.',
      icon: Code2,
      tags: ['Laravel', 'Next.js', 'TypeScript', 'REST APIs'],
      position: 'top-left',
    },
    {
      id: 2,
      title: 'Network & SysAdmin',
      role: 'Infrastructure Defense',
      description: 'Cisco certified in Network Defense. Hands-on Ubuntu Server management, Nginx tuning, and network routing.',
      icon: Server,
      tags: ['Cisco Certified', 'Ubuntu Server', 'Nginx', 'Security'],
      position: 'bottom-left',
    },
    {
      id: 3,
      title: 'Cloud & AI Solutions',
      role: 'Modern Cloud & GenAI',
      description: '15+ Google Cloud badges. Gemini API integration, Vertex AI apps, Docker containerization, and automation.',
      icon: Cloud,
      tags: ['15+ GCP Badges', 'Gemini AI', 'Vertex AI', 'Docker'],
      position: 'top-right',
    },
    {
      id: 4,
      title: 'Informatics Engineering',
      role: `GPA ${gpa} · ${univ}`,
      description: `Informatics student at UMI with 3.90 GPA. Active open-source builder, tech speaker, and available for work.`,
      icon: GraduationCap,
      tags: [`GPA ${gpa}`, 'Active Speaker', 'Open to Work'],
      position: 'bottom-right',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden bg-background text-foreground pt-20 pb-8 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Background Architectural Watermark SVG (Monochromatic depth) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize="260"
            fontWeight="900"
            letterSpacing="-0.06em"
          >
            {name.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* =========================================================================
          CROSSING DIAGONAL MARQUEE RIBBONS ("Text full stack network engineer")
          Two diagonal ribbons crossing in an "X" shape directly behind the person!
          Color harmony: Deep slate-emerald tone that blends cleanly with the theme.
          ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {/* Ribbon 1: Slanted top-left to bottom-right (-9deg) */}
        <div className="absolute w-[180vw] -rotate-[9deg] bg-card/90 text-primary border-y border-primary/30 py-2 sm:py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wider uppercase flex overflow-hidden backdrop-blur-xs">
          <motion.div
            className="flex shrink-0 items-center gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>FULL STACK DEVELOPER</span>
                <span className="opacity-50">/</span>
                <span>NETWORK ADMINISTRATOR</span>
                <span className="opacity-50">/</span>
                <span>UBUNTU SERVER MANAGEMENT</span>
                <span className="opacity-50">/</span>
                <span>LARAVEL &amp; NEXT.JS</span>
                <span className="opacity-50">/</span>
                <span>SYSTEM ARCHITECTURE</span>
                <span className="opacity-50">/</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Ribbon 2: Slanted bottom-left to top-right (+9deg) (crossing Ribbon 1) */}
        <div className="absolute w-[180vw] rotate-[9deg] bg-muted/80 text-foreground border-y border-border py-2 sm:py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wider uppercase flex overflow-hidden backdrop-blur-xs">
          <motion.div
            className="flex shrink-0 items-center gap-8 whitespace-nowrap"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>CISCO CERTIFIED NETWORK DEFENSE</span>
                <span className="opacity-50">/</span>
                <span>15+ GOOGLE CLOUD SKILL BADGES</span>
                <span className="opacity-50">/</span>
                <span>DOCKER &amp; VIRTUALIZATION</span>
                <span className="opacity-50">/</span>
                <span>GEMINI AI SOLUTIONS</span>
                <span className="opacity-50">/</span>
                <span>LINUX SYSTEMS</span>
                <span className="opacity-50">/</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between items-center py-2 sm:py-4">

        {/* Top Header Bar — Display H1 Headline with Harmonious Contrast */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 px-2 sm:px-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase">
              {name}
              <span className="text-muted-foreground text-sm sm:text-base font-medium normal-case tracking-normal ml-3">
                · Full Stack &amp; Network Engineer
              </span>
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground font-medium">
            Makassar, Indonesia · Open for Projects
          </div>
        </div>

        {/* Hero Interactive Stage: Center Cutout Figure + 4 Pointing Containers */}
        <div className="relative w-full flex-1 min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center justify-center my-2 sm:my-4">

          {/* =========================================================================
              CENTER ANIMATED CUTOUT PHOTO (NO WATERMARK, NO BACKGROUND)
              Sits in front of crossing ribbons, with smooth 3D tilt & idle float
              ========================================================================= */}
          <motion.div
            style={
              isPointerFine
                ? {
                    rotateX,
                    rotateY,
                    x: translateX,
                    y: translateY,
                    transformStyle: 'preserve-3d',
                  }
                : {}
            }
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Gentle idle float animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex flex-col items-center"
            >
              {/* Grounding Halo for Depth */}
              <div
                className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-90 -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* The Cutout Image (Watermark-free, transparent background) */}
              <div className="relative w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[390px] sm:h-[460px] md:h-[530px] lg:h-[580px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]">
                <Image
                  src="/ichwal-cutout.webp"
                  alt={`${name} — Full Stack Developer & Network Administrator`}
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, (max-width: 1024px) 440px, 480px"
                  className="object-contain object-bottom select-none pointer-events-none"
                />
              </div>

              {/* Center Grounding Pedestal Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-[-12px] z-30 px-5 py-2 bg-card text-foreground border-2 border-border font-bold text-xs sm:text-sm tracking-tight flex items-center gap-2.5"
              >
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>ICHWAL · FULL STACK &amp; NETWORK ENGINEER</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              FOUR POINTING CONTAINERS WITH ORGANIC CURVED ARROWS (DESKTOP)
              Color harmony: Consistent border & accent with matching emerald pointers!
              ========================================================================= */}

          {/* CARD 1: TOP LEFT — Full Stack Engineer */}
          <div className="hidden lg:block absolute top-4 xl:top-8 left-4 xl:left-12 z-30 max-w-[310px] xl:max-w-[340px]">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onMouseEnter={() => setActiveCard(1)}
              onMouseLeave={() => setActiveCard(null)}
              className={`relative p-5 bg-card border-2 transition-colors duration-200 ${
                activeCard === 1
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/60'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Code2 className="w-5 h-5 text-primary" />
                <h3 className="text-base font-black tracking-tight">{calloutCards[0].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {calloutCards[0].description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {calloutCards[0].tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-muted text-xs font-semibold text-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {/* Curved SVG Arrow Pointing from Card to Person */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none w-32 xl:w-36 h-24 overflow-visible">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 120 70" fill="none">
                  <circle cx="5" cy="18" r="3.5" fill="hsl(var(--primary))" />
                  <path
                    d="M 5,18 C 50,18 80,45 110,55"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-colors"
                  />
                  <polygon
                    points="110,55 98,48 102,62"
                    fill="hsl(var(--primary))"
                    className="transition-colors"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* CARD 2: BOTTOM LEFT — Network & SysAdmin */}
          <div className="hidden lg:block absolute bottom-4 xl:bottom-8 left-4 xl:left-12 z-30 max-w-[310px] xl:max-w-[340px]">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onMouseEnter={() => setActiveCard(2)}
              onMouseLeave={() => setActiveCard(null)}
              className={`relative p-5 bg-card border-2 transition-colors duration-200 ${
                activeCard === 2
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/60'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-base font-black tracking-tight">{calloutCards[1].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {calloutCards[1].description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {calloutCards[1].tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-muted text-xs font-semibold text-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {/* Curved SVG Arrow Pointing from Card to Person */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none w-32 xl:w-36 h-24 overflow-visible">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 120 70" fill="none">
                  <circle cx="5" cy="52" r="3.5" fill="hsl(var(--primary))" />
                  <path
                    d="M 5,52 C 50,52 80,25 110,15"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-colors"
                  />
                  <polygon
                    points="110,15 98,22 103,8"
                    fill="hsl(var(--primary))"
                    className="transition-colors"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* CARD 3: TOP RIGHT — Cloud & AI Solutions */}
          <div className="hidden lg:block absolute top-4 xl:top-8 right-4 xl:right-12 z-30 max-w-[310px] xl:max-w-[340px]">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              onMouseEnter={() => setActiveCard(3)}
              onMouseLeave={() => setActiveCard(null)}
              className={`relative p-5 bg-card border-2 transition-colors duration-200 ${
                activeCard === 3
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/60'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Cloud className="w-5 h-5 text-primary" />
                <h3 className="text-base font-black tracking-tight">{calloutCards[2].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {calloutCards[2].description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {calloutCards[2].tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-muted text-xs font-semibold text-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {/* Curved SVG Arrow Pointing from Card to Person */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none w-32 xl:w-36 h-24 overflow-visible">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 120 70" fill="none">
                  <circle cx="115" cy="18" r="3.5" fill="hsl(var(--primary))" />
                  <path
                    d="M 115,18 C 70,18 40,45 10,55"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-colors"
                  />
                  <polygon
                    points="10,55 22,48 18,62"
                    fill="hsl(var(--primary))"
                    className="transition-colors"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* CARD 4: BOTTOM RIGHT — Informatics Engineering */}
          <div className="hidden lg:block absolute bottom-4 xl:bottom-8 right-4 xl:right-12 z-30 max-w-[310px] xl:max-w-[340px]">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              onMouseEnter={() => setActiveCard(4)}
              onMouseLeave={() => setActiveCard(null)}
              className={`relative p-5 bg-card border-2 transition-colors duration-200 ${
                activeCard === 4
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/60'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-base font-black tracking-tight">{calloutCards[3].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {calloutCards[3].description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {calloutCards[3].tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-muted text-xs font-semibold text-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {/* Curved SVG Arrow Pointing from Card to Person */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none w-32 xl:w-36 h-24 overflow-visible">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 120 70" fill="none">
                  <circle cx="115" cy="52" r="3.5" fill="hsl(var(--primary))" />
                  <path
                    d="M 115,52 C 70,52 40,25 10,15"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-colors"
                  />
                  <polygon
                    points="10,15 22,22 17,8"
                    fill="hsl(var(--primary))"
                    className="transition-colors"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Mobile / Tablet 2x2 Grid of Callout Cards (Harmonious borders) */}
        <div className="lg:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 z-30">
          {calloutCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-4 bg-card border-2 border-border hover:border-primary/60 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold tracking-tight">{card.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-normal mb-2.5">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {card.tags.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 bg-muted text-xs font-medium text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls & Social Links Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border z-30">
          {/* Action CTAs — Harmonious styling */}
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
            <Link
              href="/projects"
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-sm tracking-wide flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {resumeLink && (
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-card hover:bg-muted border-2 border-border text-foreground font-bold text-sm tracking-wide flex items-center gap-2 transition-colors"
                aria-label={`View ${name}'s CV in a new tab`}
              >
                <FileText className="w-4 h-4" />
                <span>Resume / CV</span>
              </a>
            )}

            <a
              href="#contact"
              className="px-6 py-2.5 bg-transparent hover:bg-primary/10 border-2 border-primary/50 text-primary font-bold text-sm tracking-wide flex items-center gap-2 transition-colors"
            >
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 justify-center">
            {Object.entries(socialLinks).map(([key, url]) => {
              const Icon = socialIcons[key];
              if (!Icon || !url) return null;

              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-border bg-card text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label={`${key} profile`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
});

export default Hero;
