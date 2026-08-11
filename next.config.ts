import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/guides/best-dpi-for-print",
        destination: "/guides/72-vs-300-dpi",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "yesdpi.vercel.app" }],
        destination: "https://www.yesdpi.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
