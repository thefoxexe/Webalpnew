'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type Project = {
  index: string
  slug: string
  url: string
  name: string
  type: string
  year: string
  sector: string
  enjeu: string
  description: string
  deliverables: string[]
  result: string
  resultLabel: string
  bg: string
  dark: boolean
  featured: boolean
}

const PROJECTS: Project[] = [
  {
    index: '01',
    slug: 'dronevalais',
    url: 'https://dronevalais-production.ch',
    name: 'Drone Valais Production',
    type: 'Site vitrine + CMS sur mesure',
    year: '2025',
    sector: 'Vidéaste · Drone',
    enjeu: 'Un vidéaste professionnel basé en Valais avait besoin d\'un site à la hauteur de son talent — et d\'un back-office propriétaire pour gérer ses devis et factures sans jongler entre Excel et e-mails.',
    description: 'Site vitrine haut de gamme pensé pour convertir les demandes de tournage drone et corporate. En parallèle, un CMS entièrement sur mesure : gestion des devis, facturation, suivi client — tout centralisé dans une interface propriétaire, sans dépendre d\'aucun outil tiers.',
    deliverables: ['Site vitrine 5 pages premium', 'CMS sur mesure (devis + factures)', 'Gestion client intégrée', 'Galerie vidéo haute performance', 'SEO local ciblé Valais'],
    result: '+280%',
    resultLabel: 'demandes de devis',
    bg: '#0A0A0A',
    dark: true,
    featured: true,
  },
  {
    index: '02',
    slug: 'goldenbulls',
    url: 'https://goldenbulls.ch',
    name: 'Golden Bulls',
    type: 'Web app + Espace membres sécurisé',
    year: '2024',
    sector: 'Investissement · Cryptomonnaie',
    enjeu: 'Un groupe d\'investissement en cryptomonnaie d\'élite avait besoin d\'une présence en ligne forte ET d\'un système d\'accès privé : seuls les membres vérifiés peuvent accéder au contenu et aux outils exclusifs.',
    description: 'Plateforme complète pour un groupe d\'investissement crypto. Site vitrine impactant, puis un système de vérification de membership avec accès conditionnel : seuls les membres accrédités franchissent la porte. Dashboard privé, outils de traction et conversion inclus.',
    deliverables: ['Site vitrine haut de gamme', 'Système d\'authentification membres', 'Vérification d\'accès conditionnelle', 'Dashboard membres exclusif', 'Outils de traction & conversion'],
    result: '100%',
    resultLabel: 'accès sécurisé & contrôlé',
    bg: '#0C0C0C',
    dark: true,
    featured: true,
  },
  {
    index: '03',
    slug: 'monhygiene',
    url: 'https://monhygiene.ch',
    name: 'MonHygiène',
    type: 'Site + Réservation + CMS clients',
    year: '2025',
    sector: 'Hygiène · Services à domicile',
    enjeu: 'Une entreprise de nettoyage professionnel voulait recevoir des réservations en ligne 24h/24 et garder la maîtrise complète de son planning et de sa base client — sans commission, sans outil tiers.',
    description: 'Site professionnel optimisé conversion avec un module de réservation en ligne intégré pour les prestations de nettoyage. CMS sur mesure derrière : gestion des créneaux, des clients, des récurrences et du suivi des interventions — 100% propriétaire.',
    deliverables: ['Site vitrine optimisé conversion', 'Module de réservation en ligne', 'CMS client & planning', 'Gestion des récurrences', 'SEO local Valais ciblé'],
    result: '24/7',
    resultLabel: 'réservations en ligne',
    bg: '#F5F4F0',
    dark: false,
    featured: true,
  },
  {
    index: '04',
    slug: 'yourbizflow',
    url: 'https://yourbizflow.com',
    name: 'YourBizFlow',
    type: 'SaaS application complète',
    year: '2025',
    sector: 'B2B SaaS · Automatisation',
    enjeu: 'Un entrepreneur avait une vision claire d\'un SaaS B2B — mais avait besoin d\'un partenaire technique capable de transformer cette vision en produit viable, monétisable et scalable dès le lancement.',
    description: 'Projet SaaS complet from scratch : design de la marque, architecture et développement de l\'application web, gestion des abonnements, plans payants avec Stripe, tableau de bord client et admin. Un vrai produit en production, pas un prototype.',
    deliverables: ['Design & branding complet', 'Application web (front + back)', 'Plans d\'abonnement + Stripe', 'Dashboard client & admin', 'Gestion des versions payantes'],
    result: 'SaaS live',
    resultLabel: 'en production',
    bg: '#0A0A0A',
    dark: true,
    featured: false,
  },
  {
    index: '05',
    slug: 'harambee',
    url: 'https://harambee.ch',
    name: 'Harambee',
    type: 'Application de réservation sur mesure',
    year: '2025',
    sector: 'Coiffure · Bien-être',
    enjeu: 'Un salon de coiffure voulait sortir de Planity et Fresha pour avoir sa propre plateforme de réservation : aucune commission, gestion 100% contrôlée, expérience client entièrement personnalisée.',
    description: 'Application de réservation sur mesure : gestion des créneaux par prestation et coiffeur, interface de réservation client fluide et mobile-first, back-office complet pour gérer les rendez-vous, les clients et le planning — sans aucune commission tierce.',
    deliverables: ['Application réservation sur mesure', 'Gestion créneaux par prestation', 'Interface client mobile-first', 'Back-office planning complet', 'Portefeuille clients intégré'],
    result: '0%',
    resultLabel: 'de commission vs Planity',
    bg: '#111111',
    dark: true,
    featured: false,
  },
]

