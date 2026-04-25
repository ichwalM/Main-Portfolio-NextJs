import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'cms.walldev.my.id' },
      { protocol: 'https', hostname: 'cms.walldev.my.id' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
    ],
    dangerouslyAllowSVG: true,
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimize device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Longer cache for optimized images (1 year)
    minimumCacheTTL: 31536000,
  },
  output: 'standalone',

  // Enable gzip/brotli compression
  compress: true,

  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
    ],
  },

  async headers() {
    return [
      {
        // Aggressive cache for Next.js Image Optimization output
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // JS chunks with content-hash — revalidate on deploy
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // CSS and other static assets
        source: '/_next/static/(css|media|fonts)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Public directory assets
        source: '/(.*)\\.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
