'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const PROJECTS = [
  {
    index: '01',
    slug: 'dronevalais',
    name: 'Drone Valais Production',
    type: 'Site vitrine',
    year: '2025',
    sector: 'Vidéaste · Drone',
    description: 'Site haut de gamme pour un vidéaste professionnel en Valais. SEO local ciblé pour capter les demandes de tournage drone et corporate.',
    result: '+280%',
    resultLabel: 'demandes de devis',
    bg: '#0A0A0A',
    dark: true,
    featured: true,
  },
  {
    index: '02',
    slug: 'cookeazy',
    name: "Cook'Eazy",
    type: 'Application web',
    year: '2025',
    sector: 'Culinaire · Food tech',
    description: 'Plateforme web + application mobile pour simplifier la cuisine du quotidien. Design épuré, UX mobile-first, conversion optimisée.',
    result: '3 sem.',
    resultLabel: 'conception → livraison',
    bg: '#111111',
    dark: true,
    featured: true,
  },
  {
    index: '03',
    slug: 'monhygiene',
    name: 'MonHygiène',
    type: 'Site + réservation',
    year: '2025',
    sector: 'Hygiène · Soins',
    description: 'Site professionnel avec système de réservation en ligne intégré. Référencement local pour capter les clients du Valais 24h/24.',
    result: '24/7',
    resultLabel: 'réservations actives',
    bg: '#F5F4F0',
    dark: false,
    featured: true,
  },
  {
    index: '04',
    slug: 'goldenbulls',
    name: 'Golden Bulls',
    type: 'Site vitrine',
    year: '2024',
    sector: 'Restaurant · Gastronomie',
    description: 'Menu digital et galerie pour un restaurant à Sion. Mise en valeur de la carte et du cadre pour attirer les réservations.',
    result: '+45% réservations',
    featured: false,
  },
  {
    index: '05',
    slug: 'harambee',
    name: 'Harambee',
    type: 'App de réservation',
    year: '2025',
    sector: 'Événementiel',
    description: 'Application de ticketing et réservation pour événements en Valais. Paiement intégré et gestion des capacités.',
    result: 'Ticketing 100% digital',
    featured: false,
  },
  {
    index: '06',
    slug: 'monlivreunique',
    name: 'MonLivreUnique',
    type: 'E-commerce',
    year: '2026',
    sector: 'Livre personnalisé',
    description: "Boutique en ligne pour livres photo sur-mesure. Tunnel d'achat optimisé et configurateur de personnalisation.",
    result: 'Ventes 100% online',
    featured: false,
  },
  {
    index: '07',
    slug: 'cabinetmorard',
    name: 'Cabinet Morard',
    type: 'Site vitrine + SEO',
    year: '2025',
    sector: 'Fiduciaire · Conseil',
    description: "Refonte complète du site d'une fiduciaire valaisanne avec stratégie SEO locale pour capter les entreprises du canton.",
    result: 'Top 3 Google local',
    featured: false,
  },
  {
    index: '08',
    slug: 'alpinefitness',
    name: 'Alpine Fitness',
    type: 'Site + Abonnements',
    year: '2025',
    sector: 'Sport · Bien-être',
    description: 'Site fitness avec gestion des abonnements, planning des cours et système de réservation. SEO local Sion/Valais.',
    result: '+120% inscrits',
    featured: false,
  },
]

