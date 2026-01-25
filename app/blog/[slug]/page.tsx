import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/api/blog';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import BlogPhotoGallery from '@/components/ui/BlogPhotoGallery';

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-surface/20">
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </ScrollReveal>

          <article className="max-w-4xl mx-auto">
            {/* Header Section */}
            <ScrollReveal>
              <div className="mb-12 text-center">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap justify-center gap-6 text-foreground/60 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-medium">{readingTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 font-medium hover:bg-primary/20 transition-colors"
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
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 bg-surface/30 shadow-2xl shadow-primary/5">
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
                  {/* Decorative gradient line */}
                  <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full" />
                  
                  <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                    <div 
                      className="prose prose-invert prose-lg max-w-none
                        prose-headings:gradient-text prose-headings:font-black
                        prose-p:text-foreground/80 prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                        prose-strong:text-primary prose-strong:font-bold
                        prose-code:text-accent prose-code:bg-surface prose-code:px-2 prose-code:py-1 prose-code:rounded
                        prose-pre:bg-surface prose-pre:border prose-pre:border-white/10
                        prose-img:rounded-xl prose-img:border prose-img:border-white/10"
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
  );
}
