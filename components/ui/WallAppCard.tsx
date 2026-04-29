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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative h-full bg-background border border-border rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden z-10 transition-transform duration-300 group-hover:scale-[1.02]">
        
        {/* Abstract Background pattern */}
        <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 opacity-50 z-0">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>

        <div className="relative z-10 mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/20 bg-muted/30 shadow-2xl relative group-hover:border-primary/50 transition-colors duration-300">
            <Image
              src={app.icon}
              alt={app.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col flex-grow items-center w-full">
          <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
            {app.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-8 line-clamp-3 leading-relaxed">
            {app.description}
          </p>

          <div className="mt-auto w-full pt-4 border-t border-border/50">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]"
            >
              <span>Visit App</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
