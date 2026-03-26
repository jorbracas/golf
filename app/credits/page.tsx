import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Credits',
  description: 'Attribution for all photography used on 4Sports Golf.',
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
                  All photographs currently used on this website are <strong>stock images sourced from Unsplash</strong> and are used as layout placeholders only. They are <strong>not photographs of the named individuals</strong> (Edoardo Molinari, Andrea Pavan, Richie Ramsey, or Eddie Pepperell). These images will be replaced with properly licensed or original photography.
                </p>
              </div>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-6">Unsplash Photography</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed mb-6">
              All current photography is sourced from{' '}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                Unsplash.com
              </a>{' '}
              and used under the{' '}
              <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                Unsplash License
              </a>
              , which grants a free, irrevocable, non-exclusive copyright licence to download, copy, modify, distribute, and use photographs from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash.
            </p>

            <div className="space-y-4">
              {[
                {
                  url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b',
                  desc: 'Golf — player pages and hero imagery',
                  credit: 'Unsplash',
                },
                {
                  url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
                  desc: 'Golf equipment — irons',
                  credit: 'Unsplash',
                },
                {
                  url: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4ce',
                  desc: 'Golf — course imagery',
                  credit: 'Unsplash',
                },
                {
                  url: 'https://images.unsplash.com/photo-1592919505780-303950717480',
                  desc: 'Golf — putting',
                  credit: 'Unsplash',
                },
                {
                  url: 'https://images.unsplash.com/photo-1560175400-e78e1a7b6f08',
                  desc: 'Golf — fairway, hero section',
                  credit: 'Unsplash',
                },
                {
                  url: 'https://images.unsplash.com/photo-1611374243504-de7b19e79b8f',
                  desc: 'Golf equipment — irons close-up',
                  credit: 'Unsplash',
                },
              ].map((img) => (
                <div key={img.url} className="flex items-start gap-4 pb-4 border-b border-fairway-700 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-300 text-sm font-body mb-1">{img.desc}</p>
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 text-xs font-body hover:text-gold-400 transition-colors truncate block"
                    >
                      {img.url.slice(0, 60)}…
                    </a>
                  </div>
                  <span className="text-xs text-stone-500 font-body flex-shrink-0">{img.credit}</span>
                </div>
              ))}
            </div>
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
              <a href="mailto:jorbracas@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                jorbracas@gmail.com
              </a>{' '}
              and we will address your concern promptly.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