// ─── Browser mockup placeholder ───────────────────────────────────────────────

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
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ background: navBg, borderBottom: `1px solid ${border}`, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 44, height: 9, borderRadius: 2, background: strong }} />
          <div style={{ display: 'flex', gap: 10 }}>
            {[32, 26, 30, 26].map((w, i) => <div key={i} style={{ width: w, height: 6, borderRadius: 2, background: mid }} />)}
          </div>
          <div style={{ width: 38, height: 16, borderRadius: 100, background: '#B3FF47', opacity: 0.75 }} />
        </div>
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
        <div style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '8px 14px', display: 'flex', gap: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i}>
              <div style={{ width: 28, height: 9, borderRadius: 2, background: strong, marginBottom: 3 }} />
              <div style={{ width: 36, height: 5, borderRadius: 2, background: mid }} />
            </div>
          ))}
        </div>
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

// ─── Image with fallback ────────────────────────────────────────────────────

function ProjectImage({ slug, dark, name, fill: fillMode = true }: { slug: string; dark: boolean; name: string; fill?: boolean }) {
  const [err, setErr] = useState(false)
  if (err) return <SiteMockup dark={dark} />
  return (
    <div className="relative w-full h-full">
      <Image
        src={`/portfolio/${slug}.jpg`}
        alt={`Aperçu ${name}`}
        fill={fillMode}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top"
        onError={() => setErr(true)}
      />
    </div>
  )
}

