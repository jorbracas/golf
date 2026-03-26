import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Golf Blog',
  description: 'Tour analysis, equipment guides, player profiles, and insights from the world of professional golf.',
}

const categories = ['All', 'Tour Preview', 'Equipment', 'Explained', 'Travel', 'Psychology']

export default function BlogPage() {
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => p !== featured)

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Editorial</p>
          <h1 className="display-heading text-5xl sm:text-6xl text-stone-100 mb-6">The 4Sports Blog</h1>
          <div className="divider-gold" />
          <p className="text-stone-400 max-w-xl mt-6 font-body leading-relaxed text-lg">
            Tour analysis, equipment guides, and insights from the world of professional golf.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-8">Featured</p>
            <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 card-dark overflow-hidden hover:border-gold-500 transition-all duration-300">
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-3 py-1 uppercase tracking-wide self-start mb-4">
                  {featured.category}
                </span>
                <h2 className="display-heading text-3xl text-stone-100 mb-4 group-hover:text-gold-300 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-stone-400 font-body leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-stone-500 font-body mb-6">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
                <div className="text-gold-500 text-sm font-body tracking-wide">
                  Read article →
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category filter — visual only, can be made functional with client component */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`text-xs font-body tracking-wide px-4 py-2 border cursor-pointer transition-colors ${
                  cat === 'All'
                    ? 'border-gold-500 text-gold-400 bg-gold-500/10'
                    : 'border-fairway-700 text-stone-500 hover:border-gold-600 hover:text-stone-300'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group card-dark overflow-hidden flex flex-col hover:border-gold-500 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fairway-800/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-2 py-0.5 uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-body mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="display-heading text-lg text-stone-100 mb-3 group-hover:text-gold-300 transition-colors flex-1 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 text-sm font-body line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="text-gold-500 text-xs font-body tracking-wide">
                    Read →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
