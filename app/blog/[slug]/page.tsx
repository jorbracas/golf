import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, posts } from '@/lib/posts'
import { getPlayerBySlug } from '@/lib/players'
import { getNewBlogArticle, getAllNewBlogSlugs } from '@/lib/blogArticles'
import { renderMarkdown } from '@/lib/markdown'

type Props = { params: { slug: string } }

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const existing = getAllPostSlugs().map((slug) => ({ slug }))
  const newBlog = getAllNewBlogSlugs().map((slug) => ({ slug }))
  return [...existing, ...newBlog]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (post) {
    const description = post.excerpt.length > 155 ? post.excerpt.slice(0, 152) + '…' : post.excerpt
    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title, description,
        url: `https://4sportsgolf.com/blog/${post.slug}`,
        type: 'article', publishedTime: post.date,
        images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      },
      twitter: { card: 'summary_large_image', title: post.title, description, images: [post.image] },
      alternates: { canonical: `https://4sportsgolf.com/blog/${post.slug}` },
    }
  }
  const newPost = getNewBlogArticle(params.slug)
  if (newPost) {
    return {
      title: newPost.title,
      description: newPost.metaDescription,
      openGraph: {
        title: newPost.title, description: newPost.metaDescription,
        url: `https://4sportsgolf.com/blog/${newPost.slug}`,
        type: 'article',
      },
      alternates: { canonical: `https://4sportsgolf.com/blog/${newPost.slug}` },
    }
  }
  return {}
}

// Original renderContent for legacy posts
function renderContent(content: string) {
  const paragraphs = content.split('\n\n')
  return paragraphs.map((para, i) => {
    if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>
    if (para.startsWith('**') && para.includes('**:')) {
      return <div key={i}>{para.split('\n').map((line, j) => <p key={j}>{line}</p>)}</div>
    }
    return <p key={i}>{para}</p>
  })
}

