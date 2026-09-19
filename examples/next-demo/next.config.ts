import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@contentveda/ui'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
