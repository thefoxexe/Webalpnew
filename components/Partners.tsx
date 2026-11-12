'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export const CANTIA_URL = 'https://cantia.ch'

export default function Partners() {
  const { t } = useLanguage()
  const p = t.partners

  return (
    <section id="partenaires" className="bg-white" aria-labelledby="partners-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="rv text-sm font-medium text-black/50 mb-6">{p.label}</p>
            <h2 id="partners-title" className="font-display font-extrabold text-black tracking-[-0.035em] leading-[0.92]"
              style={{ fontSize: 'clamp(32px, 5.6vw, 72px)' }}>
              <span className="rv-mask block">{p.h2a}</span>
              <span className="rv-mask block text-[#A95C30]" style={{ ['--d' as string]: '140ms' }}>{p.h2b}</span>
            </h2>
            <p className="rv text-black/60 text-lg leading-relaxed max-w-xl mt-8" style={{ ['--d' as string]: '220ms' }}>
              {p.intro}
            </p>
          </div>

          <a href={CANTIA_URL} target="_blank" rel="noopener"
            className="rv partner-card group relative block rounded-3xl border border-black/10 bg-[#F5F4F0] p-8 sm:p-12 overflow-hidden"
            style={{ ['--d' as string]: '180ms' }}>
            <span aria-hidden="true" className="partner-glow pointer-events-none absolute inset-0" />
            <div className="relative">
              <Image src="/partners/cantia.png" alt="Cantia" width={1036} height={192}
                className="w-[240px] sm:w-[300px] h-auto transition-transform duration-500 group-hover:scale-[1.03]" />
              <ul className="mt-10 grid gap-3">
                {p.facts.map((f, i) => (
                  <li key={f} className="rv flex items-center gap-3 text-black/70" style={{ ['--d' as string]: `${300 + i * 90}ms` }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-[#A95C30] shrink-0">
                      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="nudge mt-10 inline-flex items-center gap-2 text-sm font-semibold text-black">
                {p.cta}
                <span className="text-black/40 font-normal">cantia.ch</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
