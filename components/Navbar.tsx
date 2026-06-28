'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
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
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const dark = !scrolled

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/98 backdrop-blur-xl border-b border-black/6' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-8">

          <Link href="/"
            className={`font-display font-extrabold text-lg tracking-tight shrink-0 transition-colors duration-300 ${dark ? 'text-white' : 'text-black'}`}
            aria-label="WebAlp">
            WebAlp
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href}
                  className={`text-sm transition-colors duration-200 ${dark ? 'text-white/45 hover:text-white' : 'text-black/45 hover:text-black'}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`hidden md:block font-mono text-[11px] tracking-widest transition-colors ${dark ? 'text-white/25 hover:text-white/55' : 'text-black/25 hover:text-black/55'}`}
              aria-label={`Switch to ${lang === 'fr' ? 'English' : 'Français'}`}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <Link href="#contact"
              className={`hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 active:scale-95 ${
                dark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              {t.nav.cta}
            </Link>

            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fermer' : 'Menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block h-px w-full transition-all duration-300 origin-center ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-px transition-all duration-200 ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0 w-0' : 'w-full'}`} />
              <span className={`block h-px w-full transition-all duration-300 origin-center ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex-1 flex flex-col justify-center px-8 pt-20 pb-10">
          <ul className="space-y-5 mb-12">
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                className={`transition-all duration-300 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
                <Link href={l.href}
                  className="font-display font-extrabold text-[2.5rem] leading-none text-black hover:text-black/30 transition-colors"
                  onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link href="#contact"
              className="inline-flex items-center gap-2 bg-black text-white font-semibold text-sm px-6 py-3.5 rounded-full"
              onClick={() => setMenuOpen(false)}>
              {t.nav.cta}
            </Link>
            <button
              onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr') }}
              className="font-mono text-sm text-black/35 border border-black/12 rounded-full px-4 py-3.5">
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>

          <p className="mt-8 font-mono text-xs text-black/25">contact@webalp.ch · +41 77 274 17 26</p>
        </div>
      </div>
    </>
  )
}
