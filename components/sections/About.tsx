'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap, Award } from 'lucide-react';
import type { About } from '@/types/about';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { memo } from 'react';

interface AboutSectionProps {
  about: About | null;
}

const AboutSection = memo(function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null;

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20">

            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 relative flex-shrink-0">
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-foreground/20 dark:border-border group bg-card">
                <Image
                  src={about.about_photo || '/placeholder-about.jpg'}
                  alt="About Ichwal"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Scrim overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Stats bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-card/95 border-t border-border flex justify-between items-center z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary border border-primary/20">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Education</p>
                      <p className="text-sm font-bold text-foreground leading-tight">{about.about_univ}</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary border border-primary/20">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">GPA</p>
                      <p className="text-2xl font-black text-foreground leading-tight">{about.GPA}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-7/12 pt-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                  Engineering Background.
                </h2>

                <div className="relative pl-6 border-l-4 border-primary">
                  <div className="text-base md:text-lg text-foreground/85 leading-relaxed font-normal mb-8 pt-1 text-justify space-y-5">
                    {about.about_deskripsi.split('\n').map((paragraph, index) => (
                      paragraph.trim() ? (
                        <p key={index}>{paragraph}</p>
                      ) : null
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <span>Full-Stack Development</span>
                    <span>·</span>
                    <span>Ubuntu Server</span>
                    <span>·</span>
                    <span>Cisco Networking</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default AboutSection;
