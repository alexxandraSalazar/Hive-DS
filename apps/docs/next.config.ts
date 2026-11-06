import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@alexxandraSalazar/hive-ui"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  reactStrictMode: true,
};

export default nextConfig;
