import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
// Third-party CSS imports first
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/css'
import 'swiper/css/bundle'
import 'react-modal-video/css/modal-video.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-photo-view/dist/react-photo-view.css'

// Custom CSS imports - order matters for proper overrides
import '../assets/css/font-awesome.min.css'
import '../assets/css/animate.css'
import '../assets/css/validnavs.css'
import '../assets/css/unit-test.css'
import '../assets/css/helper.css'
import '../assets/css/style.css'
import './globals.css'
// New design-system styles (Tailwind, scoped under #tw-root)
import './tailwind.css'

import ClientProviders from '@/components/providers/ClientProviders'
import SessionProvider from '@/components/SessionProvider'
import ConditionalLayout from '../components/Layouts/ConditionalLayout'
import { siteConfig } from '@/lib/siteConfig'
import { personJsonLd, websiteJsonLd } from '@/lib/seo'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': `${siteConfig.url}/blog/feed.xml`,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <div id="tw-root">
          <SessionProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <ClientProviders />
          </SessionProvider>
        </div>
      </body>
    </html>
  )
} 