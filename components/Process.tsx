'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Process() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="py-24 bg-white overflow-hidden" ref={ref} aria-labelledby="process-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-5">— {t.process.label}</p>
            <h2 id="process-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              {t.process.h2}
            </h2>
          </div>
          <p className="text-black/35 text-sm max-w-xs leading-relaxed md:text-right">{t.process.sub}</p>
        </motion.div>

        {/* Steps — grid on desktop, stacked on mobile */}
        <div className="grid md:grid-cols-4 gap-3">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="bg-[#F5F4F0] rounded-xl p-6 flex flex-col"
            >
              {/* Number badge */}
              <div className="w-9 h-9 rounded-full bg-accent text-[#0A0A0A] flex items-center justify-center font-mono text-[11px] font-bold mb-6 accent-glow shrink-0">
                {step.number}
              </div>

              {/* Duration */}
              <span className="font-mono text-[10px] text-black/30 border border-black/8 rounded-full px-2.5 py-1 self-start mb-4">
                {step.duration}
              </span>

              {/* Title + description */}
              <h3 className="font-display font-extrabold text-black text-lg leading-tight mb-2">{step.title}</h3>
              <p className="text-black/50 text-sm leading-[1.7] mb-5 flex-1">{step.description}</p>

              {/* Deliverable */}
              <div className="flex items-center gap-2 pt-4 border-t border-black/6">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-mono text-[10px] text-black/40">{step.deliverable}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-4 bg-[#0A0A0A] rounded-xl px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <div>
            <p className="font-display font-extrabold text-white text-xl mb-1">{t.process.consultTitle}</p>
            <p className="text-white/35 text-sm">{t.process.consultSub}</p>
          </div>
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-semibold text-sm px-6 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all accent-glow shrink-0">
            {t.process.consultCta}
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
