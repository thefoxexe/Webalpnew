'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

export default function Process() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="process" className="py-20 sm:py-24 bg-white" ref={ref} aria-labelledby="process-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="mb-12"
        >
          <p className="text-xs text-black/45 uppercase tracking-widest mb-4">— {t.process.label}</p>
          <h2 id="process-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
            {t.process.h2}
          </h2>
          <p className="text-black/60 text-base mt-4 max-w-md">{t.process.sub}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ ...spring, delay: 0.1 + i * 0.09 }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 28 } }}
              className="bg-[#F5F4F0] rounded-2xl p-6 flex flex-col cursor-default"
            >
              <div className="w-10 h-10 rounded-full bg-accent text-[#0A0A0A] flex items-center justify-center text-sm font-bold mb-5 shrink-0">
                {step.number}
              </div>

              <span className="text-xs text-black/45 border border-black/12 rounded-full px-3 py-1 self-start mb-4">
                {step.duration}
              </span>

              <h3 className="font-display font-extrabold text-black text-lg leading-tight mb-2">{step.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed mb-5 flex-1">{step.description}</p>

              <div className="flex items-center gap-2 pt-4 border-t border-black/8">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs text-black/50 font-medium">{step.deliverable}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ ...spring, delay: 0.5 }}
          className="mt-4 bg-[#0A0A0A] rounded-2xl px-7 md:px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <p className="font-display font-extrabold text-white text-xl mb-1">{t.process.consultTitle}</p>
            <p className="text-white/60 text-sm">{t.process.consultSub}</p>
          </div>
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-3.5 rounded-full hover:brightness-110 active:scale-95 transition-all shrink-0">
            {t.process.consultCta}
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
