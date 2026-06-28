'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#0A0A0A]" ref={ref} aria-labelledby="about-title">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 sm:pt-24 pb-12 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8"
        >
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-6">— {t.about.label}</p>
            <h2 id="about-title" className="font-display font-extrabold text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(34px, 7vw, 110px)' }}>
              {t.about.h2a}<br />
              <span className="text-white/25">{t.about.h2b}</span>
            </h2>
          </div>

          <div className="shrink-0 flex flex-col items-start sm:items-end">
            <span className="font-display font-extrabold text-accent leading-none"
              style={{ fontSize: 'clamp(52px, 8vw, 108px)' }}>
              02
            </span>
            <span className="text-sm text-white/45 mt-2">experts dédiés</span>
          </div>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: 0.18 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-white/10"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <p className="text-white/70 text-base leading-relaxed">{t.about.p1}</p>
          <p className="text-white/50 text-sm leading-relaxed">{t.about.p2}</p>
        </div>
      </motion.div>

      {/* Location + Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: 0.28 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-10 border-b border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-white/55">Valais, Suisse</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.about.values.map((v, i) => (
              <motion.span
                key={v.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ ...spring, delay: 0.32 + i * 0.06 }}
                className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-sm text-white/55 hover:text-white/80 hover:border-white/25 transition-colors"
              >
                <span aria-hidden="true">{v.icon}</span>
                {v.label}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quote + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: 0.38 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-14 flex flex-col md:flex-row md:items-end justify-between gap-10"
      >
        <div className="max-w-2xl">
          <blockquote className="font-display font-extrabold text-white/35 leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: 'clamp(18px, 3vw, 44px)' }}>
            {'"'}{t.about.quote}{'"'}
          </blockquote>
          <p className="text-sm text-white/40">{t.about.quoteAuthor}</p>
        </div>
        <Link href="#contact"
          className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-7 py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-all shrink-0 self-start md:self-auto">
          {t.about.cta}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>

    </section>
  )
}
