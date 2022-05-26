module.exports = {
  async redirects() {
    return [
      {
        source: "/book2/:slug",
        destination: "/book2/:slug/0",
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
