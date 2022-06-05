/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["example.com"],
  },
  // optimizeFonts: false,
};

module.exports = nextConfig;
