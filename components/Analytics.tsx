'use client'

import { useEffect } from 'react'
import { CONSENT_EVENT, GA_ID, getStoredPrefs, type Prefs } from '@/lib/consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean
  }
}

function loadGA() {
  if (!GA_ID || window.gtag) {
    if (GA_ID) window[`ga-disable-${GA_ID}`] = false
    return
  }
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

// Google Analytics loads only after the visitor has opted in to analytics cookies (GDPR / TDDDG).
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return
    const apply = (prefs: Prefs | null) => {
      if (prefs?.analytics) loadGA()
      else window[`ga-disable-${GA_ID}`] = true
    }
    apply(getStoredPrefs())
    const onChange = (e: Event) => apply((e as CustomEvent<Prefs>).detail)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])
  return null
}
