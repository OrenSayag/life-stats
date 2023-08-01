/** @type {import('next').NextConfig} */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        // google
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
};

module.exports = nextConfig;
