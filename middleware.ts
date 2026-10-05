import { NextRequest, NextResponse } from 'next/server'
import goneList from './lib/prune/gone.json'
import redirectMap from './lib/prune/redirects.json'

// Pages removed in the Sept 2026 content prune answer 410 Gone so search engines drop them quickly.
// Merged pages and legacy agency URLs (cited by Wikipedia / press releases) 301 to their new home.
const GONE = new Set<string>(goneList as string[])
const REDIRECTS = redirectMap as Record<string, string>

const GONE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Page removed | 4Sports Golf</title>
<style>body{font-family:system-ui,sans-serif;background:#0f1511;color:#e7e5e4;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:16px}
a{color:#d4a73a}main{max-width:32rem;text-align:center}</style></head>
<body><main><h1>This page has been removed</h1><p>We retired this article while tidying up the site.</p>
<p><a href="/shop">Browse our equipment guides</a> · <a href="/">Home</a></p></main></body></html>`

export function middleware(req: NextRequest) {
  const raw = req.nextUrl.pathname
  const path = raw.replace(/\/+$/, '') || '/'
  const lower = path.toLowerCase()

  const target = REDIRECTS[path] ?? REDIRECTS[lower]
  if (target) return NextResponse.redirect(new URL(target, req.url), 301)

  // Legacy agency URLs that mention one of our profiled players (news, bios) -> that player's profile
  if (!/^\/(shop|blog|players)(\/|$)/.test(lower)) {
    const m = lower.match(/molinari|pavan|ramsay|ramsey|pepperell/)
    if (m) {
      const to = { molinari: 'edoardo-molinari', pavan: 'andrea-pavan', ramsay: 'richie-ramsay', ramsey: 'richie-ramsay', pepperell: 'eddie-pepperell' }[m[0]]
      return NextResponse.redirect(new URL(`/players/${to}`, req.url), 301)
    }
  }

  // /player-management/<anything else> -> players index
  if (lower.startsWith('/player-management')) return NextResponse.redirect(new URL('/players', req.url), 301)

  if (GONE.has(path)) {
    // (served directly, with or without trailing slash)
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=86400' },
    })
  }

  // default: strip trailing slash (what Next.js would do, but in one hop)
  if (raw !== path) return NextResponse.redirect(new URL(path + req.nextUrl.search, req.url), 308)

  return NextResponse.next()
}

export const config = {
  // everything except Next internals and static files
  // (old agency URLs ending in .html/.php still pass through so they can be redirected)
  matcher: ['/((?!_next/|images/|favicon|opengraph-image|robots.txt|sitemap.xml|.*\\.(?:js|css|png|jpe?g|webp|gif|svg|ico|txt|xml|json|map|woff2?)$).*)'],
}
