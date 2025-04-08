import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const ASSET_PREFIX = isProd ? process.env.NEXT_PUBLIC_CDN_HOST : "";

const nextConfig: NextConfig = {
  reactStrictMode: false, //todo: remove for prod
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
      {
        protocol: 'https',
        hostname: 'd1t59tgpzgv8ca.cloudfront.net',
      },
    ],
  },  
  assetPrefix: ASSET_PREFIX,
};

export default nextConfig;
