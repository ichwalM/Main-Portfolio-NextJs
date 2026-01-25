'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { useState, useRef, MouseEvent } from 'react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  if (!project) return null; // Safety check
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });

  // Handle tech_stack
  const techStack: string[] = project.tech_stack
    ? Array.isArray(project.tech_stack) 
      ? project.tech_stack 
      : typeof project.tech_stack === 'string'
      ? project.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean)
      : []
    : [];

  const thumbnail = project.thumbnail || '/placeholder-project.jpg';
  const description = project.description || 'No description available';

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full"
    >
      {/* Glow effect background */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3))',
        }}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />

      <div className="relative h-full overflow-hidden rounded-3xl glass border border-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-xl">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient" />
        </div>

        {/* Image Section */}
        <Link href={`/projects/${project.slug}`} className="block relative">
          <div className="relative h-72 overflow-hidden bg-surface/50">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={isHovered ? { x: ['-100%', '100%'] } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            
            <motion.div
              className="w-full h-full relative"
              animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Featured Badge with glow */}
            {project.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 right-6 px-4 py-2 rounded-full glass border border-primary/50 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span className="text-xs font-bold text-primary">Featured</span>
                </div>
              </motion.div>
            )}

            {/* Floating particles effect */}
            {isHovered && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/50"
                    initial={{ x: '50%', y: '50%', opacity: 0 }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="relative p-8 space-y-6" style={{ transform: 'translateZ(20px)' }}>
          {/* Title with gradient on hover */}
          <Link href={`/projects/${project.slug}`}>
            <motion.h3 
              className="text-3xl font-bold cursor-pointer relative inline-block"
              whileHover={{ x: 4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground group-hover:from-primary group-hover:via-accent group-hover:to-primary transition-all duration-500">
                {project.title}
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.h3>
          </Link>
          
          {/* Description */}
          <p className="text-foreground/70 leading-relaxed line-clamp-2 text-base">
            {description}
          </p>

          {/* Tech Stack with stagger animation */}
          {techStack.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {techStack.slice(0, 4).map((tech: string, i: number) => (
                <motion.span
                  key={`${project.id}-tech-${i}`}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-surface to-surface/50 text-xs font-semibold border border-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
              {techStack.length > 4 && (
                <span className="px-4 py-2 rounded-full bg-surface/50 text-xs font-semibold text-foreground/50">
                  +{techStack.length - 4}
                </span>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-primary/50 text-sm font-medium transition-all duration-300 group/btn"
              >
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                <span>Code</span>
              </motion.a>
            )}
            
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-accent/50 text-sm font-medium transition-all duration-300 group/btn"
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                <span>Demo</span>
              </motion.a>
            )}
            
            <Link 
              href={`/projects/${project.slug}`}
              className="ml-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group/btn"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
