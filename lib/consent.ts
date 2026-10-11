// Consent storage shared by the cookie banner, analytics loader and privacy page.
export const CONSENT_KEY = '4sg_consent_v2'
export const CONSENT_EVENT = '4sg-consent-change'
// Google Analytics 4 measurement ID. Loaded only after the visitor accepts analytics cookies.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MKFWQZWL72'

export type Prefs = { essential: true; analytics: boolean; marketing: boolean }

export function getStoredPrefs(): Prefs | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    return raw ? (JSON.parse(raw) as Prefs) : null
  } catch {
    return null
  }
}

export function storePrefs(prefs: Prefs) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs))
    localStorage.removeItem('4sg_consent_v1')
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: prefs }))
}
