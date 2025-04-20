import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: "/api/students",
        destination: process.env.BACKEND_URL || "http://backend:8000/api/students/",
      },
    ]
  },
  
  images: {
    domains: ['s3-alpha-sig.figma.com', 'localhost'],
  },
};

export default nextConfig;