'use client';

import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutGrid } from 'lucide-react';
import { fadeInDown, staggerContainer, staggerItem } from '@/lib/animations/variants';
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
    // If not on home page and it's a hash link, let Next.js handle the cross-page route
    if (!isHome && href.startsWith('#')) return;

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 30 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? 'bg-background border-b border-border py-4'
          : 'py-6'
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-foreground z-50 relative hover:text-primary transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ICHWAL<span className="text-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <motion.ul
          variants={staggerContainer}
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => {
            const href = item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href;
            return (
              <motion.li key={item.name} variants={staggerItem}>
                <Link
                  href={href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 hover-underline"
                >
                  {item.name}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* CTA Button & Theme Toggle — Sharp Rectangle */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div variants={staggerItem}>
            <ThemeToggle />
          </motion.div>
          <motion.div variants={staggerItem}>
            <Link
              href="/wall-app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-primary text-primary-foreground text-xs font-bold tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
            >
              <LayoutGrid size={14} strokeWidth={2.5} />
              Wall App
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 relative text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 top-0 left-0 w-full h-dvh bg-background z-40 flex flex-col items-start justify-center md:hidden overflow-hidden border-l border-border"
              style={{ padding: '3rem 2.5rem' }}
            >
              {/* Decorative number */}
              <span className="absolute top-8 right-8 font-mono text-[80px] font-black text-border/30 leading-none select-none">
                M
              </span>

              <ul className="flex flex-col gap-3 w-full">
                {navItems.map((item, i) => {
                  const href = item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href;
                  return (
                    <motion.li key={item.name} variants={itemVariants} className="w-full border-b border-border/40 pb-3">
                      <Link
                        href={href}
                        className="flex items-baseline gap-4 text-4xl font-black tracking-tighter text-foreground hover:text-primary transition-colors"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <span className="text-xs font-mono text-primary/60">0{i + 1}</span>
                        {item.name}
                      </Link>
                    </motion.li>
                  );
                })}

                <motion.li variants={itemVariants} className="mt-8 w-full flex flex-col gap-3">
                  <div className="flex items-center gap-3 w-full justify-center">
                    <ThemeToggle />
                  </div>
                  <Link
                    href="/wall-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg tracking-wide hover:bg-primary/90 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutGrid size={20} strokeWidth={2.5} />
                    Wall App
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
