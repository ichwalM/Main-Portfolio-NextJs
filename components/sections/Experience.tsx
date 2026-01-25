'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react';
import type { Experience } from '@/types/experience';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { formatDate } from '@/lib/utils';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isCurrent = !experience.end_date;

  // 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), { stiffness: 150, damping: 20 });
  
  // Dynamic spotlight effect
  const spotX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotY = useTransform(mouseY, [0, 1], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgba(6, 182, 212, 0.15), transparent 80%)`;

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline Node - Desktop Center / Mobile Left */}
      <div className="absolute left-0 md:left-1/2 top-0 -translate-x-[5px] md:-translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
           initial={{ scale: 0, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
           className={`w-4 h-4 rounded-full border-2 ${
             isCurrent 
               ? 'bg-primary border-primary shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse' 
               : 'bg-black border-white/30 group-hover:border-primary/50'
           }`}
        >
            {isCurrent && <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />}
        </motion.div>
      </div>

      {/* Card Content - Staggered layout */}
      <div className={`md:w-1/2 relative pb-16 ${index % 2 === 0 ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
         <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY
            }}
            className="group relative"
         >
            {/* Glow / Border Gradient */}
            <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isCurrent ? 'via-primary/30 opacity-50' : ''}`} />
            
            <div className="relative rounded-2xl bg-[#0a0a0a]/90 border border-white/5 p-6 backdrop-blur-xl overflow-hidden group-hover:border-white/10 transition-colors duration-300">
               {/* Spotlight */}
               <motion.div 
                 className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: spotlight }}
               />

               {/* Current Badge */}
               {isCurrent && (
                 <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Present</span>
                 </div>
               )}

               <div style={{ transform: "translateZ(20px)" }}>
                 <div className="flex items-center gap-3 mb-2 text-primary">
                    <Briefcase size={18} />
                    <span className="font-bold tracking-wide text-sm opacity-80">{experience.company}</span>
                 </div>
                 
                 <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors duration-300">
                   {experience.role}
                 </h3>

                 <div className="flex flex-wrap gap-4 text-xs font-medium text-white/50 mb-6 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                       <Calendar size={14} />
                       <span>{formatDate(experience.start_date)} — {experience.end_date ? formatDate(experience.end_date) : 'Now'}</span>
                    </div>
                    {experience.location && (
                       <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          <span>{experience.location}</span>
                       </div>
                    )}
                 </div>

                 <p className="text-base text-gray-400 leading-relaxed font-light border-t border-white/5 pt-4">
                    {experience.description}
                 </p>
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
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6" ref={containerRef}>
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50">
                Career Journey
              </span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              My professional milestones and industry experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Central Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 z-0" />
          <motion.div 
            style={{ height, opacity }}
            className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
