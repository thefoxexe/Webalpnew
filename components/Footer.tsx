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
    <footer className="bg-[#0A0A0A] border-t border-white/[0.05]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">

        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/[0.06]">

          {/* Brand */}
          <div>
            <Link href="/" aria-label="WebAlp" className="inline-block mb-5">
              <span className="font-display font-extrabold text-2xl text-white">WebAlp</span>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed mb-8 max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-2.5">
              {[
                {
                  href: 'mailto:contact@webalp.ch', label: 'Email',
                  icon: <><rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2"/></>,
                },
                {
                  href: 'tel:+41772741726', label: 'Téléphone',
                  icon: <path d="M2 2.5h3l1.5 3-2 1c.83 1.67 2 2.83 3.5 3.5l1-2 3 1.5V13c-5 .33-9-4-10-10.5z" stroke="currentColor" strokeWidth="1.1"/>,
                },
                {
                  href: 'https://www.linkedin.com/company/webalp', label: 'LinkedIn',
                  icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/></>,
                  viewBox: '0 0 24 24',
                },
              ].map(item => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 transition-all"
                  aria-label={item.label}>
                  <svg width="13" height="13" viewBox={item.viewBox ?? '0 0 14 14'} fill="none" aria-hidden="true">
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerSections.map(([category, links], sectionIndex) => (
            <div key={category}>
              <h3 className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase mb-5">{category}</h3>
              <ul className="space-y-3">
                {links.map((label, linkIndex) => (
                  <li key={label}>
                    <Link href={sectionHrefs[sectionIndex]?.[linkIndex] ?? '#'}
                      className="text-sm text-white/35 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/18">
            {t.footer.rights.replace('{year}', String(new Date().getFullYear()))}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="font-mono text-[11px] text-white/18 hover:text-white/45 transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="/confidentialite" className="font-mono text-[11px] text-white/18 hover:text-white/45 transition-colors">
              {t.footer.privacy}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
