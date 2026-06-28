'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-6 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0A0A0A] rounded-2xl overflow-hidden"
        >
          <div className="relative px-8 md:px-14 py-14 md:py-16">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }} />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div>
                <div className="inline-flex items-center gap-2 border border-white/8 rounded-full px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 6px #B3FF47' }} />
                  <span className="font-mono text-[11px] text-white/35">{t.cta.badge}</span>
                </div>
                <h2 className="font-display font-extrabold text-white leading-[0.92] tracking-tight mb-4"
                  style={{ fontSize: 'clamp(28px, 5vw, 62px)' }}>
                  {t.cta.h2a}<br />
                  <span className="text-white/20">{t.cta.h2b}</span>
                </h2>
                <p className="text-white/35 text-sm leading-relaxed max-w-md">{t.cta.body}</p>
              </div>

              <div className="flex flex-col gap-3 shrink-0 min-w-[200px]">
                <Link href="#contact"
                  className="flex items-center justify-between gap-4 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-all accent-glow">
                  {t.cta.cta}
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href="mailto:contact@webalp.ch"
                  className="text-center font-mono text-[11px] text-white/25 hover:text-white/50 transition-colors py-2">
                  {t.cta.sub}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
