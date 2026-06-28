'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#0A0A0A] overflow-hidden" ref={ref}>

      {/* ── Top: 3 impact stats ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            {t.problem.facts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="px-0 md:px-10 py-12 first:md:pl-0 last:md:pr-0"
              >
                <p className="font-display font-extrabold text-white leading-none mb-3"
                  style={{ fontSize: 'clamp(48px, 6vw, 80px)', textShadow: i === 0 ? '0 0 60px rgba(179,255,71,0.15)' : undefined }}>
                  {f.stat}
                </p>
                <p className="text-white/35 text-sm leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Before / After ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-3">

          {/* Before */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="border border-white/6 rounded-xl p-7"
          >
            <p className="font-mono text-[9px] text-white/18 tracking-[0.25em] uppercase mb-6">
              {t.problem.beforeLabel}
            </p>
            <div className="space-y-3">
              {t.problem.before.map(item => (
                <div key={item} className="flex items-center gap-3 opacity-40">
                  <span className="w-4 h-px bg-white/40 shrink-0" />
                  <span className="text-white text-sm line-through decoration-white/30">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="border border-accent/20 bg-accent/[0.04] rounded-xl p-7"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" style={{ boxShadow: '0 0 8px #B3FF47' }} />
              <p className="font-mono text-[9px] text-accent/60 tracking-[0.25em] uppercase">
                {t.problem.afterLabel}
              </p>
            </div>
            <div className="space-y-3">
              {t.problem.after.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1.5 6l3 3 6-6" stroke="#B3FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white/80 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-white/20 mt-6 pt-5 border-t border-white/6">{t.problem.solution}</p>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
