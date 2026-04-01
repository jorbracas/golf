import Link from 'next/link'
import Image from 'next/image'
import { players } from '@/lib/players'
import { posts } from '@/lib/posts'

export default function HomePage() {
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
        {/* FIX: use Next/Image instead of CSS backgroundImage — optimised, WebP, preloaded */}
        <Image
          src="https://images.unsplash.com/photo-1560175400-e78e1a7b6f08?w=1800&q=80"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fairway-900/80 via-fairway-900/60 to-fairway-900" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <p className="section-label mb-6 animate-fade-in">Professional Golf Management</p>
          <h1 className="display-heading text-5xl sm:text-7xl lg:text-8xl text-stone-100 mb-6">
            Where Golf{' '}
            <span className="text-gold-400 italic">Excellence</span>
            <br />
            Meets Ambition
          </h1>
          <div className="divider-gold mx-auto" />
          <p className="text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto mt-6 font-body leading-relaxed">
            Representing the finest professional golfers on the DP World Tour. Biographies, tour analysis, and equipment guides for the serious player.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/players" className="btn-gold">
              Meet Our Players
            </Link>
            <Link href="/blog" className="btn-outline">
              Read the Blog
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600">
          <span className="text-xs tracking-widest uppercase font-body">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-stone-600 to-transparent" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-fairway-800 border-y border-fairway-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '4', label: 'Tour Professionals' },
              { value: '20+', label: 'Years of Management' },
              { value: '15+', label: 'DP World Tour Wins' },
              { value: '3', label: 'Ryder Cup Appearances' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl font-bold text-gold-400 mb-1">{stat.value}</div>
                <div className="text-xs text-stone-500 tracking-wide uppercase font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Players grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">The Roster</p>
              <h2 className="display-heading text-4xl sm:text-5xl text-stone-100">
                Our Players
              </h2>
            </div>
            <Link href="/players" className="text-gold-400 hover:text-gold-300 text-sm font-body tracking-wide transition-colors hidden sm:block">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.map((player) => (
              <Link
                key={player.slug}
                href={`/players/${player.slug}`}
                className="group card-dark overflow-hidden"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fairway-900 via-fairway-900/20 to-transparent" />
                  <div className="absolute top-3 right-3 text-2xl">{player.flag}</div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-stone-400 tracking-wide uppercase font-body">{player.tour}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="display-heading text-xl text-stone-100 mb-1 group-hover:text-gold-300 transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-stone-500 text-xs tracking-wide uppercase font-body mb-3">{player.nationality}</p>
                  <p className="text-stone-400 text-sm line-clamp-2 font-body">{player.bio}</p>
                  <div className="mt-4 flex items-center text-gold-500 text-xs font-body tracking-wide group-hover:gap-2 transition-all">
                    Read biography <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">Latest Insights</p>
              <h2 className="display-heading text-4xl sm:text-5xl text-stone-100">
                From the Blog
              </h2>
            </div>
            <Link href="/blog" className="text-gold-400 hover:text-gold-300 text-sm font-body tracking-wide transition-colors hidden sm:block">
              All articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group card-dark overflow-hidden flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fairway-800/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold-500 text-fairway-900 text-xs font-body font-semibold px-3 py-1 uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-body mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h3 className="display-heading text-xl text-stone-100 mb-3 group-hover:text-gold-300 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-stone-400 text-sm font-body line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 text-gold-500 text-xs font-body tracking-wide">
                    Read article →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA shop */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">Equipment</p>
          <h2 className="display-heading text-4xl sm:text-5xl text-stone-100 mb-6">
            Play What the{' '}
            <span className="text-gold-400 italic">Professionals</span>{' '}
            Play
          </h2>
          <div className="divider-gold mx-auto" />
          <p className="text-stone-400 max-w-xl mx-auto mt-6 mb-10 font-body leading-relaxed">
            Curated equipment guides featuring the clubs, balls, and accessories trusted by our tour professionals. Every recommendation tested at the highest level.
          </p>
          <Link href="/shop" className="btn-gold">
            Browse Equipment →
          </Link>
        </div>
      </section>
    </>
  )
}
