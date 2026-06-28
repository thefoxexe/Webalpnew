'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-8">
              — {t.problem.label}
            </p>
            <h2 className="font-display font-extrabold text-black leading-[0.92] tracking-tight mb-12"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              {t.problem.h2a}<br />
              <span className="text-black/20">{t.problem.h2b}</span>
            </h2>

            <div className="space-y-0 border-t border-black/8">
              {t.problem.facts.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-6 py-5 border-b border-black/6"
                >
                  <span className="font-display font-extrabold text-black text-2xl leading-none shrink-0 w-14 pt-0.5">
                    {f.stat}
                  </span>
                  <p className="text-black/50 text-sm leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" style={{ boxShadow: '0 0 8px #B3FF47' }} />
              <p className="text-sm font-semibold text-black">{t.problem.solution}</p>
            </motion.div>
          </motion.div>

          {/* Right: Before / After */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="md:pt-14"
          >
            <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden">
              {/* Before */}
              <div className="px-8 pt-8 pb-7 border-b border-white/6">
                <p className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase mb-5">
                  {t.problem.beforeLabel}
                </p>
                <div className="space-y-3">
                  {t.problem.before.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-3 h-px bg-white/20 shrink-0" />
                      <span className="text-white/30 text-sm line-through decoration-white/15">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="px-8 pt-7 pb-8">
                <p className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase mb-5">
                  {t.problem.afterLabel}
                </p>
                <div className="space-y-3">
                  {t.problem.after.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1.5 6l3 3 6-6" stroke="#B3FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
