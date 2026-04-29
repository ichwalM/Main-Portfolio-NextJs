'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap, Award, Quote } from 'lucide-react';
import type { About } from '@/types/about';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface AboutSectionProps {
  about: About | null;
}

export default function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null;

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative large number */}
      <div className="absolute top-8 right-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        02
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">

            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 relative flex-shrink-0">

              {/* Corner bracket decorations */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary z-20" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary z-20" />

              <div className="relative aspect-[4/5] overflow-hidden border border-border group">
                {/* Image */}
                <Image
                  src={about.about_photo || '/placeholder-about.jpg'}
                  alt="About Profile"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Stats bar at bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-5 bg-background/95 border-t border-border flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary border border-primary/20">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">Education</p>
                      <p className="text-sm font-bold text-foreground leading-tight">{about.about_univ}</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary border border-primary/20">
                      <Award size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">GPA</p>
                      <p className="text-2xl font-black text-foreground leading-tight">{about.GPA}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-7/12 pt-4">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
              >
                {/* Section label */}
                <p className="section-label mb-6">About Me</p>

                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">
                  About<br />
                  <span className="text-primary">Me.</span>
                </h2>

                {/* Quote content */}
                <div className="relative pl-6 border-l-2 border-primary">
                  {/* Quotation mark */}
                  <div className="absolute -top-4 -left-4 text-5xl font-black text-primary leading-none font-mono select-none">
                    "
                  </div>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-normal mb-8 pt-2 text-justify">
                    {about.about_deskripsi}
                  </p>

                  {/* Decorative dots â€” sharp squares */}
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary" />
                    <div className="w-2 h-2 bg-primary/50" />
                    <div className="w-2 h-2 bg-primary/20" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

