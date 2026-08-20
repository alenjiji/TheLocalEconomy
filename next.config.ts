import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  
  images: {
    // Hero art is composed at exact design coordinates; keep the source pixels intact.
    unoptimized: true,
  },
};

export default nextConfig;
