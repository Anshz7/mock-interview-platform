import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: "C:\\Users\\Ansh Shrivastava\\Desktop\\mock_interview_platform"
  }
};

export default nextConfig;
