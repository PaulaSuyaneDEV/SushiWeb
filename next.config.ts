import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [new URL('https://sushiweb-backend.onrender.com/public/**')],
  },
};

export default nextConfig;
