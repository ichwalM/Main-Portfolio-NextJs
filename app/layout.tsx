import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://walldev.my.id'),
  title: {
    default: 'Ichwal - Full Stack Web Developer Portfolio and Network Administrator',
    template: '%s | Ichwal Portfolio',
  },
  description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies. Explore my projects, blog, and professional experience.',
  keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio', 'Ichwal'],
  authors: [{ name: 'Ichwal' }],
  creator: 'Ichwal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walldev.my.id',
    siteName: 'Ichwal Portfolio',
    title: 'Ichwal - Full Stack Web Developer Portfolio and Network Administrator',
    description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ichwal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ichwal - Full Stack Web Developer Portfolio and Network Administrator',
    description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
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
    <html lang="en" className={inter.variable}>
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
