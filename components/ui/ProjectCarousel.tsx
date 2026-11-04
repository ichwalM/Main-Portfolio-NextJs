'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Eye, Github, GripHorizontal, Layers3, X } from 'lucide-react';
import type { Project } from '@/types/project';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ProjectCarouselProps { projects: Project[]; }

function ProjectArtwork({ project }: { project: Project }) {
  const thumbnail = project.thumbnail || '/placeholder-project.jpg';
  return (
    <div className="relative h-[245px] overflow-hidden bg-muted sm:h-[290px]">
      <div className="absolute inset-0 paper-grid opacity-60" aria-hidden="true" />
      <Image src={thumbnail} alt={project.title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 58vw" className="relative z-10 object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-80" />
      {project.featured && <div className="absolute left-3 top-3 z-30 flex items-center gap-1.5 bg-primary px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-primary-foreground"><span className="h-1.5 w-1.5 bg-foreground" /> Featured</div>}
    </div>
  );
}

function ProjectDeckCard({ project, depth, reducedMotion, opened, onSelect, onPromote }: { project: Project; depth: number; reducedMotion: boolean; opened: boolean; onSelect: () => void; onPromote: () => void }) {
  const isTop = depth === 0;
  const rotate = (opened ? [-3.5, 3.7, -2.8, 4.2] : [-2, 1.7, -1, 2.2])[depth];
  const x = (opened ? [0, 32, -30, 23] : [0, 16, -14, 10])[depth];
  const y = (opened ? [0, 18, 37, 54] : [0, 14, 28, 41])[depth];
  const scale = (opened ? [1, 0.955, 0.91, 0.865] : [1, 0.965, 0.93, 0.895])[depth];
  const techStack: string[] = project.tech_stack ? Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',').map((tech) => tech.trim()).filter(Boolean) : [];

  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      animate={{ opacity: 1 - depth * 0.08, x, y, scale, rotate }}
      whileHover={{ y: y - 6, scale: scale * 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`group absolute inset-x-0 top-0 mx-auto w-[calc(100%-1.5rem)] max-w-[650px] text-left focus-visible:outline-none ${isTop ? 'z-40 cursor-pointer' : 'z-30 cursor-pointer'}`}
      style={{ transformOrigin: '50% 12%' }}
      aria-label={`Open project archive at ${project.title}`}
    >
      <span className="relative block overflow-hidden border-2 border-border bg-card p-2 hover:border-primary transition-colors">
        <ProjectArtwork project={project} />
        <span className="block p-4 md:flex md:items-end md:justify-between md:gap-8">
          <span className="min-w-0">
            <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Project {depth + 1} · {techStack.slice(0, 2).join(' · ') || 'Featured work'}
            </span>
            <span className="block truncate text-xl font-black leading-tight tracking-tight md:text-3xl text-foreground">
              {project.title}
            </span>
          </span>
          <span className="mt-3 inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary md:mt-0">
            View details <Layers3 size={14} />
          </span>
        </span>
      </span>
      {isTop && (
        <span className="absolute -bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          <GripHorizontal size={14} /> Click to open
        </span>
      )}
    </motion.button>
  );
}

function getTechStack(project: Project): string[] {
  if (!project.tech_stack) return [];
  return Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',').map((tech) => tech.trim()).filter(Boolean);
}

