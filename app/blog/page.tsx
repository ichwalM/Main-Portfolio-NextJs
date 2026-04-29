import type { Metadata } from 'next';
import BlogCard from '@/components/ui/BlogCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getBlogPosts } from '@/lib/api/blog';

export const metadata: Metadata = {
  title: 'Blog - Ichwal Portfolio',
  description: 'Read my thoughts, tutorials, and insights on web development, full stack development, React, Next.js, and modern JavaScript technologies.',
  keywords: ['Blog', 'Web Development', 'Tutorials', 'Full Stack', 'React', 'Next.js', 'TypeScript', 'Programming'],
  openGraph: {
    title: 'Blog - Ichwal Portfolio',
    description: 'Thoughts, tutorials, and insights on web development',
    type: 'website',
    url: 'https://walldev.my.id/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Ichwal Portfolio',
    description: 'Thoughts, tutorials, and insights on web development',
  },
};

export const revalidate = 360;

export default async function BlogPage() {
  let blogRes: any = { data: [] };
  try {
    blogRes = await getBlogPosts();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }
  const posts = blogRes?.data || [];

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute top-24 right-4 text-[15vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        BLG
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <p className="section-label mb-6">Writing</p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              Blog<span className="text-primary">.</span>
            </h1>
            <p className="text-muted-foreground text-base mt-4 max-w-xl">
              Thoughts, tutorials, and insights on web development and technology.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post: any, index: number) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-20 border border-border flex items-center justify-center">
            <p className="text-muted-foreground text-base font-mono">NO POSTS FOUND.</p>
          </div>
        )}
      </div>
    </div>
  );
}
