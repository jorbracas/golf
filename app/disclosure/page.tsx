import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How 4Sports Golf earns from affiliate links and what that means for you.',
  robots: { index: false, follow: false },
}

export default function DisclosurePage() {
  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal</p>
          <h1 className="display-heading text-5xl text-stone-100 mb-4">Affiliate Disclosure</h1>
          <div className="divider-gold" />
          <p className="text-stone-500 text-sm font-body mt-4">
            In plain English and in full compliance with FTC guidelines and EU regulations.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          <div className="card-dark p-8 border-gold-600/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="display-heading text-xl text-stone-100 mb-3">The Short Version</h2>
                <p className="text-stone-300 font-body text-sm leading-relaxed">
                  Some links on this website go to Amazon.com. If you click one of those links and buy something, we earn a small commission — at no extra cost to you. The price you pay is exactly the same whether you use our link or go directly to Amazon.
                </p>
              </div>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">Amazon Associates Program</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                4Sports Golf is a participant in the Amazon Services LLC Associates Program, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to <strong className="text-stone-300">Amazon.com</strong>.
              </p>
              <p>
                Whenever you see a link labelled "View on Amazon" or "Amazon →", that is an affiliate link. We earn a commission when you click through and make a qualifying purchase within a set cookie window (typically 24 hours).
              </p>
              <p>
                Our Amazon Associate tag is: <code className="text-gold-400 bg-fairway-700 px-2 py-0.5 text-xs">dronewithca0b-20</code>
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">Editorial Independence</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Our affiliate relationships do not influence our editorial content. Products featured in our shop and recommended in our articles are selected on the basis of their quality, relevance, and use by professional golfers — not on commission rates.
              </p>
              <p>
                We would never recommend a product we do not genuinely believe is good for our readers. Our reputation for honest golf content matters more than any affiliate commission.
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">How to Identify Affiliate Links</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>All affiliate links on this website go to Amazon.com and are clearly labelled. They will:</p>
              <ul className="space-y-2">
                {[
                  'Open in a new tab',
                  'Display a label such as "View on Amazon →" or "Amazon →"',
                  'Link to an Amazon product page',
                  'Include our affiliate tag in the URL: dronewithca0b-20',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold-600 flex-shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">FTC & EU Compliance</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                This disclosure complies with the US Federal Trade Commission's guidelines on endorsements and testimonials (16 CFR Part 255), which require clear and conspicuous disclosure of material connections between advertisers and endorsers.
              </p>
              <p>
                It also complies with EU Directive 2005/29/EC on unfair commercial practices and the relevant German provisions (UWG — Gesetz gegen den unlauteren Wettbewerb) requiring transparency in commercial communications.
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">Questions?</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              If you have any questions about our affiliate relationships or how we select products, contact us at{' '}
              <a href="mailto:jorbracas@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                jorbracas@gmail.com
              </a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
