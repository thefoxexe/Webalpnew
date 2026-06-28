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
    <section className="bg-accent overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        >
          <div>
            <p className="font-mono text-[10px] text-[#0A0A0A]/35 tracking-[0.25em] uppercase mb-6">
              {t.cta.badge}
            </p>
            <h2 className="font-display font-extrabold text-[#0A0A0A] leading-[0.92] tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              {t.cta.h2a}<br />
              {t.cta.h2b}
            </h2>
            <p className="text-[#0A0A0A]/50 text-sm leading-relaxed max-w-md">{t.cta.body}</p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 min-w-[200px]">
            <Link href="#contact"
              className="flex items-center justify-between gap-4 bg-[#0A0A0A] text-white font-bold text-sm px-7 py-4 rounded-full hover:bg-black/80 active:scale-[0.98] transition-all">
              {t.cta.cta}
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="mailto:contact@webalp.ch"
              className="text-center font-mono text-[11px] text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70 transition-colors py-2">
              {t.cta.sub}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
