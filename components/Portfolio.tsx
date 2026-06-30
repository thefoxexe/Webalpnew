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
    enjeu: 'Un vidéaste professionnel en Valais avait besoin d\'un site à la hauteur de son talent — et d\'un back-office propriétaire pour gérer devis et factures sans jongler entre Excel et e-mails.',
    description: 'Site vitrine haut de gamme pensé pour convertir les demandes de tournage drone et corporate. CMS entièrement sur mesure : gestion des devis, facturation, suivi client — tout centralisé dans une interface propriétaire.',
    deliverables: ['Site vitrine 5 pages premium', 'CMS sur mesure (devis + factures)', 'Gestion client intégrée', 'Galerie vidéo haute performance', 'SEO local ciblé Valais'],
    result: '+280%',
    resultLabel: 'demandes de devis',
    bg: '#0A0A0A',
    dark: true,
  },
  {
    index: '02',
    slug: 'goldenbulls',
    url: 'https://goldenbulls.ch',
    name: 'Golden Bulls',
    type: 'Web app + Espace membres sécurisé',
    year: '2024',
    sector: 'Investissement · Cryptomonnaie',
    enjeu: 'Un groupe d\'investissement crypto d\'élite devait à la fois afficher une présence forte et réserver son contenu aux seuls membres vérifiés — aucun outil standard ne couvrait les deux.',
    description: 'Plateforme complète : site vitrine impactant et système de vérification de membership avec accès conditionnel. Seuls les membres accrédités franchissent la porte. Dashboard privé, outils de traction inclus.',
    deliverables: ['Site vitrine haut de gamme', 'Système d\'authentification membres', 'Vérification d\'accès conditionnelle', 'Dashboard membres exclusif', 'Outils de traction & conversion'],
    result: '100%',
    resultLabel: 'accès sécurisé & contrôlé',
    bg: '#0C0C0C',
    dark: true,
  },
  {
    index: '03',
    slug: 'monhygiene',
    url: 'https://monhygiene.ch',
    name: 'MonHygiène',
    type: 'Site + Réservation en ligne',
    year: '2025',
    sector: 'Hygiène · Services à domicile',
    enjeu: 'Une entreprise de nettoyage voulait recevoir des réservations 24h/24 et garder la maîtrise complète de son planning — sans commission, sans outil tiers payant.',
    description: 'Site professionnel optimisé conversion avec module de réservation en ligne. Gestion des créneaux, des clients, des récurrences et du suivi des interventions — 100% propriétaire.',
    deliverables: ['Site vitrine optimisé conversion', 'Module de réservation en ligne', 'Gestion planning & clients', 'Gestion des récurrences', 'SEO local Valais ciblé'],
    result: '24/7',
    resultLabel: 'réservations actives',
    bg: '#F5F4F0',
    dark: false,
  },
  {
    index: '04',
    slug: 'yourbizflow',
    url: 'https://yourbizflow.com',
    name: 'YourBizFlow',
    type: 'SaaS application complète',
    year: '2025',
    sector: 'B2B SaaS · Automatisation',
    enjeu: 'Transformer une vision SaaS B2B en produit réel, monétisable et scalable — design, développement, paiements et back-office, livré de A à Z.',
    description: 'Projet SaaS complet from scratch : design de la marque, architecture et développement de l\'application, gestion des abonnements, plans payants Stripe, dashboard client et admin.',
    deliverables: ['Design & branding complet', 'Application web (front + back)', 'Plans d\'abonnement + Stripe', 'Dashboard client & admin', 'Gestion des versions payantes'],
    result: 'SaaS live',
    resultLabel: 'en production',
    bg: '#0F0F0F',
    dark: true,
  },
  {
    index: '05',
    slug: 'vestedwear',
    url: 'https://vestedwear.com',
    name: 'Vestedwear',
    type: 'Boutique Shopify · E-commerce',
    year: '2025',
    sector: 'Mode · Streetwear',
    enjeu: 'Une marque de mode avait besoin d\'une boutique en ligne complète et performante — de zéro à une expérience d\'achat fluide, avec un design à l\'image de la marque et un tunnel de conversion optimisé.',
    description: 'Mise en place intégrale de la boutique Shopify : configuration technique, thème personnalisé, catalogue produits structuré, paiements sécurisés et optimisation UX pour maximiser le taux de conversion.',
    deliverables: ['Configuration Shopify complète', 'Thème sur mesure & design marque', 'Catalogue produits + variantes', 'Paiements & checkout optimisé', 'Expérience mobile-first'],
    result: 'E-com live',
    resultLabel: 'boutique opérationnelle',
    bg: '#0B0E17',
    dark: true,
  },
]


