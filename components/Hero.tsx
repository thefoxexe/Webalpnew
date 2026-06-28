'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex overflow-hidden" aria-label="Hero">

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 30% 80%, rgba(179,255,71,0.06) 0%, transparent 60%)' }}
      />

      {/* ── Left: headline + CTAs ── */}
      <div className="relative z-10 flex-1 flex flex-col px-6 md:px-14 lg:px-20 pt-28 md:pt-36 pb-10">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase mb-auto"
        >
          Agence web · Sion, Valais · 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-extrabold text-white tracking-[-0.045em] leading-[0.87] my-10 md:my-14"
          style={{ fontSize: 'clamp(54px, 10vw, 148px)' }}
        >
          {t.hero.h1}<br />
          <span style={{ color: '#B3FF47', textShadow: '0 0 100px rgba(179,255,71,0.2)' }}>
            {t.hero.h2}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-white/38 text-sm md:text-base leading-[1.75] max-w-xs">
              {t.hero.body}{' '}
              <span className="text-white/75 font-medium">{t.hero.bold}</span>
            </p>
            <p className="font-mono text-[11px] text-white/15 mt-2">{t.hero.price}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-7 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all accent-glow">
              {t.hero.cta1}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#portfolio"
              className="text-white/30 text-sm hover:text-white/60 transition-colors font-medium">
              {t.hero.cta2} →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Right: stats panel ── */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex w-72 xl:w-80 shrink-0 border-l border-white/[0.06] flex-col pt-36 pb-10 px-8"
      >
        <div className="flex items-center gap-2 mb-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" style={{ boxShadow: '0 0 8px #B3FF47' }} />
          <span className="font-mono text-[11px] text-white/25">{t.hero.available}</span>
        </div>

        <div className="space-y-0 border-t border-white/[0.06]">
          {t.hero.bottomStats.map(s => (
            <div key={s.l} className="py-6 border-b border-white/[0.05]">
              <p className="font-display font-extrabold text-white leading-none mb-1.5"
                style={{ fontSize: 'clamp(26px, 3vw, 40px)' }}>
                {s.n}
              </p>
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{s.l}</p>
            </div>
          ))}
        </div>

        <a href="tel:+41772741726"
          className="font-mono text-[11px] text-white/15 hover:text-white/40 transition-colors mt-6">
          +41 77 274 17 26
        </a>
      </motion.aside>

    </section>
  )
}
