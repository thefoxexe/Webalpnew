'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-posts'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [posts, query])

  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <>
      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher : WordPress, SEO, Next.js, design..."
            className="w-full bg-white border border-black/10 rounded-2xl pl-11 pr-10 py-3.5 text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/30 transition-colors"
            aria-label="Rechercher dans le blog"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
              aria-label="Effacer la recherche"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        {query && (
          <p className="text-xs text-black/35 mt-2.5 pl-1">
            {filtered.length === 0
              ? 'Aucun résultat'
              : `${filtered.length} article${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`
            }
          </p>
        )}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 text-center py-16">
          <p className="font-display font-bold text-black text-xl mb-2">Aucun résultat pour &ldquo;{query}&rdquo;</p>
          <p className="text-black/40 text-sm">Essayez : SEO, WordPress, design, e-commerce, performance...</p>
        </div>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-6">
          <div className="grid md:grid-cols-2 gap-3">
            {featured.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className={`rounded-2xl p-7 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[360px] transition-all duration-300 group-hover:scale-[1.01] ${
                  i === 0 ? 'bg-[#0A0A0A]' : 'bg-white border border-black/8'
                }`}>
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
          {!query && <p className="text-[10px] font-mono text-black/25 uppercase tracking-widest mb-6">— Tous les articles</p>}
          <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-b last:border-b-0 border-black/6 hover:bg-[#F5F4F0] transition-colors"
              >
                <div className="flex items-start gap-4 px-5 py-5 md:px-6 md:py-6">
                  <span className="hidden sm:block font-mono text-[10px] text-black/20 pt-0.5 w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-black/30 border border-black/8 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-mono text-black/20">{post.readTime} min</span>
                      <span className="hidden md:inline text-[10px] font-mono text-black/15">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="font-display font-extrabold text-black text-sm md:text-base lg:text-lg leading-tight mb-1">
                      {post.title}
                    </h2>
                    <p className="text-black/40 text-xs md:text-sm line-clamp-1 hidden sm:block">{post.excerpt}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
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
    </>
  )
}
