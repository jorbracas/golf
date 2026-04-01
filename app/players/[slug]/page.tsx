import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPlayerBySlug, getAllPlayerSlugs } from '@/lib/players'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPlayerSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const player = getPlayerBySlug(params.slug)
  if (!player) return {}

  // Truncate bio to ≤155 chars for meta description
  const description = player.bio.length > 155 ? player.bio.slice(0, 152) + '…' : player.bio

  return {
    title: `${player.name} — Professional Golf Biography`,
    description,
    openGraph: {
      title: `${player.name} — Professional Golf Biography`,
      description,
      url: `https://4sportsgolf.com/players/${player.slug}`,
      images: [
        {
          url: player.image,
          width: 800,
          height: 600,
          alt: player.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${player.name} — Professional Golf Biography`,
      description,
      images: [player.image],
    },
    alternates: {
      canonical: `https://4sportsgolf.com/players/${player.slug}`,
    },
  }
}

// FIX: inject Amazon associate tag into every affiliate URL
const AMAZON_TAG = 'dronewithca0b-20'

function buildAmazonUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl)
    url.searchParams.set('tag', AMAZON_TAG)
    return url.toString()
  } catch {
    return rawUrl
  }
}

function AmazonLink({ amazonUrl, label, description }: { amazonUrl: string; label: string; description: string }) {
  const url = buildAmazonUrl(amazonUrl)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group card-dark p-5 flex gap-4 items-start hover:border-gold-500 transition-all duration-300"
    >
      <div className="w-8 h-8 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <div>
        <p className="text-stone-100 font-body font-semibold text-sm mb-1 group-hover:text-gold-300 transition-colors">
          {label}
        </p>
        <p className="text-stone-500 text-xs font-body">{description}</p>
        <p className="text-gold-500 text-xs font-body mt-2 tracking-wide">View on Amazon →</p>
      </div>
    </a>
  )
}

export default function PlayerPage({ params }: Props) {
  const player = getPlayerBySlug(params.slug)
  if (!player) notFound()

  // JSON-LD structured data (Person schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: player.name,
    description: player.bio,
    nationality: { '@type': 'Country', name: player.nationality },
    url: `https://4sportsgolf.com/players/${player.slug}`,
    image: player.image,
    jobTitle: 'Professional Golfer',
    worksFor: { '@type': 'Organization', name: player.tour },
    sameAs: [
      player.wikipedia_url,
      player.social.twitter ? `https://twitter.com/${player.social.twitter}` : null,
      player.social.instagram ? `https://instagram.com/${player.social.instagram}` : null,
    ].filter(Boolean),
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
        <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover grayscale"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fairway-900 via-fairway-900/50 to-fairway-900/20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{player.flag}</span>
              <span className="section-label">{player.nationality} · {player.tour}</span>
            </div>
            <h1 className="display-heading text-5xl sm:text-7xl text-stone-100">{player.name}</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Main bio */}
              <div className="lg:col-span-2">
                <div className="prose-golf">
                  {player.bio_extended.split('\n\n').map((para, i) => (
                    <p key={i}>{para.replace(/^#+\s/, '')}</p>
                  ))}
                </div>

                {/* Achievements */}
                <div className="mt-12">
                  <p className="section-label mb-6">Career Highlights</p>
                  <ul className="space-y-3">
                    {player.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-3">
                        <span className="text-gold-500 mt-1 flex-shrink-0">—</span>
                        <span className="text-stone-300 font-body text-sm">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Amazon products */}
                {player.amazon_links.length > 0 && (
                  <div className="mt-12">
                    <p className="section-label mb-2">Equipment</p>
                    <h2 className="display-heading text-2xl text-stone-100 mb-6">
                      What {player.name.split(' ')[0]} Uses
                    </h2>
                    <p className="text-stone-500 text-xs font-body mb-6">
                      As an Amazon Associate, 4Sports Golf earns from qualifying purchases. Links include our affiliate tag.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {player.amazon_links.map((link) => (
                        <AmazonLink key={link.label} {...link} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick stats */}
                <div className="card-dark p-6">
                  <p className="section-label mb-5">Player Profile</p>
                  <dl className="space-y-4">
                    {[
                      { label: 'Born', value: player.born },
                      { label: 'Turned Pro', value: player.turned_pro },
                      { label: 'Height', value: player.height },
                      { label: 'Tour', value: player.tour },
                      { label: 'Status', value: player.status },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-4 pb-4 border-b border-fairway-700 last:border-0 last:pb-0">
                        <dt className="text-stone-500 text-xs uppercase tracking-wide font-body">{label}</dt>
                        <dd className="text-stone-200 text-sm font-body text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Equipment bag */}
                {Object.keys(player.equipment).length > 0 && (
                  <div className="card-dark p-6">
                    <p className="section-label mb-5">In the Bag</p>
                    <dl className="space-y-4">
                      {Object.entries(player.equipment).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-start gap-4 pb-4 border-b border-fairway-700 last:border-0 last:pb-0">
                          <dt className="text-stone-500 text-xs uppercase tracking-wide font-body capitalize">{key}</dt>
                          <dd className="text-stone-200 text-sm font-body text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Social + Wikipedia */}
                <div className="card-dark p-6">
                  <p className="section-label mb-5">Links</p>
                  <div className="space-y-3">
                    <a
                      href={player.wikipedia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-stone-400 hover:text-stone-100 text-sm font-body transition-colors"
                    >
                      <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2H9l3 8 3-8h-2V7h-2z" />
                      </svg>
                      Wikipedia Biography
                    </a>
                    {player.social.twitter && (
                      <a
                        href={`https://twitter.com/${player.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-stone-400 hover:text-stone-100 text-sm font-body transition-colors"
                      >
                        <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        @{player.social.twitter}
                      </a>
                    )}
                    {player.social.instagram && (
                      <a
                        href={`https://instagram.com/${player.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-stone-400 hover:text-stone-100 text-sm font-body transition-colors"
                      >
                        <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        @{player.social.instagram}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 border-t border-fairway-700">
          <div className="max-w-7xl mx-auto">
            <Link href="/players" className="text-gold-500 hover:text-gold-300 text-sm font-body tracking-wide transition-colors">
              ← All Players
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
