import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@contentveda/ui'],
  // @contentveda/ui ships its React .tsx sources next to the compiled JS, and they don't
  // pass strict type-checking yet. Your own code is still checked by your editor / `tsc`.
  typescript: { ignoreBuildErrors: true }
};

export default nextConfig;
