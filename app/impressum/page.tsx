import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Legal notice for 4Sports Golf — Angaben gemäß § 5 TMG.',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal Notice</p>
          <h1 className="display-heading text-5xl text-stone-100 mb-4">Impressum</h1>
          <div className="divider-gold" />
          <p className="text-stone-500 text-sm font-body mt-4">
            Angaben gemäß § 5 TMG
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose-golf space-y-10">

          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Verantwortlich für den Inhalt</h2>
            <div className="text-stone-300 font-body space-y-1 text-sm leading-relaxed">
              <p className="font-semibold text-stone-100">Jorge Bravo Castrejón</p>
              <p>Grellstrasse 13</p>
              <p>10409 Berlin</p>
              <p>Deutschland / Germany</p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Kontakt / Contact</h2>
            <div className="text-stone-300 font-body text-sm space-y-2">
              <p>
                E-Mail:{' '}
                <a href="mailto:jorbracas@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                  jorbracas@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Hinweis auf EU-Streitschlichtung</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Haftung für Inhalte</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Haftung für Links</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p>
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </div>

          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Urheberrecht / Copyright</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p>
                <strong className="text-stone-300">Photographs:</strong> All photography used on this website is sourced from{' '}
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Unsplash
                </a>{' '}
                and used under the{' '}
                <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Unsplash License
                </a>
                . Photographs are placeholder images and will be replaced with properly licensed or original photography. Player photographs, where used, are for illustrative purposes only.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
