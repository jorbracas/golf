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
  updated?: string                 // ISO date of last substantial revision
  sources?: [string, string][]     // [label, url] references used for facts
  tool?: string                    // id of an interactive calculator to embed (see components/tools)
  image?: string                   // /images/articles/<slug>.webp
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  related?: string[]               // hand-picked internal links (paths)
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
  const results = loadArticles()
    .filter((a) => a.category === category)
    .sort((a, b) => a.title.localeCompare(b.title))
  return limit ? results.slice(0, limit) : results
}

// ---- related articles: same category, ranked by keyword overlap ----------------
const STOP = new Set(['best', 'top', 'golf', 'the', 'a', 'an', 'for', 'of', 'to', 'and', 'in', 'on', 'with', 'how', 'guide', 'review', 'vs'])
function terms(a: ShopArticle): Set<string> {
  return new Set(
    `${a.primaryKeyword} ${a.slug.replace(/-/g, ' ')}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w && !STOP.has(w))
      .map((w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w)),
  )
}

export function getRelatedShopArticles(slug: string, category: string, limit = 6): ShopArticle[] {
  const me = getShopArticle(slug)
  const mine = me ? terms(me) : new Set<string>()
  const pool = loadArticles().filter((a) => a.category === category && a.slug !== slug)
  const scored = pool.map((a) => {
    const t = terms(a)
    let overlap = 0
    t.forEach((w) => mine.has(w) && overlap++)
    // deterministic tie-break so every page links to a different spread of siblings
    let h = 0
    for (const c of a.slug + slug) h = (h * 31 + c.charCodeAt(0)) >>> 0
    return { a, s: overlap * 1000 + (h % 997) }
  })
  return scored.sort((x, y) => y.s - x.s).slice(0, limit).map((x) => x.a)
}

// ---- categories ------------------------------------------------------------------
export const SHOP_CATEGORIES = [
  'Indoor & Practice',
  'Clubs & Shafts',
  'Golf Balls',
  'Bags & Push Carts',
  'Rangefinders & GPS',
  'Apparel & Shoes',
  'Accessories',
  'Golf Carts',
  'Golf Basics',
] as const

export const CATEGORY_INTROS: Record<string, string> = {
  'Indoor & Practice':
    'Launch monitors, hitting nets and mats, putting greens, simulator screens and training aids — everything for practising at home or building an indoor setup.',
  'Clubs & Shafts':
    'Drivers, irons, wedges and putters, plus the shafts and grips that make them fit your swing: how to choose, what the specs mean and when to upgrade.',
  'Golf Balls':
    'How ball construction, compression and spin affect your game, and which balls suit different swing speeds and budgets.',
  'Bags & Push Carts':
    'Stand, cart and travel bags, push trolleys and the storage details that matter on the course.',
  'Rangefinders & GPS':
    'Laser rangefinders, GPS watches and speakers: accuracy, slope, battery life and which features are worth paying for.',
  'Apparel & Shoes':
    'Golf shoes, gloves, rain gear and on-course clothing — fit, materials and what works in different conditions.',
  'Accessories':
    'Tees, ball markers, towels, headcovers, umbrellas and gift ideas for golfers.',
  'Golf Carts':
    'A focused section on personal golf carts: batteries and chargers, conversions, body kits, wheels and the most common maintenance jobs.',
  'Golf Basics':
    'Scoring, handicaps, how long a round takes, what to bring and what everything is called: straight answers to the questions new and improving golfers ask.',
}

export const CATEGORY_IMAGES: Record<string, string> = {
  'Indoor & Practice': '/images/covers/cat-indoor.webp',
  'Clubs & Shafts': '/images/covers/cat-clubs.webp',
  'Golf Balls': '/images/covers/cat-balls.webp',
  'Bags & Push Carts': '/images/covers/cat-bags.webp',
  'Rangefinders & GPS': '/images/covers/cat-rangefinders.webp',
  'Apparel & Shoes': '/images/covers/cat-apparel.webp',
  'Accessories': '/images/covers/cat-accessories.webp',
  'Golf Carts': '/images/covers/cat-carts.webp',
  'Golf Basics': '/images/covers/cat-basics.webp',
  'Golf Equipment': '/images/covers/cat-clubs.webp',
}

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function categoryFromSlug(slug: string): string | undefined {
  return SHOP_CATEGORIES.find((c) => categorySlug(c) === slug)
}
