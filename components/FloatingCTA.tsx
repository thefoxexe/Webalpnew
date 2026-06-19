'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FloatingCTA() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const viewH = window.innerHeight
      // Show after 1 viewport height, hide when near bottom
      const nearBottom = scrolled + viewH >= document.body.scrollHeight - 200
      setVisible(scrolled > viewH * 0.9 && !nearBottom)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2 bg-black rounded-full px-2 py-2 shadow-2xl shadow-black/40">
        <Link
          href="#contact"
          tabIndex={visible ? 0 : -1}
          className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
        >
          {t.nav.cta}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <a
          href="tel:+41772741726"
          tabIndex={visible ? 0 : -1}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Appeler WebAlp"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2.5h3l1.5 3-2 1c.83 1.67 2 2.83 3.5 3.5l1-2 3 1.5V13c-5 .33-9-4-10-10.5z" stroke="white" strokeWidth="1.2"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
