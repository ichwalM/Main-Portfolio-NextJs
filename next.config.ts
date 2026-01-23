import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
    // Allow localhost images
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
