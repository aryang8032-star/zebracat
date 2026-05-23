import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { CookieBanner } from '@/components/ui/CookieBanner'
import '../styles/globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zebracatindia.com'),
  title: {
    default: 'Zebracat AI Publicity — India\'s 360° Media & Advertising Agency | Newspaper, Radio, TV, OOH, Digital',
    template: '%s | Zebracat AI Publicity',
  },
  description: 'Zebracat AI Publicity is Gurugram\'s leading 360° advertising and media agency. Book newspaper ads, radio spots, TV campaigns, cinema PR, OTT, digital signage, influencer marketing, lift branding and transit media across India. AI-powered planning, pan-India reach.',
  keywords: [
    'media agency india', 'advertising agency gurugram', 'newspaper advertising india',
    'radio advertising', 'tv advertising india', 'cinema advertising', 'OTT advertising',
    'digital signage india', 'influencer marketing', 'lift branding', 'transit media',
    'out of home advertising', 'OOH india', '360 degree media', 'media buying india',
    'zebracat publicity', 'zebracatindia', 'media agency delhi NCR',
  ],
  authors: [{ name: 'Zebracat AI Publicity', url: 'https://zebracatindia.com' }],
  creator: 'Zebracat AI Publicity',
  publisher: 'Zebracat AI Publicity',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'hi_IN',
    url: 'https://zebracatindia.com',
    siteName: 'Zebracat AI Publicity',
    title: 'Zebracat AI Publicity — India\'s 360° Media & Advertising Agency',
    description: 'Book newspaper ads, radio spots, TV campaigns, cinema PR, OOH, digital signage and influencer campaigns across India. AI-powered. Pan-India network.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Zebracat AI Publicity' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ZebracatAi',
    creator: '@ZebracatAi',
    title: 'Zebracat AI Publicity — India\'s 360° Media Agency',
    description: 'Book newspaper, radio, TV, cinema, OTT and OOH ads across India. AI-powered media buying.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://zebracatindia.com',
    languages: { 'en-IN': 'https://zebracatindia.com', 'hi-IN': 'https://zebracatindia.com/hi' },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5FF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0A1F' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://zebracatindia.com/#organization',
      name: 'Zebracat AI Publicity',
      alternateName: 'Zebracat',
      url: 'https://zebracatindia.com',
      logo: { '@type': 'ImageObject', url: 'https://zebracatindia.com/images/logo.svg' },
      contactPoint: [
        { '@type': 'ContactPoint', telephone: '+91-8882861568', contactType: 'customer service', availableLanguage: ['English', 'Hindi'] },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sector-72, Fazilpur',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        postalCode: '122001',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.facebook.com/zebracatindia',
        'https://twitter.com/ZebracatAi',
        'https://www.instagram.com/zebracatindia',
        'https://www.linkedin.com/company/zebracat-ai-publicity',
      ],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '450', bestRating: '5' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://zebracatindia.com/#website',
      url: 'https://zebracatindia.com',
      name: 'Zebracat AI Publicity',
      publisher: { '@id': 'https://zebracatindia.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://zebracatindia.com/search?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScrollProvider>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <FloatingActions />
            <CookieBanner />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
