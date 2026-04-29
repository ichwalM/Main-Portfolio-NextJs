'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Skill } from '@/types/skill';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';

interface ConnectedSkillsProps {
  skills: Skill[];
}

export default function AllSkillsGrid({ skills }: ConnectedSkillsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={staggerItem}
          className="group border border-border hover:border-primary/40 bg-card transition-all duration-200 p-4 flex flex-col items-center gap-3 relative"
        >
          {/* Icon */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={skill.icon}
              alt={skill.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Name */}
          <span className="text-xs font-bold text-center leading-tight group-hover:text-primary transition-colors">
            {skill.name}
          </span>

          {/* Proficiency thin bar */}
          <div className="w-full h-px bg-border relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Percentage */}
          <span className="text-[10px] font-mono text-muted-foreground/60">
            {skill.proficiency}%
          </span>

          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </motion.div>
      ))}
    </motion.div>
  );
}

