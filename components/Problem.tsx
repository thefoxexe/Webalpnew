'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#0A0A0A]" ref={ref}>

      {/* 3 stats */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {t.problem.facts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="px-0 md:px-10 py-14 first:md:pl-0 last:md:pr-0"
              >
                <p className="font-display font-extrabold text-accent leading-none mb-4"
                  style={{ fontSize: 'clamp(52px, 6vw, 84px)' }}>
                  {f.stat}
                </p>
                <p className="text-white/60 text-base leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Before / After */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid md:grid-cols-2 gap-4">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="border border-white/15 rounded-xl p-8"
          >
            <p className="text-xs text-white/50 uppercase tracking-widest mb-6">{t.problem.beforeLabel}</p>
            <div className="space-y-4">
              {t.problem.before.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                  <span className="text-white/45 text-sm line-through">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="border border-accent/30 bg-accent/5 rounded-xl p-8"
          >
            <p className="text-xs text-accent/70 uppercase tracking-widest mb-6">{t.problem.afterLabel}</p>
            <div className="space-y-4">
              {t.problem.after.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l3 3 7-7" stroke="#B3FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-6 pt-5 border-t border-white/10">{t.problem.solution}</p>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
