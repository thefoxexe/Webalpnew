import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'
import BlogClient from './BlogClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog — Conseils web & SEO pour PME suisses | WebAlp',
  description: 'Ressources, guides et conseils concrets pour les PME suisses : SEO local, prix d\'un site web, erreurs à éviter, conversion. Par les experts de WebAlp à Sion, Valais.',
  openGraph: {
    title: 'Blog WebAlp — Conseils web & SEO pour PME suisses',
    description: 'Guides et conseils concrets pour optimiser votre présence en ligne en Suisse.',
    url: 'https://webalp.ch/blog',
    siteName: 'WebAlp',
    type: 'website',
  },
  alternates: { canonical: 'https://webalp.ch/blog' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog WebAlp',
  description: 'Guides et conseils concrets pour les PME suisses sur le web, le SEO et la stratégie digitale.',
  url: 'https://webalp.ch/blog',
  publisher: { '@type': 'Organization', name: 'WebAlp', url: 'https://webalp.ch' },
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className="min-h-screen bg-[#F5F4F0]">
      {/* Navbar spacer */}
      <div className="h-16" />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">
        <p className="text-[10px] font-mono text-black/30 tracking-[0.2em] uppercase mb-5">— Ressources</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h1
            className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Conseils pour<br />
            <span className="text-black/20">dominer le web.</span>
          </h1>
          <p className="text-black/40 text-sm max-w-xs leading-relaxed md:text-right">
            Guides pratiques, stratégies SEO et conseils concrets pour les PME suisses qui veulent des résultats mesurables.
          </p>
        </div>
      </div>

      <BlogClient posts={BLOG_POSTS} />

      {/* Bottom CTA */}
      <div className="bg-[#0A0A0A] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">{"— Passez à l'action"}</p>
          <h2
            className="font-display font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Prêt à avoir un site qui génère de vrais clients ?
          </h2>
          <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto">
            Un échange téléphonique, un devis sous 24h. On s&apos;occupe de tout.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] text-sm font-bold px-7 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all"
          >
            Démarrer un projet
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
      <Footer />
    </>
  )
}
