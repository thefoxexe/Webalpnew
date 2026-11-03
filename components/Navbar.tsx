'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { SERVICES } from '@/lib/services'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: t.nav.portfolio, href: '/realisations' },
    { label: t.nav.pricing, href: '/tarifs' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-white/8">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-8">

          <Link href="/" className="shrink-0" aria-label="WebAlp">
            <Logo />
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            <li className="relative group">
              <Link href="/#services" className="text-sm text-white/45 hover:text-white transition-colors duration-200 inline-flex items-center gap-1" aria-haspopup="true">
                {t.nav.services}
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-4">
                <ul className="w-72 rounded-2xl bg-[#141414] border border-white/10 p-2 shadow-2xl">
                  {SERVICES.map(sv => (
                    <li key={sv.slug}>
                      <Link href={`/${sv.slug}`} className="block rounded-xl px-4 py-3 hover:bg-white/5 transition-colors">
                        <span className="block text-sm font-semibold text-white">{sv.name}</span>
                        <span className="block text-xs text-white/45 mt-0.5">{sv.priceLabel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="hidden md:block font-mono text-[11px] tracking-widest text-white/25 hover:text-white/55 transition-colors"
              aria-label={`Switch to ${lang === 'fr' ? 'English' : 'Français'}`}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <Link href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-accent text-[#0A0A0A] hover:brightness-110 transition-all duration-200 active:scale-95"
            >
              {t.nav.cta}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden relative flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fermer' : 'Menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-[1.5px] w-5 rounded-full origin-center bg-white"
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full bg-white"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full origin-center bg-white"
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — circle reveal from hamburger position */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col"
            initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            animate={{ clipPath: 'circle(160% at calc(100% - 2rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            transition={{ type: 'spring', stiffness: 220, damping: 32 }}
          >
            <div className="flex-1 flex flex-col justify-center px-8 pt-20 pb-10">

              <ul className="space-y-4 mb-12">
                <li>
                  <Link href="/#services" onClick={() => setMenuOpen(false)}
                    className="font-display font-extrabold text-[2.5rem] leading-none text-black hover:text-accent transition-colors duration-150">
                    {t.nav.services}
                  </Link>
                  <ul className="mt-3 space-y-1.5">
                    {SERVICES.map(sv => (
                      <li key={sv.slug}>
                        <Link href={`/${sv.slug}`} onClick={() => setMenuOpen(false)} className="text-base text-black/60 hover:text-black">
                          {sv.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 28,
                      delay: 0.06 + i * 0.055,
                    }}
                  >
                    <Link
                      href={l.href}
                      className="font-display font-extrabold text-[2.5rem] leading-none text-black hover:text-accent transition-colors duration-150"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.35 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-black text-white font-semibold text-sm px-6 py-3.5 rounded-full active:scale-95 transition-transform"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav.cta}
                </Link>
                <button
                  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                  className="font-mono text-sm text-black/35 border border-black/12 rounded-full px-4 py-3.5"
                >
                  {lang === 'fr' ? 'EN' : 'FR'}
                </button>
              </motion.div>

              <motion.p
                className="mt-8 text-sm text-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                contact@webalp.ch · 079 823 58 62
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
