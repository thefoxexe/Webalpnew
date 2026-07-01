'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

export default function Services() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#F5F4F0]" ref={ref} aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <span className="block w-[3px] h-4 bg-accent rounded-full shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-black/50">{t.services.label}</span>
          </div>
          <h2 id="services-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
            {t.services.h2}
          </h2>
          <p className="text-black/60 text-base mt-4 max-w-lg">{t.services.sub}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.items.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ ...spring, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 28 } }}
              className={`rounded-2xl p-6 md:p-8 flex flex-col gap-6 cursor-default ${
                i === 0 ? 'bg-[#0A0A0A]' : 'bg-white border border-black/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-sm font-bold ${i === 0 ? 'text-white/40' : 'text-black/35'}`}>{s.number}</span>
                <span className={`text-sm border rounded px-3 py-1 ${
                  i === 0 ? 'border-white/20 text-white/60' : 'border-black/15 text-black/50'
                }`}>
                  {s.price}
                </span>
              </div>

              <div>
                <h3 className={`font-display font-extrabold leading-tight mb-3 ${i === 0 ? 'text-white' : 'text-black'}`}
                  style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? 'text-white/65' : 'text-black/60'}`}>
                  {s.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {s.features.map(f => (
                  <span key={f} className={`text-xs font-medium px-3 py-1.5 rounded ${
                    i === 0 ? 'bg-white/10 text-white/70' : 'bg-black/6 text-black/60'
                  }`}>
                    {f}
                  </span>
                ))}
              </div>

              <Link
                href={
                  s.icon === 'shield' ? '#contact'
                  : s.icon === 'monitor' ? '/brief?plan=starter'
                  : '/brief?plan=sur-mesure'
                }
                className={`mt-1 inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-full self-start transition-all active:scale-95 ${
                  i === 0
                    ? 'bg-accent text-[#0A0A0A] hover:brightness-110'
                    : 'bg-black text-white hover:bg-black/75'
                }`}>
                {t.services.cta}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
