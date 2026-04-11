import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://walldev.my.id'),
  title: {
    default: 'Ichwal — Full Stack Developer & Network Administrator | Portfolio',
    template: '%s | Ichwal Portfolio',
  },
  description: 'Portfolio resmi Ichwal — Full Stack Developer dan Network Administrator dari Makassar, Indonesia. Spesialis Laravel, React, Next.js, dan administrasi jaringan.',
  keywords: [
    // Nama / Branding
    'Ichwal',
    'Ichwal Mr',
    'IchwalM',
    'Ichwal Developer',
    'Ichwal Portfolio',
    'walldev',
    'walldev.my.id',
    // Profesi
    'Full Stack Developer',
    'Web Developer',
    'Network Administrator',
    'Server Administrator',
    'Backend Developer',
    'Frontend Developer',
    // Teknologi
    'React',
    'Next.js',
    'TypeScript',
    'Laravel',
    'PHP',
    'Node.js',
    'MySQL',
    // Lokasi
    'Developer Makassar',
    'Web Developer Indonesia',
    'Freelance Developer Indonesia',
    'Tailwind CSS', 'Inertia.js', 'REST API Specialist', 'Git/GitHub',
    'MikroTik Configuration', 'Cisco Certified Specialist', 'Linux Administrator', 'Docker Container', 'Cloudflare Specialist',
    'IoT Engineer', 'Embedded Systems Developer', 'Computer Vision Project', 'ESP32 Developer',
    
    'Jasa Website Makassar', 'IT Consultant Makassar', 'Software Engineer Makassar', 'Freelance Web Developer'
  ],
  authors: [{ name: 'Ichwal', url: 'https://walldev.my.id' }],
  creator: 'Ichwal',
  publisher: 'Ichwal',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://walldev.my.id',
    siteName: 'Ichwal Portfolio',
    title: 'Ichwal — Full Stack Developer & Network Administrator',
    description: 'Portfolio resmi Ichwal — Full Stack Developer dan Network Administrator dari Makassar, Indonesia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ichwal — Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ichwal — Full Stack Developer & Network Administrator',
    description: 'Portfolio resmi Ichwal — Full Stack Developer dan Network Administrator dari Makassar, Indonesia.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/ichwal-icon.svg',
    apple: '/ichwal-icon.svg',
  },
  alternates: {
    canonical: 'https://walldev.my.id',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body className="antialiased">
        <Header />
        <PageTransition>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
