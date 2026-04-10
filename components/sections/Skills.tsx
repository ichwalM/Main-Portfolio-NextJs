'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import type { SkillsByCategory } from '@/types/skill';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ConnectedSkills from '@/components/ui/ConnectedSkills';

interface SkillsProps {
  skills: SkillsByCategory;
}

export default function Skills({ skills }: SkillsProps) {
  const categories = Object.keys(skills);
  const displayCategories = ['All Skills', ...categories];
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]);

  const activeSkills = skills[activeCategory] || [];
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative large number */}
      <div className="absolute top-8 left-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        03
      </div>

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16">
            <p className="section-label mb-6">Expertise</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
              Skills <span className="text-primary">&</span><br />Expertise.
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mt-4">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs — Sharp style */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-16 border-b border-border pb-4">
            {displayCategories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-2.5 font-bold text-xs tracking-[0.1em] uppercase transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30'
                }`}
              >
                {category}
                {/* Active indicator underline */}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dynamic Content */}
        <div className="min-h-[500px]">
          {activeCategory === 'All Skills' ? (
            <motion.div
              key="graph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ConnectedSkills skills={allSkills} />
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl"
            >
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={staggerItem}
                  className="group relative border border-border hover:border-primary/40 transition-all duration-300 bg-card"
                >
                  <div className="p-6">
                    {/* Skill name and icon */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 overflow-hidden bg-surface border border-border flex items-center justify-center">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain p-1.5"
                          />
                        </div>
                        <h3 className="text-base font-bold group-hover:text-primary transition-colors duration-200">
                          {skill.name}
                        </h3>
                      </div>
                      <motion.span
                        className="text-2xl font-black text-primary font-mono"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {skill.proficiency}%
                      </motion.span>
                    </div>

                    {/* Progress bar — sharp */}
                    <div className="relative h-0.5 bg-border overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>

                    {/* Skill level */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-1.5 h-1.5 ${
                              i < Math.ceil(skill.proficiency / 20)
                                ? 'bg-primary'
                                : 'bg-border'
                            }`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 + i * 0.04 }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                        {skill.proficiency >= 90
                          ? 'Expert'
                          : skill.proficiency >= 70
                          ? 'Advanced'
                          : skill.proficiency >= 50
                          ? 'Intermediate'
                          : 'Beginner'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Left accent border on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
