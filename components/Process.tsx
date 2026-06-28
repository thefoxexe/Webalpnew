'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Process() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="py-32 bg-white" ref={ref} aria-labelledby="process-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-6">— {t.process.label}</p>
            <h2 id="process-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
              {t.process.h2}
            </h2>
          </div>
          <p className="text-black/35 text-sm max-w-xs md:text-right leading-relaxed">{t.process.sub}</p>
        </motion.div>

        <div className="border-t border-black/8">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="grid md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-8 py-7 border-b border-black/6 items-start"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="w-8 h-8 rounded-full bg-accent text-[#0A0A0A] flex items-center justify-center font-mono text-[11px] font-bold shrink-0 accent-glow">
                  {step.number}
                </span>
                <span className="font-mono text-[10px] text-black/25 md:hidden">{step.duration}</span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display font-extrabold text-xl text-black">{step.title}</h3>
                  <span className="hidden md:block font-mono text-[10px] text-black/25 bg-black/5 px-2.5 py-1 rounded-full">{step.duration}</span>
                </div>
                <p className="text-sm text-black/50 leading-[1.75]">{step.description}</p>
              </div>

              <div className="md:flex md:items-start md:justify-end">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-black/45 border border-black/8 rounded-full px-3.5 py-2">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 bg-[#0A0A0A] rounded-xl px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <div>
            <p className="font-display font-extrabold text-white text-lg mb-1">{t.process.consultTitle}</p>
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
