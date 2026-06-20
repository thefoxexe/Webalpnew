'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-black/35 tracking-widest uppercase mb-5">
              — {t.problem.label}
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-8">
              {t.problem.h2a}<br />
              <span className="text-black/25">{t.problem.h2b}</span>
            </h2>

            <div className="space-y-4 mb-10">
              {t.problem.facts.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-5 p-5 rounded-2xl bg-[#F5F4F0] border border-black/6"
                >
                  <span className="font-display font-extrabold text-black text-2xl leading-none flex-shrink-0 w-16">
                    {f.stat}
                  </span>
                  <p className="text-black/60 text-sm leading-relaxed pt-0.5">{f.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-3 p-5 rounded-2xl bg-[#0A0A0A] text-white"
            >
              <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10l5 5 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-semibold text-sm">{t.problem.solution}</p>
            </motion.div>
          </motion.div>

          {/* Right: Before/After card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="md:pt-12"
          >
            <div className="relative bg-[#0A0A0A] rounded-3xl p-8 md:p-10 overflow-hidden">
              <p
                className="absolute -right-4 -top-4 font-display font-extrabold text-white/[0.04] leading-none select-none pointer-events-none"
                style={{ fontSize: 'clamp(80px, 15vw, 200px)' }}
                aria-hidden="true"
              >
                NON
              </p>

              <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-6 relative z-10">
                {t.problem.beforeLabel}
              </p>

              <div className="space-y-3 relative z-10 mb-8">
                {t.problem.before.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-white/40 text-sm line-through">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-6 relative z-10">
                <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">
                  {t.problem.afterLabel}
                </p>
                <div className="space-y-3">
                  {t.problem.after.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l4 4 6-7" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-white/75 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
