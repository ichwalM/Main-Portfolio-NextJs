import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import ExperienceTimeline from '@/components/sections/Experience';
import ProjectCarousel from '@/components/ui/ProjectCarousel';
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
import { getAbout } from '@/lib/api/about';
import AboutSection from '@/components/sections/About';

import { Metadata } from 'next';
import PersonJsonLd from '@/components/seo/PersonJsonLd';

export const revalidate = 360; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const [profile, about] = await Promise.all([
    getProfile().catch(() => null),
    getAbout().catch(() => null),
  ]);

  const title = profile?.name ? `${profile.name} - Full Stack Developer` : 'Ichwal - Full Stack Developer';
  const description = about?.about_deskripsi || profile?.bio || 'Passionate Full Stack Developer specializing in modern web technologies.';
  const image = profile?.hero_image || about?.about_photo || '/og-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function Home() {
  // Fetch all data in parallel with error handling
  const [profile, projectsRes, skills, experiences, blogRes, githubStats, about] = await Promise.all([
    getProfile().catch(() => null),
    getProjects().catch(() => ({ data: [] })),
    getSkills().catch(() => ({})),
    getExperiences().catch(() => []),
    getBlogPosts().catch(() => ({ data: [] })),
    getGithubStats('IchwalM').catch(() => null),
    getAbout().catch(() => null),
  ]);

  const projects = (projectsRes?.data || []).slice(0, 6);
  const blogPosts = (blogRes?.data || []).slice(0, 3);
  const name = profile?.name || 'IchwalM';

  return (
    <main>
      <PersonJsonLd />
      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Marquee Separator */}
      <section className="py-10 relative bg-surface/30 backdrop-blur-sm border-y border-white/5 overflow-hidden">
        <VelocityScroll
          text={`Full Stack Web Developer - Network Administrator - Server Administrator`}
          default_velocity={7}
          className="text-5xl md:text-6xl font-black text-foreground/30 uppercase tracking-tighter"
        />
      </section>

      {/* About Section */}
      <AboutSection about={about} />

      {/* GitHub Stats Section */}
      <GithubStats stats={githubStats} />

      {/* Featured Projects Carousel Section */}
      <section id="projects" className="py-20 bg-background">
        <ProjectCarousel projects={projects} />
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
                href={`mailto:${profile?.email || 'contact@example.com'}`}
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
