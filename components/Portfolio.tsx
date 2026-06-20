'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const PROJECTS = [
  {
    index: '01',
    name: 'Drone Valais Production',
    type: 'Site vitrine',
    year: '2025',
    sector: 'Vidéaste professionnel',
    description: 'Site haut de gamme pour un vidéaste professionnel en Valais. SEO local ciblé pour capter les demandes de tournage drone et corporate.',
    result: '+280%',
    resultLabel: 'demandes de devis',
    bg: '#0A0A0A',
    dark: true,
    featured: true,
  },
  {
    index: '02',
    name: "Cook'Eazy",
    type: 'Application web',
    year: '2025',
    sector: 'Culinaire & Food tech',
    description: 'Plateforme web + application mobile pour simplifier la cuisine du quotidien. Design épuré, UX mobile-first, conversion optimisée dès le lancement.',
    result: '3 sem.',
    resultLabel: 'de conception à livraison',
    bg: '#1A1A1A',
    dark: true,
    featured: true,
  },
  {
    index: '03',
    name: 'MonHygiène',
    type: 'Site + réservation',
    year: '2025',
    sector: 'Hygiène & Soins',
    description: 'Site professionnel avec système de réservation en ligne intégré. Référencement local pour capter les clients du Valais 24h/24.',
    result: '24/7',
    resultLabel: 'réservations en ligne',
    bg: '#F5F4F0',
    dark: false,
    featured: true,
  },
  {
    index: '04',
    name: 'Golden Bulls',
    type: 'Site vitrine',
    year: '2024',
    sector: 'Restaurant & Gastronomie',
    description: 'Menu digital et galerie pour un restaurant à Sion. Mise en valeur de la carte et du cadre pour attirer les réservations en ligne.',
    result: '+45% réservations',
    bg: '#0A0A0A', dark: false, featured: false,
  },
  {
    index: '05',
    name: 'Harambee',
    type: 'Application de réservation',
    year: '2025',
    sector: 'Événementiel',
    description: 'Application de ticketing et réservation pour événements en Valais. Système de paiement intégré et gestion des capacités.',
    result: 'Ticketing 100% digital',
    bg: '#0A0A0A', dark: false, featured: false,
  },
  {
    index: '06',
    name: 'MonLivreUnique',
    type: 'E-commerce',
    year: '2026',
    sector: 'Livre personnalisé',
    description: 'Boutique en ligne pour livres photo sur-mesure. Tunnel d\'achat optimisé et configurateur de personnalisation intégré.',
    result: 'Ventes 100% online',
    bg: '#0A0A0A', dark: false, featured: false,
  },
  {
    index: '07',
    name: 'Cabinet Morard',
    type: 'Site vitrine + SEO',
    year: '2025',
    sector: 'Fiduciaire & Conseil',
    description: 'Refonte complète du site web d\'une fiduciaire valaisanne avec stratégie SEO locale pour capter les entreprises du canton.',
    result: 'Top 3 Google local',
    bg: '#0A0A0A', dark: false, featured: false,
  },
  {
    index: '08',
    name: 'Alpine Fitness',
    type: 'Site web + Abonnements',
    year: '2025',
    sector: 'Sport & Bien-être',
    description: 'Site fitness avec gestion des abonnements en ligne, planning des cours et système de réservation. Référencement local Sion/Valais.',
    result: '+120% inscrits online',
    bg: '#0A0A0A', dark: false, featured: false,
  },
]

