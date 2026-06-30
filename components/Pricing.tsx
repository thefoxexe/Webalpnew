'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tarifs" className="py-20 sm:py-24 bg-white" ref={ref} aria-labelledby="pricing-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs text-black/45 uppercase tracking-widest mb-4">— {t.pricing.label}</p>
            <h2 id="pricing-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
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
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ ...spring, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular ? 'bg-[#0A0A0A]' : 'bg-[#F5F4F0]'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
              )}

              <div className="p-6 sm:p-7 md:p-8">
                {/* Mobile: stacked layout */}
                <div className="flex flex-col gap-5 md:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div>
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
                    <div className="text-right shrink-0">
                      <p className={`text-xs uppercase tracking-wider mb-0.5 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>à partir de</p>
                      <p className={`font-display font-extrabold text-2xl leading-none ${plan.popular ? 'text-white' : 'text-black'}`}>
                        CHF {plan.price}
                      </p>
                    </div>
                  </div>

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

                  <Link href={`/brief?plan=${encodeURIComponent(plan.name.toLowerCase().replace(/ /g, '-'))}`}
                    className={`inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5 rounded-full transition-all active:scale-95 ${
                      plan.popular
                        ? 'bg-accent text-[#0A0A0A] hover:brightness-110'
                        : 'bg-black text-white hover:bg-black/75'
                    }`}>
                    {plan.popular ? t.pricing.ctaPopular : t.pricing.cta}
                  </Link>
                </div>

                {/* Desktop: horizontal layout */}
                <div className="hidden md:flex md:items-center gap-0">
                  <div className="w-48 lg:w-56 shrink-0">
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

                  <div className={`w-40 lg:w-44 shrink-0 pl-8 border-l ${plan.popular ? 'border-white/15' : 'border-black/12'}`}>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>à partir de</p>
                    <p className={`font-display font-extrabold leading-none ${plan.popular ? 'text-white' : 'text-black'}`}
                      style={{ fontSize: 'clamp(24px, 2.5vw, 38px)' }}>
                      CHF {plan.price}
                    </p>
                    <p className={`text-xs mt-1.5 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>{t.pricing.period}</p>
                  </div>

                  <div className="flex-1 px-8">
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

                  <div className="shrink-0 pl-6">
                    <Link href={`/brief?plan=${encodeURIComponent(plan.name.toLowerCase().replace(/ /g, '-'))}`}
                      className={`inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-full transition-all active:scale-95 whitespace-nowrap ${
                        plan.popular
                          ? 'bg-accent text-[#0A0A0A] hover:brightness-110'
                          : 'bg-black text-white hover:bg-black/75'
                      }`}>
                      {plan.popular ? t.pricing.ctaPopular : t.pricing.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ ...spring, delay: 0.42 }}
          className="bg-[#F5F4F0] rounded-2xl p-7 md:p-8"
        >
          <p className="text-xs text-black/45 uppercase tracking-widest mb-6">{t.pricing.addonsTitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 md:divide-x divide-black/8">
            {t.pricing.addons.map(addon => (
              <div key={addon.name} className="md:px-6 first:md:pl-0 last:md:pr-0 flex items-start gap-2">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                <p className="text-sm text-black/65 leading-snug">{addon.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.55 }}
          className="mt-5 text-center text-sm text-black/45"
        >
          {t.pricing.guarantee}
        </motion.p>

      </div>
    </section>
  )
}
