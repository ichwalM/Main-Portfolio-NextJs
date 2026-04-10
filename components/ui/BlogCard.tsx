'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="border border-border hover:border-primary/50 transition-all duration-300 bg-card overflow-hidden h-full relative">
          {/* Image */}
          {post.thumbnail && (
            <div className="relative h-52 overflow-hidden bg-surface">
              <motion.div
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

              {/* Arrow icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-background border border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-3">
            {/* Meta */}
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Thin separator */}
            <div className="h-px bg-border" />

            <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200 line-clamp-2 tracking-tight">
              {post.title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="tag-outline"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </Link>
    </motion.div>
  );
}

