module.exports = {
  async redirects() {
    return [
      {
        source: "/book/:slug",
        destination: "/book/:slug/0",
        permanent: true
      },
      {
        source: "/book/:slug/:path(/.html/)",
        destination: "/book/:slug/:path",
        permanent: true
      }
    ];
  },
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = { fs: false };

    return config;
  }
};
