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
    <section className="py-6 bg-[#F5F4F0]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0A0A0A] rounded-3xl overflow-hidden"
        >
          <div className="relative px-8 md:px-16 py-16 md:py-20">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div>
                <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 6px #B3FF47' }} />
                  <span className="text-white/40 text-xs font-mono">{t.cta.badge}</span>
                </div>

                <h2 className="font-display font-extrabold text-white leading-tight mb-4"
                  style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}
                >
                  {t.cta.h2a}<br />
                  <span className="text-white/25">{t.cta.h2b}</span>
                </h2>

                <p className="text-white/45 text-base max-w-lg leading-relaxed">{t.cta.body}</p>
              </div>

              <div className="flex flex-col gap-3 flex-shrink-0 min-w-[220px]">
                <Link
                  href="#contact"
                  className="group flex items-center justify-between gap-4 bg-accent text-[#0A0A0A] font-bold text-base px-6 py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all duration-150 accent-glow"
                >
                  {t.cta.cta}
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a
                  href="mailto:contact@webalp.ch"
                  className="text-center text-white/35 text-sm hover:text-white/65 transition-colors py-2"
                >
                  {t.cta.sub}
                </a>

                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                  {t.cta.trust.map((item) => (
                    <span key={item} className="text-white/25 text-xs flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1.5 5l2.5 2.5 4.5-5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
