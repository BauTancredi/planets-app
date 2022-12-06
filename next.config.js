/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/earth",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