function ProjectArchiveModal({ projects, selectedId, reducedMotion, onSelect, onClose }: { projects: Project[]; selectedId: Project['id']; reducedMotion: boolean; onSelect: (id: Project['id']) => void; onClose: () => void }) {
  const selectedProject = projects.find((project) => project.id === selectedId) || projects[0];
  const [previewId, setPreviewId] = useState<Project['id'] | null>(null);
  const previewIndex = previewId === null ? -1 : projects.findIndex((project) => project.id === previewId);
  const previewProject = previewIndex >= 0 ? projects[previewIndex] : null;

  const movePreview = useCallback((direction: 1 | -1) => {
    if (!projects.length || previewIndex < 0) return;
    const nextIndex = (previewIndex + direction + projects.length) % projects.length;
    onSelect(projects[nextIndex].id);
    setPreviewId(projects[nextIndex].id);
  }, [onSelect, previewIndex, projects]);

  const closeAll = useCallback(() => {
    setPreviewId(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
      if (previewId !== null && event.key === 'ArrowLeft') movePreview(-1);
      if (previewId !== null && event.key === 'ArrowRight') movePreview(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAll, movePreview, previewId]);

  const showProject = (project: Project) => {
    onSelect(project.id);
    setPreviewId(project.id);
  };

  const previewTech = previewProject ? getTechStack(previewProject) : [];

  return (
    <motion.div className="fixed inset-0 z-[900] overflow-x-hidden overflow-y-scroll overscroll-contain bg-background/95 [scrollbar-gutter:stable] backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Featured work archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="pointer-events-none fixed inset-0 z-0 paper-grid opacity-40" aria-hidden="true" />
      <div className="relative z-10 mx-auto min-h-[100dvh] max-w-7xl px-5 py-6 pb-32 md:px-10 md:py-10 md:pb-40">
        <header className="sticky top-3 z-[80] mb-10 flex items-center justify-between gap-4 border border-border bg-background/95 p-3 backdrop-blur md:p-4">
          <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground"><Layers3 size={19} /></span><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Featured work / {projects.length} projects</p><p className="truncate text-sm font-black md:text-lg">Scroll all cards · click one to show it</p></div></div>
          <button type="button" onClick={onClose} className="brutalist-button flex h-11 w-11 shrink-0 items-center justify-center bg-background hover:bg-muted" aria-label="Close project archive"><X size={20} /></button>
        </header>

        <div className="grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="All featured projects">
          {projects.map((project, index) => {
            const isSelected = project.id === selectedProject?.id;
            const scatterX = ((index % 5) - 2) * 55;
            const scatterY = ((index % 3) - 1) * 45;
            const rotation = ((index * 7) % 13) - 6;
            const techStack = getTechStack(project);
            return (
              <motion.button key={project.id} type="button" onClick={() => showProject(project)} initial={reducedMotion ? false : { opacity: 0, x: scatterX, y: scatterY, rotate: rotation * 3, scale: 0.45 }} animate={{ opacity: 1, x: 0, y: 0, rotate: isSelected ? 0 : rotation, scale: isSelected ? 1.035 : 1 }} transition={{ delay: reducedMotion ? 0 : Math.min(index * 0.065, 0.75), type: 'spring', stiffness: 170, damping: 18 }} whileHover={reducedMotion ? undefined : { y: -10, rotate: 0, scale: 1.025 }} className={`group relative text-left ${isSelected ? 'z-20' : 'z-10'}`} aria-label={`Show project: ${project.title}`}>
                <span className={`block overflow-hidden border bg-card p-2 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-border hover:border-primary'}`}>
                  <span className="relative block aspect-[4/3] overflow-hidden bg-muted"><span className="absolute inset-0 z-0 paper-grid opacity-50" /><Image src={project.thumbnail || '/placeholder-project.jpg'} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="z-10 object-cover" /><span className="absolute right-2 top-2 z-20 bg-foreground/90 px-2 py-1 text-xs font-bold text-background">{index + 1}</span></span>
                  <span className="block p-4"><span className="mb-2 block text-xs uppercase tracking-wider text-primary font-medium">{techStack.slice(0, 3).join(' / ') || 'Featured work'}</span><span className="block text-lg font-black leading-tight">{project.title}</span><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary"><Eye size={13} /> Show project</span></span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(<AnimatePresence>
        {previewProject && (
          <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`Project preview: ${previewProject.title}`}>
            <button type="button" className="absolute inset-0 z-0 cursor-default" onClick={closeAll} aria-label="Close project preview" />
            <motion.div key={previewProject.id} initial={reducedMotion ? false : { opacity: 0, y: 35, rotate: -2, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} exit={{ opacity: 0, y: -25, scale: 0.94 }} transition={{ type: 'spring', stiffness: 230, damping: 24 }} className="relative z-[1010] grid max-h-[92dvh] w-full max-w-6xl overflow-y-auto border border-border bg-background shadow-2xl lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]">
              <div className="relative isolate min-h-[48dvh] bg-muted lg:min-h-[78dvh]"><div className="absolute inset-0 z-0 paper-grid opacity-50" /><Image src={previewProject.thumbnail || '/placeholder-project.jpg'} alt={previewProject.title} fill priority sizes="(max-width: 1024px) 100vw, 68vw" className="z-10 object-contain" /><div className="absolute left-3 top-3 z-20 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">{previewIndex + 1} / {projects.length}</div></div>
              <div className="flex flex-col justify-between border-t border-border p-5 lg:border-l lg:border-t-0 lg:p-7"><div><h3 className="text-3xl font-black leading-tight tracking-tight">{previewProject.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{previewProject.description}</p>{previewTech.length > 0 && <div className="mt-6 flex flex-wrap gap-1.5">{previewTech.map((tech) => <span key={tech} className="tag-outline">{tech}</span>)}</div>}</div><div className="mt-8 space-y-3"><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => movePreview(-1)} className="brutalist-button inline-flex min-h-11 items-center justify-center gap-2 bg-background text-xs font-bold uppercase tracking-wider"><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => movePreview(1)} className="brutalist-button inline-flex min-h-11 items-center justify-center gap-2 bg-background text-xs font-bold uppercase tracking-wider">Next <ArrowRight size={16} /></button></div><Link href={`/projects/${previewProject.slug}`} className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">View details <ArrowRight size={14} /></Link><div className="flex gap-4">{previewProject.github_url && <a href={previewProject.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"><Github size={14} /> Code</a>}{previewProject.demo_url && <a href={previewProject.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"><ExternalLink size={14} /> Demo</a>}</div></div></div>
              <button type="button" onClick={closeAll} className="absolute right-3 top-3 z-50 flex h-11 w-11 items-center justify-center border border-border bg-black text-white transition hover:bg-primary hover:text-primary-foreground" aria-label="Close project preview"><X size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </motion.div>
  );
}

const ProjectCarousel = memo(function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);
  const [archiveSelection, setArchiveSelection] = useState<Project['id'] | null>(null);

  const visibleProjects = useMemo(() => projects.length ? Array.from({ length: Math.min(4, projects.length) }, (_, depth) => ({ project: projects[(activeIndex + depth) % projects.length], depth })) : [], [activeIndex, projects]);
  const activeProject = projects[activeIndex % projects.length];
  const techStack: string[] = activeProject?.tech_stack ? Array.isArray(activeProject.tech_stack) ? activeProject.tech_stack : String(activeProject.tech_stack).split(',').map((tech) => tech.trim()).filter(Boolean) : [];
  const move = (direction: 1 | -1) => setActiveIndex((current) => (current + direction + projects.length) % projects.length);

  useEffect(() => {
    if (reducedMotion || deckHovered || archiveSelection !== null || projects.length < 2) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveIndex((current) => (current + 1) % projects.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [archiveSelection, deckHovered, projects.length, reducedMotion]);

  if (!projects?.length) return null;

  return (
    <>
    <div className="relative w-full py-16">
      <div className="container mx-auto px-6">
        <ScrollReveal><div className="mb-12"><h2 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">Featured Work &amp; Case Studies.</h2><p className="mt-4 max-w-xl text-base text-muted-foreground">A curated selection of technical solutions, full-stack systems, and engineering workflows.</p></div></ScrollReveal>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-20">
          <div><div className="relative mx-auto h-[430px] w-full max-w-[700px] sm:h-[500px]" aria-label="Interactive featured work stack" onMouseEnter={() => setDeckHovered(true)} onMouseLeave={() => setDeckHovered(false)} onFocus={() => setDeckHovered(true)} onBlur={() => setDeckHovered(false)}><div className="pointer-events-none absolute inset-x-6 top-8 h-64 border border-border/40" aria-hidden="true" />{visibleProjects.slice().reverse().map(({ project, depth }) => <ProjectDeckCard key={`${project.id}-${activeIndex}-${depth}`} project={project} depth={depth} reducedMotion={reducedMotion} opened={deckHovered} onSelect={() => setArchiveSelection(project.id)} onPromote={() => move(1)} />)}</div><div className="mx-auto mt-5 max-w-[650px]"><div className="mb-3 h-1 overflow-hidden bg-foreground/10" aria-hidden="true">{!reducedMotion && !deckHovered && <motion.div key={activeIndex} className="h-full bg-primary-highlight" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'linear' }} />}</div><div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><span>Work {(activeIndex % projects.length) + 1} / {projects.length}</span><div className="flex-1 border-t border-border" /><span>{deckHovered ? 'Autoplay paused' : reducedMotion ? 'Ready' : 'Click to view all'}</span></div></div></div>
          <aside className="lg:sticky lg:top-28">{activeProject && <motion.div key={activeProject.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="border border-border bg-card p-5 md:p-7 shadow-lg"><h3 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{activeProject.title}</h3><div className="mt-3 flex items-center gap-3"><span className="text-xs font-semibold uppercase tracking-wider text-primary">Case Study {(activeIndex % projects.length) + 1} of {projects.length}</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{activeProject.description}</p>{techStack.length > 0 && <div className="mt-6 flex flex-wrap gap-1.5">{techStack.slice(0, 5).map((tech) => <span key={tech} className="tag-outline">{tech}</span>)}</div>}<div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={() => move(-1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Previous project"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Next project"><ArrowRight size={18} /></button><Link href={`/projects/${activeProject.slug}`} className="brutalist-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-primary px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">View details <ArrowUpRightIcon /></Link></div>{activeProject.github_url && <a href={activeProject.github_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"><Github size={14} /> Code</a>}{activeProject.demo_url && <a href={activeProject.demo_url} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"><ExternalLink size={14} /> Demo</a>}</motion.div>}</aside>
        </div>
      </div>
    </div>
    <AnimatePresence>{archiveSelection !== null && <ProjectArchiveModal projects={projects} selectedId={archiveSelection} reducedMotion={reducedMotion} onSelect={setArchiveSelection} onClose={() => setArchiveSelection(null)} />}</AnimatePresence>
    </>
  );
});

function ArrowUpRightIcon() { return <ArrowRight size={14} />; }

export default ProjectCarousel;
