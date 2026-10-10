import type { Metadata } from 'next'
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail'

export const metadata: Metadata = {
  title: 'Image Credits',
  description: 'Where the images on 4Sports Golf come from.',
  robots: { index: false, follow: false },
}

export default function CreditsPage() {
  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal</p>
          <h1 className="display-heading text-5xl text-stone-100 mb-4">Image Credits</h1>
          <div className="divider-gold" />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          <div className="card-dark p-8 border-gold-600/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="display-heading text-xl text-stone-100 mb-3">Important Notice About Photographs</h2>
                <p className="text-stone-300 font-body text-sm leading-relaxed">
                  The images on this website are <strong>original illustrations created for 4Sports Golf</strong> with AI image tools and edited by us. They show generic scenes and unbranded equipment. They are <strong>not photographs of the named players</strong> (Edoardo Molinari, Andrea Pavan, Richie Ramsay or Eddie Pepperell) or of any specific product.
                </p>
              </div>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">Diagrams and Illustrations</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              Diagrams, tables and calculators on this site are made by 4Sports Golf. Product names and trademarks mentioned in our guides belong to their respective owners.
            </p>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">Wikipedia Content</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              Player biographies on this site are original editorial content written by 4Sports Golf. Where external sources such as Wikipedia are referenced, links are provided directly to those sources. No content is reproduced from Wikipedia without independent rewriting.
            </p>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">Copyright Claims</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              If you believe any content on this website infringes your copyright, please contact us at{' '}
              <ObfuscatedEmail />{' '}
              and we will address your concern promptly.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
