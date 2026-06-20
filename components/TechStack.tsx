'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const ICONS = [
  // Sur mesure / Custom — code bracket icon
  <svg key={0} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 6l-4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>,
  // Webflow — layout icon
  <svg key={1} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 13h4M8 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="17" cy="14.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  // CMS — database/layers icon
  <svg key={2} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 7v4c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 11v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
]

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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-black/35 tracking-widest uppercase mb-4">
            — {ts.label}
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 id="tech-title" className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
              {ts.h2a}<br />
              <span className="text-black/25">{ts.h2b}</span>
            </h2>
            <p className="text-black/45 text-sm max-w-xs md:text-right leading-relaxed">
              {ts.sub}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {ts.options.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col gap-5 ${
                opt.popular
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-white border border-black/8'
              }`}
            >
              {/* Tag badge */}
              {opt.popular ? (
                <div className="absolute -top-3 left-6">
                  <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full border border-black/10 shadow-sm tracking-wider uppercase">
                    {opt.tag}
                  </span>
                </div>
              ) : (
                <div className="absolute top-5 right-6">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                    'border-black/10 text-black/30 bg-transparent'
                  }`}>
                    {opt.tag}
                  </span>
                </div>
              )}

              {/* Icon + name */}
              <div className="flex items-start gap-3 mt-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  opt.popular ? 'bg-white/10 text-white' : 'bg-black/5 text-black/50'
                }`}>
                  {ICONS[i]}
                </div>
                <div>
                  <h3 className={`font-display font-extrabold text-xl leading-tight ${opt.popular ? 'text-white' : 'text-black'}`}>
                    {opt.name}
                  </h3>
                  <p className={`text-xs font-mono mt-0.5 ${opt.popular ? 'text-white/35' : 'text-black/30'}`}>
                    {opt.tech}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${opt.popular ? 'text-white/60' : 'text-black/55'}`}>
                {opt.description}
              </p>

              {/* Pros list */}
              <ul className="space-y-2 flex-1">
                {opt.pros.map(pro => (
                  <li key={pro} className={`flex items-start gap-2.5 text-sm ${opt.popular ? 'text-white/75' : 'text-black/65'}`}>
                    <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke={opt.popular ? 'rgba(255,255,255,0.7)' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <div className={`pt-4 border-t text-xs leading-relaxed ${opt.popular ? 'border-white/10 text-white/30' : 'border-black/8 text-black/30'}`}>
                <span className={`font-bold uppercase tracking-widest text-[9px] block mb-0.5 ${opt.popular ? 'text-white/20' : 'text-black/20'}`}>
                  Idéal pour
                </span>
                {opt.best}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 text-center text-xs text-black/35 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {ts.note}
        </motion.p>

      </div>
    </section>
  )
}
