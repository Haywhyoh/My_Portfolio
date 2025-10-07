/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Experimental features (disabled due to missing dependencies)
  // experimental: {
  //   optimizeCss: true,
  // },
  // Enable font optimization
  optimizeFonts: true,
  // Improve build performance
  swcMinify: true,
  // Optimize for Edge Functions
  experimental: {
    // Reduce bundle size for Edge Functions
    optimizePackageImports: ['next/og'],
  },
}

module.exports = nextConfig 