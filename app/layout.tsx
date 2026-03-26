import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
  title: {
    default: '4Sports Golf — Professional Golf Management & Insights',
    template: '%s | 4Sports Golf',
  },
  description:
    'Home of professional golf management. Biographies, tour news, and equipment guides for the serious golf enthusiast.',
  keywords: ['golf', 'DP World Tour', 'European Tour', 'golf management', 'golf biography', 'golf equipment'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://4sportsgolf.com',
    siteName: '4Sports Golf',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="bg-fairway-900 text-stone-100 font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
