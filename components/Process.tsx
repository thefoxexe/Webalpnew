'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Process() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="py-28 bg-white" ref={ref} aria-labelledby="process-title">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            {t.process.label}
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h2
              id="process-title"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight max-w-lg"
            >
              {t.process.h2}
            </h2>
            <p className="text-black/45 text-sm max-w-xs md:text-right leading-relaxed">
              {t.process.sub}
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[26px] top-0 bottom-0 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, #B3FF47, rgba(179,255,71,0.1))' }} aria-hidden="true" />

          <div className="space-y-0">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="relative grid md:grid-cols-[60px_1fr_1fr] gap-6 md:gap-8 pb-12 last:pb-0"
              >
                <div className="flex md:flex-col items-center md:items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-accent text-[#0A0A0A] flex items-center justify-center flex-shrink-0 relative z-10 font-mono text-sm font-bold accent-glow">
                    {step.number}
                  </div>
                </div>

                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-xl md:text-2xl font-extrabold text-black">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-black/35 bg-black/5 px-2 py-0.5 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-black/55 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="inline-flex items-center gap-2 bg-[#F5F5F5] border border-black/8 rounded-xl px-4 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-semibold text-black/70">{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 bg-black rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-display text-xl font-bold mb-1">
              {t.process.consultTitle}
            </p>
            <p className="text-white/50 text-sm">{t.process.consultSub}</p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-semibold text-sm px-6 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all accent-glow"
          >
            {t.process.consultCta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
