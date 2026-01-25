'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Ichwal</h3>
            <p className="text-foreground/60">
              Full Stack Developer passionate about creating beautiful and functional web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Ichwal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
