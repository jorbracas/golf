import { MetadataRoute } from 'next'
import { getAllPlayerSlugs } from '@/lib/players'
import { getAllPostSlugs } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://4sportsgolf.com'

  const playerRoutes = getAllPlayerSlugs().map((slug) => ({
    url: `${base}/players/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postRoutes = getAllPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/players`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...playerRoutes,
    ...postRoutes,
  ]
}
