'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '890',
    period: 'paiement unique',
    tagline: 'Pour lancer votre présence en ligne',
    features: [
      'Site vitrine 5 pages',
      'Design sur mesure',
      'Mobile & tablette optimisé',
      'SEO technique de base',
      'Formulaire de contact',
      'Google Analytics',
      '1 round de révisions',
      'Formation à la gestion',
      'Livraison en 14 jours',
    ],
    cta: 'Commencer maintenant',
    popular: false,
    note: null,
  },
  {
    name: 'Croissance',
    price: '1\'490',
    period: 'paiement unique',
    tagline: 'Pour attirer des clients sur Google',
    features: [
      'Tout le plan Starter',
      'Jusqu\'à 10 pages',
      'Blog intégré',
      'SEO avancé (mots-clés + on-page)',
      'Google Search Console',
      'Google Business optimisé',
      '3 articles de blog SEO',
      '2 rounds de révisions',
      'Rapport de lancement complet',
    ],
    cta: 'Choisir ce plan',
    popular: true,
    note: 'Le plus populaire',
  },
  {
    name: 'Autorité',
    price: '2\'490',
    period: 'paiement unique',
    tagline: 'Pour dominer votre marché',
    features: [
      'Tout le plan Croissance',
      'Pages illimitées',
      'E-commerce ou fonctions avancées',
      'SEO complet + stratégie contenu',
      'Suivi et rapport mensuel (3 mois)',
      'Audit concurrents',
      '5 articles de blog SEO',
      'Révisions illimitées',
      'Support prioritaire 6 mois',
    ],
    cta: 'Nous contacter',
    popular: false,
    note: null,
  },
]

const addons = [
  { name: 'Maintenance mensuelle', price: 'CHF 89/mois' },
  { name: 'SEO mensuel', price: 'CHF 290/mois' },
  { name: 'Rédaction article blog SEO', price: 'CHF 149/article' },
  { name: 'Traduction FR/DE/EN', price: 'CHF 200/langue' },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section id="tarifs" className="py-28 bg-white" ref={ref} aria-labelledby="pricing-title">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            Nos tarifs
          </p>
          <h2
            id="pricing-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-4"
          >
            Transparent. Simple. Suisse.
          </h2>
          <p className="text-black/50 text-lg max-w-xl mx-auto">
            Pas de frais cachés. Pas de contrat à vie. Un prix fixe, un résultat garanti.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {plans.map((plan, i) => (
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
              {plan.note && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full border border-black/15 shadow-sm">
                    {plan.note}
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
                  {plan.period}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2.5 text-sm ${plan.popular ? 'text-white/80' : 'text-black/65'}`}>
                    <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke={plan.popular ? 'white' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`block text-center font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-150 active:scale-95 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-white/85'
                    : 'bg-black text-white hover:bg-black/80'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#F5F5F5] rounded-3xl p-8"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-6">
            Options supplémentaires
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map((addon) => (
              <div key={addon.name} className="flex flex-col">
                <p className="text-sm font-semibold text-black mb-1">{addon.name}</p>
                <p className="text-sm font-bold text-black/50">{addon.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guarantee */}
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
            Paiement sécurisé · Devis gratuit · Satisfaction garantie · TVA non applicable (petite entreprise)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
