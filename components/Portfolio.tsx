'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: 1,
    client: 'Boulangerie des Alpes',
    category: 'Site vitrine',
    description: 'Site vitrine moderne avec réservation en ligne et intégration Google Maps. +280% de trafic en 6 mois.',
    tags: ['Design', 'SEO local', 'Réservation'],
    metrics: { value: '+280%', label: 'Trafic organique' },
    bg: 'bg-[#1A1A1A]',
    pattern: 'circles',
  },
  {
    id: 2,
    client: 'StartUp Sion',
    category: 'Landing page SaaS',
    description: 'Landing page haute conversion pour une startup B2B. Taux de conversion passé de 1.2% à 4.8%.',
    tags: ['Landing page', 'Copywriting', 'A/B test'],
    metrics: { value: '4.8%', label: 'Taux de conversion' },
    bg: 'bg-[#F5F5F5]',
    pattern: 'lines',
  },
  {
    id: 3,
    client: 'Cabinet Médical Morard',
    category: 'Site professionnel',
    description: 'Site professionnel RGPD-compliant avec prise de rendez-vous intégrée et SEO médical local.',
    tags: ['SEO médical', 'Rendez-vous', 'RGPD'],
    metrics: { value: '#1', label: 'Google Sion' },
    bg: 'bg-[#0A0A0A]',
    pattern: 'dots',
  },
  {
    id: 4,
    client: 'Alpine Fitness Club',
    category: 'E-commerce',
    description: 'Boutique e-commerce + abonnements en ligne avec paiement Stripe. CHF 45k de CA le premier mois.',
    tags: ['E-commerce', 'Stripe', 'Abonnements'],
    metrics: { value: 'CHF 45k', label: 'CA mois 1' },
    bg: 'bg-[#2A2A2A]',
    pattern: 'grid',
  },
]

function PatternBg({ type, dark }: { type: string; dark: boolean }) {
  const color = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'
  if (type === 'circles') {
    return (
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="8" fill="none" stroke={color} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)"/>
      </svg>
    )
  }
  if (type === 'lines') {
    return (
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="20" stroke={color} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)"/>
      </svg>
    )
  }
  if (type === 'dots') {
    return (
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill={color}/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
    )
  }
  return (
    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d={`M 24 0 L 0 0 0 24`} fill="none" stroke={color} strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" className="py-28 bg-[#F5F5F5]" ref={ref} aria-labelledby="portfolio-title">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            Nos réalisations
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h2
              id="portfolio-title"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight max-w-lg"
            >
              Des résultats concrets,<br />pas des promesses.
            </h2>
            <p className="text-black/45 text-sm max-w-xs md:text-right leading-relaxed">
              Chaque projet est unique. Voici quelques exemples de ce qu&apos;on a réalisé.
            </p>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => {
            const isDark = project.bg.includes('0A') || project.bg.includes('1A') || project.bg.includes('2A')
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-3xl ${project.bg} p-8 md:p-10 group cursor-pointer`}
                role="article"
              >
                <PatternBg type={project.pattern} dark={isDark} />

                <div className="relative z-10">
                  {/* Category */}
                  <span className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-white/10 text-white/60' : 'bg-black/8 text-black/50'}`}>
                    {project.category}
                  </span>

                  {/* Metric */}
                  <div className="mb-6">
                    <p className={`font-display text-4xl md:text-5xl font-extrabold leading-none ${isDark ? 'text-white' : 'text-black'}`}>
                      {project.metrics.value}
                    </p>
                    <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                      {project.metrics.label}
                    </p>
                  </div>

                  {/* Client & description */}
                  <h3 className={`font-display text-xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {project.client}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-white/55' : 'text-black/55'}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-white/8 text-white/50' : 'bg-black/6 text-black/50'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className={`absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-black/40">
            Et bien d&apos;autres projets à découvrir en consultation.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
