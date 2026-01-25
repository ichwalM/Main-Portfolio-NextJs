import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '443',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.walldev.my.id',
        port: '443',
        pathname: '/storage/**',
      },
    ],
    // Allow localhost images
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
