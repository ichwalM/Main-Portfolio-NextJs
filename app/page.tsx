import Hero from '@/components/sections/Hero';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getProfile } from '@/lib/api/profile';
import { getProjects } from '@/lib/api/projects';
import { getSkills } from '@/lib/api/skills';
import { getExperiences } from '@/lib/api/experience';
import { getBlogPosts } from '@/lib/api/blog';
import { getCertificates } from '@/lib/api/certificates';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Clock } from 'lucide-react';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { getGithubStats } from '@/lib/api/github';
import { getAbout } from '@/lib/api/about';
import FooterSocialLinks from '@/components/layout/FooterSocialLinks';

// Server Component dynamic imports (ssr: true)
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: true });
const ExperienceTimeline = dynamic(() => import('@/components/sections/Experience'), { ssr: true });
const ProjectCarousel = dynamic(() => import('@/components/ui/ProjectCarousel'), { ssr: true });
const BlogCard = dynamic(() => import('@/components/ui/BlogCard'), { ssr: true });
const AboutSection = dynamic(() => import('@/components/sections/About'), { ssr: true });
const Certificates = dynamic(() => import('@/components/sections/Certificates'), { ssr: true });

// Client-only components (wrapped in 'use client' boundary)
import { GithubStatsClient, ContactFormClient } from '@/components/dynamic-client';

import { Metadata } from 'next';
import PersonJsonLd from '@/components/seo/PersonJsonLd';

// Match API client revalidate (1 hour) — avoid TTFB spikes from too-frequent revalidation
export const revalidate = 3600;

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
      images: [{ url: image, width: 1200, height: 630, alt: title }],
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

// Section skeleton for Suspense fallback
function SectionSkeleton() {
  return (
    <div className="py-24 animate-pulse">
      <div className="container mx-auto px-6">
        <div className="h-4 w-24 bg-border rounded mb-6" />
        <div className="h-12 w-64 bg-border rounded mb-4" />
        <div className="h-4 w-48 bg-border rounded" />
      </div>
    </div>
  );
}

export default async function Home() {
  // Fetch all data in parallel — server-side, cached by Next.js ISR
  const [profile, projectsRes, skills, experiences, blogRes, githubStats, about, certificates] = await Promise.all([
    getProfile().catch(() => null),
    getProjects().catch(() => ({ data: [] })),
    getSkills().catch(() => ({})),
    getExperiences().catch(() => []),
    getBlogPosts().catch(() => ({ data: [] })),
    getGithubStats('IchwalM').catch(() => null),
    getAbout().catch(() => null),
    getCertificates().catch(() => []),
  ]);

  const projects = projectsRes?.data || [];
  const blogPosts = (blogRes?.data || []).slice(0, 3);
  const name = profile?.name || 'IchwalM';

  return (
    <main>
      <PersonJsonLd profile={profile} about={about} />

      {/* Hero Section — static import, above fold, critical */}
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
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection about={about} />
      </Suspense>

      {/* GitHub Stats Section — client-only (no SSR needed, below fold) */}
      <GithubStatsClient stats={githubStats} />

      {/* Featured Projects Carousel Section */}
      <section id="projects" className="py-20 bg-background">
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectCarousel projects={projects} />
        </Suspense>
      </section>

      {/* Skills Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <Skills skills={skills} />
      </Suspense>

      {/* Experience Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceTimeline experiences={experiences} />
      </Suspense>

      {/* Certificates Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <Certificates certificates={certificates} />
      </Suspense>

      {/* Blog Section */}
      <section id="blog" className="py-24 md:py-32 relative overflow-hidden">
        {/* Decorative large number */}
        <div className="absolute top-8 left-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
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
              <Suspense key={post.id} fallback={<div className="h-64 bg-border animate-pulse" />}>
                <BlogCard post={post} index={index} />
              </Suspense>
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
      <section id="contact" className="py-24 md:py-32 relative border-t border-border overflow-hidden">
        {/* Decorative watermark */}
        <div className="absolute top-8 right-2 text-[12vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
          MSG
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-14">
              <p className="section-label mb-6">Contact</p>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
                Let&apos;s Work<br />
                <span className="text-primary">Together.</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">
                Have a project in mind, want to collaborate, or just want to say hello? I&apos;d love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          <div className="h-px bg-border mb-14" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left — Info Panel */}
            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em] mb-1">Email</p>
                      <a
                        href={`mailto:${profile?.email || 'contact@walldev.my.id'}`}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {profile?.email || 'contact@walldev.my.id'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em] mb-1">Location</p>
                      <p className="text-sm font-semibold">Makassar, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em] mb-1">Response Time</p>
                      <p className="text-sm font-semibold">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <div className="h-px bg-border" />

              <ScrollReveal>
                <div>
                  <p className="section-label mb-5">Connect</p>
                  <FooterSocialLinks
                    social={profile?.social_links ?? {}}
                    email={profile?.email}
                  />
                </div>
              </ScrollReveal>

              {profile?.open_work && (
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5">
                  <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Open to work</span>
                </div>
              )}
            </div>

            {/* Right — Form */}
            <ScrollReveal className="lg:col-span-3">
              <div className="border border-border bg-card p-8 md:p-10 relative">
                {/* Corner brackets */}
                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="mb-8">
                  <p className="section-label mb-3">Send Message</p>
                  <h3 className="text-2xl font-black tracking-tight">Drop me a line.</h3>
                </div>

                <ContactFormClient />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
