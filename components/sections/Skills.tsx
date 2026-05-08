'use client';

import { motion, type Variants } from 'framer-motion';
import { useState, memo } from 'react';
import Image from 'next/image';
import type { SkillsByCategory } from '@/types/skill';
import BrutalistSectionHeader from '@/components/brutalist/BrutalistSectionHeader';
import ConnectedSkills from '@/components/ui/ConnectedSkills';

interface SkillsProps {
  skills: SkillsByCategory;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 } as any,
  },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'linear' as const } },
};

const SkillCard = memo(function SkillCard({ skill, index }: { skill: any; index: number }) {
  const level =
    skill.proficiency >= 90
      ? 'Expert'
      : skill.proficiency >= 70
      ? 'Advanced'
      : skill.proficiency >= 50
      ? 'Intermediate'
      : 'Beginner';

  return (
    <motion.div
      variants={staggerItem}
      className="group relative border-2 border-border hover:border-primary bg-card transition-none"
    >
      {/* Top color bar */}
      <div className="h-1 w-full bg-border group-hover:bg-primary transition-none" />

      <div className="p-5">
        {/* Header row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 overflow-hidden border-2 border-border bg-surface flex items-center justify-center group-hover:border-primary transition-none">
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                loading="lazy"
                sizes="32px"
                className="object-contain p-1"
              />
            </div>
            <span className="font-black text-sm uppercase tracking-tight">
              {skill.name}
            </span>
          </div>
          <span className="font-mono font-black text-lg text-primary leading-none">
            {skill.proficiency}
          </span>
        </div>

        {/* Progress bar — brutalist style */}
        <div className="relative h-2 bg-border overflow-hidden mb-3">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.04, ease: 'linear' }}
          />
          {/* Tick marks */}
          {[25, 50, 75].map((tick) => (
            <div
              key={tick}
              className="absolute top-0 bottom-0 w-px bg-background/50"
              style={{ left: `${tick}%` }}
            />
          ))}
        </div>

        {/* Level tag */}
        <span className="inline-block font-mono text-[9px] font-black uppercase tracking-[0.2em] border border-border px-2 py-0.5 text-muted-foreground">
          {level}
        </span>
      </div>
    </motion.div>
  );
});

const Skills = memo(function Skills({ skills }: SkillsProps) {
  const categories = Object.keys(skills);
  const displayCategories = ['All Skills', ...categories];
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]);

  const activeSkills = skills[activeCategory] || [];
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden border-t-4 border-border">
      {/* Watermark */}
      <div className="absolute top-0 left-0 text-[16vw] font-black text-foreground/[0.03] leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
        03
      </div>

      <div className="container mx-auto px-6">

        <BrutalistSectionHeader
          number="03"
          label="Expertise"
          title="Skills &"
          accentTitle="Expertise."
          subtitle="Technologies and tools I work with to build scalable solutions."
        />

        {/* Category Tabs — brutalist style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: 'linear' }}
          className="flex flex-wrap gap-0 mb-16 border-2 border-border w-fit"
        >
          {displayCategories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-3 font-mono font-black text-[10px] tracking-[0.15em] uppercase transition-none ${
                index > 0 ? 'border-l-2 border-border' : ''
              } ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-foreground hover:text-background'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Dynamic content */}
        <div className="min-h-[500px] w-full">
          {activeCategory === 'All Skills' ? (
            <motion.div
              key="graph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ConnectedSkills skills={allSkills} />
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-2 border-border"
            >
              {activeSkills.map((skill, index) => (
                <div key={skill.name} className={`border-r-0 border-b-0 ${index % 4 !== 3 ? 'border-r-2 border-border' : ''} ${index < activeSkills.length - (activeSkills.length % 4 || 4) ? 'border-b-2 border-border' : ''}`}>
                  <SkillCard skill={skill} index={index} />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Skills;
