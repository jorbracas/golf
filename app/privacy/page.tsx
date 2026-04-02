import { ManageCookiesButton } from './ManageCookiesButton'
import type { Metadata } from 'next'
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy / Datenschutzerklärung',
  description: 'Privacy Policy for 4Sports Golf — how we handle your data in full compliance with GDPR (EU) 2016/679.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://4sportsgolf.com/privacy' },
}

// Cookie table data
const cookieTable = [
  {
    name: '4sg_consent_v1',
    type: 'Essential',
    storage: 'localStorage',
    purpose: 'Stores your cookie consent preferences so the banner is not shown on every visit.',
    duration: 'Until you clear browser storage',
    thirdParty: 'No — set by us',
    legalBasis: 'Art. 6(1)(c) GDPR — legal obligation to record consent',
  },
  {
    name: 'session-id, ubid-*, x-main, etc.',
    type: 'Affiliate tracking (Amazon)',
    storage: 'Cookie (amazon.com domain)',
    purpose: 'Amazon sets these when you click our affiliate links, to track the referral and attribute commission.',
    duration: '24 hours (conversion window); session or up to 30 days depending on cookie',
    thirdParty: 'Yes — set by Amazon.com',
    legalBasis: 'Art. 6(1)(a) GDPR — your consent',
  },
]

// Third-party processors
const processors = [
  {
    name: 'Vercel Inc.',
    address: '340 Pine Street, Suite 900, San Francisco, CA 94104, USA',
    purpose: 'Website hosting and content delivery. Processes server access logs including IP addresses.',
    transfer: 'USA — Standard Contractual Clauses (SCCs, Art. 46 GDPR)',
    link: 'https://vercel.com/legal/privacy-policy',
    retention: 'Access logs: up to 30 days per Vercel policy',
  },
  {
    name: 'Unsplash (so.do Inc.)',
    address: '360 rue Saint-Jacques, Montréal, Québec H2Y 1P5, Canada',
    purpose: 'Photography CDN. When your browser loads images on this website, it connects to Unsplash servers; your IP address is processed as part of that request.',
    transfer: 'Canada (EU adequacy decision) and US CDN nodes — SCCs apply where applicable',
    link: 'https://unsplash.com/privacy',
    retention: 'Per Unsplash CDN infrastructure — typically session logs',
  },
  {
    name: 'Amazon.com Services LLC',
    address: 'P.O. Box 81226, Seattle, WA 98108, USA',
    purpose: 'Affiliate tracking. When you click Amazon links, Amazon processes your data per their own privacy policy.',
    transfer: 'USA — Amazon EU S.à r.l. (Luxembourg) acts as EU controller for EU users',
    link: 'https://www.amazon.com/privacy',
    retention: 'Per Amazon policy — typically up to 30 days for affiliate cookies',
  },
]

