'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col overflow-hidden" aria-label="Hero">

      {/* Static grid */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} />

      {/* Green ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(179,255,71,0.07) 0%, transparent 70%)' }} />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 md:pt-36">

        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase mb-14 md:mb-20"
        >
          Agence web · Sion, Valais · CH
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-display font-extrabold text-white tracking-[-0.04em] leading-[0.88] mb-auto"
          style={{ fontSize: 'clamp(54px, 9.5vw, 148px)' }}
        >
          {t.hero.h1}<br />
          <span style={{ color: '#B3FF47', textShadow: '0 0 120px rgba(179,255,71,0.18)' }}>{t.hero.h2}</span><br />
          <span className="text-white/[0.07]">{t.hero.h3}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-12 pb-14 md:pb-16"
        >
          <div className="max-w-xs md:max-w-sm">
            <p className="text-white/40 text-sm md:text-[15px] leading-[1.7]">
              {t.hero.body}{' '}
              <span className="text-white/75 font-medium">{t.hero.bold}</span>
            </p>
            <p className="font-mono text-[11px] text-white/18 mt-2">{t.hero.price}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-3.5 rounded-full hover:brightness-110 active:scale-95 transition-all duration-150 accent-glow">
              {t.hero.cta1}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#portfolio"
              className="inline-flex items-center gap-2 border border-white/12 text-white/40 text-sm font-medium px-6 py-3.5 rounded-full hover:border-white/30 hover:text-white/70 active:scale-95 transition-all duration-150">
              {t.hero.cta2}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stat strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center gap-8 md:gap-14 justify-between">
          <div className="flex items-center gap-6 md:gap-12">
            {t.hero.bottomStats.map(s => (
              <div key={s.l}>
                <p className="font-display font-extrabold text-white text-sm leading-none">{s.n}</p>
                <p className="font-mono text-[9px] text-white/18 uppercase tracking-widest mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <a href="tel:+41772741726"
            className="hidden md:block font-mono text-[11px] text-white/15 hover:text-white/40 transition-colors">
            +41 77 274 17 26
          </a>
        </div>
      </motion.div>
    </section>
  )
}
