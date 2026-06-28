'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="services" className="py-32 bg-[#F5F4F0]" ref={ref} aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-6">— {t.services.label}</p>
            <h2 id="services-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
              {t.services.h2}
            </h2>
          </div>
          <p className="text-black/35 text-sm max-w-xs md:text-right leading-relaxed">{t.services.sub}</p>
        </motion.div>

        {/* Accordion rows */}
        <div className="border-t border-black/10">
          {t.services.items.map((s, i) => {
            const isOpen = active === i
            return (
              <motion.div
                key={s.number}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="border-b border-black/10"
              >
                <button
                  className="w-full flex items-center gap-6 py-6 text-left group"
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-[10px] text-black/20 w-8 shrink-0 group-hover:text-black/40 transition-colors">
                    {s.number}
                  </span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                    <h3 className={`font-display font-extrabold text-xl md:text-2xl transition-colors ${isOpen ? 'text-black' : 'text-black/80 group-hover:text-black'}`}>
                      {s.title}
                    </h3>
                    <span className="font-mono text-[11px] text-black/30">{s.price}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'border-black bg-black rotate-45' : 'border-black/15 group-hover:border-black/40'
                  }`}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 2v8M2 6h8" stroke={isOpen ? 'white' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-14 grid md:grid-cols-[1fr_auto] gap-8 items-end">
                    <div>
                      <p className="text-black/55 text-sm leading-[1.8] mb-5">{s.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.features.map(f => (
                          <span key={f} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-black/60 bg-black/5 px-3 py-1.5 rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link href="#contact"
                      className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-black/80 active:scale-95 transition-all shrink-0">
                      {t.services.cta}
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
