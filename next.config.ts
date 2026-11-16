import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Hide the floating dev badge so it doesn't cover the message box in demos.
  devIndicators: false,
  partialPrefetching: true,
};

export default nextConfig;
