/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize CSS loading
  experimental: {
    optimizeCss: true,
  },
  // Enable font optimization
  optimizeFonts: true,
  // Improve build performance
  swcMinify: true,
}

module.exports = nextConfig 