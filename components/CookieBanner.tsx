'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Prefs = {
  essential: true
  marketing: boolean
}

const COOKIE_KEY = '4sg_consent_v1'

function getStoredPrefs(): Prefs | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(COOKIE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function storePrefs(prefs: Prefs) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [panel, setPanel] = useState<'main' | 'settings'>('main')
  const [marketing, setMarketing] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    const stored = getStoredPrefs()
    if (!stored) {
      // Slight delay so banner doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss(prefs: Prefs) {
    storePrefs(prefs)
    setAnimateOut(true)
    setTimeout(() => setVisible(false), 350)
  }

  function acceptAll() {
    dismiss({ essential: true, marketing: true })
  }

  function acceptSelected() {
    dismiss({ essential: true, marketing })
  }

  function rejectAll() {
    dismiss({ essential: true, marketing: false })
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop blur only on settings panel */}
      {panel === 'settings' && (
        <div
          className="fixed inset-0 bg-fairway-900/60 backdrop-blur-sm z-40"
          onClick={() => setPanel('main')}
        />
      )}

      <div
        className={`fixed z-50 transition-all duration-350 ease-in-out ${
          animateOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        } ${
          panel === 'settings'
            ? 'inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-4 sm:bottom-8 w-auto sm:w-[560px]'
            : 'bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px]'
        }`}
      >
        {panel === 'main' ? (
          /* ── Main banner ── */
          <div className="bg-fairway-800 border border-fairway-600 shadow-2xl overflow-hidden">
            {/* Gold accent bar */}
            <div className="h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-stone-100 leading-tight">
                    Cookie preferences
                  </h3>
                  <p className="text-stone-500 text-xs font-body mt-0.5">
                    4Sports Golf · Berlin, Germany
                  </p>
                </div>
              </div>

              <p className="text-stone-400 text-xs font-body leading-relaxed mb-5">
                We use essential cookies to keep the site running. We also use affiliate tracking cookies from Amazon — clicking product links may set Amazon cookies on your device. No analytics or advertising cookies are set by us.{' '}
                <Link href="/privacy" className="text-gold-500 hover:text-gold-300 underline underline-offset-2 transition-colors">
                  Privacy Policy
                </Link>
              </p>

              {/* Cookie types summary */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between py-2.5 px-3 bg-fairway-900/50 border border-fairway-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                    <span className="text-xs font-body text-stone-300">Essential cookies</span>
                  </div>
                  <span className="text-xs font-body text-teal-500 font-medium">Always on</span>
                </div>
                <div className="flex items-center justify-between py-2.5 px-3 bg-fairway-900/50 border border-fairway-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span className="text-xs font-body text-stone-300">Amazon affiliate tracking</span>
                  </div>
                  <span className="text-xs font-body text-stone-500">Optional</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button
                  onClick={acceptAll}
                  className="w-full bg-gold-500 hover:bg-gold-400 text-fairway-900 font-body font-semibold text-xs px-4 py-3 tracking-wide uppercase transition-colors duration-150"
                >
                  Accept all
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={rejectAll}
                    className="border border-fairway-600 hover:border-fairway-500 text-stone-400 hover:text-stone-300 font-body text-xs px-4 py-2.5 transition-colors duration-150"
                  >
                    Essential only
                  </button>
                  <button
                    onClick={() => setPanel('settings')}
                    className="border border-fairway-600 hover:border-gold-600 text-stone-400 hover:text-gold-400 font-body text-xs px-4 py-2.5 transition-colors duration-150"
                  >
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Settings panel ── */
          <div className="bg-fairway-800 border border-fairway-600 shadow-2xl overflow-hidden">
            <div className="h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

            <div className="p-6">
              {/* Back button + title */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setPanel('main')}
                  className="text-stone-500 hover:text-stone-300 transition-colors"
                  aria-label="Back"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="font-display text-base font-bold text-stone-100">Cookie settings</h3>
              </div>

              {/* Essential */}
              <div className="mb-4 pb-4 border-b border-fairway-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                      <span className="text-stone-200 text-sm font-body font-medium">Essential cookies</span>
                    </div>
                    <p className="text-stone-500 text-xs font-body leading-relaxed">
                      Required for the website to function. They do not collect personal data and cannot be disabled.
                    </p>
                  </div>
                  {/* Always-on toggle */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="relative w-10 h-6 bg-teal-600 rounded-full cursor-not-allowed opacity-70">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {['Cookie consent preference storage (localStorage)'].map((c) => (
                    <p key={c} className="text-stone-600 text-xs font-body pl-4 border-l border-fairway-700">
                      {c}
                    </p>
                  ))}
                </div>
              </div>

              {/* Marketing / Amazon */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-stone-200 text-sm font-body font-medium">Affiliate tracking</span>
                    </div>
                    <p className="text-stone-500 text-xs font-body leading-relaxed">
                      When you click Amazon product links, Amazon may set cookies to track your purchase and attribute our commission. These are Amazon's cookies, not ours. Disabling this means Amazon links still work but we may not receive commission for your purchase.
                    </p>
                  </div>
                  {/* Toggle */}
                  <button
                    role="switch"
                    aria-checked={marketing}
                    onClick={() => setMarketing(!marketing)}
                    className={`relative flex-shrink-0 mt-0.5 w-10 h-6 rounded-full transition-colors duration-200 ${
                      marketing ? 'bg-gold-500' : 'bg-fairway-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${marketing ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {['Amazon.com affiliate tracking cookie (amazon-adsystem.com)', 'Amazon session cookie (amazon.com)'].map((c) => (
                    <p key={c} className="text-stone-600 text-xs font-body pl-4 border-l border-fairway-700">
                      {c}
                    </p>
                  ))}
                </div>
              </div>

              {/* Footer note */}
              <p className="text-stone-600 text-xs font-body mb-5 leading-relaxed">
                Controller: Jorge Bravo Castrejón, Grellstrasse 13, 10409 Berlin.{' '}
                <Link href="/privacy" className="text-gold-600 hover:text-gold-400 transition-colors">
                  Full privacy policy →
                </Link>
              </p>

              {/* Save button */}
              <button
                onClick={acceptSelected}
                className="w-full bg-gold-500 hover:bg-gold-400 text-fairway-900 font-body font-semibold text-xs px-4 py-3 tracking-wide uppercase transition-colors duration-150"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
