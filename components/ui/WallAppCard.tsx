'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { WallApp } from '@/types/wall-app';

interface WallAppCardProps {
  app: WallApp;
  index: number;
}

export default function WallAppCard({ app, index }: WallAppCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'linear' }}
      className="group relative border-2 border-border hover:border-foreground bg-card flex flex-col transition-none"
    >
      {/* Top accent bar */}
      <div className="h-1 bg-border group-hover:bg-primary transition-none" />

      {/* Icon area */}
      <div className="relative p-8 flex items-center justify-center border-b-2 border-border bg-surface">
        {/* Offset border — brutalist */}
        <div className="relative">
          <div className="absolute top-2 left-2 w-16 h-16 border-2 border-primary z-0" />
          <div className="relative w-16 h-16 border-2 border-foreground overflow-hidden bg-background z-10">
            <Image
              src={app.icon}
              alt={app.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </div>

        {/* Index watermark */}
        <div className="absolute right-3 bottom-2 font-mono font-black text-4xl text-foreground/5 leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-none">
          {app.name}
        </h3>

        <div className="h-0.5 bg-border" />

        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1">
          {app.description}
        </p>

        {/* CTA */}
        <div className="border-t-2 border-border pt-3 mt-auto">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-black font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-foreground hover:text-background transition-none border-2 border-primary"
          >
            Visit App
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
