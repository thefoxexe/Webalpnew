'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const projects = [
  {
    index: '01',
    name: 'Drone Valais Production',
    type: 'Site web',
    year: '2025',
    sector: 'Vidéaste professionnel',
    description: 'Site vitrine haut de gamme pour un vidéaste pro en Valais. SEO local optimisé pour capter les demandes de tournage.',
    result: '+280% demandes de devis',
    bg: 'bg-[#0A0A0A]',
    dark: true,
  },
  {
    index: '02',
    name: "Cook'Eazy",
    type: 'Site web + Application',
    year: '2025',
    sector: 'Application culinaire',
    description: 'Plateforme web + application mobile pour simplifier la cuisine du quotidien. Design moderne et UX pensée pour la conversion.',
    result: 'App web fluide & moderne',
    bg: 'bg-[#F5F4F0]',
    dark: false,
  },
  {
    index: '03',
    name: 'MonHygiène',
    type: 'Site web + Réservation',
    year: '2025',
    sector: 'Hygiène & Soins',
    description: 'Site professionnel avec système de réservation en ligne intégré. Référencement local pour capter les clients du canton.',
    result: 'Réservations en ligne 24/7',
    bg: 'bg-[#111111]',
    dark: true,
  },
]

const projectList = [
  { index: '04', name: 'Golden Bulls', type: 'Site web', year: '2024', sector: 'Restaurant & Gastronomie' },
  { index: '05', name: 'Harambee', type: 'Application de réservation', year: '2025', sector: 'Événementiel' },
  { index: '06', name: 'MonLivreUnique', type: 'Site web', year: '2026', sector: 'Livre personnalisé' },
]

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-28 bg-[#F5F4F0]" ref={ref} aria-labelledby="portfolio-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs font-mono text-black/35 tracking-widest uppercase mb-4">
              — {t.portfolio.label}
            </p>
            <h2 id="portfolio-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              {t.portfolio.h2a}<br />{t.portfolio.h2b}
            </h2>
          </div>
          <p className="text-black/40 text-sm max-w-xs md:text-right leading-relaxed">
            {t.portfolio.sub}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 mb-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative ${p.bg} rounded-2xl overflow-hidden p-8 md:p-10 cursor-default group min-h-[340px] flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <span className={`font-mono text-xs font-bold ${p.dark ? 'text-white/20' : 'text-black/20'}`}>
                  {p.index}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.dark ? 'bg-white/8 text-white/50' : 'bg-black/6 text-black/40'}`}>
                  {p.type}
                </span>
              </div>

              <div>
                <motion.p
                  animate={{ opacity: hovered === i ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`font-display text-3xl md:text-4xl font-extrabold mb-1 ${p.dark ? 'text-white' : 'text-black'}`}
                >
                  {p.result}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 10 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute inset-x-8 md:inset-x-10 ${p.dark ? 'text-white/70' : 'text-black/60'} text-sm leading-relaxed`}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  {p.description}
                </motion.p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <h3 className={`font-display text-xl font-extrabold ${p.dark ? 'text-white' : 'text-black'}`}>
                    {p.name}
                  </h3>
                  <p className={`text-xs font-medium mt-0.5 ${p.dark ? 'text-white/35' : 'text-black/35'}`}>
                    {p.sector} · {p.year}
                  </p>
                </div>
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  p.dark
                    ? 'border-white/15 text-white/30 group-hover:bg-white group-hover:border-white group-hover:text-black'
                    : 'border-black/15 text-black/30 group-hover:bg-black group-hover:border-black group-hover:text-white'
                }`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="border border-black/10 rounded-2xl overflow-hidden bg-white">
          {projectList.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
              className="flex items-center gap-4 px-6 md:px-8 py-5 border-b last:border-b-0 border-black/6 hover:bg-[#F5F4F0] transition-colors group"
            >
              <span className="font-mono text-xs text-black/25 w-7 flex-shrink-0">{p.index}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <h3 className="font-display font-extrabold text-black text-lg leading-none">{p.name}</h3>
                  <span className="hidden sm:block text-black/15">·</span>
                  <span className="text-xs text-black/40 font-medium">{p.sector}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="hidden md:block text-xs font-medium text-black/35 border border-black/10 px-2.5 py-1 rounded-full">
                  {p.type}
                </span>
                <span className="font-mono text-xs text-black/25">{p.year}</span>
                <svg className="text-black/20 group-hover:text-black transition-colors" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
