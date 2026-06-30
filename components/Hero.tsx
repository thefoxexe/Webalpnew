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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="text-xs text-white/50 tracking-widest uppercase mb-auto"
        >
          Agence web · Sion, Valais · Suisse
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="font-display font-extrabold text-white tracking-[-0.04em] leading-[0.87] my-10 md:my-14"
          style={{ fontSize: 'clamp(42px, 10vw, 148px)' }}
        >
          {t.hero.h1}<br />
          <span className="text-accent">{t.hero.h2}</span>
        </motion.h1>

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

          {/* Mini stats — visible on mobile only */}
          <div className="flex gap-6 mt-2 lg:hidden">
            {t.hero.bottomStats.slice(0, 3).map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.4 + i * 0.06 }}
              >
                <p className="font-display font-extrabold text-white leading-none text-xl">{s.n}</p>
                <p className="text-xs text-white/40 mt-0.5">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right: stats sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...spring, delay: 0.35 }}
        className="hidden lg:flex w-52 xl:w-60 shrink-0 border-l border-white/10 flex-col pt-36 pb-12 px-6"
      >
        <div className="flex items-center gap-2 mb-auto">
          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <span className="text-sm text-white/60">{t.hero.available}</span>
        </div>

        <div className="border-t border-white/10">
          {t.hero.bottomStats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.45 + i * 0.08 }}
              className="py-6 border-b border-white/10"
            >
              <p className="font-display font-extrabold text-white leading-none mb-1.5"
                style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>
                {s.n}
              </p>
              <p className="text-xs text-white/50">{s.l}</p>
            </motion.div>
          ))}
        </div>

        <a href="tel:+41798235862"
          className="text-sm text-white/45 hover:text-white transition-colors mt-6">
          079 823 58 62
        </a>
      </motion.aside>

    </section>
  )
}
