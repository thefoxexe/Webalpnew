'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const TONES = [
  { card: 'bg-white/[0.04] border-white/10', tag: 'IA', tagCls: 'bg-white/10 text-white/70', bullet: 'bg-white/40' },
  { card: 'bg-white/[0.04] border-white/25', tag: 'Humain', tagCls: 'bg-white text-[#0A0A0A]', bullet: 'bg-white' },
  { card: 'bg-accent border-accent text-[#0A0A0A]', tag: 'Vous', tagCls: 'bg-[#0A0A0A] text-accent', bullet: 'bg-[#0A0A0A]' },
]

export default function AiSection() {
  const { t } = useLanguage()
  const a = t.ai

  return (
    <section id="ia" className="bg-[#0A0A0A] text-white overflow-hidden" aria-labelledby="ia-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 sm:py-32">
        <p className="rv text-sm font-medium text-white/50 mb-6">{a.label}</p>
        <h2 id="ia-title" className="font-display font-extrabold tracking-[-0.035em] leading-[0.92]" style={{ fontSize: 'clamp(36px, 7vw, 96px)' }}>
          <span className="rv-mask block">{a.h2a}</span>
          <span className="rv-mask block text-accent" style={{ ['--d' as string]: '140ms' }}>{a.h2b}</span>
        </h2>
        <p className="rv text-white/65 text-lg leading-relaxed max-w-3xl mt-10" style={{ ['--d' as string]: '220ms' }}>{a.intro}</p>

        <div className="rv-line h-px bg-white/15 my-14" />

        <div className="grid gap-4 lg:grid-cols-3">
          {a.cols.map((c, i) => {
            const tone = TONES[i]
            return (
              <div key={c.title} className={`rv lift rounded-2xl border p-7 sm:p-8 ${tone.card}`} style={{ ['--d' as string]: `${i * 120}ms` }}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display font-bold text-2xl tracking-tight">{c.title}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tone.tagCls}`}>{tone.tag}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {c.items.map(it => (
                    <li key={it} className={`flex gap-3 items-start ${i === 2 ? 'text-[#0A0A0A]/85' : 'text-white/75'}`}>
                      <span aria-hidden="true" className={`mt-2.5 w-1.5 h-1.5 rounded-full shrink-0 ${tone.bullet}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <blockquote className="rv-mask font-display font-bold tracking-tight leading-[1.05] max-w-3xl" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)' }}>
            {a.quote}
          </blockquote>
          <div className="rv flex flex-wrap gap-3" style={{ ['--d' as string]: '120ms' }}>
            <Link href="/tarifs" className="nudge inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-7 py-4 rounded-full hover:brightness-110 transition-all">
              {a.cta}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center font-semibold text-sm px-6 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors">
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
