import type { Metadata } from 'next';
import ProjectCard from '@/components/ui/ProjectCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getProjects } from '@/lib/api/projects';

export const metadata: Metadata = {
  title: 'Projects - Ichwal Portfolio',
  description: 'Explore my portfolio of web development projects and applications',
};

export const revalidate = 360;

export default async function ProjectsPage() {
  let projectsRes: any = { data: [] };
  try {
    projectsRes = await getProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
  const projects = projectsRes?.data || [];

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Decorative number */}
      <div className="absolute top-24 right-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        PRJ
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <p className="section-label mb-6">Portfolio</p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              My<br />
              <span className="text-primary">Projects.</span>
            </h1>
            <p className="text-muted-foreground text-base mt-4 max-w-xl">
              A collection of my work showcasing various technologies and creative solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project: any, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="py-20 border border-border flex items-center justify-center">
            <p className="text-muted-foreground text-base font-mono">NO PROJECTS FOUND.</p>
          </div>
        )}
      </div>
    </div>
  );
}
