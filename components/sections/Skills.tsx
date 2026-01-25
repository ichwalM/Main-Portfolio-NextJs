'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import type { SkillsByCategory } from '@/types/skill';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface SkillsProps {
  skills: SkillsByCategory;
}

export default function Skills({ skills }: SkillsProps) {
  const categories = Object.keys(skills);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Backend');

  const activeSkills = skills[activeCategory] || [];

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-2 rounded-full glass border border-primary/30 mb-6"
            >
              <span className="text-primary font-semibold text-sm">EXPERTISE</span>
            </motion.div>
            
            <h2 className="text-6xl font-black mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-foreground/60 text-xl max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs with enhanced design */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
                  activeCategory === category
                    ? 'text-white'
                    : 'text-foreground/60 hover:text-foreground glass border border-white/10'
                }`}
              >
                {/* Active background */}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10">{category}</span>
                
                {/* Shimmer effect on active */}
                {activeCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid with advanced animations */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
              
              <div className="relative glass rounded-2xl p-8 border border-white/10 group-hover:border-primary/30 transition-all duration-300 backdrop-blur-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                
                <div className="relative z-10">
                  {/* Skill name and icon */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 p-1.5 border border-white/10 group-hover:border-primary/30 transition-colors">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    <motion.span
                      className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.proficiency}%
                    </motion.span>
                  </div>

                  {/* Progress bar container */}
                  <div className="relative h-3 bg-surface/50 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
                    
                    {/* Animated progress bar */}
                    <motion.div
                      className="relative h-full rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Gradient fill */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]" />
                      
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'linear',
                        }}
                      />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 blur-sm" />
                    </motion.div>

                    {/* Particles on progress bar */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white"
                        initial={{ left: '0%', opacity: 0 }}
                        animate={{
                          left: `${skill.proficiency}%`,
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1 + i * 0.3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Skill level indicator */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.ceil(skill.proficiency / 20)
                              ? 'bg-gradient-to-r from-primary to-accent'
                              : 'bg-surface'
                          }`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-foreground/50 font-medium">
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
