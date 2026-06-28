'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 260, damping: 22 } as const

export default function CTA() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-accent overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 sm:py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <p className="text-xs text-[#0A0A0A]/45 uppercase tracking-widest mb-5">{t.cta.badge}</p>
            <h2 className="font-display font-extrabold text-[#0A0A0A] leading-[0.92] tracking-tight mb-4"
              style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
              {t.cta.h2a}<br />
              {t.cta.h2b}
            </h2>
            <p className="text-[#0A0A0A]/55 text-base leading-relaxed max-w-md">{t.cta.body}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ ...spring, delay: 0.18 }}
            className="flex flex-col gap-3 shrink-0 w-full sm:w-auto sm:min-w-[220px]"
          >
            <Link href="#contact"
              className="flex items-center justify-between gap-4 bg-[#0A0A0A] text-white font-bold text-sm px-7 py-4 rounded-full hover:bg-black/80 active:scale-[0.98] transition-all">
              {t.cta.cta}
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="mailto:contact@webalp.ch"
              className="text-center text-sm text-[#0A0A0A]/50 hover:text-[#0A0A0A]/80 transition-colors py-2">
              {t.cta.sub}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
