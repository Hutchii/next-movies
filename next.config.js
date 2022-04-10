/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
