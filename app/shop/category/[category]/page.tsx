import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  SHOP_CATEGORIES,
  CATEGORY_INTROS,
  CATEGORY_IMAGES,
  categorySlug,
  categoryFromSlug,
  getShopArticlesByCategory,
} from '@/lib/shopArticles'

type Props = { params: { category: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return SHOP_CATEGORIES.filter((c) => getShopArticlesByCategory(c).length > 0).map((c) => ({ category: categorySlug(c) }))
}

export function generateMetadata({ params }: Props): Metadata {
  const category = categoryFromSlug(params.category)
  if (!category) return {}
  return {
    title: `${category} Guides`,
    description: CATEGORY_INTROS[category],
    alternates: { canonical: `https://www.4sportsgolf.com/shop/category/${params.category}` },
  }
}

export default function CategoryPage({ params }: Props) {
  const category = categoryFromSlug(params.category)
  if (!category) notFound()
  const articles = getShopArticlesByCategory(category)
  if (articles.length === 0) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Guides`,
    url: `https://www.4sportsgolf.com/shop/category/${params.category}`,
    hasPart: articles.map((a) => ({ '@type': 'Article', headline: a.title, url: `https://www.4sportsgolf.com/shop/${a.slug}` })),
  }

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,21,17,0.88), rgba(15,21,17,0.96)), url(${CATEGORY_IMAGES[category]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs font-body text-stone-500 mb-5" aria-label="Breadcrumb">
            <Link prefetch={false} href="/shop" className="hover:text-gold-400">Equipment guides</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-300">{category}</span>
          </nav>
          <h1 className="display-heading text-4xl sm:text-5xl text-stone-100 mb-5">{category}</h1>
          <p className="text-stone-300 font-body text-lg max-w-3xl leading-relaxed">{CATEGORY_INTROS[category]}</p>
          <p className="text-stone-500 text-xs font-body mt-4">{articles.length} guides</p>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((a) => (
            <Link prefetch={false} key={a.slug} href={`/shop/${a.slug}`} className="group card-dark p-5 hover:border-gold-500 transition-colors">
              <h2 className="text-stone-200 text-base font-body font-semibold group-hover:text-gold-300 transition-colors leading-snug mb-2">{a.title}</h2>
              <p className="text-stone-500 text-sm font-body line-clamp-2">{a.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-4">Other sections</p>
          <div className="flex flex-wrap gap-2">
            {SHOP_CATEGORIES.filter((c) => c !== category && getShopArticlesByCategory(c).length > 0).map((c) => (
              <Link prefetch={false} key={c} href={`/shop/category/${categorySlug(c)}`} className="text-xs font-body border border-fairway-700 text-stone-400 hover:border-gold-500 hover:text-gold-300 px-3 py-2 transition-colors">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
