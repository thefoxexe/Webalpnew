'use client'

import { useState } from 'react'

export default function ArticleActions({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://webalp.ch/blog/${slug}`

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // partage annulé
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={share}
        className="flex items-center gap-2.5 px-5 py-3 rounded-full border font-semibold text-sm bg-white border-black/12 text-black/55 hover:border-black/30 hover:text-black transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <path d="M16 6l-4-4-4 4" />
          <path d="M12 2v13" />
        </svg>
        <span>{copied ? 'Lien copié' : 'Partager cet article'}</span>
      </button>
    </div>
  )
}
