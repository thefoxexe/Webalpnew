import Link from 'next/link'
import { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — Conseils web & SEO pour PME suisses | WebAlp',
  description: 'Ressources, guides et conseils concrets pour les PME suisses : SEO local, prix d\'un site web, erreurs à éviter, conversion. Par les experts de WebAlp à Sion, Valais.',
  openGraph: {
    title: 'Blog WebAlp — Conseils web & SEO pour PME suisses',
    description: 'Guides et conseils concrets pour optimiser votre présence en ligne en Suisse.',
    url: 'https://webalp.ch/blog',
    siteName: 'WebAlp',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const featured = BLOG_POSTS.filter(p => p.featured)
  const rest = BLOG_POSTS.filter(p => !p.featured)

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Navbar spacer */}
      <div className="h-20" />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20">
        <p className="text-[10px] font-mono text-black/30 tracking-[0.2em] uppercase mb-5">— Ressources</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Conseils pour<br />
            <span className="text-black/20">dominer le web.</span>
          </h1>
          <p className="text-black/40 text-sm max-w-xs leading-relaxed md:text-right">
            Guides pratiques, stratégies SEO et conseils concrets pour les PME suisses qui veulent des résultats mesurables.
          </p>
        </div>
      </div>

      {/* Featured posts */}
      {featured.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-6">
          <div className="grid md:grid-cols-2 gap-3">
            {featured.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article
                  className={`rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[360px] transition-all duration-300 group-hover:scale-[1.01] ${
                    i === 0 ? 'bg-[#0A0A0A]' : 'bg-white border border-black/8'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        i === 0 ? 'border-white/10 text-white/35' : 'border-black/8 text-black/35'
                      }`}>
                        {post.category}
                      </span>
                      <span className={`text-[10px] font-mono ${i === 0 ? 'text-white/25' : 'text-black/25'}`}>
                        {post.readTime} min
                      </span>
                    </div>

                    <h2 className={`font-display font-extrabold text-2xl md:text-3xl leading-tight mb-4 ${
                      i === 0 ? 'text-white' : 'text-black'
                    }`}>
                      {post.title}
                    </h2>

                    <p className={`text-sm leading-relaxed line-clamp-3 ${i === 0 ? 'text-white/45' : 'text-black/45'}`}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div className={`flex items-center justify-between mt-8 pt-6 border-t ${
                    i === 0 ? 'border-white/8' : 'border-black/6'
                  }`}>
                    <span className={`text-xs font-mono ${i === 0 ? 'text-white/25' : 'text-black/25'}`}>
                      {formatDate(post.date)}
                    </span>
                    <span className={`text-xs font-bold transition-colors ${
                      i === 0
                        ? 'text-accent group-hover:text-accent/70'
                        : 'text-black/40 group-hover:text-black'
                    }`}>
                      {"Lire l'article →"}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All other posts */}
      {rest.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <p className="text-[10px] font-mono text-black/25 uppercase tracking-widest mb-6">— Tous les articles</p>
          <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block border-b last:border-b-0 border-black/6 hover:bg-[#F5F4F0] transition-colors">
                <div className="flex items-start gap-6 px-6 py-6">
                  <span className="font-mono text-[10px] text-black/20 pt-0.5 w-12 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-black/30 border border-black/8 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-mono text-black/20">{post.readTime} min</span>
                    </div>
                    <h2 className="font-display font-extrabold text-black text-base md:text-lg leading-tight mb-1">
                      {post.title}
                    </h2>
                    <p className="text-black/40 text-sm line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <span className="text-[10px] font-mono text-black/20">{formatDate(post.date)}</span>
                    <svg className="text-black/15 group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-[#0A0A0A] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">{"— Passez à l'action"}</p>
          <h2 className="font-display font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Prêt à avoir un site qui génère de vrais clients ?
          </h2>
          <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto">
            On livre en 14 jours. Dès CHF 690. Audit gratuit de votre présence actuelle inclus.
          </p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] text-sm font-bold px-7 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all accent-glow">
            Démarrer un projet
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
