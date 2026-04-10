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
      <section className="py-8 relative bg-surface border-y border-border overflow-hidden">
        <VelocityScroll
          text={`Full Stack Web Developer — Network Administrator — Server Administrator`}
          default_velocity={7}
          className="text-4xl md:text-5xl font-black text-foreground/20 uppercase tracking-tighter"
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
      <section id="blog" className="py-24 md:py-32 relative overflow-hidden">
        {/* Decorative large number */}
        <div className="absolute top-8 left-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
          06
        </div>
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="mb-16">
              <p className="section-label mb-6">Blog</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                Latest<br />
                <span className="text-primary">Posts.</span>
              </h2>
              <p className="text-muted-foreground text-base mt-4 max-w-xl">
                Thoughts, tutorials, and insights on web development.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors group"
              >
                View All Posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 relative border-t border-border">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <p className="section-label mb-6">Contact</p>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                Let's Work<br />
                <span className="text-primary">Together.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl">
                Have a project in mind? Let's discuss how we can collaborate to bring your ideas to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${profile?.email || 'contact@example.com'}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-base tracking-wide hover:bg-primary/90 transition-colors"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-bold text-base tracking-wide hover:border-foreground transition-colors"
                >
                  View My Work
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
