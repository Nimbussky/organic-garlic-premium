import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local public/ images work out of the box.
    // unoptimized helps avoid sharp issues on some hosts and keeps deploys simple.
    unoptimized: true,
  },
  // Prevent build failures when env vars are missing (static fallbacks are already in place)
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
};

export default nextConfig;
