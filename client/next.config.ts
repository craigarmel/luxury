import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'storage.cloud.google.com'
    ]
  }
};

export default nextConfig;
