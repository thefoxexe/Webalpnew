'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 260, damping: 22 } as const

export default function Hero() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-[100svh] bg-[#0A0A0A] flex overflow-hidden" aria-label="Hero">

      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Left: headline + CTAs */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex-1 flex flex-col px-6 sm:px-10 md:px-14 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-12 min-w-0">

        <p className="text-sm font-medium text-white/60 tracking-[0.02em] mb-auto">
          {t.hero.tag}
        </p>

        <h1
          className="font-display font-extrabold text-white tracking-[-0.04em] leading-[0.87] my-10 md:my-14"
          style={{ fontSize: 'clamp(42px, 10vw, 148px)' }}
        >
          {t.hero.h1}<br />
          <span className="text-accent">{t.hero.h2}</span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.28 }}
          className="flex flex-col gap-5"
        >
          <p className="text-white/65 text-base leading-relaxed max-w-sm">
            {t.hero.body} <span className="text-white font-semibold">{t.hero.bold}</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-7 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all">
              {t.hero.cta1}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#portfolio"
              className="text-white/55 text-sm hover:text-white transition-colors font-medium">
              {t.hero.cta2} →
            </Link>
          </div>

          <p className="text-white/40 text-sm">{t.hero.price}</p>

        </motion.div>
      </motion.div>


    </section>
  )
}
