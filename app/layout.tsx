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
    'American Global Worldwide International Commerce is an online retailer offering a wide selection of products, solutions, and everyday essentials for modern consumers.',

  keywords: [
    "mike turko",
    "elayne dell",

  ],
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },

  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "ShopAGWIC",
  },
  alternates: {
    canonical: "https://shopagwic.com",
  },
  verification: {
    google: 'paste-the-code-from-search-console-here',
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