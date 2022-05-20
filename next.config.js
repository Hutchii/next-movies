/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["movies.luckyseven.li"],
  },
  // optimizeFonts: false,
};

module.exports = nextConfig;
