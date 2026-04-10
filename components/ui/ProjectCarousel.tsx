'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  // All projects shown inline — no limit
  const displayProjects = projects;

  return (
    <div className="w-full py-16 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="section-label mb-6">Work</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
              Featured<br />
              <span className="text-primary">Work.</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              A selection of my best projects, crafted with precision and passion.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {displayProjects.map((project, idx) => {
            const thumbnail = project.thumbnail || '/placeholder-project.jpg';
            const techStack: string[] = project.tech_stack
              ? Array.isArray(project.tech_stack)
                ? project.tech_stack
                : String(project.tech_stack).split(',').map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className="group relative border border-border hover:border-primary/40 transition-all duration-300 bg-card overflow-hidden"
              >
                {/* Image */}
                <Link href={`/projects/${project.slug}`} className="block relative">
                  <div className="relative h-52 overflow-hidden bg-surface">
                    <Image
                      src={thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />

                    {/* Arrow on hover */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-background border border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-primary text-white">
                        <div className="w-1.5 h-1.5 bg-white animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.12em]">Featured</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-mono text-muted-foreground/40 font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors duration-200 mt-1">
                      {project.title}
                    </h3>
                  </Link>

                  <div className="h-px bg-border" />

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tag-outline">{tech}</span>
                      ))}
                      {techStack.length > 3 && (
                        <span className="tag-outline text-muted-foreground/40">+{techStack.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
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
                        className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                    <Link href={`/projects/${project.slug}`} className="ml-auto">
                      <motion.div
                        whileHover={{ x: 2 }}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-bold tracking-wide hover:bg-primary/90 transition-colors"
                      >
                        Details
                        <ArrowUpRight className="w-3 h-3" />
                      </motion.div>
                    </Link>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

