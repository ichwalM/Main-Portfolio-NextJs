'use client';

import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { fadeInDown, staggerContainer, staggerItem } from '@/lib/animations/variants';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

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
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen ? 'glass py-4' : 'py-6'
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text z-50 relative" onClick={() => setIsMobileMenuOpen(false)}>
          Ichwal
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
                  className="text-foreground/80 hover:text-foreground transition-colors relative group font-medium"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        <div className="hidden md:block">
          <motion.div variants={staggerItem}>
            <Link
              href={!isHome ? '/#contact' : '#contact'}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Contact
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 relative text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 top-0 left-0 w-full h-dvh bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden overflow-hidden"
              style={{ padding: '2rem' }}
            >
              <ul className="flex flex-col items-center gap-6 text-center w-full">
                {navItems.map((item) => {
                  const href = item.href.startsWith('#') && !isHome ? `/${item.href}` : item.href;
                  return (
                    <motion.li key={item.name} variants={itemVariants} className="w-full">
                      <Link
                        href={href}
                        className="block text-4xl font-black text-foreground hover:text-primary transition-colors py-2 tracking-tight"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  );
                })}
                
                <motion.li variants={itemVariants} className="mt-8 w-full flex justify-center">
                  <Link
                    href={!isHome ? '/#contact' : '#contact'}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 w-full max-w-xs text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Me
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
