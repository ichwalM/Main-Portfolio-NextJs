import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/api/blog';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import BlogPhotoGallery from '@/components/ui/BlogPhotoGallery';
import BlogPostJsonLd from '@/components/seo/BlogPostJsonLd';

export async function generateStaticParams() {
  // Return empty array to skip static generation for blog posts during build
  // They will be rendered on demand
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPostBySlug(slug);
    
    return {
      title: `${post.title} - Ichwal Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.published_at,
        authors: ['Ichwal'],
        images: [
          {
            url: post.thumbnail || '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.thumbnail || '/og-image.jpg'],
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    post = await getBlogPostBySlug(slug);
    
    // Ensure post exists
    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  // Safely access post properties with fallbacks
  const readingTime = post.reading_time || (post.content ? calculateReadingTime(post.content) : 5);

  return (
    <>
      <BlogPostJsonLd post={post} />
      <div className="min-h-screen bg-background">
        <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="mb-12">
                {/* Back link */}
                <div className="mb-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group text-sm font-mono uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                  </Link>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
                  {post.title}
                </h1>

                {/* Meta Info — sharp tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 tag-outline">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 tag-outline">
                    <Clock className="w-3 h-3" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="tag-outline hover:border-primary hover:text-primary transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Featured Image */}
            {post.thumbnail && (
              <ScrollReveal variant="scaleIn">
                <div className="relative w-full aspect-video overflow-hidden mb-12 border border-border bg-surface">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Content */}
            <ScrollReveal>
              <div className="mb-16">
                <div className="relative">
                  {/* Left accent line */}
                  <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-primary" />

                  <div className="border border-border bg-card p-8 md:p-12">
                    <div
                      className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-p:text-muted-foreground prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                        prose-strong:text-foreground prose-strong:font-bold
                        prose-code:text-primary prose-code:bg-surface prose-code:px-2 prose-code:py-0.5
                        prose-pre:bg-surface prose-pre:border prose-pre:border-border
                        prose-img:border prose-img:border-border"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Additional Photos Gallery */}
            {post.additional_photos && post.additional_photos.length > 0 && (
              <ScrollReveal>
                <BlogPhotoGallery photos={post.additional_photos} title={post.title} />
              </ScrollReveal>
            )}
          </article>
        </div>
      </div>
    </div>
    </>
  );
}
