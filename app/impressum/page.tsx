import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Legal notice for 4Sports Golf — Angaben gemäß § 5 TMG.',
  robots: { index: false },
  alternates: { canonical: 'https://4sportsgolf.com/impressum' },
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
            Angaben gemäß § 5 TMG (Telemediengesetz) / Legal notice pursuant to § 5 German Telemedia Act
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Verantwortlicher */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Verantwortlich für den Inhalt / Responsible for Content</h2>
            <div className="text-stone-300 font-body space-y-1 text-sm leading-relaxed">
              <p className="font-semibold text-stone-100 text-base">Jorge Bravo Castrejón</p>
              <p>Grellstrasse 13</p>
              <p>10409 Berlin</p>
              <p>Deutschland / Germany</p>
            </div>
          </div>

          {/* Kontakt */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Kontakt / Contact</h2>
            <div className="text-stone-300 font-body text-sm space-y-2">
              <p>
                E-Mail:{' '}
                <a href="mailto:jorbracas@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                  jorbracas@gmail.com
                </a>
              </p>
              <p className="text-stone-500 text-xs mt-3">
                Gemäß § 5 Abs. 1 Nr. 2 TMG ist die Angabe einer E-Mail-Adresse als Kontaktmittel ausreichend. Eine Telefonnummer wird freiwillig nicht angegeben.
              </p>
            </div>
          </div>

          {/* Wirtschaftliche Tätigkeit */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Art der Tätigkeit / Nature of Activity</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Diese Website ist ein privates, redaktionelles Informationsangebot rund um professionellen Golfsport. Sie enthält redaktionelle Inhalte (Spielerbiografien, Blog, Ausrüstungsführer) sowie Affiliate-Links zu Amazon.com.
              </p>
              <p>
                This website is a private editorial information service about professional golf. It contains editorial content (player biographies, blog, equipment guides) and affiliate links to Amazon.com.
              </p>
              <p className="text-stone-500 text-xs border-t border-fairway-700 pt-3 mt-2">
                <strong className="text-stone-400">Umsatzsteuer:</strong> Kleinunternehmerregelung gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer liegt nicht vor.
                <br />
                <em>VAT: Small business exemption under § 19 German VAT Act applies. No VAT is charged. No VAT identification number is held.</em>
              </p>
            </div>
          </div>

          {/* Affiliate-Hinweis */}
          <div className="card-dark p-8 border-gold-600/20">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Affiliate-Hinweis / Affiliate Disclosure</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Diese Website nimmt am Amazon-Partnerprogramm teil (Amazon Associates Program). Als Amazon-Partner verdiene ich an qualifizierten Verkäufen durch Links mit dem Tag <code className="text-gold-400 bg-fairway-700 px-1.5 py-0.5 text-xs">dronewithca0b-20</code>. Die Preise für Sie als Käufer bleiben unverändert.
              </p>
              <p>
                This website participates in the Amazon Associates Program. As an Amazon Associate, I earn from qualifying purchases made via links tagged with <code className="text-gold-400 bg-fairway-700 px-1.5 py-0.5 text-xs">dronewithca0b-20</code>. The price for you as a buyer remains the same.
              </p>
              <p className="text-stone-500 text-xs">
                Vollständige Offenlegung: <Link href="/disclosure" className="text-gold-500 hover:text-gold-400 transition-colors">Affiliate Disclosure</Link>
              </p>
            </div>
          </div>

          {/* EU-Streitschlichtung */}
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
                Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
              </p>
              <p className="text-stone-500 text-xs">
                The European Commission provides a platform for online dispute resolution (ODR). We are neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </div>
          </div>

          {/* Haftung für Inhalte */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Haftung für Inhalte / Liability for Content</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>
          </div>

          {/* Haftung für Links */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Haftung für Links / Liability for Links</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p>
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </div>

          {/* Urheberrecht */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Urheberrecht / Copyright</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p>
                <strong className="text-stone-300">Fotografien:</strong> Alle auf dieser Website verwendeten Fotografien stammen von{' '}
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Unsplash.com
                </a>{' '}
                und werden unter der{' '}
                <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Unsplash-Lizenz
                </a>{' '}
                verwendet, die eine kostenlose kommerzielle Nutzung ohne Namensnennung erlaubt. Die Fotos sind Platzhalterbilder und keine Fotografien der genannten Personen. Vollständige Bildnachweise:{' '}
                <Link href="/credits" className="text-gold-400 hover:text-gold-300 transition-colors">
                  Image Credits
                </Link>.
              </p>
              <p>
                <strong className="text-stone-300">Wikipedia:</strong> Externe Links verweisen auf Wikipedia-Seiten. Inhalte von Wikipedia wurden nicht kopiert; die Biografien auf dieser Website sind eigenständig verfasste Originaltexte.
              </p>
            </div>
          </div>

          {/* Datenschutz */}
          <div className="card-dark p-8 border-gold-600/20">
            <h2 className="display-heading text-2xl text-stone-100 mb-6">Datenschutz / Data Protection</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              Informationen zur Verarbeitung personenbezogener Daten auf dieser Website finden Sie in unserer{' '}
              <Link href="/privacy" className="text-gold-400 hover:text-gold-300 transition-colors">
                Datenschutzerklärung
              </Link>
              {' '}gemäß DSGVO (EU) 2016/679.
              {' '}/ For information on how personal data is processed on this website, please see our{' '}
              <Link href="/privacy" className="text-gold-400 hover:text-gold-300 transition-colors">
                Privacy Policy
              </Link>{' '}
              in accordance with GDPR (EU) 2016/679.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
