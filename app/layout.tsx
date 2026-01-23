import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Ichwal - Full Stack Developer Portfolio",
  description: "Passionate Full Stack Developer specializing in modern web technologies. Explore my projects, skills, and blog posts.",
  keywords: ["Full Stack Developer", "Web Development", "Next.js", "React", "TypeScript", "Portfolio"],
  authors: [{ name: "Ichwal" }],
  openGraph: {
    title: "Ichwal - Full Stack Developer Portfolio",
    description: "Passionate Full Stack Developer specializing in modern web technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ichwal - Full Stack Developer Portfolio",
    description: "Passionate Full Stack Developer specializing in modern web technologies",
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
        <Preloader />
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