function MockScreen({ dark }: { dark: boolean }) {
  return (
    <div className={`rounded-lg overflow-hidden ${dark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/8'}`} style={{ aspectRatio: '16/9' }}>
      <div className={`flex items-center gap-1.5 px-3 py-2 border-b ${dark ? 'border-white/8' : 'border-black/6'}`}>
        {[0,1,2].map(i => (
          <span key={i} className={`w-2 h-2 rounded-full ${dark ? 'bg-white/15' : 'bg-black/10'}`} />
        ))}
      </div>
      <div className="p-3 space-y-1.5">
        <div className={`h-3 rounded ${dark ? 'bg-white/8' : 'bg-black/6'} w-3/4`} />
        <div className={`h-2 rounded ${dark ? 'bg-white/5' : 'bg-black/4'} w-1/2`} />
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className={`h-10 rounded-md ${dark ? 'bg-white/6' : 'bg-black/5'}`} />
          <div className={`h-10 rounded-md ${dark ? 'bg-white/6' : 'bg-black/5'}`} />
        </div>
        <div className={`h-2 rounded ${dark ? 'bg-white/5' : 'bg-black/4'} w-5/6`} />
        <div className={`h-2 rounded ${dark ? 'bg-white/5' : 'bg-black/4'} w-2/3`} />
      </div>
    </div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredList, setHoveredList] = useState<number | null>(null)

  const featured = PROJECTS.filter(p => p.featured)
  const listProjects = PROJECTS.filter(p => !p.featured)

  return (
    <section id="portfolio" className="py-28 bg-[#F5F4F0]" ref={ref} aria-labelledby="portfolio-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-xs font-mono text-black/35 tracking-widest uppercase mb-4">
              — {t.portfolio.label}
            </p>
            <h2 id="portfolio-title" className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight">
              {t.portfolio.h2a}<br />{t.portfolio.h2b}
            </h2>
          </div>
          <p className="text-black/40 text-sm max-w-xs md:text-right leading-relaxed">
            {t.portfolio.sub}
          </p>
        </motion.div>

        {/* Featured cards — 2 col then 1 full */}
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          {featured.slice(0, 2).map((p, i) => (
            <motion.article
              key={p.index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: p.bg }}
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                {/* Top meta */}
                <div className="flex items-start justify-between">
                  <span className={`font-mono text-xs font-bold ${p.dark ? 'text-white/20' : 'text-black/20'}`}>{p.index}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.dark ? 'bg-white/8 text-white/50' : 'bg-black/6 text-black/40'}`}>{p.type}</span>
                </div>

                {/* Screen mockup */}
                <MockScreen dark={p.dark} />

                {/* Bottom */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className={`font-display font-extrabold text-xl mb-0.5 ${p.dark ? 'text-white' : 'text-black'}`}>{p.name}</h3>
                    <p className={`text-xs ${p.dark ? 'text-white/35' : 'text-black/35'}`}>{p.sector} · {p.year}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-display font-extrabold text-2xl leading-none ${p.dark ? 'text-white' : 'text-black'}`}>{p.result}</p>
                    <p className={`text-xs mt-0.5 ${p.dark ? 'text-white/35' : 'text-black/35'}`}>{p.resultLabel}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Third featured — full width */}
        {featured[2] && (
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-3"
            style={{ background: featured[2].bg }}
          >
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <span className={`font-mono text-xs font-bold ${featured[2].dark ? 'text-white/20' : 'text-black/20'}`}>{featured[2].index}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${featured[2].dark ? 'bg-white/8 text-white/50' : 'bg-black/6 text-black/40'}`}>{featured[2].type}</span>
                </div>
                <div>
                  <h3 className={`font-display font-extrabold text-3xl mb-1 ${featured[2].dark ? 'text-white' : 'text-black'}`}>{featured[2].name}</h3>
                  <p className={`text-xs mb-4 ${featured[2].dark ? 'text-white/35' : 'text-black/35'}`}>{featured[2].sector} · {featured[2].year}</p>
                  <p className={`text-sm leading-relaxed ${featured[2].dark ? 'text-white/55' : 'text-black/55'}`}>{featured[2].description}</p>
                </div>
                <div>
                  <p className={`font-display font-extrabold text-4xl leading-none ${featured[2].dark ? 'text-white' : 'text-black'}`}>{featured[2].result}</p>
                  <p className={`text-xs mt-1 ${featured[2].dark ? 'text-white/35' : 'text-black/35'}`}>{featured[2].resultLabel}</p>
                </div>
              </div>
              <MockScreen dark={featured[2].dark} />
            </div>
          </motion.article>
        )}

        {/* List of all other projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="border border-black/10 rounded-2xl overflow-hidden bg-white"
        >
          <div className="hidden md:grid grid-cols-[40px_1fr_140px_160px_64px_40px] items-center px-6 py-3 border-b border-black/6">
            <span className="text-[10px] font-mono text-black/25 uppercase tracking-widest">#</span>
            <span className="text-[10px] font-mono text-black/25 uppercase tracking-widest">Projet</span>
            <span className="text-[10px] font-mono text-black/25 uppercase tracking-widest">Type</span>
            <span className="text-[10px] font-mono text-black/25 uppercase tracking-widest">Résultat</span>
            <span className="text-[10px] font-mono text-black/25 uppercase tracking-widest">Année</span>
            <span />
          </div>

          {listProjects.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.06 }}
              onMouseEnter={() => setHoveredList(i)}
              onMouseLeave={() => setHoveredList(null)}
              className="relative border-b last:border-b-0 border-black/6 hover:bg-[#F5F4F0] transition-colors group cursor-default"
            >
              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-[40px_1fr_140px_160px_64px_40px] items-center px-6 py-5 gap-4">
                <span className="font-mono text-xs text-black/25">{p.index}</span>
                <div>
                  <p className="font-display font-extrabold text-black text-base leading-tight">{p.name}</p>
                  <p className="text-xs text-black/35 mt-0.5">{p.sector}</p>
                </div>
                <span className="text-xs font-medium text-black/40 border border-black/10 px-2.5 py-1 rounded-full w-fit">{p.type}</span>
                <span className="text-sm font-semibold text-black/65">{p.result}</span>
                <span className="font-mono text-xs text-black/30">{p.year}</span>
                <svg className="text-black/20 group-hover:text-black transition-colors justify-self-end" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Mobile row */}
              <div className="md:hidden flex items-center gap-4 px-5 py-4">
                <span className="font-mono text-[10px] text-black/25 w-6 flex-shrink-0">{p.index}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-extrabold text-black text-base leading-tight truncate">{p.name}</p>
                  <p className="text-xs text-black/40 mt-0.5">{p.type} · {p.year}</p>
                </div>
                <span className="text-xs font-semibold text-black/50 flex-shrink-0">{p.result}</span>
              </div>

              {/* Hover description tooltip (desktop) */}
              <AnimatePresence>
                {hoveredList === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-6 mb-2 z-10 hidden md:block max-w-xs bg-[#0A0A0A] text-white/70 text-xs leading-relaxed px-3 py-2 rounded-lg pointer-events-none shadow-xl"
                  >
                    {p.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-black/40">{t.portfolio.total}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            {t.portfolio.cta}
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
