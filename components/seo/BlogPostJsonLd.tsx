import type { BlogPost } from '@/types/blog';

interface BlogPostJsonLdProps {
  post: BlogPost;
}

export default function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail || 'https://cms.walldev.my.id/og-image.jpg',
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      '@type': 'Person',
      name: 'Ichwal',
      url: 'https://walldev.my.id',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ichwal',
      url: 'https://walldev.my.id',
    },
    keywords: post.tags?.join(', '),
    articleBody: post.content,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
