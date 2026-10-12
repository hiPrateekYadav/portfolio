import type { NextConfig } from 'next';

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/portfolio' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
};

export default nextConfig;
