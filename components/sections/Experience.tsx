'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import type { Experience } from '@/types/experience';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { formatDate } from '@/lib/utils';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-4">Experience</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              My professional journey and career milestones
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

            {experiences.map((exp, index) => {
              const isCurrent = !exp.end_date;
              
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-2 ${
                    isCurrent 
                      ? 'bg-primary border-primary shadow-lg shadow-primary/50 animate-pulse-glow' 
                      : 'bg-surface border-accent'
                  }`} />

                  {/* Content Card */}
                  <div className={`glass rounded-xl p-6 border transition-all duration-300 ${
                    isCurrent 
                      ? 'border-primary/50 glow' 
                      : 'border-white/10 hover:border-primary/30'
                  }`}>
                    {/* Current Badge */}
                    {isCurrent && (
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4 border border-primary/30">
                        Current Position
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-foreground/60 mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                        </span>
                      </div>
                      
                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-foreground/70 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
