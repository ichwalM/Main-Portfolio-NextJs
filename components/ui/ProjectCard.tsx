'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  if (!project) return null;

  const techStack: string[] = project.tech_stack
    ? Array.isArray(project.tech_stack)
      ? project.tech_stack
      : typeof project.tech_stack === 'string'
      ? project.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean)
      : []
    : [];

  const thumbnail = project.thumbnail || '/placeholder-project.jpg';
  const description = project.description || 'No description available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'linear' }}
      className="group relative h-full border-2 border-border hover:border-foreground bg-card transition-none flex flex-col"
    >
      {/* Top accent bar */}
      <div className="h-1 bg-border group-hover:bg-primary transition-none" />

      {/* Image */}
      <Link href={`/projects/${project.slug}`} className="block relative">
        <div className="relative h-52 overflow-hidden bg-surface border-b-2 border-border">
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-none"
            unoptimized
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/40 group-hover:bg-primary/10 transition-none" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground flex items-center gap-1.5 px-2.5 py-1">
              <span className="w-1.5 h-1.5 bg-primary-foreground animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] font-mono">Featured</span>
            </div>
          )}

          {/* Arrow on hover */}
          <div className="absolute top-3 left-3 w-9 h-9 bg-background border-2 border-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-none">
            <ArrowUpRight className="w-4 h-4" />
          </div>

          {/* Index number */}
          <div className="absolute bottom-3 right-3 font-mono font-black text-4xl text-background/10 leading-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-black tracking-tight uppercase group-hover:text-primary transition-none leading-tight">
            {project.title}
          </h3>
        </Link>

        <div className="h-0.5 bg-border" />

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tech stack */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[9px] font-bold uppercase tracking-wider border border-border px-2 py-0.5 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider border border-border px-2 py-0.5 text-muted-foreground">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-0 border-t-2 border-border pt-3 mt-auto">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-border px-3 py-2 transition-none"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-border px-3 py-2 border-l border-border transition-none"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}
          <Link href={`/projects/${project.slug}`} className="ml-auto">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-[10px] font-black tracking-wider uppercase font-mono hover:bg-foreground transition-none border-l border-border">
              Details
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
