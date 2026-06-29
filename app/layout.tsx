import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Loader from '@/components/Loader'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://webalp.ch'),
  title: {
    default: 'WebAlp — Agence Web Suisse | Sites qui convertissent',
    template: '%s | WebAlp',
  },
  description:
    'Agence web à Sion, Valais. Nous créons des sites web performants, SEO-optimisés et orientés résultats pour startups et PME suisses. À partir de CHF 890.',
  keywords: [
    'agence web Suisse',
    'création site web Valais',
    'site web Sion',
    'agence web Sion',
    'SEO Suisse romande',
    'agence web PME Suisse',
    'création site web startup',
    'site web professionnel Suisse',
    'référencement naturel Suisse',
    'WebAlp',
  ],
  authors: [{ name: 'WebAlp', url: 'https://webalp.ch' }],
  creator: 'WebAlp',
  publisher: 'WebAlp',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://webalp.ch',
    siteName: 'WebAlp',
    title: 'WebAlp — Agence Web Suisse | Sites qui convertissent',
    description:
      'Des sites web performants pour startups et PME suisses. Design sur mesure, SEO natif, résultats mesurables.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebAlp — Agence Web Suisse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebAlp — Agence Web Suisse',
    description: 'Des sites web qui travaillent pour vous, 24h/24.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://webalp.ch',
    languages: {
      'fr-CH': 'https://webalp.ch',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://webalp.ch/#business',
      name: 'WebAlp',
      description:
        'Agence web à Sion, Valais. Création de sites web professionnels pour startups et PME suisses.',
      url: 'https://webalp.ch',
      telephone: '+41798235862',
      email: 'contact@webalp.ch',
      foundingDate: '2025',
      priceRange: 'CHF 890 – CHF 2490',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sion',
        addressRegion: 'Valais',
        postalCode: '1950',
        addressCountry: 'CH',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 46.2313,
        longitude: 7.3595,
      },
      areaServed: [
        { '@type': 'Country', name: 'Suisse' },
        { '@type': 'State', name: 'Valais' },
      ],
      serviceType: [
        'Création de sites web',
        'Optimisation SEO',
        'Design web',
        'Maintenance web',
      ],
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://webalp.ch/#website',
      url: 'https://webalp.ch',
      name: 'WebAlp',
      description: 'Agence web suisse à Sion, Valais',
      publisher: { '@id': 'https://webalp.ch/#business' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://webalp.ch/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-white text-black overflow-x-hidden">
        {/* Netlify Forms — déclaration statique server-rendered pour détection au build */}
        <form name="contactv2" data-netlify="true" data-netlify-honeypot="bot-field" hidden aria-hidden="true">
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="company" />
          <select name="budget"><option value=""></option></select>
          <textarea name="message"></textarea>
        </form>

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11013404464"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11013404464');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F9FYQ9VRMH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F9FYQ9VRMH');
          `}
        </Script>

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Ugvicinbn0xcm6zDGOMYuQ"
          strategy="afterInteractive"
        />

        <Loader />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <WhatsAppButton />
      </body>
    </html>
  )
}
