'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const ICONS = [
  <svg key={0} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 6l-4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>,
  <svg key={1} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 13h4M8 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="17" cy="14.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  <svg key={2} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <section className="py-32 bg-white" ref={ref} aria-labelledby="tech-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-6">— {ts.label}</p>
            <h2 id="tech-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(30px, 5vw, 64px)' }}>
              {ts.h2a}<br />
              <span className="text-black/20">{ts.h2b}</span>
            </h2>
          </div>
          <p className="text-black/35 text-sm max-w-xs md:text-right leading-relaxed">{ts.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {ts.options.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative rounded-xl p-7 flex flex-col gap-5 ${
                opt.popular ? 'bg-[#0A0A0A]' : 'bg-[#F5F4F0]'
              }`}
            >
              {opt.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent text-[#0A0A0A] font-mono text-[10px] font-bold px-3 py-1 rounded-full">{opt.tag}</span>
                </div>
              )}
              {!opt.popular && (
                <span className="absolute top-5 right-6 font-mono text-[10px] text-black/25 border border-black/8 px-2.5 py-1 rounded-full">{opt.tag}</span>
              )}

              <div className="flex items-start gap-3 mt-1">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${opt.popular ? 'bg-white/8 text-white/60' : 'bg-black/6 text-black/40'}`}>
                  {ICONS[i]}
                </div>
                <div>
                  <h3 className={`font-display font-extrabold text-lg leading-tight ${opt.popular ? 'text-white' : 'text-black'}`}>{opt.name}</h3>
                  <p className={`font-mono text-[10px] mt-0.5 ${opt.popular ? 'text-white/30' : 'text-black/30'}`}>{opt.tech}</p>
                </div>
              </div>

              <p className={`text-sm leading-[1.75] ${opt.popular ? 'text-white/50' : 'text-black/50'}`}>{opt.description}</p>

              <ul className="space-y-2 flex-1">
                {opt.pros.map(pro => (
                  <li key={pro} className={`flex items-start gap-2.5 text-sm ${opt.popular ? 'text-white/65' : 'text-black/60'}`}>
                    <svg className="shrink-0 mt-0.5" width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke={opt.popular ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>

              <div className={`pt-4 border-t text-xs leading-relaxed ${opt.popular ? 'border-white/8 text-white/25' : 'border-black/8 text-black/30'}`}>
                <span className={`font-mono text-[9px] uppercase tracking-widest block mb-1 ${opt.popular ? 'text-white/18' : 'text-black/20'}`}>Idéal pour</span>
                {opt.best}
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
