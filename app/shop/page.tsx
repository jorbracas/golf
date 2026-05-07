import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { products, categories } from '@/lib/products'
import { getShopArticlesByCategory, SHOP_CATEGORIES, CATEGORY_IMAGES } from '@/lib/shopArticles'

export const metadata: Metadata = {
  title: 'Golf Equipment Shop & Buying Guides',
  description:
    'Tour-tested golf equipment curated by 4Sports Golf professionals. Plus hundreds of buying guides for golf carts, balls, clubs, apparel and more.',
}

export default function ShopPage() {
  const categoryPreviews = SHOP_CATEGORIES.filter((c) => c !== 'Golf Equipment').map((cat) => ({
    category: cat,
    articles: getShopArticlesByCategory(cat, 6),
    image: CATEGORY_IMAGES[cat],
    total: getShopArticlesByCategory(cat).length,
  })).filter((c) => c.articles.length > 0)

  const golfEquipmentArticles = getShopArticlesByCategory('Golf Equipment', 6)
  const golfEquipmentTotal = getShopArticlesByCategory('Golf Equipment').length

  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Equipment</p>
          <h1 className="display-heading text-5xl sm:text-6xl text-stone-100 mb-6">The Pro Shop</h1>
          <div className="divider-gold" />
          <p className="text-stone-400 max-w-2xl mt-6 font-body leading-relaxed text-lg">
            Tour-tested gear and comprehensive buying guides — everything you need to choose the right equipment.
          </p>
          <p className="text-stone-600 text-xs mt-4 font-body">
            As an Amazon Associate, 4Sports Golf earns from qualifying purchases.
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-40 bg-fairway-900/95 backdrop-blur-sm border-b border-fairway-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <span key={cat} className={`whitespace-nowrap text-xs font-body tracking-wide px-4 py-2 border cursor-pointer transition-colors flex-shrink-0 ${cat === 'All' ? 'border-gold-500 text-gold-400 bg-gold-500/10' : 'border-fairway-700 text-stone-500 hover:border-gold-600 hover:text-stone-300'}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-3">Tour Selected</p>
          <h2 className="display-heading text-3xl text-stone-100 mb-8">Curated Equipment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group card-dark flex flex-col overflow-hidden hover:border-gold-500 transition-all duration-300">
                <div className="relative h-52 overflow-hidden bg-fairway-700">
                  <Image src={product.image} alt={product.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-fairway-800/60 to-transparent" />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold-500 text-fairway-900 text-xs font-body font-bold px-2 py-0.5 uppercase tracking-wide">{product.badge}</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-body text-stone-400 bg-fairway-900/80 px-2 py-0.5">{product.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gold-500 text-xs font-body tracking-widest uppercase mb-1">{product.brand}</p>
                  <h3 className="display-heading text-lg text-stone-100 mb-2 group-hover:text-gold-300 transition-colors leading-snug">{product.name}</h3>
                  <p className="text-stone-400 text-xs font-body leading-relaxed mb-4 flex-1 line-clamp-3">{product.description}</p>
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 2).map((f) => (
                      <li key={f} className="text-xs text-stone-500 font-body flex items-start gap-2">
                        <span className="text-gold-600 mt-0.5 flex-shrink-0">—</span>{f}
                      </li>
                    ))}
                  </ul>
                  {product.who_uses && (
                    <p className="text-xs text-stone-500 font-body mb-4 italic">
                      Used by: <span className="text-gold-500 not-italic">{product.who_uses}</span>
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-fairway-700">
                    <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-gold text-xs py-2 px-4 w-full justify-center">
                      Check price on Amazon →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Guides */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-t border-fairway-700">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-3">Buying Guides</p>
          <h2 className="display-heading text-3xl text-stone-100 mb-2">Find the Right Gear</h2>
          <p className="text-stone-500 font-body text-sm mb-10">
            In-depth guides to help you choose the best equipment for any budget.
          </p>

          {categoryPreviews.map(({ category, articles, image, total }) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-14 last:mb-0">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-8 h-8 overflow-hidden flex-shrink-0 rounded-sm">
                  <Image src={image} alt={category} fill className="object-cover" sizes="32px" />
                </div>
                <h3 className="display-heading text-xl text-stone-100">{category}</h3>
                <span className="text-stone-600 text-xs font-body">— {total} guides</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {articles.map((article) => (
                  <Link key={article.slug} href={`/shop/${article.slug}`} className="group card-dark p-4 hover:border-gold-500 transition-all duration-200">
                    <h4 className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors leading-snug mb-2">{article.title}</h4>
                    <p className="text-stone-600 text-xs font-body line-clamp-2 mb-3">{article.metaDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 text-xs font-body">{article.readTime} read</span>
                      <span className="text-gold-600 text-xs font-body group-hover:text-gold-400 transition-colors">Read guide →</span>
                    </div>
                  </Link>
                ))}
              </div>
              {total > 6 && (
                <p className="text-stone-500 text-xs font-body">
                  Showing 6 of {total} guides in {category}. Browse individual guides above or use Google to find specific topics.
                </p>
              )}
            </div>
          ))}

          {golfEquipmentArticles.length > 0 && (
            <div id="golf-equipment" className="mb-14">
              <div className="flex items-center gap-4 mb-5">
                <h3 className="display-heading text-xl text-stone-100">Golf Equipment</h3>
                <span className="text-stone-600 text-xs font-body">— {golfEquipmentTotal} guides</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {golfEquipmentArticles.map((article) => (
                  <Link key={article.slug} href={`/shop/${article.slug}`} className="group card-dark p-4 hover:border-gold-500 transition-all duration-200">
                    <h4 className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors leading-snug mb-2">{article.title}</h4>
                    <p className="text-stone-600 text-xs font-body line-clamp-2 mb-3">{article.metaDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 text-xs font-body">{article.readTime} read</span>
                      <span className="text-gold-600 text-xs font-body group-hover:text-gold-400 transition-colors">Read guide →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-stone-600 text-xs font-body leading-relaxed">
            4Sports Golf is a participant in the Amazon Services LLC Associates Program, an affiliate advertising programme
            designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com.
            Product availability and pricing are determined solely by Amazon.
          </p>
        </div>
      </section>
    </div>
  )
}
