import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { products, categories } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Golf Equipment Shop',
  description: 'Tour-tested golf equipment curated by 4Sports Golf professionals. Irons, balls, putters and more.',
}

const AMAZON_TAG = 'yourtag-21' // Replace with your actual Amazon Associates tag

export default function ShopPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Equipment</p>
          <h1 className="display-heading text-5xl sm:text-6xl text-stone-100 mb-6">The Pro Shop</h1>
          <div className="divider-gold" />
          <p className="text-stone-400 max-w-xl mt-6 font-body leading-relaxed text-lg">
            Every product curated and validated at tour level. Equipment our professionals actually put in the bag.
          </p>
          <p className="text-stone-600 text-xs mt-4 font-body">
            As an Amazon Associate, 4Sports Golf earns from qualifying purchases. Prices shown are approximate and may vary.
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="sticky top-16 z-40 bg-fairway-900/95 backdrop-blur-sm border-b border-fairway-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`whitespace-nowrap text-xs font-body tracking-wide px-4 py-2 border cursor-pointer transition-colors flex-shrink-0 ${
                  cat === 'All'
                    ? 'border-gold-500 text-gold-400 bg-gold-500/10'
                    : 'border-fairway-700 text-stone-500 hover:border-gold-600 hover:text-stone-300'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const amazonUrl = `https://www.amazon.co.uk/dp/${product.asin}?tag=${AMAZON_TAG}`
              return (
                <div key={product.id} className="group card-dark flex flex-col overflow-hidden hover:border-gold-500 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-fairway-700">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fairway-800/60 to-transparent" />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold-500 text-fairway-900 text-xs font-body font-bold px-2 py-0.5 uppercase tracking-wide">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-body text-stone-400 bg-fairway-900/80 px-2 py-0.5">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-gold-500 text-xs font-body tracking-widest uppercase mb-1">{product.brand}</p>
                    <h3 className="display-heading text-lg text-stone-100 mb-2 group-hover:text-gold-300 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-stone-400 text-xs font-body leading-relaxed mb-4 flex-1 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-1 mb-4">
                      {product.features.slice(0, 2).map((f) => (
                        <li key={f} className="text-xs text-stone-500 font-body flex items-start gap-2">
                          <span className="text-gold-600 mt-0.5 flex-shrink-0">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {product.who_uses && (
                      <p className="text-xs text-stone-500 font-body mb-4 italic">
                        Used by: <span className="text-gold-500 not-italic">{product.who_uses}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-fairway-700">
                      <span className="font-display text-xl text-stone-100">
                        {product.price_from}
                        <span className="text-stone-500 text-xs font-body ml-1">from</span>
                      </span>
                      <a
                        href={amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="btn-gold text-xs py-2 px-4"
                      >
                        Amazon →
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-t border-fairway-700">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-stone-600 text-xs font-body leading-relaxed">
            4Sports Golf is a participant in the Amazon Services LLC Associates Program, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.co.uk. Prices and availability are subject to change. Last updated prices may differ from current Amazon listings.
          </p>
        </div>
      </section>
    </div>
  )
}
