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
    <footer className="relative mt-24 border-t-2 border-primary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black tracking-tighter mb-3">
              ICHWAL<span className="text-primary">.</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full Stack Developer passionate about creating performant and purposeful web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="section-label mb-5">Navigation</p>
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
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm hover-underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="section-label mb-5">Connect</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-muted-foreground text-xs tracking-wider">
            © {new Date().getFullYear()} ICHWAL. ALL RIGHTS RESERVED.
          </p>
          <p className="text-muted-foreground/50 text-xs font-mono">
            BUILD WITH NEXT.JS
          </p>
        </div>
      </div>
    </footer>
  );
}
