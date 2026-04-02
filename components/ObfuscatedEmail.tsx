'use client'

import { useState } from 'react'

// Email split into parts — never assembled in static HTML, only in JS runtime
// Scrapers reading the raw HTML or sitemap see nothing useful
const PARTS = ['jorbracas', '@', 'gmail', '.', 'com']

interface Props {
  className?: string
  /** Show just a "Send email →" label until clicked, instead of the address */
  label?: string
}

export function ObfuscatedEmail({ className, label }: Props) {
  const [revealed, setRevealed] = useState(false)

  const email = PARTS.join('')

  if (!revealed) {
    return (
      <button
        onClick={() => setRevealed(true)}
        className={className ?? 'text-gold-400 hover:text-gold-300 transition-colors text-sm font-body'}
        aria-label="Reveal email address"
      >
        {label ?? 'Show email address →'}
      </button>
    )
  }

  return (
    <a
      href={`mailto:${email}`}
      className={className ?? 'text-gold-400 hover:text-gold-300 transition-colors text-sm font-body'}
    >
      {email}
    </a>
  )
}
