'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    number: '01',
    title: 'Site vitrine',
    subtitle: 'Votre carte de visite digitale',
    description:
      'Un site professionnel, rapide et beau qui représente parfaitement votre activité. Conçu pour convertir les visiteurs en clients dès la première visite.',
    features: ['Design sur mesure', 'Mobile-first', 'SEO technique', 'Formulaire de contact', 'Analytics intégré'],
    cta: 'À partir de CHF 890',
  },
  {
    number: '02',
    title: 'SEO & Référencement',
    subtitle: 'Soyez trouvé sur Google',
    description:
      'Optimisation complète pour que vos clients vous trouvent avant la concurrence. Recherche de mots-clés, optimisation technique et création de contenu.',
    features: ['Audit SEO complet', 'Mots-clés stratégiques', 'Optimisation On-Page', 'Google Business', 'Suivi mensuel'],
    cta: 'À partir de CHF 290/mois',
  },
  {
    number: '03',
    title: 'E-commerce',
    subtitle: 'Vendez en ligne, 24h/24',
    description:
      'Boutique en ligne complète avec gestion des paiements, stocks et commandes. Optimisée pour maximiser votre panier moyen et réduire les abandons.',
    features: ['Catalogue produits', 'Paiement sécurisé', 'Gestion des stocks', 'Emails automatiques', 'Dashboard pro'],
    cta: 'À partir de CHF 1\'990',
  },
  {
    number: '04',
    title: 'Maintenance & Support',
    subtitle: 'On s\'occupe de tout',
    description:
      'Vous gérez votre business, on gère votre site. Mises à jour, sauvegardes, sécurité et support réactif pour que votre site soit toujours au top.',
    features: ['Mises à jour CMS', 'Sauvegardes quotidiennes', 'Certificat SSL', 'Support sous 24h', 'Rapport mensuel'],
    cta: 'À partir de CHF 89/mois',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-28 bg-white" ref={ref} aria-labelledby="services-title">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            Nos services
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-0 justify-between">
            <h2
              id="services-title"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight max-w-lg"
            >
              Tout ce qu&apos;il faut pour dominer votre marché.
            </h2>
            <p className="text-black/50 text-base max-w-xs md:text-right leading-relaxed">
              Des prestations complètes, pensées pour les entreprises suisses qui veulent des résultats.
            </p>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-px bg-black/8">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="bg-white p-8 md:p-10 group hover:bg-[#F5F5F5] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-mono font-bold text-black/25 tracking-wider">
                  {service.number}
                </span>
                <svg
                  className="text-black/20 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-black mb-1">
                {service.title}
              </h3>
              <p className="text-sm font-medium text-black/45 mb-4">{service.subtitle}</p>
              <p className="text-black/60 leading-relaxed mb-6 text-sm md:text-base">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-black/65">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-6 border-t border-black/8">
                <span className="text-sm font-bold text-black">{service.cta}</span>
                <Link
                  href="#contact"
                  className="text-xs font-semibold text-black/50 hover:text-black transition-colors underline underline-offset-4"
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
