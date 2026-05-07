import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { posts } from '@/lib/posts'
import { getNewBlogArticles } from '@/lib/blogArticles'

export const metadata: Metadata = {
  title: 'Golf Blog — Tips, Technique & Tour Coverage',
  description: 'In-depth golf articles: tour previews, equipment guides, technique how-tos, golf cart maintenance, and more.',
}

export default function BlogPage() {
  const newArticles = getNewBlogArticles()
  const featured = posts.filter((p) => p.featured)
  const regular = posts.filter((p) => !p.featured)

  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Journal</p>
          <h1 className="display-heading text-5xl sm:text-6xl text-stone-100 mb-6">The Fairway Journal</h1>
          <div className="divider-gold" />
          <p className="text-stone-400 max-w-xl mt-6 font-body leading-relaxed text-lg">
            Tour coverage, equipment deep-dives, technique guides, and practical how-tos for every golfer.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-8">Featured</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative overflow-hidden card-dark hover:border-gold-500 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-fairway-900 via-fairway-900/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="text-gold-500 text-xs font-body tracking-widest uppercase mb-2 block">{post.category}</span>
                    <h2 className="display-heading text-2xl text-stone-100 mb-2 group-hover:text-gold-300 transition-colors leading-snug">{post.title}</h2>
                    <p className="text-stone-400 text-sm font-body line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-body">
                      <span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular posts */}
      {regular.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-6">Tour & Equipment</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group card-dark overflow-hidden hover:border-gold-500 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-fairway-900/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <span className="text-gold-500 text-xs font-body tracking-widest uppercase mb-2 block">{post.category}</span>
                    <h3 className="display-heading text-lg text-stone-100 mb-2 group-hover:text-gold-300 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-stone-400 text-xs font-body line-clamp-2 mb-3">{post.excerpt}</p>
                    <p className="text-stone-600 text-xs font-body">{post.readTime} read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How-To articles (from Excel) */}
      {newArticles.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-t border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-3">How-To Guides</p>
            <h2 className="display-heading text-3xl text-stone-100 mb-2">Practical Golf Guides</h2>
            <p className="text-stone-500 font-body text-sm mb-8">
              Step-by-step guides for improving your game, maintaining your equipment, and more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {newArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group card-dark p-5 hover:border-gold-500 transition-all duration-200"
                >
                  <span className="text-gold-600 text-xs font-body tracking-widest uppercase mb-2 block">{article.category}</span>
                  <h3 className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-xs font-body line-clamp-2 mb-3">{article.metaDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600 text-xs font-body">{article.readTime} read</span>
                    <span className="text-gold-600 text-xs font-body group-hover:text-gold-400 transition-colors">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
