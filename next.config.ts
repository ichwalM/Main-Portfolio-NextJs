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
    unoptimized: process.env.NODE_ENV === 'development',
  },
  output: 'standalone',

  // Prevent ChunkLoadError: tell browsers NOT to cache JS chunks indefinitely.
  // Next.js chunk filenames already include content hashes, so no-cache here
  // means the browser re-validates (gets 304 if unchanged, or fresh chunk if new build).
  async headers() {
    return [
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
