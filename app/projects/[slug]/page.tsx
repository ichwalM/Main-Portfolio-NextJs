import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/api/projects';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ProjectJsonLd from '@/components/seo/ProjectJsonLd';

export async function generateStaticParams() {
  // Return empty array to skip static generation for projects during build
  // They will be rendered on demand
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);

    const techStack: string[] = project.tech_stack
      ? Array.isArray(project.tech_stack)
        ? project.tech_stack
        : typeof project.tech_stack === 'string'
        ? project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean)
        : []
      : [];

    const title = `${project.title} — Ichwal Portfolio`;
    const description = project.description
      ? `${project.description.slice(0, 155)}...`
      : `${project.title} adalah project oleh Ichwal, Full Stack Developer dari Makassar, Indonesia. Dibangun dengan ${techStack.join(', ')}.`;
    const image = project.thumbnail || 'https://walldev.my.id/og-image.jpg';
    const url = `https://walldev.my.id/projects/${slug}`;

    return {
      title,
      description,
      keywords: [
        'Ichwal',
        'Ichwal Portfolio',
        'walldev',
        project.title,
        ...techStack,
        'Full Stack Developer',
        'Web Developer Indonesia',
        'Laravel Developer',
        'React Developer',
        'Makassar Developer',
      ],
      authors: [{ name: 'Ichwal', url: 'https://walldev.my.id' }],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: 'Ichwal Portfolio',
        type: 'article',
        publishedTime: project.published_at || project.created_at,
        authors: ['Ichwal'],
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${project.title} — Ichwal Portfolio`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: 'Project Not Found | Ichwal Portfolio',
    };
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let project;
  try {
    project = await getProjectBySlug(slug);
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
      {/* JSON-LD Structured Data untuk SEO */}
      <ProjectJsonLd
        project={project}
        url={`https://walldev.my.id/projects/${project.slug}`}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-12">
              {/* Back link */}
              <div className="mb-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group text-sm font-mono uppercase tracking-wider"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </Link>
              </div>

              <p className="section-label mb-4">Project</p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                {project.title}
              </h1>

              {/* Tanggal publish */}
              {(project.published_at || project.created_at) && (
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 tag-outline">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(project.published_at || project.created_at!)}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-border hover:border-primary text-sm font-bold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          {thumbnail && (
            <ScrollReveal>
              <div className="relative w-full aspect-video overflow-hidden mb-10 border border-border bg-surface">
                <Image
                  src={thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          )}

          {/* Description */}
          <ScrollReveal>
            <div className="border border-border bg-card p-8 mb-6">
              <p className="section-label mb-4">About</p>
              <h2 className="text-xl font-black mb-4 tracking-tight">About This Project</h2>
              <p className="text-muted-foreground text-base leading-relaxed text-justify">
                {description}
              </p>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <ScrollReveal>
              <div className="border border-border bg-card p-8">
                <p className="section-label mb-5">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech: string, i: number) => (
                    <span
                      key={`tech-${i}`}
                      className="tag-outline"
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
