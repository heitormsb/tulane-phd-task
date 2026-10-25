import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Two root layouts (Portuguese and English), so the 404 page for unknown addresses lives in app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
