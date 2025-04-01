import type { NextConfig } from "next";
import path from "path";

// console.log('ENV CHECK:', process.env.NEXT_PUBLIC_BASE_URL);

const nextConfig: NextConfig = {
  trailingSlash: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, "src/styles")],
    prependData: `@import "@/styles/base.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
};

export default nextConfig;