function ProjectVisual({ slug, dark, name, url }: { slug: string; dark: boolean; name: string; url: string }) {
  const [err, setErr] = useState(false)

  if (!err) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={`/portfolio/${slug}.jpg`}
          alt={`Aperçu ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
          onError={() => setErr(true)}
        />
      </div>
    )
  }

  const gc = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${gc} 1px, transparent 1px), linear-gradient(90deg, ${gc} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(179,255,71,0.04) 0%, transparent 65%)',
      }} />
      <p className={`relative z-10 font-mono text-sm tracking-[0.08em] ${dark ? 'text-white/15' : 'text-black/12'}`}>
        {url.replace('https://', '')}
      </p>
    </div>
  )
}


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
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:max-w-4xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto bg-[#0D0D0D] rounded-t-2xl md:rounded-2xl border border-white/8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/6 bg-[#0D0D0D]/97 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/20">{project.index}</span>
            <span className="font-mono text-[10px] text-white/35 border border-white/8 px-2.5 py-1 rounded-full">{project.type}</span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 transition-all"
            aria-label="Fermer">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Preview */}
          <div className="rounded-xl overflow-hidden mb-8 border border-white/6" style={{ aspectRatio: '16/9', background: project.bg }}>
            <ProjectVisual slug={project.slug} dark url={project.url} name={project.name} />
          </div>

          <div className="mb-8">
            <h2 className="font-display font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}>
              {project.name}
            </h2>
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent/50 hover:text-accent transition-colors">
              {project.url.replace('https://', '')}
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-[1fr_240px] gap-8">
            <div className="space-y-7">
              <div>
                <p className="font-mono text-[9px] text-white/18 tracking-[0.2em] uppercase mb-3">{"L'enjeu"}</p>
                <p className="text-white/65 text-sm leading-[1.8]">{project.enjeu}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-white/18 tracking-[0.2em] uppercase mb-3">La solution</p>
                <p className="text-white/45 text-sm leading-[1.8]">{project.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p className="font-mono text-[9px] text-white/18 tracking-[0.2em] uppercase mb-3">{"Ce qu'on a livré"}</p>
                <ul className="space-y-2.5">
                  {project.deliverables.map(d => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-white/50">
                      <svg className="shrink-0 mt-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1.5 6l3 3 6-6" stroke="#B3FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-white/8 rounded-xl p-5">
                <p className="font-display font-extrabold text-accent leading-none"
                  style={{ fontSize: 'clamp(28px, 4vw, 44px)', textShadow: '0 0 30px rgba(179,255,71,0.25)' }}>
                  {project.result}
                </p>
                <p className="text-white/30 text-xs mt-1.5">{project.resultLabel}</p>
                <p className="font-mono text-[10px] text-white/15 mt-3 pt-3 border-t border-white/6">
                  {project.sector} · {project.year}
                </p>
              </div>

              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/10 text-white/35 text-sm font-medium px-5 py-3 rounded-full hover:border-accent/30 hover:text-accent transition-all">
                Visiter le site
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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


function ProjectCard({ project: p, delay, inView, onClick }: { project: Project; delay: number; inView: boolean; onClick: () => void }) {
  const tc = p.dark ? 'text-white' : 'text-black'
  const sc = p.dark ? 'text-white/25' : 'text-black/25'
  const bc = p.dark ? 'text-white/45' : 'text-black/45'
  const tagC = p.dark ? 'border-white/8 text-white/30' : 'border-black/8 text-black/30'

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden flex flex-col"
      style={{ background: p.bg, minHeight: 300 }}
    >
      <div className="flex items-start justify-between px-6 pt-6 pb-0">
        <span className={`font-mono text-[10px] font-bold ${sc}`}>{p.index}</span>
        <span className={`font-mono text-[10px] border px-2.5 py-1 rounded-full ${tagC}`}>{p.type}</span>
      </div>

      <div className="flex-1 flex flex-col justify-between px-6 py-5 gap-5">
        <div>
          <h3 className={`font-display font-extrabold text-xl md:text-2xl leading-tight mb-1.5 ${tc}`}>
            {p.name}
          </h3>
          <p className={`font-mono text-[10px] mb-3 ${sc}`}>{p.url.replace('https://', '')}</p>
          <p className={`text-sm leading-relaxed line-clamp-2 ${bc}`}>{p.enjeu}</p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-display font-extrabold text-3xl leading-none text-accent"
              style={{ textShadow: '0 0 20px rgba(179,255,71,0.3)' }}>
              {p.result}
            </p>
            <p className={`text-[11px] mt-1 ${sc}`}>{p.resultLabel}</p>
          </div>
          <span className={`text-xs font-semibold transition-all duration-200 ${p.dark ? 'text-white/20 group-hover:text-accent' : 'text-black/20 group-hover:text-black/70'}`}>
            Voir →
          </span>
        </div>
      </div>
    </motion.article>
  )
}


function SpotlightCard({ project: p, delay, inView, onClick }: { project: Project; delay: number; inView: boolean; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden"
      style={{ background: p.bg }}
    >
      <div className="flex flex-col md:flex-row items-stretch min-h-[220px]">
        <div className="flex-1 flex flex-col justify-between px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] text-white/25">{p.index}</span>
            <span className="font-mono text-[10px] text-white/30 border border-white/8 px-2.5 py-1 rounded-full">{p.type}</span>
          </div>
          <div>
            <h3 className="font-display font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
              {p.name}
            </h3>
            <p className="font-mono text-[10px] text-white/25 mb-3">{p.url.replace('https://', '')}</p>
            <p className="text-sm text-white/45 leading-relaxed max-w-lg">{p.enjeu}</p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/[0.05] px-6 py-6 md:px-8 md:py-8 md:w-56">
          <div>
            <p className="font-display font-extrabold text-accent leading-none"
              style={{ fontSize: 'clamp(30px, 4vw, 48px)', textShadow: '0 0 28px rgba(179,255,71,0.3)' }}>
              {p.result}
            </p>
            <p className="text-white/30 text-xs mt-1.5">{p.resultLabel}</p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="font-mono text-[10px] text-white/18">{p.sector} · {p.year}</p>
            <span className="text-xs font-semibold text-white/20 group-hover:text-accent transition-colors">Voir →</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}


export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Project | null>(null)

  const row1 = PROJECTS.slice(0, 2)
  const row2 = PROJECTS.slice(2, 4)
  const spotlight = PROJECTS[4]

  return (
    <>
      <section id="portfolio" className="py-32 bg-white" ref={ref} aria-labelledby="portfolio-title">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-6">
                — {t.portfolio.label}
              </p>
              <h2 id="portfolio-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
                {t.portfolio.h2a}<br />
                <span className="text-black/15">{t.portfolio.h2b}</span>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="text-black/35 text-sm max-w-xs md:text-right leading-relaxed">{t.portfolio.sub}</p>
              <span className="inline-flex items-center gap-2 border border-black/8 rounded-full px-3 py-1.5 font-mono text-[10px] text-black/35">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: '0 0 5px #B3FF47' }} />
                {t.portfolio.total}
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-3 mb-3">
            {row1.map((p, i) => (
              <ProjectCard key={p.index} project={p} delay={i * 0.08} inView={inView} onClick={() => setSelected(p)} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-3">
            {row2.map((p, i) => (
              <ProjectCard key={p.index} project={p} delay={0.16 + i * 0.08} inView={inView} onClick={() => setSelected(p)} />
            ))}
          </div>

          <SpotlightCard project={spotlight} delay={0.32} inView={inView} onClick={() => setSelected(spotlight)} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-black/30">Votre projet sera le prochain sur cette liste.</p>
            <a href="#contact"
              className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black/80 active:scale-95 transition-all">
              {t.portfolio.cta}
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
