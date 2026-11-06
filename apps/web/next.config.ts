import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@alexxandraSalazar/hive-ui"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
