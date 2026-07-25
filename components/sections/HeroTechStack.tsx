import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SkillsByCategory, Skill } from '@/types/skill';

interface HeroTechStackProps {
  skills?: SkillsByCategory;
}

export default function HeroTechStack({ skills }: HeroTechStackProps) {
  // Flatten skills and get top ones
  const topSkills = useMemo(() => {
    if (!skills) return [];
    
    // Flatten all categories into a single array
    const allSkills: Skill[] = Object.values(skills).flat();
    
    // Sort by proficiency (highest first), take top 12
    const sorted = [...allSkills].sort((a, b) => b.proficiency - a.proficiency);
    
    return sorted.slice(0, 10);
  }, [skills]);

  if (!topSkills.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-10 lg:mt-12"
    >
      <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
        <div className="h-px w-8 bg-border" />
        <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-muted-foreground font-semibold">System Stack</span>
        <div className="h-px w-8 bg-border lg:hidden" />
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
        {topSkills.map((skill, i) => (
          <motion.div
            key={`${skill.name}-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.05 }}
            className="group relative flex items-center gap-2 px-3 py-1.5 border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300"
            title={skill.name}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 shadow-[0_0_12px_hsl(var(--primary)/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative w-3.5 h-3.5 overflow-hidden flex-shrink-0 group-hover:drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)] transition-all">
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                sizes="14px"
                className="object-contain"
              />
            </div>
            <span className="text-[11px] font-bold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors z-10 relative">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
