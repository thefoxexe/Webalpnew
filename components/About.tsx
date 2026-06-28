'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const team = [
    { initial: 'B', name: 'Bastien', role: t.about.b_role },
    { initial: 'N', name: 'Noé', role: t.about.n_role },
  ]

  return (
    <section className="bg-[#0A0A0A] overflow-hidden" ref={ref} aria-labelledby="about-title">

      {/* Big headline */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-14 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] text-white/20 tracking-[0.25em] uppercase mb-8">— {t.about.label}</p>
          <h2 id="about-title" className="font-display font-extrabold text-white leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(44px, 9vw, 130px)' }}>
            {t.about.h2a}<br />
            <span className="text-white/15">{t.about.h2b}</span>
          </h2>
        </motion.div>
      </div>

      {/* Body copy — 2 columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-14 border-b border-white/[0.06]"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-white/50 text-base leading-[1.9]">{t.about.p1}</p>
          <p className="text-white/25 text-sm leading-[1.9]">{t.about.p2}</p>
        </div>
      </motion.div>

      {/* Team — horizontal bands */}
      {team.map((person, i) => (
        <motion.div
          key={person.name}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.1 }}
          className="border-b border-white/[0.06]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex items-center gap-8">
            <div className="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center font-display font-extrabold text-xl text-white shrink-0">
              {person.initial}
            </div>
            <div className="flex-1">
              <p className="font-display font-extrabold text-white text-xl leading-none mb-1">{person.name}</p>
              <p className="font-mono text-[10px] text-white/25">{person.role}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 flex-wrap justify-end">
              {t.about.values.map(v => (
                <span key={v.label} className="font-mono text-[10px] text-white/20 border border-white/[0.08] px-3 py-1.5 rounded-full">
                  {v.icon} {v.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Quote + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row md:items-end justify-between gap-10"
      >
        <div className="max-w-2xl">
          <blockquote className="font-display font-extrabold text-white/20 leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: 'clamp(22px, 3.5vw, 48px)' }}>
            {'"'}{t.about.quote}{'"'}
          </blockquote>
          <p className="font-mono text-[10px] text-white/15">{t.about.quoteAuthor}</p>
        </div>
        <Link href="#contact"
          className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-3.5 rounded-full hover:brightness-110 active:scale-[0.99] transition-all accent-glow shrink-0">
          {t.about.cta}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>

    </section>
  )
}
