import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import ExperienceTimeline from '@/components/sections/Experience';
import ProjectCard from '@/components/ui/ProjectCard';
import BlogCard from '@/components/ui/BlogCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getProfile } from '@/lib/api/profile';
import { getProjects } from '@/lib/api/projects';
import { getSkills } from '@/lib/api/skills';
import { getExperiences } from '@/lib/api/experience';
import { getBlogPosts } from '@/lib/api/blog';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';

import { getGithubStats } from '@/lib/api/github';
import GithubStats from '@/components/sections/GithubStats';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch all data in parallel with error handling
  const [profile, projectsRes, skills, experiences, blogRes, githubStats] = await Promise.all([
    getProfile().catch(() => null),
    getProjects().catch(() => ({ data: [] })),
    getSkills().catch(() => ({})),
    getExperiences().catch(() => []),
    getBlogPosts().catch(() => ({ data: [] })),
    getGithubStats('IchwalM').catch(() => null), // Replace with dynamic username if needed
  ]);

  const projects = (projectsRes?.data || []).slice(0, 6);
  const blogPosts = (blogRes?.data || []).slice(0, 3);
  const name = profile?.name || 'IchwalM';

  return (
    <>
      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Marquee Separator */}
      <section className="py-20 relative bg-surface/30 backdrop-blur-sm border-y border-white/5 overflow-hidden">
        <VelocityScroll
          text={`${name} Full Stack Developer ${name} Network Engineer ${name} Creative Coder `}
          default_velocity={7}
          className="text-7xl md:text-9xl font-black text-foreground/30 uppercase tracking-tighter"
        />
      </section>

      {/* GitHub Stats Section */}
      <GithubStats stats={githubStats} />

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold gradient-text mb-4">Featured Projects</h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                A showcase of my recent work and side projects
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass border border-white/20 hover:border-primary/50 transition-all duration-300 group"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <Skills skills={skills} />

      {/* Experience Section */}
      <ExperienceTimeline experiences={experiences} />

      {/* Blog Section */}
      <section id="blog" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold gradient-text mb-4">Latest Blog Posts</h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                Thoughts, tutorials, and insights on web development
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass border border-white/20 hover:border-primary/50 transition-all duration-300 group"
              >
                View All Posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 border border-white/10">
              <h2 className="text-5xl font-bold gradient-text mb-6">Let's Work Together</h2>
              <p className="text-foreground/70 text-lg mb-8">
                Have a project in mind? Let's discuss how we can collaborate to bring your ideas to life.
              </p>
              <a
                href={`mailto:${profile?.social_links?.email || 'contact@example.com'}`}
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
