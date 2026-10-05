import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About 4Sports Golf',
  description:
    'Who runs 4Sports Golf, how we research and write our guides, how we make money, and the history of the 4sportsgolf.com domain.',
  alternates: { canonical: 'https://www.4sportsgolf.com/about' },
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.4sportsgolf.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: '4Sports Golf',
      url: 'https://www.4sportsgolf.com',
      founder: { '@type': 'Person', name: 'Jorge Bravo Castrejón' },
      address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    },
  }
  const p = 'text-stone-300 font-body text-base leading-relaxed'
  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">About</p>
          <h1 className="display-heading text-4xl sm:text-5xl text-stone-100 mb-4">About 4Sports Golf</h1>
          <div className="divider-gold" />
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="display-heading text-2xl text-stone-100">What this site is</h2>
            <p className={p}>
              4Sports Golf is an independent golf website. We publish practical guides on golf equipment, home and indoor
              practice, golf carts and the basics of the game, plus profiles of DP World Tour players. The site is run by
              Jorge Bravo Castrejón from Berlin, Germany. You can reach us through the contact details in our{' '}
              <Link prefetch={false} href="/impressum" className="text-gold-400 underline underline-offset-2">Impressum</Link>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="display-heading text-2xl text-stone-100">How we write our guides</h2>
            <p className={p}>
              Our guides are built from manufacturer specifications, the Rules of Golf and handicapping published by the
              USGA and R&amp;A, retailer listings and reputable independent reviews. The main sources for each article are
              listed at the bottom of the page. We use AI tools to help with research and first drafts. Every guide is
              then edited and its facts and figures checked against those sources before publishing.
            </p>
            <p className={p}>
              We don&apos;t claim to have personally tested products unless an article says so explicitly. Prices and
              specifications change, so each guide shows when it was last updated. If you spot something wrong, please
              tell us and we&apos;ll fix it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="display-heading text-2xl text-stone-100">How we make money</h2>
            <p className={p}>
              Some links on this site are affiliate links, mainly to Amazon. If you buy through them we may earn a
              commission at no extra cost to you. That never decides what we recommend. Details are in our{' '}
              <Link prefetch={false} href="/disclosure" className="text-gold-400 underline underline-offset-2">affiliate disclosure</Link>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="display-heading text-2xl text-stone-100">About the domain</h2>
            <p className={p}>
              The 4sportsgolf.com domain once belonged to 4Sports &amp; Entertainment, a player-management company. This
              website is <strong className="text-stone-100">not</strong> that company. We are not affiliated with any
              player, tour or management agency, and the player profiles on this site are independent editorial content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
