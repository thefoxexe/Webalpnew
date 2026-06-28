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
    <section className="py-24 bg-[#F5F4F0]" ref={ref} aria-labelledby="tech-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-5">— {ts.label}</p>
            <h2 id="tech-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              {ts.h2a}<br />
              <span className="text-black/18">{ts.h2b}</span>
            </h2>
          </div>
          <p className="text-black/35 text-sm max-w-xs leading-relaxed md:text-right">{ts.sub}</p>
        </motion.div>

        {/* Horizontal comparison rows */}
        <div className="space-y-3">
          {ts.options.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative rounded-xl overflow-hidden ${
                opt.popular ? 'bg-[#0A0A0A]' : 'bg-white border border-black/8'
              }`}
            >
              {opt.popular && (
                <div className="absolute top-0 left-0 right-0 h-px bg-accent" style={{ boxShadow: '0 0 12px #B3FF47' }} />
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-0 p-7 md:p-8">

                {/* Name + tech */}
                <div className="md:w-48 shrink-0">
                  {opt.popular && (
                    <span className="inline-block font-mono text-[9px] text-accent/70 tracking-widest uppercase mb-2">
                      {opt.tag}
                    </span>
                  )}
                  {!opt.popular && (
                    <span className="inline-block font-mono text-[9px] text-black/30 border border-black/8 px-2.5 py-1 rounded-full mb-2">
                      {opt.tag}
                    </span>
                  )}
                  <h3 className={`font-display font-extrabold text-xl leading-none mb-1 ${opt.popular ? 'text-white' : 'text-black'}`}>
                    {opt.name}
                  </h3>
                  <p className={`font-mono text-[10px] ${opt.popular ? 'text-white/25' : 'text-black/30'}`}>{opt.tech}</p>
                </div>

                {/* Description */}
                <div className={`md:w-56 shrink-0 md:pl-8 md:border-l ${opt.popular ? 'md:border-white/8' : 'md:border-black/8'}`}>
                  <p className={`text-sm leading-[1.75] ${opt.popular ? 'text-white/45' : 'text-black/50'}`}>{opt.description}</p>
                </div>

                {/* Pros as pills */}
                <div className="flex-1 md:px-8">
                  <p className={`font-mono text-[9px] uppercase tracking-widest mb-3 ${opt.popular ? 'text-white/18' : 'text-black/20'}`}>
                    Points forts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opt.pros.map(pro => (
                      <span key={pro} className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full ${
                        opt.popular ? 'bg-white/6 text-white/55' : 'bg-black/5 text-black/55'
                      }`}>
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M1.5 6l3 3 6-6" stroke={opt.popular ? '#B3FF47' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {pro}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best for */}
                <div className="md:w-44 shrink-0">
                  <p className={`font-mono text-[9px] uppercase tracking-widest mb-2 ${opt.popular ? 'text-white/18' : 'text-black/20'}`}>
                    Idéal pour
                  </p>
                  <p className={`text-sm leading-[1.65] ${opt.popular ? 'text-white/40' : 'text-black/45'}`}>{opt.best}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center font-mono text-[11px] text-black/30"
        >
          {ts.note}
        </motion.p>

      </div>
    </section>
  )
}
