'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-white/8">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-8">

          <Link href="/" className="shrink-0" aria-label="WebAlp">
            <Image
              src="/logos/webalp-blanc-vert.svg"
              alt="WebAlp"
              width={120}
              height={34}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <ul className="hidden md:flex items-center gap-7">
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

            <Link href="#contact"
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
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
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
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.35 }}
              >
                <Link
                  href="#contact"
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
