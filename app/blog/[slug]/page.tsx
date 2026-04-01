import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, posts } from '@/lib/posts'
import { getPlayerBySlug } from '@/lib/players'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const description = post.excerpt.length > 155 ? post.excerpt.slice(0, 152) + '…' : post.excerpt

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `https://4sportsgolf.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://4sportsgolf.com/blog/${post.slug}`,
    },
  }
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n')
  return paragraphs.map((para, i) => {
    if (para.startsWith('## ')) {
      return <h2 key={i}>{para.replace('## ', '')}</h2>
    }
    if (para.startsWith('**') && para.includes('**:')) {
      const parts = para.split('\n').map((line, j) => (
        <p key={j}>{line}</p>
      ))
      return <div key={i}>{parts}</div>
    }
    return <p key={i}>{para}</p>
  })
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPlayers = post.relatedPlayers?.map((slug) => getPlayerBySlug(slug)).filter(Boolean) ?? []
  const relatedPosts = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)

  // JSON-LD structured data (BlogPosting schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://4sportsgolf.com/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: '4Sports Golf',
      url: 'https://4sportsgolf.com',
    },
    publisher: {
      '@type': 'Organization',
      name: '4Sports Golf',
      url: 'https://4sportsgolf.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://4sportsgolf.com/opengraph-image',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://4sportsgolf.com/blog/${post.slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-16">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fairway-900 via-fairway-900/50 to-fairway-900/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-3 py-1 uppercase tracking-wide inline-block mb-4">
              {post.category}
            </span>
            <h1 className="display-heading text-3xl sm:text-5xl text-stone-100 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-stone-400 font-body">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

              {/* Article */}
              <article className="lg:col-span-2">
                <p className="text-stone-300 text-lg font-body leading-relaxed mb-8 border-l-2 border-gold-500 pl-6 italic">
                  {post.excerpt}
                </p>
                <div className="prose-golf">
                  {renderContent(post.content)}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Related players */}
                {relatedPlayers.length > 0 && (
                  <div className="card-dark p-6">
                    <p className="section-label mb-5">Featured Players</p>
                    <div className="space-y-4">
                      {relatedPlayers.map((player) => player && (
                        <Link
                          key={player.slug}
                          href={`/players/${player.slug}`}
                          className="flex items-center gap-4 group"
                        >
                          <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                            <Image
                              src={player.image}
                              alt={player.name}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <p className="text-stone-200 text-sm font-body font-semibold group-hover:text-gold-300 transition-colors">
                              {player.name}
                            </p>
                            <p className="text-stone-500 text-xs font-body">{player.nationality}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="card-dark p-6">
                    <p className="section-label mb-5">More in {post.category}</p>
                    <div className="space-y-5">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                          <h4 className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors mb-1 leading-snug">
                            {rp.title}
                          </h4>
                          <p className="text-stone-600 text-xs font-body">{rp.readTime} read</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shop CTA */}
                <div className="card-dark p-6 border-gold-600/30">
                  <p className="section-label mb-3">Equipment</p>
                  <h3 className="display-heading text-lg text-stone-100 mb-3">
                    Shop Tour-Tested Gear
                  </h3>
                  <p className="text-stone-400 text-sm font-body mb-5">
                    Curated equipment used by our professional players.
                  </p>
                  <Link href="/shop" className="btn-gold text-xs py-2 px-4 w-full justify-center">
                    Browse Shop →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Back */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <Link href="/blog" className="text-gold-500 hover:text-gold-300 text-sm font-body tracking-wide transition-colors">
              ← All Articles
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
