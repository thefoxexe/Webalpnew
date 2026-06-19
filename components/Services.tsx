'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    number: '01',
    title: 'Site vitrine',
    price: 'dès CHF 890',
    description: 'Votre carte de visite digitale, pensée pour convertir. Design sur mesure, mobile-first, SEO intégré. Livré en 14 jours.',
    features: ['Design 100% sur mesure', 'Optimisation mobile', 'SEO technique inclus', 'Formulaire de contact', 'Google Analytics', 'Formation incluse'],
    cta: 'Demander un devis',
  },
  {
    number: '02',
    title: 'SEO & Référencement',
    price: 'dès CHF 290/mois',
    description: "Soyez visible avant vos concurrents sur Google. Audit, stratégie mots-clés, optimisation continue, Google Business.",
    features: ['Audit SEO complet', 'Recherche mots-clés', 'Optimisation On-Page', 'Google Business', 'Rapport mensuel', 'Suivi positions'],
    cta: 'En savoir plus',
  },
  {
    number: '03',
    title: 'Application web',
    price: 'dès CHF 1\'990',
    description: 'Boutique en ligne, plateforme de réservation, application métier. On code vos fonctionnalités sur mesure.',
    features: ['E-commerce ou sur mesure', 'Système de réservation', 'Paiement en ligne', 'Dashboard admin', 'Emails automatiques', 'Tests complets'],
    cta: 'Discuter du projet',
  },
  {
    number: '04',
    title: 'Maintenance & Support',
    price: 'dès CHF 89/mois',
    description: "Vous gérez votre business, on gère votre site. Mises à jour, sauvegardes, sécurité. Support réactif sous 24h.",
    features: ['Mises à jour CMS', 'Sauvegardes quotidiennes', 'Certificat SSL', 'Support sous 24h', 'Rapport mensuel', 'Monitoring 24/7'],
    cta: 'Souscrire',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="services" className="py-28 bg-[#F5F4F0]" ref={ref} aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs font-mono text-black/35 tracking-widest uppercase mb-4">— Nos services</p>
            <h2 id="services-title" className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight">
              Tout ce qu&apos;il faut<br />pour dominer.
            </h2>
          </div>
          <p className="text-black/40 text-sm max-w-xs md:text-right leading-relaxed">
            Des prestations complètes, pensées pour les entreprises suisses qui veulent des résultats — pas des excuses.
          </p>
        </motion.div>

        {/* Services accordion / grid */}
        <div className="space-y-px">
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group border border-black/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                active === i ? 'bg-[#0A0A0A]' : 'bg-white hover:bg-[#F5F4F0]'
              }`}
            >
              <button
                className="w-full flex items-center gap-6 px-6 md:px-8 py-6 text-left"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
              >
                <span className={`font-mono text-xs font-bold w-7 flex-shrink-0 ${active === i ? 'text-white/25' : 'text-black/20'}`}>
                  {s.number}
                </span>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <h3 className={`font-display text-2xl md:text-3xl font-extrabold transition-colors ${active === i ? 'text-white' : 'text-black'}`}>
                    {s.title}
                  </h3>
                  <span className={`text-sm font-bold transition-colors ${active === i ? 'text-white/40' : 'text-black/35'}`}>
                    {s.price}
                  </span>
                </div>
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  active === i ? 'border-white/20 rotate-45' : 'border-black/15 group-hover:border-black/35'
                }`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v8M2 6h8" stroke={active === i ? 'white' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{ height: active === i ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-8 grid md:grid-cols-[1fr_auto] gap-8 items-end">
                  <div>
                    <p className="text-white/55 leading-relaxed mb-6">{s.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-5 py-3 rounded-full hover:bg-white/85 active:scale-95 transition-all flex-shrink-0"
                  >
                    {s.cta}
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
