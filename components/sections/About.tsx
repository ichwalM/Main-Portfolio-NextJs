'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap, Award } from 'lucide-react';
import type { About } from '@/types/about';
import BrutalistSectionHeader from '@/components/brutalist/BrutalistSectionHeader';
import { memo } from 'react';

interface AboutSectionProps {
  about: About | null;
}

const AboutSection = memo(function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null;

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden border-t-4 border-border">
      {/* Brutalist grid bg */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Watermark */}
      <div className="absolute top-0 right-0 text-[16vw] font-black text-foreground/[0.03] leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
        02
      </div>

      <div className="container mx-auto px-6 relative z-10">

        <BrutalistSectionHeader
          number="02"
          label="About Me"
          title="About"
          accentTitle="Me."
          subtitle="Developer, network engineer, and problem solver based in Makassar, Indonesia."
        />

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* ── LEFT: Image Frame ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'linear' }}
            className="w-full lg:w-5/12 relative flex-shrink-0"
          >
            <div className="relative">
              {/* Brutalist offset border */}
              <div className="absolute top-4 left-4 w-full h-full border-4 border-primary z-0" />
              
              <div className="relative aspect-[4/5] overflow-hidden border-4 border-foreground z-10">
                <Image
                  src={about.about_photo || '/placeholder-about.jpg'}
                  alt="About Ichwal"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />

                {/* Bottom info strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-background border-t-4 border-foreground grid grid-cols-2 divide-x-4 divide-border">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">University</p>
                      <p className="text-xs font-black leading-tight">{about.about_univ}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <Award size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">GPA</p>
                      <p className="text-2xl font-black leading-tight text-primary">{about.GPA}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'linear', delay: 0.1 }}
            className="w-full lg:w-7/12 pt-4"
          >
            {/* Large quote mark */}
            <div className="text-8xl font-black text-primary leading-none font-mono select-none mb-4" aria-hidden="true">
              &ldquo;
            </div>

            <div className="border-l-4 border-primary pl-6 mb-10">
              <p className="text-base md:text-lg text-foreground leading-relaxed font-normal">
                {about.about_deskripsi}
              </p>
            </div>

            {/* Brutalist bar divider */}
            <div className="flex items-center gap-2 mb-10">
              <div className="h-1 w-12 bg-primary" />
              <div className="h-1 w-4 bg-primary/40" />
              <div className="h-1 w-2 bg-primary/20" />
            </div>

            {/* Key facts grid */}
            <div className="grid grid-cols-2 gap-0 border-2 border-border">
              {[
                { label: 'Location', value: 'Makassar, ID' },
                { label: 'Status', value: 'Available for Work' },
                { label: 'Focus', value: 'Full Stack + Networks' },
                { label: 'University', value: about.about_univ?.split(' ').slice(0, 2).join(' ') || 'UMI' },
              ].map((fact, i) => (
                <div key={fact.label} className={`p-5 ${i % 2 === 1 ? 'border-l-2 border-border' : ''} ${i >= 2 ? 'border-t-2 border-border' : ''}`}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {fact.label}
                  </p>
                  <p className="font-black text-sm uppercase tracking-wide">{fact.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
