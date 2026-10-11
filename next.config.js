/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailing slashes are normalised in middleware so legacy URLs resolve in a single 301
  skipTrailingSlashRedirect: true,
  // legacy agency image URLs that still have backlinks (middleware skips image extensions)
  async redirects() {
    return [
      { source: '/wp-content/themes/4sports-golf/images/edoardo-molinari/:path*', destination: '/players/edoardo-molinari', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
}

module.exports = nextConfig
