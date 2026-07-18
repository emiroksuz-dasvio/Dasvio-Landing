import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // The "Jest worker encountered N child process exceptions" build failure comes
  // from the static-generation workers crashing — usually memory pressure (or an
  // antivirus locking .next) while one worker per CPU renders in parallel. This
  // site is only ~69 tiny static pages, so wide parallelism buys nothing: cap the
  // worker pool (cpus) to cut peak RAM, tolerate transient worker hiccups
  // (retryCount), and let Webpack trade a little build time for lower memory.
  experimental: {
    cpus: 2,
    webpackMemoryOptimizations: true,
    staticGenerationRetryCount: 3,
  },
};

export default nextConfig;
