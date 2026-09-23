'use client';

import { memo, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, GripHorizontal } from 'lucide-react';
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

function ProjectDeckCard({ project, depth, reducedMotion, opened, onSwap }: { project: Project; depth: number; reducedMotion: boolean; opened: boolean; onSwap: () => void }) {
  const isTop = depth === 0;
  const rotate = (opened ? [-3.5, 3.7, -2.8, 4.2] : [-2, 1.7, -1, 2.2])[depth];
  const x = (opened ? [0, 32, -30, 23] : [0, 16, -14, 10])[depth];
  const y = (opened ? [0, 18, 37, 54] : [0, 14, 28, 41])[depth];
  const scale = (opened ? [1, 0.955, 0.91, 0.865] : [1, 0.965, 0.93, 0.895])[depth];
  const techStack: string[] = project.tech_stack ? Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',').map((tech) => tech.trim()).filter(Boolean) : [];

  return (
    <motion.button type="button" layout drag={isTop && !reducedMotion} dragSnapToOrigin dragElastic={0.72} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90 || Math.abs(info.offset.y) > 90) onSwap(); }} onClick={onSwap} animate={{ opacity: 1 - depth * 0.08, x, y, scale, rotate }} whileDrag={{ scale: 1.03, rotate: rotate > 0 ? rotate + 3 : rotate - 3, cursor: 'grabbing' }} transition={{ type: 'spring', stiffness: 360, damping: 28 }} className={`group absolute inset-x-0 top-0 mx-auto w-[calc(100%-1.5rem)] max-w-[650px] text-left focus-visible:outline-none ${isTop ? 'z-40 cursor-grab' : 'z-30 cursor-pointer'}`} style={{ transformOrigin: '50% 12%' }} aria-label={`${isTop ? 'Show next' : 'Bring forward'} project: ${project.title}`}>
      <span className="relative block overflow-hidden border-2 border-foreground bg-card p-2 shadow-[8px_8px_0_hsl(var(--foreground))] transition group-hover:shadow-[10px_10px_0_hsl(var(--secondary))]">
        <ProjectArtwork project={project} />
        <span className="block p-4 md:flex md:items-end md:justify-between md:gap-8"><span className="min-w-0"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Project {String(depth + 1).padStart(2, '0')} · {techStack.slice(0, 2).join(' / ') || 'Featured work'}</span><span className="block truncate text-xl font-black leading-tight tracking-tight md:text-3xl">{project.title}</span></span><span className="mt-3 inline-flex shrink-0 items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.12em] text-muted-foreground md:mt-0">{isTop ? 'Click / drag to swap' : 'Bring forward'} <ArrowRight size={13} /></span></span>
      </span>
      {isTop && <span className="absolute -bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 bg-foreground px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.12em] text-background"><GripHorizontal size={13} /> explore work</span>}
    </motion.button>
  );
}

const ProjectCarousel = memo(function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);

  const visibleProjects = useMemo(() => projects.length ? Array.from({ length: Math.min(4, projects.length) }, (_, depth) => ({ project: projects[(activeIndex + depth) % projects.length], depth })) : [], [activeIndex, projects]);
  const activeProject = projects[activeIndex % projects.length];
  const techStack: string[] = activeProject?.tech_stack ? Array.isArray(activeProject.tech_stack) ? activeProject.tech_stack : String(activeProject.tech_stack).split(',').map((tech) => tech.trim()).filter(Boolean) : [];
  const move = (direction: 1 | -1) => setActiveIndex((current) => (current + direction + projects.length) % projects.length);

  if (!projects?.length) return null;

  return (
    <div className="relative w-full py-16">
      <div className="container mx-auto px-6">
        <ScrollReveal><div className="mb-12"><p className="section-label mb-6">Work</p><h2 className="text-5xl font-black leading-[0.9] tracking-tight md:text-8xl">Featured<br /><span className="text-primary">Work.</span></h2><p className="mt-5 max-w-xl text-base text-muted-foreground">A tactile deck of selected projects. Hover to open the stack, click to swap the foreground work.</p></div></ScrollReveal>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-20">
          <div><div className="relative mx-auto h-[430px] w-full max-w-[700px] sm:h-[500px]" aria-label="Interactive featured work stack" onMouseEnter={() => setDeckHovered(true)} onMouseLeave={() => setDeckHovered(false)} onFocus={() => setDeckHovered(true)} onBlur={() => setDeckHovered(false)}><div className="pointer-events-none absolute inset-x-6 top-8 h-64 border-2 border-secondary/40" aria-hidden="true" />{visibleProjects.slice().reverse().map(({ project, depth }) => <ProjectDeckCard key={`${project.id}-${activeIndex}-${depth}`} project={project} depth={depth} reducedMotion={reducedMotion} opened={deckHovered} onSwap={() => move(1)} />)}</div><div className="mx-auto mt-5 flex max-w-[650px] items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><span>Work {String((activeIndex % projects.length) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><div className="flex-1 border-t-2 border-foreground/15" /><span>{reducedMotion ? 'Keyboard ready' : 'Click, drag, or swipe'}</span></div></div>
          <aside className="lg:sticky lg:top-28">{activeProject && <motion.div key={activeProject.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="border-2 border-foreground bg-card p-5 shadow-[8px_8px_0_hsl(var(--secondary))] md:p-7"><div className="mb-10 flex items-center justify-between gap-3"><span className="section-label">Foreground project</span><span className="bg-foreground px-2 py-1 font-mono text-[10px] font-black text-background">{String((activeIndex % projects.length) + 1).padStart(2, '0')}</span></div><h3 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{activeProject.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{activeProject.description}</p>{techStack.length > 0 && <div className="mt-6 flex flex-wrap gap-1.5">{techStack.slice(0, 5).map((tech) => <span key={tech} className="tag-outline">{tech}</span>)}</div>}<div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={() => move(-1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Previous project"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Next project"><ArrowRight size={18} /></button><Link href={`/projects/${activeProject.slug}`} className="brutalist-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-primary px-4 font-mono text-[10px] font-black uppercase tracking-[0.1em] hover:bg-secondary">View details <ArrowUpRightIcon /></Link></div>{activeProject.github_url && <a href={activeProject.github_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground hover:text-secondary"><Github size={14} /> Code</a>}{activeProject.demo_url && <a href={activeProject.demo_url} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground hover:text-secondary"><ExternalLink size={14} /> Demo</a>}</motion.div>}</aside>
        </div>
      </div>
    </div>
  );
});

function ArrowUpRightIcon() { return <ArrowRight size={14} />; }

export default ProjectCarousel;
