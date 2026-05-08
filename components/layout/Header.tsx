'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutGrid } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome && href.startsWith('#')) return;
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-none border-b-4 ${
        scrolled || isMobileMenuOpen
          ? 'bg-background border-foreground'
          : 'border-transparent'
      }`}
    >
      {/* Top primary accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

      <nav className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter z-50 relative uppercase hover:text-primary transition-none"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ICHWAL<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0 border-l border-r border-border">
          {navItems.map((item) => {
            const href = item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href;
            return (
              <li key={item.name}>
                <Link
                  href={href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center h-full px-4 py-5 text-[10px] font-black tracking-[0.12em] uppercase text-muted-foreground hover:text-background hover:bg-foreground border-r border-border transition-none"
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-0 border border-border">
          <div className="border-r border-border px-3 py-2">
            <ThemeToggle />
          </div>
          <Link
            href="/wall-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground text-[10px] font-black tracking-[0.1em] uppercase hover:bg-foreground transition-none"
          >
            <LayoutGrid size={12} strokeWidth={2.5} />
            Wall App
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 relative w-10 h-10 border-2 border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.25, ease: 'linear' }}
              className="fixed inset-0 top-0 left-0 w-full h-dvh bg-background z-40 flex flex-col border-l-4 border-foreground md:hidden"
            >
              {/* Header area */}
              <div className="h-20 border-b-4 border-foreground flex items-center px-6">
                <span className="font-black text-2xl uppercase tracking-tighter">
                  ICHWAL<span className="text-primary">.</span>
                </span>
              </div>

              {/* Nav items */}
              <ul className="flex flex-col flex-1 overflow-y-auto">
                {navItems.map((item, i) => {
                  const href = item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href;
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2, ease: 'linear' }}
                      className="border-b-2 border-border"
                    >
                      <Link
                        href={href}
                        className="flex items-baseline gap-5 px-6 py-5 hover:bg-foreground hover:text-background transition-none group"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <span className="font-mono text-[9px] text-primary/60 font-black">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-3xl font-black tracking-tighter uppercase">
                          {item.name}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Bottom actions */}
              <div className="border-t-4 border-foreground flex items-stretch">
                <div className="border-r-2 border-border flex items-center px-4">
                  <ThemeToggle />
                </div>
                <Link
                  href="/wall-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-5 bg-primary text-primary-foreground font-black font-mono text-xs uppercase tracking-[0.15em] hover:bg-foreground transition-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutGrid size={16} strokeWidth={2.5} />
                  Wall App
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
