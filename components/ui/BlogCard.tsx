'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { formatDate, calculateReadingTime } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const readingTime = post.reading_time || calculateReadingTime(post.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 h-full">
          {/* Image */}
          {post.thumbnail && (
            <div className="relative h-64 overflow-hidden bg-surface/30">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-contain"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-40" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-foreground/60">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-foreground/70 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full bg-surface text-xs border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
