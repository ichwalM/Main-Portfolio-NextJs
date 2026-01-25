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
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Left Column: Image & Stats */}
            <div className="w-full md:w-5/12 relative">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 group">
                {/* Image */}
                <Image
                  src={about.about_photo || '/placeholder-about.jpg'}
                  alt="About Profile"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  unoptimized
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Floating Glass Stats Card */}
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5, duration: 0.5 }}
                   className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border border-white/20 backdrop-blur-xl flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 rounded-lg bg-primary/20 text-primary">
                       <GraduationCap size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Education</p>
                       <p className="text-sm font-bold text-white leading-tight">{about.about_univ}</p>
                     </div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 rounded-lg bg-accent/20 text-accent">
                       <Award size={24} />
                     </div>
                     <div>
                       <p className="text-xs text-white/50 uppercase tracking-wider font-medium">GPA</p>
                       <p className="text-xl font-black text-white leading-tight">{about.GPA}</p>
                     </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border border-primary/20 rounded-full animate-spin-slow pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-accent/20 rounded-full animate-spin-reverse-slow pointer-events-none" />
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-7/12">
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
               >
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Me.</span>
                  </h2>

                  <div className="relative pl-8 border-l-2 border-white/10">
                    <Quote className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-primary bg-background p-1" size={32} />
                    
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-8">
                      {about.about_deskripsi}
                    </p>
                    
                    {/* Additional stylistic elements or signature could go here */}
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                       <div className="w-2 h-2 rounded-full bg-primary/50" />
                       <div className="w-2 h-2 rounded-full bg-primary/20" />
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
