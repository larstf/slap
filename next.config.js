/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          }
        }
      }],
    });

    return config;
  },
}

module.exports = nextConfig
