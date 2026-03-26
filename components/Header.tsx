'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { label: 'Players', href: '/players' },
  { label: 'Blog', href: '/blog' },
  { label: 'Shop', href: '/shop' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fairway-900/95 backdrop-blur-sm border-b border-fairway-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gold-500 flex items-center justify-center">
              <span className="text-fairway-900 font-display font-bold text-xs">4S</span>
            </div>
            <span className="font-display text-stone-100 font-bold text-lg tracking-tight">
              4Sports <span className="text-gold-400">Golf</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-body tracking-wide transition-colors duration-200 ${
                  pathname.startsWith(item.href)
                    ? 'text-gold-400'
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="btn-gold text-xs py-2 px-4"
            >
              Shop Equipment
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-stone-400 hover:text-stone-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-fairway-700 py-4 space-y-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-body tracking-wide py-2 transition-colors ${
                  pathname.startsWith(item.href) ? 'text-gold-400' : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
