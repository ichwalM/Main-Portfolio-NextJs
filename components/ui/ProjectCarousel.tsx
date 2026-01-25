'use client';

import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCardHD = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Stronger tilt
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXParam = e.clientX - rect.left;
    const mouseYParam = e.clientY - rect.top;
    const xPct = mouseXParam / width - 0.5;
    const yPct = mouseYParam / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const thumbnail = project.thumbnail || '/placeholder-project.jpg';

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ scale: 0.9, opacity: 0.8 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="relative w-[400px] h-[500px] md:w-[600px] md:h-[400px] flex-shrink-0 cursor-pointer perspective-1000 mx-6 group/card" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-surface/50 shadow-2xl transition-all duration-500 group-hover/card:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.3)]"
        style={{
          transform: 'translateZ(0)',
        }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 blur-md" />

        {/* Content Container */}
        <div className="relative h-full w-full bg-black/90 rounded-[2rem] overflow-hidden">
             {/* Background Image with Parallax-like scale */}
             <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110">
                <Image
                  src={thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 transition-opacity duration-500"
                  priority={true} 
                  unoptimized
                />
             </div>

             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

             {/* Content */}
             <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                  {project.tech_stack && (
                    (Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',')).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                        {typeof tech === 'string' ? tech.trim() : tech}
                      </span>
                    ))
                  )}
                </div>

                {/* Title */}
                <motion.h3 
                  className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight drop-shadow-lg"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover/card:from-primary group-hover/card:to-accent transition-all duration-500">
                    {project.title}
                  </span>
                </motion.h3>

                {/* Short Description */}
                <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-6 max-w-[90%] drop-shadow-md">
                   {project.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 items-center transform translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                    {/* <Link href={`/projects/${project.slug}`} className="px-5 py-2.5 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors text-sm">
                       View Case <ArrowUpRight size={16} />
                    </Link> */}
                    
                    {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors flex items-center gap-2 text-white font-semibold text-sm">
                            <span>Show</span>
                            <ExternalLink size={16} />
                        </a>
                    )}

                    {project.github_url && (
                         <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors text-white" title="View Code">
                            <Github size={20} />
                        </a>
                    )}
                </div>
             </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  // Create a duplicated list for infinite seamless loop
  const displayProjects = projects.length > 0 
    ? projects.length < 5 
        ? [...projects, ...projects, ...projects, ...projects] 
        : [...projects, ...projects]
    : []; // Handle empty case safely

  return (
    <div className="w-full relative py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 mb-10">
         <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
               Featured Work
            </span>
         </h2>
         <p className="text-lg text-white/50 max-w-xl">
             A selection of my best projects, crafted with precision and passion.
         </p>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full flex overflow-x-hidden mask-linear-gradient">
        {displayProjects.length > 0 ? (
           <motion.div 
              className="flex"
              animate={{
                  x: ["0%", "-50%"]
              }}
              transition={{
                  x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40, 
                      ease: "linear",
                  },
              }}
              style={{ width: "fit-content" }}
           >
              {displayProjects.map((project, idx) => (
                  <ProjectCardHD key={`${project.id}-${idx}`} project={project} />
              ))}
           </motion.div>
        ) : (
            <div className="w-full text-center py-20 text-white/40">
                No projects found.
            </div>
        )}
      </div>
      
      {/* Decorative lines */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-20" />
    </div>
  );
}
