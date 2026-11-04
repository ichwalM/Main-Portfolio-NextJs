'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Eye,
  Github,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import type { Project } from '@/types/project';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ProjectCarouselProps {
  projects: Project[];
}

function getTechStack(project: Project): string[] {
  if (!project.tech_stack) return [];
  if (Array.isArray(project.tech_stack)) return project.tech_stack;
  return String(project.tech_stack)
    .split(',')
    .map((tech) => tech.trim())
    .filter(Boolean);
}

export const ProjectCarousel = memo(function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute dynamic category filter pills
  const categories = useMemo(() => {
    const cats = [{ id: 'all', label: `All Projects (${projects.length})` }];
    const hasFeatured = projects.some((p) => p.featured);
    if (hasFeatured) {
      cats.push({
        id: 'featured',
        label: `Featured (${projects.filter((p) => p.featured).length})`,
      });
    }

    const hasLaravel = projects.some((p) =>
      getTechStack(p).some((t) => t.toLowerCase().includes('laravel') || t.toLowerCase().includes('php'))
    );
    if (hasLaravel) cats.push({ id: 'laravel', label: 'Laravel & PHP' });

    const hasReactNext = projects.some((p) =>
      getTechStack(p).some((t) => t.toLowerCase().includes('next') || t.toLowerCase().includes('react'))
    );
    if (hasReactNext) cats.push({ id: 'react-next', label: 'Next.js & React' });

    const hasDevOps = projects.some((p) =>
      getTechStack(p).some(
        (t) =>
          t.toLowerCase().includes('docker') ||
          t.toLowerCase().includes('cloud') ||
          t.toLowerCase().includes('linux') ||
          t.toLowerCase().includes('nginx')
      )
    );
    if (hasDevOps) cats.push({ id: 'devops', label: 'DevOps & Systems' });

    return cats;
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    if (selectedCategory === 'featured') return projects.filter((p) => p.featured);
    if (selectedCategory === 'laravel') {
      return projects.filter((p) =>
        getTechStack(p).some((t) => t.toLowerCase().includes('laravel') || t.toLowerCase().includes('php'))
      );
    }
    if (selectedCategory === 'react-next') {
      return projects.filter((p) =>
        getTechStack(p).some((t) => t.toLowerCase().includes('next') || t.toLowerCase().includes('react'))
      );
    }
    if (selectedCategory === 'devops') {
      return projects.filter((p) =>
        getTechStack(p).some(
          (t) =>
            t.toLowerCase().includes('docker') ||
            t.toLowerCase().includes('cloud') ||
            t.toLowerCase().includes('linux') ||
            t.toLowerCase().includes('nginx')
        )
      );
    }
    return projects;
  }, [projects, selectedCategory]);

  // Quick-view modal navigation
  const currentIndex = previewProject
    ? filteredProjects.findIndex((p) => p.id === previewProject.id)
    : -1;

  const navigatePreview = useCallback(
    (direction: 1 | -1) => {
      if (currentIndex === -1 || !filteredProjects.length) return;
      const nextIndex =
        (currentIndex + direction + filteredProjects.length) % filteredProjects.length;
      setPreviewProject(filteredProjects[nextIndex]);
    },
    [currentIndex, filteredProjects]
  );

  // Keyboard navigation & scroll locking for preview modal
  useEffect(() => {
    if (!previewProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewProject(null);
      if (e.key === 'ArrowLeft') navigatePreview(-1);
      if (e.key === 'ArrowRight') navigatePreview(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewProject, navigatePreview]);

  return (
    <div className="container mx-auto px-6">
      {/* Section Header */}
      <ScrollReveal>
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Selected Works &amp; Systems Architecture
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Featured Projects.
              </h2>
              <p className="text-muted-foreground text-base mt-2 max-w-2xl leading-relaxed">
                Production-grade web platforms, automated DevOps pipelines, and scalable cloud architectures.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/80 hover:border-primary text-foreground text-xs font-bold uppercase tracking-wider hover:text-primary transition-all shadow-sm hover:shadow-md shrink-0"
            >
              <span>Explore All Projects ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Pills with Soft Modern Corners */}
      <ScrollReveal>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 [scrollbar-width:none]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'bg-card border border-border/80 hover:border-primary/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Projects Grid: Fluid, Non-Stiff Layout with Landscape Mockups Showing In Full */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => {
          const techStack = getTechStack(project);
          const thumbnail = project.thumbnail || '/placeholder-project.jpg';

          return (
            <ScrollReveal key={project.id}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col h-full bg-card rounded-2xl border border-border/80 hover:border-primary/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
              >
                {/* Landscape Mockup Window: Shows the entire 16:10 screenshot */}
                <div
                  onClick={() => setPreviewProject(project)}
                  className="relative aspect-[16/10] w-full bg-muted/30 p-2 sm:p-2.5 cursor-pointer border-b border-border/60 overflow-hidden flex flex-col"
                >
                  {/* Subtle Application Frame Header */}
                  <div className="flex items-center justify-between px-2 py-1.5 mb-1.5 bg-background/50 rounded-t-lg border border-border/40 backdrop-blur-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-border" />
                      <span className="w-2 h-2 rounded-full bg-border" />
                      <span className="w-2 h-2 rounded-full bg-border" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[140px]">
                      {project.slug}.walldev.app
                    </span>
                    <span className="w-4" />
                  </div>

                  {/* Complete Landscape Image Container */}
                  <div className="relative flex-1 w-full rounded-md overflow-hidden bg-background">
                    <Image
                      src={thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-4 h-4" /> Quick Preview
                      </span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-30">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider shadow-md">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Card Body with Natural Spacing */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tech Stack Chips */}
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
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

                    {/* Project Title */}
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug mb-2.5">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description || 'Modern full-stack application built with scalable architecture and clean code.'}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewProject(project)}
                        className="px-3.5 py-2 rounded-lg bg-muted/70 hover:bg-muted text-foreground border border-border/80 text-xs font-bold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                        aria-label={`Preview ${project.title}`}
                      >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span>Preview</span>
                      </button>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="px-3.5 py-2 rounded-lg bg-card hover:bg-muted/50 text-foreground border border-border/80 text-xs font-bold tracking-wide flex items-center gap-1 transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </Link>
                    </div>

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
                          aria-label={`Visit live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Interactive Quick-View Modal (Portal with Grand Landscape Presentation) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {previewProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-background/85 backdrop-blur-md overflow-y-auto"
                onClick={() => setPreviewProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl bg-card rounded-2xl border border-border/80 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
                  role="dialog"
                  aria-modal="true"
                  aria-label={previewProject.title}
                >
                  {/* Modal Header */}
                  <div className="px-6 py-4 border-b border-border/80 bg-card flex items-center justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                        PROJECT PREVIEW [{currentIndex + 1} / {filteredProjects.length}]
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigatePreview(-1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        aria-label="Previous project"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigatePreview(1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        aria-label="Next project"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewProject(null)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer ml-1"
                        aria-label="Close preview"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body: Grand Landscape Showcase Showing Full Image */}
                  <div className="overflow-y-auto flex-1">
                    {/* Full Landscape Artwork Container */}
                    <div className="relative aspect-[16/10] w-full bg-muted/40 p-4 sm:p-6 border-b border-border/80 flex items-center justify-center">
                      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md bg-background border border-border/60">
                        <Image
                          src={previewProject.thumbnail || '/placeholder-project.jpg'}
                          alt={previewProject.title}
                          fill
                          className="object-contain object-top"
                          priority
                        />
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          {previewProject.featured && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider mb-2.5 shadow-sm">
                              <Sparkles className="w-3 h-3" />
                              Featured Case Study
                            </div>
                          )}
                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                            {previewProject.title}
                          </h3>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          {previewProject.demo_url && (
                            <a
                              href={previewProject.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {previewProject.github_url && (
                            <a
                              href={previewProject.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-card border border-border hover:border-primary text-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Source Code</span>
                            </a>
                          )}
                          <Link
                            href={`/projects/${previewProject.slug}`}
                            className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <span>Read Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                        {previewProject.description || 'Full-stack engineering implementation featuring resilient design and modern technology stack.'}
                      </p>

                      {/* Tech Stack Chips */}
                      <div>
                        <p className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                          Technologies &amp; Architecture:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {getTechStack(previewProject).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-muted text-xs font-semibold text-foreground border border-border/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
});

export default ProjectCarousel;
