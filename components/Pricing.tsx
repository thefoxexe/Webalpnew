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
    <section id="tarifs" className="py-20 bg-white" ref={ref} aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs text-black/45 uppercase tracking-widest mb-4">— {t.pricing.label}</p>
            <h2 id="pricing-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              {t.pricing.h2}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-black/55 text-sm max-w-xs leading-relaxed md:text-right">{t.pricing.sub}</p>
            <span className="inline-flex items-center gap-2 border border-black/12 rounded-full px-3 py-1.5 text-xs text-black/45">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.pricing.urgency}
            </span>
          </div>
        </motion.div>

        <div className="space-y-3 mb-4">
          {t.pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular ? 'bg-[#0A0A0A]' : 'bg-[#F5F4F0]'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
              )}

              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 p-7 md:p-8">
                <div className="md:w-52 shrink-0">
                  {plan.popular && (
                    <span className="text-xs text-accent font-bold uppercase tracking-widest block mb-2">
                      {t.pricing.popular}
                    </span>
                  )}
                  <h3 className={`font-display font-extrabold text-2xl leading-none mb-1 ${plan.popular ? 'text-white' : 'text-black'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/55' : 'text-black/50'}`}>{plan.tagline}</p>
                </div>

                <div className={`md:w-44 shrink-0 md:pl-8 md:border-l ${plan.popular ? 'md:border-white/15' : 'md:border-black/12'}`}>
                  <p className={`text-xs uppercase tracking-wider mb-1 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>dès</p>
                  <p className={`font-display font-extrabold leading-none ${plan.popular ? 'text-white' : 'text-black'}`}
                    style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
                    CHF {plan.price}
                  </p>
                  <p className={`text-xs mt-1.5 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>{t.pricing.period}</p>
                </div>

                <div className="flex-1 md:px-8">
                  <div className="flex flex-wrap gap-2">
                    {plan.features.map(f => (
                      <span key={f} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                        plan.popular ? 'bg-white/10 text-white/70' : 'bg-black/6 text-black/60'
                      }`}>
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M1.5 6l3 3 6-6" stroke={plan.popular ? '#B3FF47' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 md:pl-6">
                  <Link href="#contact"
                    className={`inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-full transition-all active:scale-95 whitespace-nowrap ${
                      plan.popular
                        ? 'bg-accent text-[#0A0A0A] hover:brightness-110'
                        : 'bg-black text-white hover:bg-black/75'
                    }`}>
                    {plan.popular ? t.pricing.ctaPopular : t.pricing.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#F5F4F0] rounded-2xl p-7 md:p-8"
        >
          <p className="text-xs text-black/45 uppercase tracking-widest mb-6">{t.pricing.addonsTitle}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-black/8">
            {t.pricing.addons.map(addon => (
              <div key={addon.name} className="md:px-6 first:md:pl-0 last:md:pr-0 flex items-center justify-between md:flex-col md:items-start md:gap-1">
                <p className="text-sm text-black/65">{addon.name}</p>
                <p className="text-sm font-bold text-black/50">{addon.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 text-center text-sm text-black/45"
        >
          {t.pricing.guarantee}
        </motion.p>

      </div>
    </section>
  )
}
