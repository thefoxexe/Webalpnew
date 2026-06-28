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
    <footer className="bg-[#0A0A0A] overflow-hidden" role="contentinfo">

      {/* Giant wordmark zone */}
      <div className="border-t border-white/[0.05] pt-16 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
          <p className="font-mono text-[10px] text-white/15 tracking-[0.25em] uppercase">
            — Valais, Suisse
          </p>
        </div>
        <div className="px-4 md:px-10 overflow-hidden" aria-hidden="true">
          <p
            className="font-display font-extrabold leading-[0.85] tracking-tight select-none whitespace-nowrap"
            style={{ fontSize: 'clamp(80px, 20vw, 260px)' }}
          >
            <span className="text-white/8">WEB</span><span className="text-accent/10">ALP</span>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-10 md:gap-16 justify-between">

          {/* Tagline + socials */}
          <div className="shrink-0 max-w-xs">
            <Link href="/" className="inline-block mb-5" aria-label="WebAlp">
              <span className="font-display font-extrabold text-xl text-white">
                Web<span className="text-accent">Alp</span>
              </span>
            </Link>
            <p className="text-white/25 text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex items-center gap-2">
              {[
                { href: 'mailto:contact@webalp.ch', label: 'Email', text: '@' },
                { href: 'tel:+41772741726', label: 'Tel', text: '✆' },
                { href: 'https://www.linkedin.com/company/webalp', label: 'LinkedIn', text: 'in' },
              ].map(item => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center font-mono text-[11px] text-white/25 hover:text-white hover:border-white/30 transition-all"
                  aria-label={item.label}>
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Nav sections */}
          <div className="flex flex-wrap gap-x-12 gap-y-8 flex-1">
            {footerSections.map(([category, links], sectionIndex) => (
              <div key={category}>
                <h3 className="font-mono text-[9px] text-white/15 tracking-[0.2em] uppercase mb-4">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map((label, linkIndex) => (
                    <li key={label}>
                      <Link href={sectionHrefs[sectionIndex]?.[linkIndex] ?? '#'}
                        className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div className="shrink-0 flex flex-col gap-2.5 md:text-right">
            <Link href="/mentions-legales" className="font-mono text-[10px] text-white/18 hover:text-white/45 transition-colors">
              {t.footer.legal}
            </Link>
            <Link href="/confidentialite" className="font-mono text-[10px] text-white/18 hover:text-white/45 transition-colors">
              {t.footer.privacy}
            </Link>
            <p className="font-mono text-[10px] text-white/12 mt-2">
              {t.footer.rights.replace('{year}', String(new Date().getFullYear()))}
            </p>
          </div>

        </div>
      </div>

    </footer>
  )
}