// ─── Project detail modal ────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:max-w-4xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto bg-[#0D0D0D] rounded-t-3xl md:rounded-3xl border border-white/8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/8 bg-[#0D0D0D]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/25 tracking-widest">{project.index}</span>
            <span className="text-[10px] font-semibold text-white/45 bg-white/6 px-2.5 py-1 rounded-full border border-white/8">
              {project.type}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:text-white hover:bg-white/8 transition-all"
            aria-label="Fermer"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Screenshot / mockup */}
          <div className="rounded-xl overflow-hidden mb-8 border border-white/6" style={{ aspectRatio: '16/9' }}>
            <ProjectImage slug={project.slug} dark name={project.name} />
          </div>

          {/* Name + URL */}
          <div className="mb-8">
            <h2 className="font-display font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>
              {project.name}
            </h2>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent/70 hover:text-accent transition-colors"
            >
              {project.url.replace('https://', '')}
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Body: left + right */}
          <div className="grid md:grid-cols-[1fr_260px] gap-8">
            {/* Left */}
            <div className="space-y-7">
              <div>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] mb-2.5">{"L'enjeu"}</p>
                <p className="text-white/70 text-sm leading-[1.75]">{project.enjeu}</p>
              </div>
              <div>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] mb-2.5">La solution</p>
                <p className="text-white/50 text-sm leading-[1.75]">{project.description}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.18em] mb-3">{"Ce qu'on a livré"}</p>
                <ul className="space-y-2.5">
                  {project.deliverables.map(d => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-white/55">
                      <svg className="flex-shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1.5 6l3 3 6-6" stroke="#B3FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-white/8 rounded-2xl p-5 bg-white/[0.02]">
                <p className="font-display font-extrabold leading-none text-accent"
                  style={{ fontSize: 'clamp(32px, 5vw, 48px)', textShadow: '0 0 30px rgba(179,255,71,0.3)' }}>
                  {project.result}
                </p>
                <p className="text-white/30 text-xs mt-1.5">{project.resultLabel}</p>
                <p className="text-white/15 text-[10px] font-mono mt-3 pt-3 border-t border-white/6">
                  {project.sector} · {project.year}
                </p>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/40 text-sm font-medium px-5 py-3 rounded-full hover:border-accent/40 hover:text-accent transition-all"
              >
                Visiter le site
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredList, setHoveredList] = useState<number | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)

  const featured = PROJECTS.filter(p => p.featured)
  const list = PROJECTS.filter(p => !p.featured)

  return (
    <>
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
              <h2
                id="portfolio-title"
                className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
              >
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
                onClick={() => setSelected(p)}
                className="group rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                style={{ background: p.bg }}
              >
                {/* Preview area */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/10' }}>
                  <ProjectImage slug={p.slug} dark={p.dark} name={p.name} />
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
                    style={{ background: `linear-gradient(to bottom, transparent 55%, ${p.bg} 100%)` }}
                  />
                  <span className={`absolute top-4 left-4 font-mono text-[10px] font-bold px-2 py-1 rounded-full ${p.dark ? 'bg-white/10 text-white/40' : 'bg-black/8 text-black/35'}`}>
                    {p.index}
                  </span>
                  <span className={`absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full ${p.dark ? 'bg-white/10 text-white/50' : 'bg-black/8 text-black/45'}`}>
                    {p.type}
                  </span>
                  {/* Hover: "Voir le projet" */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="bg-accent text-[#0A0A0A] text-xs font-bold px-4 py-2 rounded-full accent-glow">
                      Voir le projet →
                    </span>
                  </div>
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

          {/* Featured 3rd — full-width landscape */}
          {featured[2] && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              onClick={() => setSelected(featured[2])}
              className="group rounded-2xl overflow-hidden mb-3 cursor-pointer"
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
                    <p className={`text-sm leading-relaxed max-w-sm line-clamp-3 ${featured[2].dark ? 'text-white/50' : 'text-black/50'}`}>
                      {featured[2].enjeu}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display font-extrabold text-5xl leading-none text-accent" style={{ textShadow: '0 0 30px rgba(179,255,71,0.35)' }}>
                        {featured[2].result}
                      </p>
                      <p className={`text-xs mt-1.5 ${featured[2].dark ? 'text-white/30' : 'text-black/30'}`}>
                        {featured[2].resultLabel}
                      </p>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
                      Voir le projet →
                    </span>
                  </div>
                </div>

                {/* Right: preview */}
                <div className="relative overflow-hidden min-h-[260px] md:min-h-0">
                  <ProjectImage slug={featured[2].slug} dark={featured[2].dark} name={featured[2].name} />
                </div>
              </div>
            </motion.article>
          )}

          {/* List (non-featured) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="border border-black/10 rounded-2xl overflow-hidden bg-white"
          >
            <div className="hidden md:grid grid-cols-[52px_1fr_180px_180px_72px_32px] items-center px-6 py-3 border-b border-black/6 bg-[#FAFAFA]">
              {['#', 'Projet', 'Type', 'Impact', 'Année', ''].map((h, i) => (
                <span key={i} className="text-[9px] font-mono text-black/20 uppercase tracking-[0.15em]">{h}</span>
              ))}
            </div>

            {list.map((p, i) => (
              <motion.div
                key={p.index}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                onMouseEnter={() => setHoveredList(i)}
                onMouseLeave={() => setHoveredList(null)}
                onClick={() => setSelected(p)}
                className="relative border-b last:border-b-0 border-black/6 transition-colors duration-150 cursor-pointer"
                style={{ background: hoveredList === i ? '#F5F4F0' : 'transparent' }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all duration-200"
                  style={{ background: hoveredList === i ? '#B3FF47' : 'transparent' }}
                />

                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-[52px_1fr_180px_180px_72px_32px] items-center px-6 py-5 gap-4">
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

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredList === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-full left-14 mb-2 z-10 hidden md:block max-w-[300px] bg-[#0A0A0A] text-white/65 text-xs leading-relaxed px-4 py-3 rounded-xl pointer-events-none shadow-2xl shadow-black/40"
                    >
                      <p className="text-white/90 font-semibold text-xs mb-1">{p.name}</p>
                      <p className="text-white/40">{p.enjeu.slice(0, 100)}…</p>
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

      {/* Project modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
