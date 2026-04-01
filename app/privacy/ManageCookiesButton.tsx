'use client'

export function ManageCookiesButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem('4sg_consent_v1')
        window.location.reload()
      }}
      className="text-gold-400 hover:text-gold-300 text-xs font-body tracking-wide border border-gold-600/40 hover:border-gold-500 px-4 py-2 transition-colors"
    >
      Reset cookie preferences →
    </button>
  )
}
