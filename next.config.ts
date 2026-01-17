import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow cross-origin requests from your network IP during development
  // This resolves the warning about accessing dev server from 100.64.100.6
  allowedDevOrigins: ["100.64.100.6"],
  // Fix workspace root detection for Turbopack
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
