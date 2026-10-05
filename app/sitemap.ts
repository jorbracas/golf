import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/posts'
import { getAllNewBlogSlugs, getNewBlogArticle } from '@/lib/blogArticles'
import { getAllShopSlugs, getShopArticle, SHOP_CATEGORIES, categorySlug, getShopArticlesByCategory } from '@/lib/shopArticles'

const BASE = 'https://www.4sportsgolf.com'

// Regenerate sitemap at most once per day — avoids dynamic rendering on every crawl request
export const revalidate = 86400

function lastMod(a?: { updated?: string; date?: string }) {
  const d = a?.updated ?? a?.date
  return d ? new Date(d + 'T12:00:00Z') : new Date('2026-09-29')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = [...getAllPostSlugs(), ...getAllNewBlogSlugs()]
  const shopSlugs = getAllShopSlugs()
  const buildDate = new Date('2026-09-29') // date of the Sept 2026 content clean-up — update when content changes significantly

  return [
    { url: BASE, lastModified: buildDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/shop`, lastModified: buildDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: buildDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/players`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/disclosure`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/impressum`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    ...SHOP_CATEGORIES.filter((c) => getShopArticlesByCategory(c).length > 0).map((c) => ({
      url: `${BASE}/shop/category/${categorySlug(c)}`,
      lastModified: buildDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...['edoardo-molinari', 'andrea-pavan', 'richie-ramsay', 'eddie-pepperell'].map((slug) => ({
      url: `${BASE}/players/${slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: lastMod(getNewBlogArticle(slug)),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...shopSlugs.map((slug) => ({
      url: `${BASE}/shop/${slug}`,
      lastModified: lastMod(getShopArticle(slug)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
