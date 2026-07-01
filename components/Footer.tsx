'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

export default function Footer() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const footerSections = Object.entries(t.footer.sections) as unknown as [string, readonly string[]][]

  const sectionHrefs: Record<number, string[]> = {
    0: ['#services', '#services', '#services', '#services'],
    1: ['#process', '#portfolio', '#tarifs', '#testimonials'],
    2: ['#contact', 'mailto:contact@webalp.ch', 'tel:+41798235862', '#'],
  }

  return (
    <footer className="bg-[#0A0A0A]" role="contentinfo" ref={ref}>

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="border-t border-white/10 overflow-hidden pt-14 pb-6"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="block w-[3px] h-4 bg-accent rounded-full shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white/40">Valais, Suisse</span>
          </div>
        </div>
        <div className="px-4 md:px-10 overflow-hidden" aria-hidden="true">
          <motion.p
            initial={{ x: '-8%' }}
            animate={inView ? { x: '0%' } : {}}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
            className="font-display font-extrabold leading-[0.85] tracking-tight select-none whitespace-nowrap text-white/[0.14]"
            style={{ fontSize: 'clamp(80px, 20vw, 260px)' }}
          >
            WEBALP
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-10 md:gap-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.15 }}
            className="shrink-0 max-w-xs"
          >
            <Link href="/" className="inline-block mb-4" aria-label="WebAlp">
              <Image
                src="/logos/webalp-blanc-vert.svg"
                alt="WebAlp"
                width={120}
                height={34}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{t.footer.tagline}</p>
            <div className="flex items-center gap-2">
              {[
                {
                  href: 'mailto:contact@webalp.ch',
                  label: 'Email',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M2 7l10 7 10-7"/>
                    </svg>
                  ),
                },
                {
                  href: 'tel:+41798235862',
                  label: 'Téléphone',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.18 2 2 0 012.1 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://www.linkedin.com/company/webalpch/',
                  label: 'LinkedIn',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.94 5a2 2 0 11-4 0 2 2 0 014 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://www.instagram.com/webalp.ch',
                  label: 'Instagram',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ ...spring, delay: 0.25 + i * 0.07 }}
                  whileHover={{ scale: 1.12, transition: { type: 'spring', stiffness: 500, damping: 28 } }}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav */}
          <div className="grid grid-cols-3 gap-8 md:gap-10">
            {footerSections.map(([category, links], sectionIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...spring, delay: 0.2 + sectionIndex * 0.08 }}
              >
                <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-white/40 mb-4">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map((label, linkIndex) => (
                    <li key={label}>
                      <Link href={sectionHrefs[sectionIndex]?.[linkIndex] ?? '#'}
                        className="text-sm text-white/50 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.38 }}
            className="shrink-0 flex flex-col gap-2.5 md:text-right"
          >
            <Link href="/mentions-legales" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="/confidentialite" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              {t.footer.privacy}
            </Link>
            <p className="text-xs text-white/30 mt-2">
              {t.footer.rights.replace('{year}', String(new Date().getFullYear()))}
            </p>
          </motion.div>

        </div>
      </div>

    </footer>
  )
}
