'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.pricing, href: '#tarifs' },
    { label: t.nav.about, href: '#process' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  // On hero (not scrolled): dark background → white text
  // After scroll: white background → black text
  const dark = !scrolled

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-black/8 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`font-display font-extrabold text-xl tracking-tight transition-colors hover:opacity-70 ${dark ? 'text-white' : 'text-black'}`}
            aria-label="WebAlp"
          >
            WebAlp
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors underline-grow ${
                    dark ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <button
              onClick={toggleLang}
              className={`hidden md:flex items-center gap-1.5 text-xs font-bold transition-colors rounded-full px-3 py-1.5 border ${
                dark
                  ? 'text-white/50 hover:text-white border-white/20 hover:border-white/50'
                  : 'text-black/40 hover:text-black border-black/10 hover:border-black/30'
              }`}
              aria-label={`Switch to ${lang === 'fr' ? 'English' : 'Français'}`}
            >
              <span className={lang === 'fr' ? (dark ? 'text-white' : 'text-black') : (dark ? 'text-white/30' : 'text-black/30')}>FR</span>
              <span className={dark ? 'text-white/20' : 'text-black/20'}>/</span>
              <span className={lang === 'en' ? (dark ? 'text-white' : 'text-black') : (dark ? 'text-white/30' : 'text-black/30')}>EN</span>
            </button>

            <Link
              href="#contact"
              className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-150 active:scale-95 ${
                dark
                  ? 'bg-white text-black hover:bg-white/85'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              {t.nav.cta}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden relative w-6 h-[18px] flex-shrink-0 p-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span className={`absolute left-0 w-6 h-0.5 transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? 'top-[9px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 w-4 h-0.5 transition-all duration-200 ${dark ? 'bg-white' : 'bg-black'} top-[9px] ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-6 h-0.5 transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? 'top-[9px] -rotate-45' : 'top-[18px]'}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex-1 flex flex-col justify-center px-8 pt-20">
          <ul className="space-y-5 mb-10">
            {navLinks.map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                className={`transition-all duration-300 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              >
                <Link
                  href={l.href}
                  className="font-display font-extrabold text-4xl text-black hover:text-black/40 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-black text-white font-semibold text-base px-7 py-4 rounded-full active:scale-95 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.cta}
            </Link>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm font-bold border border-black/15 rounded-full px-4 py-3.5"
            >
              <span className={lang === 'fr' ? 'text-black' : 'text-black/30'}>FR</span>
              <span className="text-black/20">/</span>
              <span className={lang === 'en' ? 'text-black' : 'text-black/30'}>EN</span>
            </button>
          </div>
          <p className="mt-8 text-sm text-black/30">contact@webalp.ch · +41 77 274 17 26</p>
        </div>
      </div>
    </>
  )
}
