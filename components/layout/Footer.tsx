import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, Instagram, ExternalLink } from 'lucide-react';
import { getProfile } from '@/lib/api/profile';
import FooterSocialLinks from './FooterSocialLinks';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default async function Footer() {
  // Fetch profile for social links and email
  const profile = await getProfile().catch(() => null);

  const social = profile?.social_links ?? {};
  const email = profile?.email;

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
              {navLinks.map((item) => (
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

          {/* Social — rendered client-side for animation */}
          <div>
            <p className="section-label mb-5">Connect</p>
            <FooterSocialLinks social={social} email={email} />
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
