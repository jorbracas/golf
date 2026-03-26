import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for 4Sports Golf — how we handle your data in compliance with GDPR.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-fairway-800 border-b border-fairway-700">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Legal</p>
          <h1 className="display-heading text-5xl text-stone-100 mb-4">Privacy Policy</h1>
          <div className="divider-gold" />
          <p className="text-stone-500 text-sm font-body mt-4">
            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          {[
            {
              title: '1. Controller',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>The controller responsible for data processing on this website within the meaning of the General Data Protection Regulation (GDPR) is:</p>
                  <div className="card-dark p-5 text-stone-300 space-y-1">
                    <p className="font-semibold text-stone-100">Jorge Bravo Castrejón</p>
                    <p>Grellstrasse 13, 10409 Berlin, Germany</p>
                    <p>Email: <a href="mailto:jorbracas@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">jorbracas@gmail.com</a></p>
                  </div>
                </div>
              ),
            },
            {
              title: '2. Data We Collect',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>This website is a static, informational site. We do not operate contact forms, user accounts, or comment sections. We do not actively collect personal data from visitors.</p>
                  <p><strong className="text-stone-300">Server logs:</strong> When you visit this website, your browser automatically transmits certain data to our web server, including IP address, browser type and version, referring URL, and date/time of access. This data is processed by Vercel (our hosting provider) for security and operational purposes and is not used to identify individual visitors.</p>
                </div>
              ),
            },
            {
              title: '3. Vercel Hosting',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>This website is hosted by Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA. When you access this website, your request is processed by Vercel's infrastructure. Vercel may process access logs and usage data as necessary for the provision of its hosting services.</p>
                  <p>For more information, see Vercel's Privacy Policy at <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">vercel.com/legal/privacy-policy</a>.</p>
                  <p>Data transfer to the USA is based on the European Commission's Standard Contractual Clauses (SCCs).</p>
                </div>
              ),
            },
            {
              title: '4. Amazon Associates Programme',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>This website participates in the Amazon Services LLC Associates Program, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
                  <p>When you click an Amazon link on this website, you will be redirected to Amazon.com. Amazon may set cookies on your device and collect data in accordance with their own privacy policy. We have no control over Amazon's data processing.</p>
                  <p>We earn a small commission when purchases are made through our affiliate links, at no additional cost to you. This does not influence our editorial recommendations.</p>
                  <p>Amazon's privacy policy is available at <a href="https://www.amazon.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">amazon.com/privacy</a>.</p>
                </div>
              ),
            },
            {
              title: '5. Google Fonts',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>This website uses fonts provided by Google Fonts, served via the Next.js font optimisation system. Fonts are downloaded at build time and self-hosted on our servers — they are not loaded from Google's servers at runtime. No data is transmitted to Google when you visit this website.</p>
                </div>
              ),
            },
            {
              title: '6. Images from Unsplash',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>Some images on this website are sourced from Unsplash (unsplash.com) and are used under the Unsplash License. Images are served directly from Unsplash's CDN infrastructure. When your browser loads these images, a connection is made to Unsplash's servers.</p>
                  <p>Please note that photographs on this website are placeholder images. They are not photographs of the individuals named and are used for illustrative layout purposes only until proper licensed photography is in place.</p>
                  <p>Unsplash's privacy policy: <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">unsplash.com/privacy</a></p>
                </div>
              ),
            },
            {
              title: '7. Your Rights Under GDPR',
              content: (
                <div className="text-stone-400 font-body text-sm leading-relaxed space-y-3">
                  <p>As a resident of the European Economic Area, you have the following rights regarding your personal data:</p>
                  <ul className="space-y-2">
                    {[
                      'Right of access (Art. 15 GDPR)',
                      'Right to rectification (Art. 16 GDPR)',
                      'Right to erasure / "right to be forgotten" (Art. 17 GDPR)',
                      'Right to restriction of processing (Art. 18 GDPR)',
                      'Right to data portability (Art. 20 GDPR)',
                      'Right to object (Art. 21 GDPR)',
                      'Right to lodge a complaint with a supervisory authority',
                    ].map((right) => (
                      <li key={right} className="flex items-start gap-2">
                        <span className="text-gold-600 flex-shrink-0 mt-0.5">—</span>
                        <span>{right}</span>
                      </li>
                    ))}
                  </ul>
                  <p>To exercise your rights, contact us at <a href="mailto:jorbracas@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">jorbracas@gmail.com</a>.</p>
                  <p>You also have the right to lodge a complaint with the competent supervisory authority. The supervisory authority for Berlin is the Berliner Beauftragte für Datenschutz und Informationsfreiheit (BlnBDI).</p>
                </div>
              ),
            },
            {
              title: '8. Changes to This Policy',
              content: (
                <p className="text-stone-400 font-body text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. The current version is always available at this URL. Significant changes will be indicated by updating the date at the top of this page.
                </p>
              ),
            },
          ].map(({ title, content }) => (
            <div key={title} className="card-dark p-8">
              <h2 className="display-heading text-xl text-stone-100 mb-5">{title}</h2>
              {content}
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}
