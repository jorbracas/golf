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
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Biographies, insights, and equipment guides for the serious golf enthusiast. Home of professional golf management since 2006.
            </p>
            <p className="text-stone-600 text-xs mt-6">
              Participant in the Amazon Services LLC Associates Program. As an Amazon Associate we earn from qualifying purchases.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="section-label mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Players', href: '/players' },
                { label: 'Golf Blog', href: '/blog' },
                { label: 'Equipment Shop', href: '/shop' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-gold-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Players */}
          <div>
            <h4 className="section-label mb-4">Players</h4>
            <ul className="space-y-3">
              {[
                { label: 'Edoardo Molinari', href: '/players/edoardo-molinari' },
                { label: 'Andrea Pavan', href: '/players/andrea-pavan' },
                { label: 'Richie Ramsey', href: '/players/richie-ramsey' },
                { label: 'Eddie Pepperell', href: '/players/eddie-pepperell' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-gold-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-fairway-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} 4Sports Golf. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs">
            Professional Golf Management & Editorial
          </p>
        </div>
      </div>
    </footer>
  )
}
