'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section id="tarifs" className="py-28 bg-white" ref={ref} aria-labelledby="pricing-title">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            {t.pricing.label}
          </p>
          <h2
            id="pricing-title"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-4"
          >
            {t.pricing.h2}
          </h2>
          <p className="text-black/50 text-base md:text-lg max-w-xl mx-auto">{t.pricing.sub}</p>
          <div className="mt-4 inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 6px #B3FF47' }} />
            <p className="text-xs font-mono text-black/40">{t.pricing.urgency}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {t.pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'bg-black text-white border-black scale-[1.02]'
                  : hoveredPlan === i
                  ? 'bg-[#F5F5F5] border-black/30'
                  : 'bg-white border-black/12'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full border border-black/15 shadow-sm">
                    {t.pricing.popular}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display text-xl font-extrabold mb-1 ${plan.popular ? 'text-white' : 'text-black'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-white/50' : 'text-black/45'}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-8">
                <p className={`font-display text-5xl font-extrabold tracking-tight leading-none ${plan.popular ? 'text-white' : 'text-black'}`}>
                  CHF {plan.price}
                </p>
                <p className={`text-xs mt-2 ${plan.popular ? 'text-white/40' : 'text-black/35'}`}>
                  {t.pricing.period}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2.5 text-sm ${plan.popular ? 'text-white/80' : 'text-black/65'}`}>
                    <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke={plan.popular ? '#B3FF47' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`block text-center font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-150 active:scale-95 ${
                  plan.popular
                    ? 'bg-accent text-[#0A0A0A] hover:brightness-110 accent-glow'
                    : 'bg-black text-white hover:bg-black/80'
                }`}
              >
                {plan.popular ? t.pricing.ctaPopular : t.pricing.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#F5F5F5] rounded-3xl p-8"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-6">
            {t.pricing.addonsTitle}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {t.pricing.addons.map((addon) => (
              <div key={addon.name} className="flex flex-col">
                <p className="text-sm font-semibold text-black mb-1">{addon.name}</p>
                <p className="text-sm font-bold text-black/50">{addon.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-black/45 flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1L2 4v4c0 3.31 2.69 6 6 7 3.31-1 6-3.69 6-7V4L8 1z" stroke="#0A0A0A" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M5 8l2 2 4-4" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.pricing.guarantee}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
