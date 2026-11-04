'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { AI_TOOLS } from '@/lib/ai-logos'

const TONES = [
  { card: 'bg-white/[0.03] border-white/10', tag: 'IA', tagCls: 'bg-white/10 text-white/70', bullet: 'bg-white/40' },
  { card: 'bg-white/[0.05] border-white/25', tag: 'Humain', tagCls: 'bg-white text-[#0A0A0A]', bullet: 'bg-white' },
  { card: 'bg-accent border-accent text-[#0A0A0A]', tag: 'Vous', tagCls: 'bg-[#0A0A0A] text-accent', bullet: 'bg-[#0A0A0A]' },
]

// Logos en décor : position, taille, durée et décalage de l'animation de flottement.
const FLOAT = [
  { top: '8%', left: '72%', size: 92, dur: 16, delay: 0 },
  { top: '30%', left: '88%', size: 54, dur: 19, delay: -4 },
  { top: '62%', left: '80%', size: 76, dur: 22, delay: -9 },
  { top: '14%', left: '46%', size: 44, dur: 18, delay: -6 },
  { top: '84%', left: '58%', size: 60, dur: 20, delay: -2 },
  { top: '48%', left: '4%', size: 58, dur: 21, delay: -11 },
  { top: '90%', left: '12%', size: 46, dur: 17, delay: -7 },
]

const Logo = ({ path, size, className = '' }: { path: string; size: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d={path} />
  </svg>
)

export default function AiSection() {
  const { t } = useLanguage()
  const a = t.ai
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="ia" ref={ref} onMouseMove={onMove}
      className="ai-section relative bg-[#0A0A0A] text-white overflow-hidden" aria-labelledby="ia-title">

      {/* Lumière qui suit la souris */}
      <div aria-hidden="true" className="ai-spotlight pointer-events-none absolute inset-0" />

      {/* Logos des outils, très discrets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {AI_TOOLS.map((tool, i) => {
          const f = FLOAT[i % FLOAT.length]
          return (
            <span key={tool.name} className="ai-float absolute text-white"
              style={{ top: f.top, left: f.left, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>
              <Logo path={tool.path} size={f.size} />
            </span>
          )
        })}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="rv text-sm font-medium text-white/50 mb-6">{a.label}</p>
            <h2 id="ia-title" className="font-display font-extrabold tracking-[-0.035em] leading-[0.92]" style={{ fontSize: 'clamp(36px, 6.4vw, 92px)' }}>
              <span className="rv-mask block">{a.h2a}</span>
              <span className="rv-mask block text-accent" style={{ ['--d' as string]: '140ms' }}>{a.h2b}</span>
            </h2>
            <p className="rv text-white/65 text-lg leading-relaxed max-w-2xl mt-10" style={{ ['--d' as string]: '220ms' }}>{a.intro}</p>
          </div>

          {/* Démo : ce que fait l'IA, puis ce qu'on corrige nous-mêmes */}
          <div className="rv ai-term rounded-2xl border border-white/12 bg-[#111]/90 backdrop-blur-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] overflow-hidden" style={{ ['--d' as string]: '200ms' }}>
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8">
              <i className="w-2.5 h-2.5 rounded-full bg-white/15" /><i className="w-2.5 h-2.5 rounded-full bg-white/15" /><i className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-xs text-white/35 font-mono">{a.demo.file}</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-7">
              {a.demo.prompt.map((l, i) => (
                <p key={l} className="ai-type text-white/85" style={{ ['--i' as string]: i }}>
                  <span className="text-accent">›</span> {l}
                </p>
              ))}
              <div className="mt-4 space-y-1">
                {a.demo.ai.map((l, i) => (
                  <p key={l} className="ai-line text-white/45" style={{ ['--i' as string]: i }}>
                    <span className="text-white/30">IA</span> · {l}
                  </p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/8 space-y-1">
                {a.demo.human.map((l, i) => (
                  <p key={l} className="ai-line ai-line-h text-accent" style={{ ['--i' as string]: i }}>
                    ✓ {l}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rv-line h-px bg-white/15 my-16" />

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

        {/* Nos outils */}
        <div className="rv mt-14 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <p className="text-sm text-white/40 shrink-0">{a.toolsLabel}</p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {AI_TOOLS.map(tool => (
              <li key={tool.name} className="group flex items-center gap-2.5 text-white/35 hover:text-white transition-colors duration-300">
                <Logo path={tool.path} size={20} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-medium">{tool.name}</span>
              </li>
            ))}
          </ul>
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
