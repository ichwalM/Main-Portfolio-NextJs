import type { Metadata } from 'next';
import BlogCard from '@/components/ui/BlogCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getBlogPosts } from '@/lib/api/blog';

export const metadata: Metadata = {
  title: 'Blog - Ichwal Portfolio',
  description: 'Read my thoughts, tutorials, and insights on web development',
};

export const revalidate = 3600;

export default async function BlogPage() {
  const blogRes = await getBlogPosts();
  const posts = blogRes.data;

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold gradient-text mb-4">Blog</h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on web development and technology
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/60 text-lg">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
