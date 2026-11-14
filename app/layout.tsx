import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import '@/styles/global.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RouteTracker } from '@/components/RouteTracker'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shopagwic.com'
const SITE_NAME = 'AGWIC'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Everything. Everywhere. Eventually.`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'American Global Worldwide International Commerce. A global conglomerate selling things that should not be sold. Parody storefront.',
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="default"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <RouteTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}