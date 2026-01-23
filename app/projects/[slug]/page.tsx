import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/api/projects';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/animations/ScrollReveal';

export async function generateStaticParams() {
  // Return empty array to skip static generation for projects during build
  // They will be rendered on demand
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const projectRes = await getProjectBySlug(slug);
    const project = projectRes.data;
    
    return {
      title: `${project.title} - Ichwal Portfolio`,
      description: project.description || 'Project details',
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let project;
  try {
    const projectRes = await getProjectBySlug(slug);
    project = projectRes.data;
  } catch {
    notFound();
  }

  // Handle tech_stack as string or array with fallback
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
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                {project.title}
              </h1>
              
              {project.created_at && (
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-foreground/60">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(project.created_at)}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/20 hover:border-primary/50 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          {thumbnail && (
            <ScrollReveal variant="scaleIn">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10 bg-surface">
                <Image
                  src={thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </ScrollReveal>
          )}

          {/* Description */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 mb-12 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-foreground/80 text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <ScrollReveal>
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech: string, i: number) => (
                    <span
                      key={`tech-${i}`}
                      className="px-4 py-2 rounded-full bg-surface border border-white/10 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
