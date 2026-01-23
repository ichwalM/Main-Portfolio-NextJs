import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/api/blog';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/animations/ScrollReveal';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const postRes = await getBlogPostBySlug(slug);
    const post = postRes.data;
    
    return {
      title: `${post.title} - Ichwal Blog`,
      description: post.excerpt,
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
    const postRes = await getBlogPostBySlug(slug);
    post = postRes.data;
  } catch {
    notFound();
  }

  const readingTime = post.reading_time || calculateReadingTime(post.content);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </ScrollReveal>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-foreground/60 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-surface text-sm border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Featured Image */}
          {post.image && (
            <ScrollReveal variant="scaleIn">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          )}

          {/* Content */}
          <ScrollReveal>
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="glass rounded-2xl p-8 border border-white/10">
                <div 
                  className="text-foreground/80 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </ScrollReveal>
        </article>
      </div>
    </div>
  );
}
