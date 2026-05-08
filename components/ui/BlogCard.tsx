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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'linear' }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="h-full flex flex-col">
        <div className="border-2 border-border hover:border-foreground bg-card overflow-hidden h-full flex flex-col transition-none">
          {/* Top accent bar */}
          <div className="h-1 bg-border group-hover:bg-primary transition-none" />

          {/* Image */}
          {post.thumbnail && (
            <div className="relative h-48 overflow-hidden bg-surface border-b-2 border-border">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-none"
              />
              <div className="absolute inset-0 bg-background/30 group-hover:bg-primary/5 transition-none" />

              {/* Arrow on hover */}
              <div className="absolute top-3 right-3 w-9 h-9 bg-background border-2 border-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-none">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-5 flex flex-col flex-1 gap-3">
            {/* Meta strip */}
            <div className="flex items-center gap-0 border border-border overflow-hidden w-fit">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-border">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {formatDate(post.published_at)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {readingTime} min
                </span>
              </div>
            </div>

            <div className="h-0.5 bg-border" />

            <h3 className="text-lg font-black group-hover:text-primary transition-none line-clamp-2 tracking-tight uppercase">
              {post.title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed flex-1">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] font-bold uppercase tracking-wider border border-border px-2 py-0.5 text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read more strip */}
            <div className="border-t-2 border-border pt-3 flex items-center justify-between mt-auto">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Read Article</span>
              <span className="text-primary font-black">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
