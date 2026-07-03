/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nyayaai/shared'],
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
