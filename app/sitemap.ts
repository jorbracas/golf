import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/posts'
import { getAllNewBlogSlugs } from '@/lib/blogArticles'
import { getAllShopSlugs } from '@/lib/shopArticles'

const BASE = 'https://4sportsgolf.com'

// Regenerate sitemap at most once per day — avoids dynamic rendering on every crawl request
export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = [...getAllPostSlugs(), ...getAllNewBlogSlugs()]
  const shopSlugs = getAllShopSlugs()
  const buildDate = new Date('2025-01-01') // static date — update when content changes significantly

  return [
    { url: BASE, lastModified: buildDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/shop`, lastModified: buildDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: buildDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/players`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/disclosure`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/impressum`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...shopSlugs.map((slug) => ({
      url: `${BASE}/shop/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
