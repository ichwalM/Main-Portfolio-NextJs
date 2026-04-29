'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

interface FooterSocialLinksProps {
  social: SocialLinks;
  email?: string;
}

const iconMap = {
  github: { icon: Github, label: 'GitHub' },
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  instagram: { icon: Instagram, label: 'Instagram' },
  twitter: { icon: Twitter, label: 'Twitter' },
};

export default function FooterSocialLinks({ social, email }: FooterSocialLinksProps) {
  // Build list dynamically from API data
  const links: { href: string; label: string; Icon: typeof Github }[] = [];

  (Object.keys(iconMap) as Array<keyof typeof iconMap>).forEach((key) => {
    if (social[key]) {
      links.push({
        href: social[key]!,
        label: iconMap[key].label,
        Icon: iconMap[key].icon,
      });
    }
  });

  // Add email if available
  if (email) {
    links.push({ href: `mailto:${email}`, label: 'Email', Icon: Mail });
  }

  // Fallback: if API has no data, show nothing (or could show placeholder)
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ href, label, Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200"
          aria-label={label}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </motion.a>
      ))}
    </div>
  );
}
