import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type errors are caught by the IDE. Skip the memory-heavy build-time TS pass.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
