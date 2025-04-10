import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath: "",
  images: {
    unoptimized: true,
  },
  assetPrefix: "/ssx-next-js-assets",
  sassOptions: {
    includePaths: [path.resolve(__dirname, "src/styles")],
    prependData: `@import "@/styles/base.scss";`,
  },
};

export default nextConfig;