export default function BlogPostPage({ params }: Props) {
  // Try legacy post first
  const post = getPostBySlug(params.slug)
  if (post) {
    const relatedPlayers = post.relatedPlayers?.map((slug) => getPlayerBySlug(slug)).filter(Boolean) ?? []
    const relatedPosts = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)
    const jsonLd = {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: post.title, description: post.excerpt, image: post.image,
      datePublished: post.date, dateModified: post.date,
      url: `https://4sportsgolf.com/blog/${post.slug}`,
      author: { '@type': 'Organization', name: '4Sports Golf', url: 'https://4sportsgolf.com' },
      publisher: { '@type': 'Organization', name: '4Sports Golf', url: 'https://4sportsgolf.com',
        logo: { '@type': 'ImageObject', url: 'https://4sportsgolf.com/opengraph-image' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://4sportsgolf.com/blog/${post.slug}` },
    }
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="pt-16">
          <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-fairway-900 via-fairway-900/50 to-fairway-900/20" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-3 py-1 uppercase tracking-wide inline-block mb-4">{post.category}</span>
              <h1 className="display-heading text-3xl sm:text-5xl text-stone-100 mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-stone-400 font-body">
                <span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
              </div>
            </div>
          </section>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <article className="lg:col-span-2">
                  <p className="text-stone-300 text-lg font-body leading-relaxed mb-8 border-l-2 border-gold-500 pl-6 italic">{post.excerpt}</p>
                  <div className="prose-golf">{renderContent(post.content)}</div>
                </article>
                <aside className="space-y-8">
                  {relatedPlayers.length > 0 && (
                    <div className="card-dark p-6">
                      <p className="section-label mb-5">Featured Players</p>
                      <div className="space-y-4">
                        {relatedPlayers.map((player) => player && (
                          <Link key={player.slug} href={`/players/${player.slug}`} className="flex items-center gap-4 group">
                            <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                              <Image src={player.image} alt={player.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" sizes="56px" />
                            </div>
                            <div>
                              <p className="text-stone-200 text-sm font-body font-semibold group-hover:text-gold-300 transition-colors">{player.name}</p>
                              <p className="text-stone-500 text-xs font-body">{player.nationality}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {relatedPosts.length > 0 && (
                    <div className="card-dark p-6">
                      <p className="section-label mb-5">More in {post.category}</p>
                      <div className="space-y-5">
                        {relatedPosts.map((rp) => (
                          <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                            <h4 className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors mb-1 leading-snug">{rp.title}</h4>
                            <p className="text-stone-600 text-xs font-body">{rp.readTime} read</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="card-dark p-6 border-gold-600/30">
                    <p className="section-label mb-3">Equipment</p>
                    <h3 className="display-heading text-lg text-stone-100 mb-3">Shop Tour-Tested Gear</h3>
                    <p className="text-stone-400 text-sm font-body mb-5">Curated equipment used by our professional players.</p>
                    <Link href="/shop" className="btn-gold text-xs py-2 px-4 w-full justify-center">Browse Shop →</Link>
                  </div>
                </aside>
              </div>
            </div>
          </section>
          <div className="py-8 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
            <div className="max-w-7xl mx-auto">
              <Link href="/blog" className="text-gold-500 hover:text-gold-300 text-sm font-body tracking-wide transition-colors">← All Articles</Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Try new how-to article
  const newPost = getNewBlogArticle(params.slug)
  if (!newPost) notFound()

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: newPost.title, description: newPost.metaDescription,
    datePublished: newPost.date,
    url: `https://4sportsgolf.com/blog/${newPost.slug}`,
    author: { '@type': 'Organization', name: '4Sports Golf', url: 'https://4sportsgolf.com' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-16">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <Link href="/blog" className="text-stone-500 text-xs font-body hover:text-gold-400 transition-colors">← Journal</Link>
              <span className="text-stone-700 text-xs">·</span>
              <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-3 py-1 uppercase tracking-wide">{newPost.category}</span>
            </div>
            <h1 className="display-heading text-3xl sm:text-4xl text-stone-100 mb-4 leading-tight">{newPost.title}</h1>
            <p className="text-stone-400 font-body text-base mb-5 max-w-2xl">{newPost.metaDescription}</p>
            <div className="flex items-center gap-4 text-xs text-stone-500 font-body">
              <span>{newPost.date}</span><span>·</span><span>{newPost.readTime} read</span>
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <article className="lg:col-span-2">
                {/* Amazon links */}
                {newPost.amazonLinks && newPost.amazonLinks.length > 0 && (
                  <div className="bg-fairway-800 border border-gold-600/40 p-5 mb-8 space-y-3">
                    <p className="text-gold-400 text-xs font-body font-semibold uppercase tracking-widest mb-3">🛒 Related Products on Amazon</p>
                    {newPost.amazonLinks.map(([anchor, url], i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer sponsored"
                        className="flex items-center justify-between w-full bg-fairway-700 hover:bg-fairway-600 border border-fairway-600 hover:border-gold-500 px-4 py-3 transition-all group">
                        <span className="text-stone-300 text-sm font-body group-hover:text-gold-300 transition-colors">{anchor}</span>
                        <span className="text-gold-500 text-xs font-body ml-3 flex-shrink-0">Amazon →</span>
                      </a>
                    ))}
                  </div>
                )}
                <div className="prose-golf">{renderMarkdown(newPost.content)}</div>
                {/* FAQ */}
                {newPost.faq && newPost.faq.length > 0 && (
                  <div className="mt-10">
                    <h2 className="display-heading text-xl text-stone-100 mb-6 border-b border-fairway-700 pb-2">Frequently Asked Questions</h2>
                    <div className="space-y-5">
                      {newPost.faq.map((item, i) => (
                        <div key={i} className="card-dark p-5">
                          <p className="text-stone-200 font-body text-sm font-semibold mb-2">{item.question}</p>
                          <p className="text-stone-400 font-body text-sm leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
              <aside className="space-y-6">
                <div className="card-dark p-5 border-gold-600/30">
                  <p className="section-label mb-3">Equipment</p>
                  <h3 className="display-heading text-lg text-stone-100 mb-3">Shop Tour-Tested Gear</h3>
                  <p className="text-stone-400 text-sm font-body mb-5">Curated equipment used by our professional players.</p>
                  <Link href="/shop" className="btn-gold text-xs py-2 px-4 w-full justify-center">Browse Shop →</Link>
                </div>
                <div className="card-dark p-5">
                  <p className="section-label mb-3">Disclosure</p>
                  <p className="text-stone-500 text-xs font-body leading-relaxed">
                    4Sports Golf participates in the Amazon Associates Program. We may earn a commission when you click Amazon links at no extra cost to you.{' '}
                    <Link href="/disclosure" className="text-gold-600 hover:text-gold-400 transition-colors">Full disclosure →</Link>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <div className="py-8 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <Link href="/blog" className="text-gold-500 hover:text-gold-300 text-sm font-body tracking-wide transition-colors">← All Articles</Link>
          </div>
        </div>
      </div>
    </>
  )
}
