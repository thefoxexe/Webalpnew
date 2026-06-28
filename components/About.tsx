'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#0A0A0A] overflow-hidden" ref={ref} aria-labelledby="about-title">

      {/* Header: label + heading left, "02" right */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12 md:pb-14 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-12"
        >
          <div>
            <p className="font-mono text-[10px] text-white/20 tracking-[0.25em] uppercase mb-6 md:mb-8">— {t.about.label}</p>
            <h2 id="about-title" className="font-display font-extrabold text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(36px, 7vw, 110px)' }}>
              {t.about.h2a}<br />
              <span className="text-white/15">{t.about.h2b}</span>
            </h2>
          </div>

          {/* Team count — accent green accent */}
          <div className="shrink-0 flex flex-col items-start sm:items-end pb-1">
            <span className="font-display font-extrabold text-accent leading-none"
              style={{ fontSize: 'clamp(56px, 8vw, 112px)' }}>
              02
            </span>
            <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest mt-1.5">
              experts dédiés
            </span>
          </div>
        </motion.div>
      </div>

      {/* Collective description — 2 col on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-14 border-b border-white/[0.06]"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <p className="text-white/50 text-base leading-[1.9]">{t.about.p1}</p>
          <p className="text-white/25 text-sm leading-[1.9]">{t.about.p2}</p>
        </div>
      </motion.div>

      {/* Location badge + shared values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12 border-b border-white/[0.06]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0"
              style={{ boxShadow: '0 0 6px #B3FF47' }} />
            <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">Valais, Suisse</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.about.values.map(v => (
              <span key={v.label}
                className="inline-flex items-center gap-2 border border-white/[0.08] rounded-full px-4 py-2 font-mono text-[10px] text-white/30 hover:text-white/55 hover:border-white/15 transition-colors">
                <span aria-hidden="true">{v.icon}</span>
                {v.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Big quote + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-10"
      >
        <div className="max-w-2xl">
          <blockquote className="font-display font-extrabold text-white/20 leading-[1.08] tracking-tight mb-5"
            style={{ fontSize: 'clamp(20px, 3.2vw, 46px)' }}>
            {'"'}{t.about.quote}{'"'}
          </blockquote>
          <p className="font-mono text-[10px] text-white/15">{t.about.quoteAuthor}</p>
        </div>
        <Link href="#contact"
          className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-7 py-4 rounded-full hover:brightness-110 active:scale-[0.99] transition-all accent-glow shrink-0 self-start md:self-auto">
          {t.about.cta}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>

    </section>
  )
}
