/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailing slashes are normalised in middleware so legacy URLs resolve in a single 301
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
}

module.exports = nextConfig
