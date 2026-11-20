import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Blog posts are read from disk at runtime too (e.g. an unknown slug), so ship them with the server.
  outputFileTracingIncludes: { "/*": ["./content/blog/**/*"] },
};

export default nextConfig;
