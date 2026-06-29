'use client'

import { useEffect, useState } from 'react'

export default function ArticleActions({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [views, setViews] = useState<number | null>(null)
  const [justLiked, setJustLiked] = useState(false)

  useEffect(() => {
    const storedLiked = localStorage.getItem(`like:${slug}`) === '1'
    const storedLikes = parseInt(localStorage.getItem(`likes:${slug}`) ?? '0', 10)
    setLiked(storedLiked)
    setLikes(storedLikes)

    // Increment view on mount (once per session)
    const sessionKey = `viewed:${slug}`
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, '1')
      fetch(`/api/views/${slug}`, { method: 'POST' })
        .then(r => r.json())
        .then(d => setViews(d.views))
        .catch(() => {})
    } else {
      fetch(`/api/views/${slug}`)
        .then(r => r.json())
        .then(d => setViews(d.views))
        .catch(() => {})
    }
  }, [slug])

  const handleLike = () => {
    const next = !liked
    const nextCount = Math.max(0, likes + (next ? 1 : -1))
    setLiked(next)
    setLikes(nextCount)
    if (next) {
      setJustLiked(true)
      setTimeout(() => setJustLiked(false), 600)
      localStorage.setItem(`like:${slug}`, '1')
    } else {
      localStorage.removeItem(`like:${slug}`)
    }
    localStorage.setItem(`likes:${slug}`, String(nextCount))
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Thumbs up */}
      <button
        onClick={handleLike}
        className={`group flex items-center gap-2.5 px-5 py-3 rounded-full border font-semibold text-sm transition-all ${
          liked
            ? 'bg-accent border-accent text-[#0A0A0A]'
            : 'bg-white border-black/12 text-black/55 hover:border-black/30 hover:text-black'
        } ${justLiked ? 'scale-110' : 'scale-100'}`}
        aria-pressed={liked}
        aria-label={liked ? "Retirer mon like" : "J'aime cet article"}
        style={{ transition: 'transform 0.15s, background 0.2s, border-color 0.2s, color 0.2s' }}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
          <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
        </svg>
        <span>{likes > 0 ? `${likes} j'aime` : "J'aime"}</span>
      </button>

      {/* Views */}
      {views !== null && (
        <div className="flex items-center gap-1.5 text-black/35 text-xs font-mono">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          {views.toLocaleString('fr-CH')} vue{views > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
