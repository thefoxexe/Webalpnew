import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { LanguageProvider } from '@/contexts/LanguageContext'
import WhatsAppButton from '@/components/WhatsAppButton'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'
import { SERVICES } from '@/lib/services'
import RevealObserver from '@/components/site/RevealObserver'

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

const HOME_TITLE = 'Agence web Sion, Valais · Création de site internet | WebAlp'
const HOME_DESCRIPTION =
  'Agence web à Sion (Valais) : création de sites internet, e-commerce et applications web pour PME. Dès CHF 690, devis gratuit sous 24h.'

export const metadata: Metadata = {
  metadataBase: new URL('https://webalp.ch'),
  title: {
    default: HOME_TITLE,
    template: '%s | WebAlp',
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: 'WebAlp', url: 'https://webalp.ch' }],
  creator: 'WebAlp',
  publisher: 'WebAlp',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://webalp.ch',
    siteName: 'WebAlp',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebAlp — Agence web à Sion, Valais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
        'Agence web à Sion, en Valais. Création de sites vitrines, de sites e-commerce et d\'applications web pour les PME, maintenance et SEO technique.',
      url: 'https://webalp.ch',
      logo: 'https://webalp.ch/logo-webalp.png',
      image: 'https://webalp.ch/og-image.png',
      telephone: '+41798235862',
      email: 'contact@webalp.ch',
      foundingDate: '2025',
      priceRange: "CHF 690 – CHF 1'990",
      currenciesAccepted: 'CHF',
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
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Valais' },
        { '@type': 'Country', name: 'Suisse' },
      ],
      knowsLanguage: ['fr', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services WebAlp',
        itemListElement: SERVICES.map(sv => ({
          '@type': 'Offer',
          url: `https://webalp.ch/${sv.slug}`,
          itemOffered: { '@type': 'Service', name: sv.name },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: sv.priceFrom,
            priceCurrency: 'CHF',
            minPrice: sv.priceFrom,
            ...(sv.monthly ? { unitText: 'mois' } : {}),
          },
        })),
      },
      sameAs: ['https://www.instagram.com/webalp.ch', 'https://www.linkedin.com/company/webalpch/'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://webalp.ch/#website',
      url: 'https://webalp.ch',
      name: 'WebAlp',
      inLanguage: 'fr-CH',
      publisher: { '@id': 'https://webalp.ch/#business' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} overflow-x-hidden`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans bg-white text-black overflow-x-hidden">
        <form name="contactv2" data-netlify="true" data-netlify-honeypot="bot-field" hidden aria-hidden="true">
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="company" />
          <select name="budget"><option value=""></option></select>
          <textarea name="message"></textarea>
        </form>

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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18292642678"
          strategy="afterInteractive"
        />
        <Script id="google-ads-brief" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18292642678');
          `}
        </Script>

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

        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Ugvicinbn0xcm6zDGOMYuQ"
          strategy="afterInteractive"
        />

        <LanguageProvider>
          {children}
        </LanguageProvider>
        <RevealObserver />
        <WhatsAppButton />
        <CustomCursor />
        <ScrollProgress />
      </body>
    </html>
  )
}
