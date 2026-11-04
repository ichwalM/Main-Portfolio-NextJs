'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, LucideIcon } from 'lucide-react';

interface SocialIconsProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export default function SocialIcons({ socialLinks = {}, className = '' }: SocialIconsProps) {
  const icons = Object.entries(socialLinks).filter(([_, url]) => url);

  return (
    <motion.div
      className={`flex gap-4 justify-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {icons.map(([key, url], index) => {
        const Icon = iconMap[key];
        if (!Icon) return null;

        return (
          <motion.a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={key}
          >
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              initial={false}
            />

            {/* Icon container */}
            <div className="relative w-14 h-14 rounded-full glass border border-white/20 group-hover:border-primary/50 flex items-center justify-center transition-all duration-300 backdrop-blur-xl">
              <Icon className="w-6 h-6 group-hover:text-primary transition-colors duration-300" />
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
