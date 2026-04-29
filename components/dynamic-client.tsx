'use client';

import dynamic from 'next/dynamic';

// Client-only dynamic imports (ssr: false not allowed in Server Components)
export const GithubStatsClient = dynamic(
  () => import('@/components/sections/GithubStats'),
  {
    ssr: false,
    loading: () => (
      <div className="py-24 animate-pulse">
        <div className="container mx-auto px-6">
          <div className="h-4 w-24 bg-border rounded mb-6" />
          <div className="h-12 w-64 bg-border rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-border rounded" />
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

export const ContactFormClient = dynamic(
  () => import('@/components/sections/ContactForm'),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 animate-pulse bg-border rounded" />
    ),
  }
);
