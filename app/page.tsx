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

  const title = profile?.name ? `${profile.name} - Full Stack Developer & Network Engineer` : 'Ichwal - Full Stack Developer & Network Engineer';
  const description = about?.about_deskripsi || profile?.bio || 'Passionate Full Stack Developer specializing in modern web technologies.';
  const image = '/ichwal-cutout.webp';

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

  return (
    <main>
      <PersonJsonLd profile={profile} about={about} />

      {/* Hero Section — Realizes mockup in frontend/docs/design/home-section.png */}
      <Hero profile={profile} about={about} />

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
      <section id="blog" className="py-24 md:py-32 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Latest Publications &amp; Technical Insights.
              </h2>
              <p className="text-muted-foreground text-base mt-3 max-w-xl">
                Deep-dives into systems engineering, modern web applications, and network architecture.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                <span>Read All Publications</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 relative border-t border-border overflow-hidden bg-card">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-3">
                Let&apos;s Build Something Resilient.
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">
                Have a project in mind, need infrastructure support, or want to discuss full-stack solutions? Let&apos;s connect.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Info Panel */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 bg-background">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                      <a
                        href={`mailto:${profile?.email || 'contact@walldev.my.id'}`}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {profile?.email || 'contact@walldev.my.id'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 bg-background">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm font-semibold">Makassar, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 bg-background">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Response Time</p>
                      <p className="text-sm font-semibold">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div>
                  <h4 className="text-sm font-bold tracking-tight mb-4">Direct Channels</h4>
                  <FooterSocialLinks
                    social={profile?.social_links ?? {}}
                    email={profile?.email ?? undefined}
                  />
                </div>
              </ScrollReveal>

              {profile?.open_work && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />
                  <span className="text-xs font-bold uppercase tracking-wider">Available for Opportunities</span>
                </div>
              )}
            </div>

            {/* Right — Form */}
            <ScrollReveal className="lg:col-span-3">
              <div className="border-2 border-border bg-background p-8 md:p-10 relative">
                <div className="mb-6">
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
