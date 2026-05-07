import fs from 'fs'
import path from 'path'

export type AmazonLink = [string, string] // [anchorText, url]

export type FAQ = { question: string; answer: string }

export type ShopArticle = {
  slug: string
  title: string
  metaDescription: string
  content: string
  primaryKeyword: string
  category: string
  date: string
  readTime: string
  faq: FAQ[]
  amazonLinks: AmazonLink[]
}

// Module-level cache — parsed once per build process
let _articles: ShopArticle[] | null = null
let _bySlug: Map<string, ShopArticle> | null = null

function loadArticles(): ShopArticle[] {
  if (_articles) return _articles
  const filePath = path.join(process.cwd(), 'data', 'shop-articles.json')
  _articles = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ShopArticle[]
  return _articles
}

function getBySlugMap(): Map<string, ShopArticle> {
  if (_bySlug) return _bySlug
  _bySlug = new Map(loadArticles().map((a) => [a.slug, a]))
  return _bySlug
}

export function getShopArticle(slug: string): ShopArticle | undefined {
  return getBySlugMap().get(slug)
}

export function getAllShopSlugs(): string[] {
  return loadArticles().map((a) => a.slug)
}

export function getShopArticlesByCategory(category: string, limit?: number): ShopArticle[] {
  const results = loadArticles().filter((a) => a.category === category)
  return limit ? results.slice(0, limit) : results
}

export function getRelatedShopArticles(slug: string, category: string, limit = 4): ShopArticle[] {
  return loadArticles()
    .filter((a) => a.category === category && a.slug !== slug)
    .slice(0, limit)
}

export const SHOP_CATEGORIES = [
  'Golf Carts',
  'Golf Balls',
  'Golf Bags',
  'Clubs & Shafts',
  'Apparel',
  'Accessories',
  'Power & Batteries',
  'Disc Golf',
  'Golf Equipment',
] as const

export const CATEGORY_IMAGES: Record<string, string> = {
  'Golf Carts': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
  'Golf Balls': 'https://images.unsplash.com/photo-1593111774240-d529f12cf4ce?w=800&q=80',
  'Golf Bags': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
  'Clubs & Shafts': 'https://images.unsplash.com/photo-1611374243504-de7b19e79b8f?w=800&q=80',
  'Apparel': 'https://images.unsplash.com/photo-1560175400-e78e1a7b6f08?w=800&q=80',
  'Accessories': 'https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80',
  'Power & Batteries': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
  'Disc Golf': 'https://images.unsplash.com/photo-1560175400-e78e1a7b6f08?w=800&q=80',
  'Golf Equipment': 'https://images.unsplash.com/photo-1611374243504-de7b19e79b8f?w=800&q=80',
}
