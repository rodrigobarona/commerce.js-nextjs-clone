import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["@prood/commerce"],
}

export default nextConfig
