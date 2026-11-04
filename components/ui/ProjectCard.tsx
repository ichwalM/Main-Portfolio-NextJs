'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import type { Project } from '@/types/project';
import { useState, useRef, MouseEvent } from 'react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  if (!project) return null;
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt for organic tactile feedback
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), { stiffness: 300, damping: 30 });

  const techStack: string[] = project.tech_stack
    ? Array.isArray(project.tech_stack)
      ? project.tech_stack
      : typeof project.tech_stack === 'string'
      ? project.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean)
      : []
    : [];

  const thumbnail = project.thumbnail || '/placeholder-project.jpg';
  const description = project.description || 'Full-stack engineering implementation featuring resilient design and modern technology stack.';

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative h-full flex flex-col"
    >
      <div className="relative h-full flex flex-col rounded-2xl border border-border/80 hover:border-primary/60 transition-all duration-300 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5">

        {/* Landscape Mockup Window: Complete 16:10 format without vertical clipping */}
        <Link href={`/projects/${project.slug}`} className="block relative">
          <div className="relative aspect-[16/10] w-full bg-muted/30 p-2 sm:p-2.5 border-b border-border/60 overflow-hidden flex flex-col">
            {/* Window chrome header */}
            <div className="flex items-center justify-between px-2 py-1 mb-1.5 bg-background/50 rounded-t-lg border border-border/40 backdrop-blur-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="w-2 h-2 rounded-full bg-border" />
                <span className="w-2 h-2 rounded-full bg-border" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[130px]">
                {project.slug}.walldev.app
              </span>
              <span className="w-3" />
            </div>

            {/* Complete Image Container */}
            <div className="relative flex-1 w-full rounded-md overflow-hidden bg-background">
              <Image
                src={thumbnail}
                alt={project.title}
                fill
                className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* View Overlay on Hover */}
              <div className="absolute inset-0 bg-background/50 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 z-30">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4" style={{ transform: 'translateZ(8px)' }}>
          <div>
            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {techStack.slice(0, 4).map((tech: string, i: number) => (
                  <span
                    key={`${project.id}-tech-${i}`}
                    className="px-2.5 py-0.5 rounded-md bg-muted text-[11px] font-semibold text-foreground/85 border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
                {techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-muted-foreground bg-muted/40">
                    +{techStack.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <Link href={`/projects/${project.slug}`}>
              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                {project.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mt-2">
              {description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card hover:bg-muted text-foreground border border-border/80 text-xs font-bold tracking-wide transition-colors"
            >
              <span>Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>

            <div className="flex items-center gap-1.5">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-border/80 bg-card text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-border/80 bg-card text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={`Live demo for ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
