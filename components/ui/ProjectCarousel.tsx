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

  // Compute categories based on available projects
  const categories = useMemo(() => {
    const cats = [{ id: 'all', label: `All Projects (${projects.length})` }];
    const hasFeatured = projects.some((p) => p.featured);
    if (hasFeatured) {
      cats.push({
        id: 'featured',
        label: `Featured (${projects.filter((p) => p.featured).length})`,
      });
    }

    // Common stack categories
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
                <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Selected Work &amp; Architecture
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Engineered Projects.
              </h2>
              <p className="text-muted-foreground text-base mt-2 max-w-2xl leading-relaxed">
                Full-stack web applications, DevOps pipelines, and resilient cloud systems built with modern engineering standards.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border-2 border-border hover:border-primary text-foreground text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors shrink-0"
            >
              <span>View Full Archive ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <ScrollReveal>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 [scrollbar-width:none]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                    : 'bg-card border-border hover:border-primary/60 text-foreground'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Projects Grid: Display ALL Projects with High-Taste Technical Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => {
          const techStack = getTechStack(project);
          const thumbnail = project.thumbnail || '/placeholder-project.jpg';

          return (
            <ScrollReveal key={project.id}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col h-full bg-card border-2 border-border hover:border-primary transition-colors overflow-hidden"
              >
                {/* Artwork / Screenshot */}
                <div
                  onClick={() => setPreviewProject(project)}
                  className="relative h-56 sm:h-60 w-full overflow-hidden bg-muted cursor-pointer"
                >
                  <div className="absolute inset-0 paper-grid opacity-60 z-0" aria-hidden="true" />
                  <Image
                    src={thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="relative z-10 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 bg-card/90 backdrop-blur-xs border border-border text-[10px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3 text-primary" /> Quick View
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tech Stack Chips */}
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-muted text-[11px] font-semibold text-foreground/90 border border-border/40"
                          >
                            {tech}
                          </span>
                        ))}
                        {techStack.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                            +{techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description || 'Modern engineering project built with scalable architecture and clean code.'}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewProject(project)}
                        className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                        aria-label={`Preview ${project.title}`}
                      >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span>Preview</span>
                      </button>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="px-3 py-1.5 bg-card hover:bg-muted text-foreground border border-border text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary transition-colors"
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
                          className="w-8 h-8 flex items-center justify-center border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary transition-colors"
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

      {/* Interactive Quick-View Modal (Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {previewProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md overflow-y-auto"
                onClick={() => setPreviewProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl bg-card border-2 border-border shadow-2xl overflow-hidden my-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label={previewProject.title}
                >
                  {/* Modal Top Header */}
                  <div className="px-5 sm:px-7 py-4 border-b border-border bg-card/90 flex items-center justify-between gap-4">
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
                        className="w-8 h-8 flex items-center justify-center border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        aria-label="Previous project"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigatePreview(1)}
                        className="w-8 h-8 flex items-center justify-center border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        aria-label="Next project"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewProject(null)}
                        className="w-8 h-8 flex items-center justify-center border border-border bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer ml-1"
                        aria-label="Close preview"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content Split Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
                    {/* Left: Project Artwork */}
                    <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] bg-muted overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
                      <div className="absolute inset-0 paper-grid opacity-60 z-0" aria-hidden="true" />
                      <Image
                        src={previewProject.thumbnail || '/placeholder-project.jpg'}
                        alt={previewProject.title}
                        fill
                        className="object-cover object-top relative z-10"
                        priority
                      />
                    </div>

                    {/* Right: Project Details */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div>
                        {previewProject.featured && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider mb-3">
                            <Sparkles className="w-3 h-3" />
                            Featured Showcase
                          </div>
                        )}

                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-tight mb-3">
                          {previewProject.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {previewProject.description || 'Full-stack engineering implementation featuring resilient design and modern technology stack.'}
                        </p>

                        {/* Tech Stack */}
                        <div>
                          <p className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                            Technologies &amp; Architecture:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {getTechStack(previewProject).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 bg-muted text-xs font-semibold text-foreground border border-border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Modal Action Links */}
                      <div className="space-y-3 pt-6 border-t border-border">
                        <Link
                          href={`/projects/${previewProject.slug}`}
                          className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        <div className="grid grid-cols-2 gap-2">
                          {previewProject.demo_url ? (
                            <a
                              href={previewProject.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3 bg-card border-2 border-border hover:border-primary text-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-primary" />
                              <span>Live Demo</span>
                            </a>
                          ) : (
                            <span className="py-2 px-3 bg-muted/50 border border-border text-muted-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center">
                              No Live Demo
                            </span>
                          )}

                          {previewProject.github_url ? (
                            <a
                              href={previewProject.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3 bg-card border-2 border-border hover:border-primary text-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Repository</span>
                            </a>
                          ) : (
                            <span className="py-2 px-3 bg-muted/50 border border-border text-muted-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center">
                              Private Code
                            </span>
                          )}
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
