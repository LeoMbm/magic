module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "gatherer.wizards.com",
        port: "",
        pathname: "/Handlers/**",
      },
    ],
  },
};
