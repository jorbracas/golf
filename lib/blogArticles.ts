import fs from 'fs'
import path from 'path'
import type { FAQ, AmazonLink } from './shopArticles'

export type BlogArticle = {
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
  isNew: true
}

let _articles: BlogArticle[] | null = null
let _bySlug: Map<string, BlogArticle> | null = null

function loadArticles(): BlogArticle[] {
  if (_articles) return _articles
  const filePath = path.join(process.cwd(), 'data', 'blog-articles.json')
  _articles = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as BlogArticle[]
  // Tag all as "new" source
  _articles = _articles.map((a) => ({ ...a, isNew: true as const }))
  return _articles
}

function getBySlugMap(): Map<string, BlogArticle> {
  if (_bySlug) return _bySlug
  _bySlug = new Map(loadArticles().map((a) => [a.slug, a]))
  return _bySlug
}

export function getNewBlogArticle(slug: string): BlogArticle | undefined {
  return getBySlugMap().get(slug)
}

export function getAllNewBlogSlugs(): string[] {
  return loadArticles().map((a) => a.slug)
}

export function getNewBlogArticles(limit?: number): BlogArticle[] {
  const all = loadArticles()
  return limit ? all.slice(0, limit) : all
}

export function getNewBlogArticlesByCategory(category: string): BlogArticle[] {
  return loadArticles().filter((a) => a.category === category)
}

export const BLOG_CATEGORIES = ['Golf Cart', 'Technique', 'Maintenance', 'Disc Golf', 'How To'] as const
