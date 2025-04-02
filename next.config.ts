import type { NextConfig } from "next";
import path from "path";

// console.log('ENV CHECK:', process.env.NEXT_PUBLIC_BASE_URL);

const isProd = process.env.NODE_ENV === "production";
const ASSET_PREFIX = isProd ? process.env.NEXT_PUBLIC_CDN_HOST : "";

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
    unoptimized: true,
  },
  assetPrefix: ASSET_PREFIX,
};

export default nextConfig;
