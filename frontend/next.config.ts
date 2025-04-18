import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: "/api/clients",
        destination: process.env.BACKEND_URL || "http://backend:8000/api/clients/",
      },
    ]
  },
  
  images: {
    domains: ['s3-alpha-sig.figma.com', 'localhost'],
  },
};

export default nextConfig;