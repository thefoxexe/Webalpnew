'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TechStack() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ts = t.techStack

  return (
    <section className="py-20 bg-white" ref={ref} aria-labelledby="tech-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs text-black/45 uppercase tracking-widest mb-4">— {ts.label}</p>
          <h2 id="tech-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
            {ts.h2a}<br />
            <span className="text-black/25">{ts.h2b}</span>
          </h2>
          <p className="text-black/60 text-base mt-4 max-w-lg">{ts.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {ts.options.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col gap-5 ${
                opt.popular ? 'bg-[#0A0A0A]' : 'bg-[#F5F4F0]'
              }`}
            >
              {opt.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent rounded-t-2xl" />
              )}

              <div className="flex items-start justify-between">
                <div>
                  {opt.popular && (
                    <span className="text-xs text-accent font-bold uppercase tracking-widest block mb-1">{opt.tag}</span>
                  )}
                  {!opt.popular && (
                    <span className="text-xs text-black/40 border border-black/15 px-2 py-0.5 rounded-full inline-block mb-2">{opt.tag}</span>
                  )}
                  <h3 className={`font-display font-extrabold text-xl leading-none ${opt.popular ? 'text-white' : 'text-black'}`}>
                    {opt.name}
                  </h3>
                  <p className={`text-xs mt-1 ${opt.popular ? 'text-white/50' : 'text-black/40'}`}>{opt.tech}</p>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${opt.popular ? 'text-white/65' : 'text-black/60'}`}>
                {opt.description}
              </p>

              <ul className="space-y-2.5 flex-1">
                {opt.pros.map(pro => (
                  <li key={pro} className={`flex items-start gap-2.5 text-sm ${opt.popular ? 'text-white/70' : 'text-black/65'}`}>
                    <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke={opt.popular ? '#B3FF47' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>

              <div className={`pt-4 border-t text-sm leading-relaxed ${opt.popular ? 'border-white/15 text-white/50' : 'border-black/10 text-black/45'}`}>
                <span className={`text-xs uppercase tracking-wider block mb-1 font-medium ${opt.popular ? 'text-white/40' : 'text-black/35'}`}>Idéal pour</span>
                {opt.best}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center text-sm text-black/40"
        >
          {ts.note}
        </motion.p>

      </div>
    </section>
  )
}
