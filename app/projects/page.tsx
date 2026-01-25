import type { Metadata } from 'next';
import ProjectCard from '@/components/ui/ProjectCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getProjects } from '@/lib/api/projects';

export const metadata: Metadata = {
  title: 'Projects - Ichwal Portfolio',
  description: 'Explore my portfolio of web development projects and applications',
};

export const revalidate = 10;

export default async function ProjectsPage() {
  let projectsRes: any = { data: [] };
  try {
    projectsRes = await getProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
  const projects = projectsRes?.data || [];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold gradient-text mb-4">My Projects</h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              A collection of my work showcasing various technologies and creative solutions
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/60 text-lg">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
