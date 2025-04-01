import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const ASSET_PREFIX = isProd ? process.env.NEXT_PUBLIC_CDN_HOST : "";

const nextConfig: NextConfig = {
  assetPrefix: ASSET_PREFIX,
};

export default nextConfig;
