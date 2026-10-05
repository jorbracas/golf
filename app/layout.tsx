import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.4sportsgolf.com'),
  title: {
    default: '4Sports Golf — Player Profiles, Technique & Equipment Guides',
    template: '%s | 4Sports Golf',
  },
  description:
    'Independent golf site with DP World Tour player profiles, technique articles and equipment buying guides for indoor practice, clubs, balls and more.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.4sportsgolf.com',
    siteName: '4Sports Golf',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '4Sports Golf — Player Profiles & Equipment Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@4sportsgolf',
    creator: '@4sportsgolf',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="bg-fairway-900 text-stone-100 font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
