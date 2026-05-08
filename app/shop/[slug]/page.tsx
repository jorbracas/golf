import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getShopArticle,
  getAllShopSlugs,
  getRelatedShopArticles,
  CATEGORY_IMAGES,
} from '@/lib/shopArticles'
import { renderMarkdown } from '@/lib/markdown'

type Props = { params: { slug: string } }

// No revalidate — fully static at build time
// Slugs not in generateStaticParams → 404, never on-demand ISR
export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllShopSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getShopArticle(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://4sportsgolf.com/shop/${article.slug}`,
      type: 'article',
      images: [{ url: CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['Golf Equipment'], width: 800, height: 600 }],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.metaDescription },
    alternates: { canonical: `https://4sportsgolf.com/shop/${article.slug}` },
  }
}

export default function ShopArticlePage({ params }: Props) {
  const article = getShopArticle(params.slug)
  if (!article) notFound()

  const related = getRelatedShopArticles(article.slug, article.category, 4)
  const categoryImage = CATEGORY_IMAGES[article.category] || CATEGORY_IMAGES['Golf Equipment']

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    url: `https://4sportsgolf.com/shop/${article.slug}`,
    author: { '@type': 'Organization', name: '4Sports Golf', url: 'https://4sportsgolf.com' },
    publisher: { '@type': 'Organization', name: '4Sports Golf', url: 'https://4sportsgolf.com' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-16">
        {/* Header */}
        <section
          className="py-16 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,21,17,0.85), rgba(15,21,17,0.95)), url(${categoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <Link href="/shop" className="text-stone-500 text-xs font-body hover:text-gold-400 transition-colors">
                ← Pro Shop
              </Link>
              <span className="text-stone-700 text-xs">·</span>
              <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-3 py-1 uppercase tracking-wide">
                {article.category}
              </span>
            </div>
            <h1 className="display-heading text-3xl sm:text-4xl text-stone-100 mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-stone-400 font-body text-base mb-5 max-w-2xl">{article.metaDescription}</p>
            <div className="flex items-center gap-4 text-xs text-stone-500 font-body">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime} read</span>
            </div>
            {/* Affiliate disclosure */}
            <p className="text-stone-600 text-xs font-body mt-4 italic">
              As an Amazon Associate, 4Sports Golf earns from qualifying purchases. Links marked with → go to Amazon.
            </p>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Article */}
              <article className="lg:col-span-2">
                {/* Top Amazon CTA */}
                <div className="bg-fairway-800 border border-gold-600/40 p-5 mb-8 space-y-3">
                  <p className="text-gold-400 text-xs font-body font-semibold uppercase tracking-widest mb-3">
                    🛒 Recommended on Amazon
                  </p>
                  {article.amazonLinks.map(([anchor, url], i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-between w-full bg-fairway-700 hover:bg-fairway-600 border border-fairway-600 hover:border-gold-500 px-4 py-3 transition-all group"
                    >
                      <span className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors">
                        {anchor}
                      </span>
                      <span className="text-gold-500 text-xs font-body ml-3 flex-shrink-0">Amazon →</span>
                    </a>
                  ))}
                </div>

                {/* Article body */}
                <div className="prose-golf">
                  {renderMarkdown(article.content)}
                </div>

                {/* FAQ */}
                {article.faq && article.faq.length > 0 && (
                  <div className="mt-10">
                    <h2 className="display-heading text-xl text-stone-100 mb-6 border-b border-fairway-700 pb-2">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {article.faq.map((item, i) => (
                        <div key={i} className="card-dark p-5">
                          <p className="text-stone-200 font-body text-sm font-semibold mb-2">{item.question}</p>
                          <p className="text-stone-400 font-body text-sm leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Amazon CTA */}
                <div className="mt-10 bg-fairway-800 border border-gold-600/40 p-6">
                  <p className="text-gold-400 text-sm font-body font-semibold mb-4">
                    Ready to buy? Check current prices on Amazon:
                  </p>
                  <div className="space-y-2">
                    {article.amazonLinks.slice(0, 2).map(([anchor, url], i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="btn-gold text-xs py-2.5 px-5 w-full justify-center block text-center"
                      >
                        {anchor} →
                      </a>
                    ))}
                  </div>
                  <p className="text-stone-600 text-xs font-body mt-4">
                    Prices and availability are determined by Amazon. 4Sports Golf may earn a commission.
                  </p>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Quick links */}
                <div className="card-dark p-5">
                  <p className="section-label mb-4">In This Guide</p>
                  <ul className="space-y-2">
                    {article.amazonLinks.map(([anchor, url], i) => (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="text-stone-400 text-xs font-body hover:text-gold-300 transition-colors flex items-start gap-2"
                        >
                          <span className="text-gold-600 flex-shrink-0">→</span>
                          <span>{anchor}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related articles */}
                {related.length > 0 && (
                  <div className="card-dark p-5">
                    <p className="section-label mb-4">More in {article.category}</p>
                    <div className="space-y-4">
                      {related.map((rel) => (
                        <Link key={rel.slug} href={`/shop/${rel.slug}`} className="group block">
                          <h4 className="text-stone-300 text-xs font-body group-hover:text-gold-300 transition-colors leading-snug mb-1">
                            {rel.title}
                          </h4>
                          <p className="text-stone-600 text-xs font-body">{rel.readTime} read</p>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/shop#${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gold-500 hover:text-gold-300 text-xs font-body mt-4 block transition-colors"
                    >
                      Browse all {article.category} →
                    </Link>
                  </div>
                )}

                {/* Disclosure */}
                <div className="card-dark p-5">
                  <p className="section-label mb-3">Disclosure</p>
                  <p className="text-stone-500 text-xs font-body leading-relaxed">
                    4Sports Golf participates in the Amazon Associates Program. We may earn a commission when you click
                    Amazon links at no extra cost to you.{' '}
                    <Link href="/disclosure" className="text-gold-600 hover:text-gold-400 transition-colors">
                      Full disclosure →
                    </Link>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Back */}
        <div className="py-6 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <Link href="/shop" className="text-gold-500 hover:text-gold-300 text-sm font-body tracking-wide transition-colors">
              ← Back to Pro Shop
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
