'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import type { Experience } from '@/types/experience';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { formatDate } from '@/lib/utils';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isCurrent = !experience.end_date;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const spotX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotY = useTransform(mouseY, [0, 1], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${spotX} ${spotY}, rgba(37, 99, 235, 0.08), transparent 80%)`;

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline Node â€” Square */}
      <div className="absolute left-0 md:left-1/2 top-0 -translate-x-[5px] md:-translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ delay: index * 0.15, duration: 0.4, type: "spring" }}
          className={`w-3 h-3 border-2 ${
            isCurrent
              ? 'bg-primary border-primary'
              : 'bg-background border-border'
          }`}
        >
          {isCurrent && (
            <div className="absolute inset-0 bg-primary animate-ping opacity-30" />
          )}
        </motion.div>
      </div>

      {/* Card */}
      <div className={`md:w-1/2 relative pb-12 ${index % 2 === 0 ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative"
        >
          {/* Left accent border (primary for current, subtle for past) */}
          <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-colors duration-300 ${
            isCurrent ? 'bg-primary' : 'bg-border group-hover:bg-primary/50'
          }`} />

          <div className="relative bg-card border border-border group-hover:border-border/80 transition-colors duration-300 overflow-hidden pl-6 pr-6 py-6">
            {/* Spotlight effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: spotlight }}
            />

            {/* Present Badge */}
            {isCurrent && (
              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/30">
                <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                <span className="text-[9px] font-bold text-primary uppercase tracking-wider font-mono">Present</span>
              </div>
            )}

            {/* Company */}
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Briefcase size={14} />
              <span className="font-mono text-xs tracking-wider uppercase font-medium opacity-80">
                {experience.company}
              </span>
            </div>

            {/* Role */}
            <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-primary transition-colors duration-200 tracking-tight">
              {experience.role}
            </h3>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-[10px] font-mono text-muted-foreground mb-5 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Calendar size={11} />
                <span>
                  {formatDate(experience.start_date)} â€” {experience.end_date ? formatDate(experience.end_date) : 'Now'}
                </span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>

            {/* Description mapped with lists */}
            <div className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 flex flex-col gap-2.5">
              {experience.description.split('\n').map((line, i) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null;
                
                // Cek apakah baris ini adalah list item / bullet point
                if (trimmedLine.match(/^[•\-*]\s*/)) {
                  return (
                    <div key={i} className="flex gap-2 items-start pl-1 opacity-90 hover:opacity-100 transition-opacity">
                      <span className="text-primary text-[8px] mt-[6px]">■</span>
                      <span>{trimmedLine.replace(/^[•\-*]\s*/, '')}</span>
                    </div>
                  );
                }
                
                // Paragraph biasa
                return <p key={i} className="mb-1">{trimmedLine}</p>;
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative large number */}
      <div className="absolute top-8 right-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        04
      </div>

      <div className="container mx-auto px-6" ref={containerRef}>
        <ScrollReveal>
          <div className="mb-20">
            <p className="section-label mb-6">Experience</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Career<br />
              <span className="text-primary">Journey.</span>
            </h2>
            <p className="text-muted-foreground text-base mt-4 max-w-xl">
              My professional milestones and industry experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border z-0" />
          <motion.div
            style={{ height, opacity }}
            className="absolute left-0 md:left-1/2 top-0 w-px bg-primary z-10"
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

