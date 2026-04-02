import { ObfuscatedEmail } from '@/components/ObfuscatedEmail'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-fairway-800 border-t border-fairway-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold-500 flex items-center justify-center">
                <span className="text-fairway-900 font-display font-bold text-xs">4S</span>
              </div>
              <span className="font-display text-stone-100 font-bold text-lg">
                4Sports <span className="text-gold-400">Golf</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs mb-4">
              Biographies, insights, and equipment guides for the serious golf enthusiast. Home of professional golf management since 2006.
            </p>
            <div className="bg-fairway-900/60 border border-fairway-700 p-4 text-xs text-stone-500 font-body leading-relaxed">
              <span className="text-gold-600 font-semibold">Affiliate Disclosure: </span>
              4Sports Golf is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate we earn from qualifying purchases made through links on this site, at no extra cost to you.
            </div>
          </div>

          {/* Explore + Players */}
          <div>
            <h4 className="section-label mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Players', href: '/players' },
                { label: 'Golf Blog', href: '/blog' },
                { label: 'Equipment Shop', href: '/shop' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-gold-400 text-sm transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="section-label mt-8 mb-4">Players</h4>
            <ul className="space-y-3">
              {[
                { label: 'Edoardo Molinari', href: '/players/edoardo-molinari' },
                { label: 'Andrea Pavan', href: '/players/andrea-pavan' },
                { label: 'Richie Ramsey', href: '/players/richie-ramsey' },
                { label: 'Eddie Pepperell', href: '/players/eddie-pepperell' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-gold-400 text-sm transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="section-label mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: 'Impressum', href: '/impressum' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Affiliate Disclosure', href: '/disclosure' },
                { label: 'Image Credits', href: '/credits' },
                { label: 'Cookie-Einstellungen', href: '/privacy#cookies' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-gold-400 text-sm transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="section-label mt-8 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-stone-500 text-xs font-body">Berlin, Germany</li>
              <li>
                <ObfuscatedEmail className="text-stone-400 hover:text-gold-400 text-xs transition-colors font-body" label="Send us an email →" />
              </li>
              <li>
                <a href="/impressum" className="text-stone-600 hover:text-stone-400 text-xs font-body transition-colors">Legal notice (Impressum) →</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-fairway-700 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-stone-600 text-xs font-body">
              © {new Date().getFullYear()} 4Sports Golf. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-stone-700 text-xs font-body">
                Photography:{' '}
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="hover:text-stone-500 transition-colors">
                  Unsplash
                </a>
              </p>
              <span className="text-stone-700">·</span>
              <p className="text-stone-700 text-xs font-body">
                Hosted on{' '}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-stone-500 transition-colors">
                  Vercel
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
