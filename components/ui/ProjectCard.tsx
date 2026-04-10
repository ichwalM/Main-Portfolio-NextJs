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
  if (!project) return null;
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 });

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
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative h-full"
    >
      <div className="relative h-full border border-border hover:border-primary/50 transition-all duration-300 bg-card overflow-hidden">

        {/* Image Section */}
        <Link href={`/projects/${project.slug}`} className="block relative">
          <div className="relative h-56 overflow-hidden bg-surface">
            <motion.div
              className="w-full h-full relative"
              animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent opacity-90" />
            
            {/* Blue overlay on hover */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Featured badge â€” sharp */}
            {project.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-primary text-white">
                <div className="w-1.5 h-1.5 bg-white animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.12em]">Featured</span>
              </div>
            )}

            {/* Arrow icon on hover */}
            <motion.div
              className="absolute top-4 left-4 w-8 h-8 bg-background border border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={isHovered ? { scale: 1 } : { scale: 0.8 }}
            >
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6 space-y-4" style={{ transform: 'translateZ(10px)' }}>
          {/* Index number */}
          <span className="text-xs font-mono text-muted-foreground/40 font-semibold">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-xl font-black tracking-tight cursor-pointer group-hover:text-primary transition-colors duration-200 mt-1">
              {project.title}
            </h3>
          </Link>

          {/* Thin separator */}
          <div className="h-px bg-border" />

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Tech Stack â€” sharp tags */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {techStack.slice(0, 4).map((tech: string, i: number) => (
                <span
                  key={`${project.id}-tech-${i}`}
                  className="tag-outline"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="tag-outline text-muted-foreground/50">
                  +{techStack.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group/btn"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </motion.a>
            )}

            {project.demo_url && (
              <motion.a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </motion.a>
            )}

            <Link href={`/projects/${project.slug}`} className="ml-auto">
              <motion.div
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wide hover:bg-primary/90 transition-colors"
              >
                View Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Bottom accent line â€” grows on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </motion.div>
  );
}

