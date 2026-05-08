'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, memo } from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import type { Experience } from '@/types/experience';
import BrutalistSectionHeader from '@/components/brutalist/BrutalistSectionHeader';
import { formatDate } from '@/lib/utils';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } as any },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'linear' as const } },
};

const ExperienceCard = memo(function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const isCurrent = !experience.end_date;

  return (
    <motion.div variants={fadeUp} className="relative group">
      {/* Brutalist card — thick border left accent */}
      <div className={`border-2 border-border group-hover:border-foreground bg-card transition-none relative overflow-hidden`}>
        {/* Top accent bar */}
        <div className={`h-1 w-full ${isCurrent ? 'bg-primary' : 'bg-border group-hover:bg-foreground transition-none'}`} />

        {/* Index number watermark */}
        <div className="absolute right-4 top-4 font-mono font-black text-5xl text-foreground/5 leading-none select-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="p-6 md:p-8 relative z-10">
          {/* Company + Present badge */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2 border border-primary px-3 py-1">
              <Briefcase size={12} className="text-primary" />
              <span className="font-mono text-[10px] font-black tracking-[0.2em] uppercase text-primary">
                {experience.company}
              </span>
            </div>
            {isCurrent && (
              <div className="flex items-center gap-1.5 bg-primary px-3 py-1">
                <span className="w-1.5 h-1.5 bg-primary-foreground animate-pulse" />
                <span className="text-[9px] font-black text-primary-foreground uppercase tracking-[0.2em] font-mono">Now</span>
              </div>
            )}
          </div>

          {/* Role */}
          <h3 className="text-xl md:text-2xl font-black text-foreground mb-4 tracking-tight uppercase">
            {experience.role}
          </h3>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-0 mb-5 border border-border overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-r border-border">
              <Calendar size={10} className="text-muted-foreground" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {formatDate(experience.start_date)} — {experience.end_date ? formatDate(experience.end_date) : 'Now'}
              </span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-1.5 px-3 py-2">
                <MapPin size={10} className="text-muted-foreground" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {experience.location}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="text-sm text-muted-foreground leading-relaxed border-l-4 border-border group-hover:border-primary transition-none pl-4 flex flex-col gap-2">
            {experience.description.split('\n').map((line, i) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;
              if (trimmedLine.match(/^[•\-*]\s*/)) {
                return (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-primary font-black leading-relaxed">■</span>
                    <span>{trimmedLine.replace(/^[•\-*]\s*/, '')}</span>
                  </div>
                );
              }
              return <p key={i}>{trimmedLine}</p>;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ExperienceTimeline = memo(function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden border-t-4 border-border">
      {/* Watermark */}
      <div className="absolute top-0 right-0 text-[16vw] font-black text-foreground/[0.03] leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
        04
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <BrutalistSectionHeader
          number="04"
          label="Experience"
          title="Career"
          accentTitle="Journey."
          subtitle="My professional milestones and industry experience."
        />

        {/* Two-column layout with timeline spine */}
        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
          <motion.div
            style={{ height }}
            className="absolute left-4 top-0 w-0.5 bg-primary hidden md:block"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 gap-0 md:pl-12"
          >
            {experiences.map((exp, index) => (
              <div key={index} className={index > 0 ? 'border-t-2 border-border' : ''}>
                <ExperienceCard experience={exp} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default ExperienceTimeline;
