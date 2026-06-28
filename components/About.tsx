'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-[#F5F4F0]" ref={ref} aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-8">— {t.about.label}</p>
            <h2 id="about-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight mb-10"
              style={{ fontSize: 'clamp(30px, 5vw, 64px)' }}>
              {t.about.h2a}<br />
              <span className="text-black/20">{t.about.h2b}</span>
            </h2>
            <p className="text-black/55 text-base leading-[1.8] mb-5">{t.about.p1}</p>
            <p className="text-black/40 text-sm leading-[1.8] mb-10">{t.about.p2}</p>
            <Link href="#contact"
              className="inline-flex items-center gap-2 font-semibold text-sm text-black underline underline-offset-4 hover:opacity-60 transition-opacity">
              {t.about.cta}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { initial: 'B', name: 'Bastien', role: t.about.b_role, dark: true },
                { initial: 'N', name: 'Noé', role: t.about.n_role, dark: false },
              ].map(p => (
                <div key={p.name} className={`rounded-xl p-6 flex flex-col items-center text-center ${p.dark ? 'bg-[#0A0A0A]' : 'bg-white border border-black/8'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-extrabold text-xl mb-3 ${p.dark ? 'bg-white/8 text-white' : 'bg-black/6 text-black'}`}>
                    {p.initial}
                  </div>
                  <p className={`font-display font-extrabold text-base leading-none ${p.dark ? 'text-white' : 'text-black'}`}>{p.name}</p>
                  <p className={`font-mono text-[10px] mt-1.5 ${p.dark ? 'text-white/30' : 'text-black/35'}`}>{p.role}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-7">
              <p className="text-white/55 text-sm leading-[1.8] italic mb-4">{t.about.quote}</p>
              <p className="font-mono text-[10px] text-white/25">{t.about.quoteAuthor}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {t.about.values.map(v => (
                <div key={v.label} className="bg-white border border-black/8 rounded-xl p-3 text-center">
                  <span className="text-lg block mb-1" aria-hidden="true">{v.icon}</span>
                  <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider">{v.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