function SiteMockup({ dark }: { dark: boolean }) {
  const bg = dark ? '#141414' : '#FAFAFA'
  const chromeBg = dark ? '#1C1C1C' : '#EFEFEF'
  const navBg = dark ? '#0E0E0E' : '#FFFFFF'
  const strong = dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.88)'
  const mid = dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'
  const faint = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'

  return (
    <div className="w-full h-full" style={{ background: bg, display: 'flex', flexDirection: 'column' }}>
      {/* Browser chrome */}
      <div style={{ background: chromeBg, borderBottom: `1px solid ${border}`, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: 4, padding: '3px 10px', fontSize: 9, color: mid, fontFamily: 'monospace', letterSpacing: '0.02em' }}>
          webalp.ch
        </div>
        <div style={{ width: 14, height: 14, borderRadius: 2, background: faint }} />
      </div>

      {/* Simulated website */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* Navbar */}
        <div style={{ background: navBg, borderBottom: `1px solid ${border}`, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 44, height: 9, borderRadius: 2, background: strong }} />
          <div style={{ display: 'flex', gap: 10 }}>
            {[32, 26, 30, 26].map((w, i) => <div key={i} style={{ width: w, height: 6, borderRadius: 2, background: mid }} />)}
          </div>
          <div style={{ width: 38, height: 16, borderRadius: 100, background: '#B3FF47', opacity: 0.75 }} />
        </div>

        {/* Hero section */}
        <div style={{ padding: '18px 14px 12px', background: bg }}>
          <div style={{ width: '22%', height: 6, borderRadius: 2, background: 'rgba(179,255,71,0.5)', marginBottom: 10 }} />
          <div style={{ width: '78%', height: 13, borderRadius: 3, background: strong, marginBottom: 6 }} />
          <div style={{ width: '60%', height: 9, borderRadius: 3, background: mid, marginBottom: 5 }} />
          <div style={{ width: '85%', height: 7, borderRadius: 3, background: faint, marginBottom: 4 }} />
          <div style={{ width: '70%', height: 7, borderRadius: 3, background: faint, marginBottom: 14 }} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 68, height: 20, borderRadius: 100, background: '#B3FF47', opacity: 0.65 }} />
            <div style={{ width: 50, height: 20, borderRadius: 100, border: `1px solid ${border}` }} />
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '8px 14px', display: 'flex', gap: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i}>
              <div style={{ width: 28, height: 9, borderRadius: 2, background: strong, marginBottom: 3 }} />
              <div style={{ width: 36, height: 5, borderRadius: 2, background: mid }} />
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ background: faint, borderRadius: 8, padding: 8 }}>
              <div style={{ width: '70%', height: 6, borderRadius: 2, background: mid, marginBottom: 4 }} />
              <div style={{ width: '50%', height: 5, borderRadius: 2, background: faint }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectImage({ slug, dark, name }: { slug: string; dark: boolean; name: string }) {
  const [err, setErr] = useState(false)
  if (err) return <SiteMockup dark={dark} />
  return (
    <div className="relative w-full h-full">
      <Image
        src={`/portfolio/${slug}.jpg`}
        alt={`Aperçu du site ${name}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top"
        onError={() => setErr(true)}
      />
    </div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredList, setHoveredList] = useState<number | null>(null)

  const featured = PROJECTS.filter(p => p.featured)
  const list = PROJECTS.filter(p => !p.featured)

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
            <p className="text-[10px] font-mono text-black/30 tracking-[0.2em] uppercase mb-5">
              — {t.portfolio.label}
            </p>
            <h2 id="portfolio-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
              {t.portfolio.h2a}<br />
              <span className="text-black/20">{t.portfolio.h2b}</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-black/35 text-sm max-w-xs md:text-right leading-relaxed">
              {t.portfolio.sub}
            </p>
            <span className="inline-flex items-center gap-2 bg-black/5 border border-black/8 rounded-full px-3 py-1.5 text-[10px] font-mono text-black/40 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: '0 0 5px #B3FF47' }} />
              {t.portfolio.total}
            </span>
          </div>
        </motion.div>

        {/* Featured 2-col */}
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          {featured.slice(0, 2).map((p, i) => (
            <motion.article
              key={p.index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden flex flex-col cursor-default"
              style={{ background: p.bg }}
            >
              {/* Image / preview area */}
              <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/10' }}>
                <ProjectImage slug={p.slug} dark={p.dark!} name={p.name} />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, transparent 60%, ${p.bg} 100%)` }}
                />
                {/* Index badge */}
                <span className={`absolute top-4 left-4 font-mono text-[10px] font-bold px-2 py-1 rounded-full ${p.dark ? 'bg-white/10 text-white/40' : 'bg-black/8 text-black/35'}`}>
                  {p.index}
                </span>
                {/* Type badge */}
                <span className={`absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full ${p.dark ? 'bg-white/10 text-white/50' : 'bg-black/8 text-black/45'}`}>
                  {p.type}
                </span>
              </div>

              {/* Info bar */}
              <div className="px-6 py-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className={`font-display font-extrabold text-lg leading-tight mb-0.5 ${p.dark ? 'text-white' : 'text-black'}`}>
                    {p.name}
                  </h3>
                  <p className={`text-xs ${p.dark ? 'text-white/30' : 'text-black/30'}`}>
                    {p.sector} · {p.year}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-extrabold text-2xl leading-none text-accent" style={{ textShadow: '0 0 20px rgba(179,255,71,0.4)' }}>
                    {p.result}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${p.dark ? 'text-white/30' : 'text-black/30'}`}>
                    {p.resultLabel}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Featured 3rd — full width landscape */}
        {featured[2] && (
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="rounded-2xl overflow-hidden mb-3 cursor-default"
            style={{ background: featured[2].bg }}
          >
            <div className="grid md:grid-cols-[1fr_45%] gap-0">
              {/* Left: info */}
              <div className="px-8 md:px-12 py-10 flex flex-col justify-between gap-8">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] font-bold ${featured[2].dark ? 'text-white/25' : 'text-black/25'}`}>
                    {featured[2].index}
                  </span>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${featured[2].dark ? 'bg-white/8 text-white/45' : 'bg-black/6 text-black/40'}`}>
                    {featured[2].type}
                  </span>
                </div>
                <div>
                  <h3 className={`font-display font-extrabold text-3xl md:text-4xl leading-tight mb-2 ${featured[2].dark ? 'text-white' : 'text-black'}`}>
                    {featured[2].name}
                  </h3>
                  <p className={`text-xs mb-5 ${featured[2].dark ? 'text-white/30' : 'text-black/30'}`}>
                    {featured[2].sector} · {featured[2].year}
                  </p>
                  <p className={`text-sm leading-relaxed max-w-sm ${featured[2].dark ? 'text-white/50' : 'text-black/50'}`}>
                    {featured[2].description}
                  </p>
                </div>
                <div>
                  <p className="font-display font-extrabold text-5xl leading-none text-accent" style={{ textShadow: '0 0 30px rgba(179,255,71,0.35)' }}>
                    {featured[2].result}
                  </p>
                  <p className={`text-xs mt-1.5 ${featured[2].dark ? 'text-white/30' : 'text-black/30'}`}>
                    {featured[2].resultLabel}
                  </p>
                </div>
              </div>

              {/* Right: preview */}
              <div className="relative overflow-hidden min-h-[260px] md:min-h-0">
                <ProjectImage slug={featured[2].slug} dark={featured[2].dark!} name={featured[2].name} />
              </div>
            </div>
          </motion.article>
        )}

        {/* Project list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="border border-black/10 rounded-2xl overflow-hidden bg-white"
        >
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[52px_1fr_160px_180px_72px_32px] items-center px-6 py-3 border-b border-black/6 bg-[#FAFAFA]">
            {['#', 'Projet', 'Type', 'Résultat', 'Année', ''].map((h, i) => (
              <span key={i} className="text-[9px] font-mono text-black/20 uppercase tracking-[0.15em]">{h}</span>
            ))}
          </div>

          {list.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.055 }}
              onMouseEnter={() => setHoveredList(i)}
              onMouseLeave={() => setHoveredList(null)}
              className="relative border-b last:border-b-0 border-black/6 transition-colors duration-150 group cursor-default"
              style={{ background: hoveredList === i ? '#F5F4F0' : 'transparent' }}
            >
              {/* Accent left border on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all duration-200"
                style={{ background: hoveredList === i ? '#B3FF47' : 'transparent' }}
              />

              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-[52px_1fr_160px_180px_72px_32px] items-center px-6 py-5 gap-4">
                <span className="font-mono text-xs text-black/20">{p.index}</span>
                <div>
                  <p className="font-display font-extrabold text-black text-[15px] leading-tight">{p.name}</p>
                  <p className="text-[11px] text-black/35 mt-0.5">{p.sector}</p>
                </div>
                <span className="text-[11px] font-medium text-black/35 border border-black/8 px-2.5 py-1 rounded-full w-fit">{p.type}</span>
                <span className="text-sm font-semibold text-black/60">{p.result}</span>
                <span className="font-mono text-xs text-black/25">{p.year}</span>
                <svg
                  className="transition-colors duration-150 justify-self-end"
                  style={{ color: hoveredList === i ? '#B3FF47' : 'rgba(0,0,0,0.15)' }}
                  width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                >
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Mobile row */}
              <div className="md:hidden flex items-center gap-4 px-5 py-4">
                <span className="font-mono text-[10px] text-black/20 w-7 flex-shrink-0">{p.index}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-extrabold text-black text-base leading-tight truncate">{p.name}</p>
                  <p className="text-xs text-black/35 mt-0.5">{p.type} · {p.year}</p>
                </div>
                <span className="text-xs font-semibold text-black/45 flex-shrink-0">{p.result}</span>
              </div>

              {/* Tooltip on hover */}
              <AnimatePresence>
                {hoveredList === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute bottom-full left-14 mb-2 z-10 hidden md:block max-w-[280px] bg-[#0A0A0A] text-white/65 text-xs leading-relaxed px-4 py-3 rounded-xl pointer-events-none shadow-2xl shadow-black/40"
                  >
                    <p className="text-white/90 font-semibold text-xs mb-1">{p.name}</p>
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
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <p className="text-sm text-black/35">
            Votre projet sera le prochain sur cette liste.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black/80 active:scale-95 transition-all"
          >
            {t.portfolio.cta}
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
