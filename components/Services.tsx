'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 bg-[#F5F4F0]" ref={ref} aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-5">— {t.services.label}</p>
            <h2 id="services-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              {t.services.h2}
            </h2>
          </div>
          <p className="text-black/35 text-sm max-w-xs leading-relaxed md:text-right">{t.services.sub}</p>
        </motion.div>

        {/* Always-open service cards grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {t.services.items.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className={`rounded-xl p-7 flex flex-col gap-6 ${
                i === 0 ? 'bg-[#0A0A0A] text-white' : 'bg-white border border-black/8'
              }`}
            >
              {/* Number + price */}
              <div className="flex items-start justify-between">
                <span className={`font-mono text-[10px] font-bold ${i === 0 ? 'text-white/20' : 'text-black/20'}`}>
                  {s.number}
                </span>
                <span className={`font-mono text-[11px] border rounded-full px-3 py-1 ${
                  i === 0 ? 'border-white/10 text-white/30' : 'border-black/8 text-black/30'
                }`}>
                  {s.price}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className={`font-display font-extrabold leading-tight mb-3 ${i === 0 ? 'text-white' : 'text-black'}`}
                  style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-[1.75] ${i === 0 ? 'text-white/45' : 'text-black/50'}`}>
                  {s.description}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {s.features.map(f => (
                  <span key={f} className={`text-[11px] font-medium px-3 py-1.5 rounded-full ${
                    i === 0 ? 'bg-white/6 text-white/55' : 'bg-black/5 text-black/55'
                  }`}>
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link href="#contact"
                className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full self-start transition-all active:scale-95 ${
                  i === 0
                    ? 'bg-accent text-[#0A0A0A] hover:brightness-110 accent-glow'
                    : 'bg-black text-white hover:bg-black/80'
                }`}>
                {t.services.cta}
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
