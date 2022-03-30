/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["movies.luckyseven.li"],
    imageSizes: [],
    deviceSizes: [900, 1024, 1920],
  },
};

module.exports = nextConfig;
