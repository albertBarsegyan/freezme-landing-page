/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["."],
  },
  i18n,

  images: {
    domains: ["picsum.photos", "api.gitc.hy", "api.gitc.am"],
  },
};

module.exports = nextConfig;
