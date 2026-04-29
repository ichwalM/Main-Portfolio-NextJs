import type { Project } from '@/types/project';

interface ProjectJsonLdProps {
  project: Project;
  url: string;
}

export default function ProjectJsonLd({ project, url }: ProjectJsonLdProps) {
  const techStack: string[] = project.tech_stack
    ? Array.isArray(project.tech_stack)
      ? project.tech_stack
      : typeof project.tech_stack === 'string'
      ? project.tech_stack.split(',').map((t) => t.trim()).filter(Boolean)
      : []
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description || `${project.title} — a project by Ichwal, Full Stack Developer from Makassar, Indonesia.`,
    url,
    image: project.thumbnail || 'https://walldev.my.id/og-image.jpg',
    datePublished: project.published_at || project.created_at,
    dateModified: project.updated_at || project.published_at || project.created_at,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    ...(techStack.length > 0 && {
      keywords: ['Ichwal', 'Ichwal Portfolio', 'walldev', ...techStack].join(', '),
      programmingLanguage: techStack,
    }),
    author: {
      '@type': 'Person',
      name: 'Ichwal',
      url: 'https://walldev.my.id',
      jobTitle: 'Full Stack Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Walldev',
      },
    },
    creator: {
      '@type': 'Person',
      name: 'Ichwal',
      url: 'https://walldev.my.id',
    },
    ...(project.github_url && { codeRepository: project.github_url }),
    ...(project.demo_url && { installUrl: project.demo_url }),
    isPartOf: {
      '@type': 'WebSite',
      name: 'Ichwal Portfolio',
      url: 'https://walldev.my.id',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
