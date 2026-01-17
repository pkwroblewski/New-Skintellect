import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["100.64.100.6"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
