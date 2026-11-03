import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript errors must be resolved before deploying to production.
  // ignoreBuildErrors is disabled to surface real type issues during builds.
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  images: {
    // Allow local images in /public
    remotePatterns: [],
  },
};

export default nextConfig;
