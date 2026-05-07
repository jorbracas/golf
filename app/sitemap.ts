import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/posts'
import { getAllNewBlogSlugs } from '@/lib/blogArticles'
import { getAllShopSlugs } from '@/lib/shopArticles'

const BASE = 'https://4sportsgolf.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = [...getAllPostSlugs(), ...getAllNewBlogSlugs()]
  const shopSlugs = getAllShopSlugs()

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/players`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/impressum`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...shopSlugs.map((slug) => ({
      url: `${BASE}/shop/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
