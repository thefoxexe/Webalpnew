'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const footerSections = Object.entries(t.footer.sections) as unknown as [string, readonly string[]][]

  const sectionHrefs: Record<number, string[]> = {
    0: ['#services', '#services', '#services', '#services'],
    1: ['#process', '#portfolio', '#tarifs', '#testimonials'],
    2: ['#contact', 'mailto:contact@webalp.ch', 'tel:+41772741726', '#'],
  }

  return (
    <footer className="bg-white border-t border-black/8" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="WebAlp - Accueil">
              <span className="font-display text-2xl font-extrabold text-black">WebAlp</span>
            </Link>
            <p className="text-sm text-black/50 leading-relaxed mb-6 max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@webalp.ch"
                className="w-9 h-9 rounded-full border border-black/12 flex items-center justify-center hover:bg-black hover:border-black group transition-colors"
                aria-label="Email"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="3" width="12" height="8" rx="1" stroke="#0A0A0A" strokeWidth="1.2" className="group-hover:stroke-white"/>
                  <path d="M1 5l6 4 6-4" stroke="#0A0A0A" strokeWidth="1.2" className="group-hover:stroke-white"/>
                </svg>
              </a>
              <a
                href="tel:+41772741726"
                className="w-9 h-9 rounded-full border border-black/12 flex items-center justify-center hover:bg-black hover:border-black group transition-colors"
                aria-label="Téléphone"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2.5h3l1.5 3-2 1c.83 1.67 2 2.83 3.5 3.5l1-2 3 1.5V13c-5 .33-9-4-10-10.5z" stroke="#0A0A0A" strokeWidth="1.1" className="group-hover:stroke-white"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/webalp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-black/12 flex items-center justify-center hover:bg-black hover:border-black group transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"/>
                  <circle cx="4" cy="4" r="2" stroke="#0A0A0A" strokeWidth="1.8" className="group-hover:stroke-white"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link sections */}
          {footerSections.map(([category, links], sectionIndex) => (
            <div key={category}>
              <h3 className="text-xs font-bold tracking-widest uppercase text-black/40 mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((label, linkIndex) => (
                  <li key={label}>
                    <Link
                      href={sectionHrefs[sectionIndex]?.[linkIndex] ?? '#'}
                      className="text-sm text-black/60 hover:text-black transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-black/35">
            {t.footer.rights.replace('{year}', String(new Date().getFullYear()))}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="text-xs text-black/35 hover:text-black transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="/confidentialite" className="text-xs text-black/35 hover:text-black transition-colors">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
