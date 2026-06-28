'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tarifs" className="py-32 bg-[#0A0A0A]" ref={ref} aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-[10px] text-white/20 tracking-[0.25em] uppercase mb-6">— {t.pricing.label}</p>
            <h2 id="pricing-title" className="font-display font-extrabold text-white leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
              {t.pricing.h2}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-white/30 text-sm max-w-xs md:text-right leading-relaxed">{t.pricing.sub}</p>
            <span className="inline-flex items-center gap-2 border border-white/8 rounded-full px-3 py-1.5 font-mono text-[10px] text-white/25">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 6px #B3FF47' }} />
              {t.pricing.urgency}
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          {t.pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative rounded-xl p-7 flex flex-col border transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-white'
                  : 'bg-white/[0.04] border-white/8 hover:border-white/18'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent text-[#0A0A0A] text-[10px] font-bold font-mono px-3 py-1 rounded-full">
                    {t.pricing.popular}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display font-extrabold text-lg mb-1 ${plan.popular ? 'text-black' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-black/45' : 'text-white/35'}`}>{plan.tagline}</p>
              </div>

              <div className="mb-7">
                <p className={`font-mono text-[9px] tracking-[0.18em] uppercase mb-1 ${plan.popular ? 'text-black/30' : 'text-white/20'}`}>dès</p>
                <p className={`font-display font-extrabold tracking-tight leading-none ${plan.popular ? 'text-black' : 'text-white'}`}
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}>
                  CHF {plan.price}
                </p>
                <p className={`text-xs mt-2 ${plan.popular ? 'text-black/35' : 'text-white/25'}`}>{t.pricing.period}</p>
              </div>

              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map(f => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.popular ? 'text-black/70' : 'text-white/50'}`}>
                    <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke={plan.popular ? '#0A0A0A' : '#B3FF47'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="#contact"
                className={`block text-center font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-150 active:scale-95 ${
                  plan.popular
                    ? 'bg-black text-white hover:bg-black/80'
                    : 'bg-accent text-[#0A0A0A] hover:brightness-110 accent-glow'
                }`}>
                {plan.popular ? t.pricing.ctaPopular : t.pricing.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Addons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/6 pt-8"
        >
          <p className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase mb-6">{t.pricing.addonsTitle}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {t.pricing.addons.map(addon => (
              <div key={addon.name} className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                <p className="text-sm text-white/60">{addon.name}</p>
                <p className="text-sm font-bold text-white/35 shrink-0">{addon.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1L2 4v4c0 3.31 2.69 6 6 7 3.31-1 6-3.69 6-7V4L8 1z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M5 8l2 2 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm text-white/25">{t.pricing.guarantee}</p>
        </motion.div>

      </div>
    </section>
  )
}