const gdprRights = [
  { article: 'Art. 15', right: 'Right of access', desc: 'You may request a copy of all personal data we hold about you.' },
  { article: 'Art. 16', right: 'Right to rectification', desc: 'You may request that we correct inaccurate personal data.' },
  { article: 'Art. 17', right: 'Right to erasure', desc: 'You may request deletion of your personal data ("right to be forgotten"), subject to legal retention obligations.' },
  { article: 'Art. 18', right: 'Right to restriction', desc: 'You may request that we restrict the processing of your personal data in certain circumstances.' },
  { article: 'Art. 20', right: 'Right to data portability', desc: 'You may request your data in a structured, machine-readable format where technically feasible.' },
  { article: 'Art. 21', right: 'Right to object', desc: 'You may object to processing based on legitimate interests (Art. 6(1)(f)).' },
  { article: 'Art. 7(3)', right: 'Right to withdraw consent', desc: 'Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.' },
  { article: 'Art. 77', right: 'Right to lodge a complaint', desc: 'You may complain to your local data protection authority.' },
]

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal</p>
          <h1 className="display-heading text-5xl text-stone-100 mb-4">Privacy Policy</h1>
          <div className="divider-gold" />
          <p className="text-stone-500 text-sm font-body mt-4">
            Datenschutzerklärung gemäß DSGVO (EU) 2016/679 &amp; BDSG (neu) · Last updated: 26 March 2026
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* 1. Controller */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">1. Controller (Verantwortlicher)</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>The controller responsible for processing personal data on this website, within the meaning of Art. 4(7) GDPR, is:</p>
              <div className="bg-fairway-900/60 border border-fairway-700 p-5 text-stone-300 space-y-1">
                <p className="font-semibold text-stone-100">Jorge Bravo Castrejón</p>
                <p>Grellstrasse 13</p>
                <p>10409 Berlin, Germany</p>
                <p>E-Mail: <ObfuscatedEmail /></p>
              </div>
              <p className="text-stone-500 text-xs">
                No Data Protection Officer is required under Art. 37 GDPR for this website, as it does not carry out large-scale processing of special categories of data.
              </p>
            </div>
          </div>

          {/* 2. Scope */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">2. Scope of This Policy</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              This policy applies to <strong className="text-stone-300">4sportsgolf.com</strong> — a static informational website about professional golf. The site does not operate user accounts, contact forms, comments sections, or newsletter subscriptions. The primary personal data processing activities are server access logs (processed by our hosting provider), image delivery (via Unsplash CDN), and Amazon affiliate tracking (when you choose to click product links).
            </p>
          </div>

          {/* 3. Server Logs */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">3. Server Access Logs</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>When you visit this website, your browser automatically transmits the following data to Vercel's infrastructure:</p>
              <ul className="space-y-1 ml-4">
                {['IP address (or anonymised prefix)','Browser type and version','Operating system','Referring URL','Date and time of access','HTTP status code'].map((i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-gold-600 flex-shrink-0">—</span><span>{i}</span></li>
                ))}
              </ul>
              <p><strong className="text-stone-300">Legal basis:</strong> Art. 6(1)(f) GDPR — legitimate interests. Processing is necessary for the technical delivery of the website and for detection of misuse or attacks. Our legitimate interests outweigh visitor interests given that logs are not used for profiling and are retained only briefly.</p>
              <p><strong className="text-stone-300">Retention:</strong> Vercel retains access logs for up to 30 days. We do not store server logs independently.</p>
            </div>
          </div>

          {/* 4. Cookies & Local Storage */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">4. Cookies &amp; Local Storage</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-4">
              <p>
                This website itself sets one item in your browser's localStorage to remember your cookie preferences. When you click Amazon affiliate links, Amazon sets third-party cookies on your device.
                You can manage or withdraw your consent at any time using the button below.
              </p>

              {/* Cookie table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-body border-collapse">
                  <thead>
                    <tr className="border-b border-fairway-600">
                      <th className="text-left py-2 pr-4 text-stone-400 font-medium">Name</th>
                      <th className="text-left py-2 pr-4 text-stone-400 font-medium">Type</th>
                      <th className="text-left py-2 pr-4 text-stone-400 font-medium">Purpose</th>
                      <th className="text-left py-2 pr-4 text-stone-400 font-medium">Duration</th>
                      <th className="text-left py-2 text-stone-400 font-medium">Legal basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.map((c) => (
                      <tr key={c.name} className="border-b border-fairway-700/50">
                        <td className="py-3 pr-4 text-stone-300 font-mono">{c.name}</td>
                        <td className="py-3 pr-4 text-stone-400">{c.type}</td>
                        <td className="py-3 pr-4 text-stone-400">{c.purpose}</td>
                        <td className="py-3 pr-4 text-stone-500">{c.duration}</td>
                        <td className="py-3 text-stone-500">{c.legalBasis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-stone-500 text-xs">
                You can delete cookies and localStorage at any time in your browser settings. Blocking all storage may affect cookie consent functionality.
              </p>
            </div>
          </div>

          {/* 5. Third-Party Processors */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">5. Third-Party Service Providers</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-6">
              <p>We use the following third-party service providers who may process personal data on our behalf or independently as separate controllers:</p>
              {processors.map((p) => (
                <div key={p.name} className="bg-fairway-900/60 border border-fairway-700 p-5 space-y-2">
                  <p className="font-semibold text-stone-100">{p.name}</p>
                  <p className="text-stone-500 text-xs">{p.address}</p>
                  <p><span className="text-stone-400">Purpose:</span> {p.purpose}</p>
                  <p><span className="text-stone-400">Transfer basis:</span> {p.transfer}</p>
                  <p>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-300 transition-colors text-xs">
                      Privacy policy →
                    </a>
                  </p>
                  <p className="text-stone-500 text-xs">Retention: {p.retention}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Google Fonts */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">6. Google Fonts — Self-Hosted</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              This website uses Playfair Display and Outfit typefaces, both provided by Google Fonts. We use Next.js's built-in font optimisation: fonts are downloaded and bundled at build time, then served from our own Vercel infrastructure. <strong className="text-stone-300">No request is made to Google's servers when you visit this website.</strong> No data is transmitted to Google LLC in connection with font loading.
            </p>
          </div>

          {/* 7. Amazon Associates */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">7. Amazon Associates Affiliate Programme</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                This website participates in the Amazon Services LLC Associates Program. Equipment pages contain affiliate links (clearly labelled "View on Amazon →") which include our associate tag <code className="text-gold-400 bg-fairway-700 px-1.5 py-0.5 text-xs rounded">dronewithca0b-20</code>.
              </p>
              <p>When you click an affiliate link, Amazon.com receives your request including your IP address, browser data, and referral source. Amazon sets cookies on your device to track whether you make a qualifying purchase within the attribution window. <strong className="text-stone-300">We have no access to these cookies or any purchase data beyond aggregate commission reports.</strong></p>
              <p><strong className="text-stone-300">Legal basis:</strong> Art. 6(1)(a) GDPR — your consent, given via the cookie banner when you accept affiliate tracking. You may withdraw consent at any time by clicking "Essential only" in the cookie banner (which reloads when you clear your preference below).</p>
              <p>
                Amazon EU S.à r.l. (Luxembourg) acts as data controller for European users. See:{' '}
                <a href="https://www.amazon.de/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">Amazon.de Datenschutzerklärung</a>
              </p>
            </div>
          </div>

          {/* 8. Photography */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">8. Photography &amp; Image CDN (Unsplash)</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>
                Images on this website are sourced from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">Unsplash</a> and served via Next.js Image Optimization, which proxies requests through our Vercel infrastructure. <strong className="text-stone-300">Your browser connects to our Vercel servers, not directly to Unsplash's CDN</strong>, for all optimised images. However, the original hero background image on the home page may be loaded directly from Unsplash's CDN (<code className="text-stone-500 text-xs">images.unsplash.com</code>), which may process your IP address.
              </p>
              <p className="text-stone-500 text-xs">
                <strong>Important notice:</strong> All photographs are stock images used as layout placeholders. They are not photographs of the named individuals (Edoardo Molinari, Andrea Pavan, Richie Ramsey, Eddie Pepperell). See <Link href="/credits" className="text-gold-500 hover:text-gold-400 transition-colors">Image Credits</Link>.
              </p>
            </div>
          </div>

          {/* 9. Your Rights */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">9. Your Rights Under GDPR</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-4">
              <p>As a data subject under the GDPR, you have the following rights. To exercise any of them, contact <ObfuscatedEmail />. We will respond within one month (Art. 12(3) GDPR).</p>
              <div className="space-y-3">
                {gdprRights.map((r) => (
                  <div key={r.article} className="flex items-start gap-3 pb-3 border-b border-fairway-700/50 last:border-0 last:pb-0">
                    <span className="text-gold-600 text-xs font-mono flex-shrink-0 mt-0.5 w-16">{r.article}</span>
                    <div>
                      <p className="text-stone-300 font-medium text-xs mb-1">{r.right}</p>
                      <p className="text-stone-500 text-xs">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 10. Supervisory Authority */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">10. Supervisory Authority (Aufsichtsbehörde)</h2>
            <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
              <p>You have the right to lodge a complaint with the competent data protection authority (Art. 77 GDPR). The supervisory authority for Berlin is:</p>
              <div className="bg-fairway-900/60 border border-fairway-700 p-5 space-y-1">
                <p className="text-stone-300 font-semibold">Berliner Beauftragte für Datenschutz und Informationsfreiheit (BlnBDI)</p>
                <p>Friedrichstr. 219, 10969 Berlin</p>
                <p>Tel.: +49 30 13889-0</p>
                <p><a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">www.datenschutz-berlin.de</a></p>
              </div>
              <p className="text-stone-500 text-xs">
                Alternatively, you may contact the data protection authority in the EU member state of your habitual residence or place of work.
              </p>
            </div>
          </div>

          {/* 11. Changes */}
          <div className="card-dark p-8">
            <h2 className="display-heading text-xl text-stone-100 mb-5">11. Changes to This Policy</h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed">
              We may update this Privacy Policy as the website evolves or as legal requirements change. The current version is always available at this URL. Significant changes will be reflected in the date at the top of this page. We recommend reviewing this page periodically.
            </p>
          </div>

          {/* Manage cookies CTA */}
          <div className="bg-fairway-800 border border-gold-600/30 p-6 flex items-start gap-4">
            <div className="w-8 h-8 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-200 font-body text-sm font-semibold mb-1">Manage your cookie preferences</p>
              <p className="text-stone-500 font-body text-xs leading-relaxed mb-3">
                You can withdraw or change your consent at any time. Clearing your preference will re-show the cookie banner on your next visit.
              </p>
              <ManageCookiesButton />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

