'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const PLANS = {
  starter:     { name: 'Starter',     price: "CHF 690",       emoji: '01' },
  croissance:  { name: 'Croissance',  price: "CHF 1'490",     emoji: '02' },
  'sur-mesure':{ name: 'Sur mesure',  price: "dès CHF 1'990", emoji: '03' },
} as const

const PAGES_OPTIONS = ['Accueil', 'À propos', 'Services', 'Portfolio', 'Blog', 'Contact', 'E-shop', 'Réservation', 'FAQ']

const DEADLINE_CONFIG = {
  starter: {
    default: '2 semaines (délai standard)',
    note: null,
    options: [
      { value: '2 semaines (délai standard)', label: '2 semaines (délai standard)' },
      { value: '1 mois', label: '1 mois — pas de presse' },
      { value: '2 à 3 mois', label: '2 à 3 mois — on a le temps' },
      { value: 'Flexible', label: 'Flexible — à votre convenance' },
    ],
  },
  croissance: {
    default: '',
    note: null,
    options: [
      { value: '', label: 'Choisir…' },
      { value: '3 semaines (délai minimum)', label: '3 semaines (délai minimum)' },
      { value: '1 mois', label: '1 mois' },
      { value: '2 à 3 mois', label: '2 à 3 mois' },
      { value: 'Flexible', label: 'Flexible — à votre convenance' },
    ],
  },
  'sur-mesure': {
    default: '',
    note: 'Délai minimum 1 mois — varie selon la taille du projet.',
    options: [
      { value: '', label: 'Choisir…' },
      { value: '1 mois (minimum)', label: '1 mois (minimum)' },
      { value: '2 à 3 mois', label: '2 à 3 mois' },
      { value: '3 à 6 mois', label: '3 à 6 mois' },
      { value: 'Flexible', label: 'Flexible — à définir ensemble' },
    ],
  },
} as const

const field = "w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/28 focus:outline-none focus:border-accent/60 transition-colors [color-scheme:dark]"
const label = "block text-[11px] text-white/45 uppercase tracking-widest mb-2"

export default function BriefForm() {
  const searchParams = useSearchParams()
  const planKey = (searchParams.get('plan') ?? 'starter') as keyof typeof PLANS
  const plan = PLANS[planKey] ?? PLANS.starter
  const deadlineCfg = DEADLINE_CONFIG[planKey] ?? DEADLINE_CONFIG.starter

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pages, setPages] = useState<string[]>([])
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '',
    sector: '', description: '', goal: '',
    hasLogo: '', visualStyle: '', references: '', colors: '',
    existingSite: '', existingUrl: '', contentReady: '', hasDomain: '',
    deadline: DEADLINE_CONFIG[planKey]?.default ?? '', notes: '',
  })

  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [submitted])

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const togglePage = (p: string) =>
    setPages(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const body = new URLSearchParams({
        'form-name': 'brief-v1',
        plan: `${plan.name} — ${plan.price}`,
        pages: pages.join(', ') || 'Non précisé',
        ...form,
      }).toString()

      const res = await fetch('/netlify-forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })

      if (res.ok) {
        // @ts-ignore
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          // @ts-ignore
          window.gtag('event', 'conversion', { send_to: 'AW-18292642678/REMPLACE_PAR_TON_LABEL' })
        }
        setSubmitted(true)
      }
      else setError('Une erreur est survenue. Réessayez ou écrivez-nous directement.')
    } catch {
      setError('Une erreur est survenue. Réessayez ou écrivez-nous directement.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mb-8">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M4 14l7 7 13-13" stroke="#B3FF47" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-display font-extrabold text-white text-3xl mb-4">Brief reçu !</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-sm mb-8">
          On revient vers vous avec un devis et une première direction créative sous 24h.
        </p>
        <Link href="/" className="text-sm text-accent font-medium hover:underline">← Retour au site</Link>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto px-6 md:px-0 py-12 md:py-16">

      {/* Plan sélectionné */}
      <div className="inline-flex items-center gap-3 bg-white/6 border border-white/10 rounded-2xl px-5 py-3.5 mb-12">
        <span className="text-xs text-white/40 font-mono">{plan.emoji}</span>
        <div>
          <p className="text-[11px] text-white/40 uppercase tracking-widest leading-none mb-0.5">Plan sélectionné</p>
          <p className="text-sm font-bold text-white leading-none">{plan.name} <span className="text-accent">{plan.price}</span></p>
        </div>
        <Link href="/#tarifs" className="ml-2 text-[11px] text-white/30 hover:text-white/60 transition-colors">Changer →</Link>
      </div>

      {/* 01 — Vous */}
      <Section number="01" title="Vos coordonnées" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Prénom *">
          <input name="firstName" type="text" required placeholder="Lucas" value={form.firstName} onChange={set} className={field} />
        </Field>
        <Field label="Nom *">
          <input name="lastName" type="text" required placeholder="Favre" value={form.lastName} onChange={set} className={field} />
        </Field>
        <Field label="Email *">
          <input name="email" type="email" required placeholder="vous@entreprise.ch" value={form.email} onChange={set} className={field} />
        </Field>
        <Field label="Téléphone">
          <input name="phone" type="tel" placeholder="+41 79 000 00 00" value={form.phone} onChange={set} className={field} />
        </Field>
      </div>
      <Field label="Nom de l'entreprise / marque *">
        <input name="company" type="text" required placeholder="Maison Favre & Associés" value={form.company} onChange={set} className={field} />
      </Field>

      {/* 02 — Le projet */}
      <Section number="02" title="Votre projet" />
      <Field label="Secteur d'activité *">
        <input name="sector" type="text" required placeholder="Ex : Restauration, Immobilier, Coaching, E-commerce…" value={form.sector} onChange={set} className={field} />
      </Field>
      <Field label="Décrivez votre projet en quelques lignes *">
        <textarea name="description" required rows={4} placeholder="Qui vous êtes, ce que vous faites, ce que vous attendez du site…" value={form.description} onChange={set} className={`${field} resize-none`} />
      </Field>
      <Field label="Objectif principal du site *">
        <select name="goal" required value={form.goal} onChange={set} className={`${field} appearance-none cursor-pointer`}>
          <option value="" className="bg-[#141414]">Sélectionner…</option>
          <option value="Générer des contacts / demandes" className="bg-[#141414]">Générer des contacts / demandes</option>
          <option value="Vendre en ligne (e-commerce)" className="bg-[#141414]">Vendre en ligne (e-commerce)</option>
          <option value="Présenter mes services / portfolio" className="bg-[#141414]">Présenter mes services / portfolio</option>
          <option value="Prendre des réservations en ligne" className="bg-[#141414]">Prendre des réservations en ligne</option>
          <option value="Autre" className="bg-[#141414]">Autre</option>
        </select>
      </Field>

      <div className="mb-6">
        <p className={label}>Pages souhaitées</p>
        <div className="flex flex-wrap gap-2">
          {PAGES_OPTIONS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => togglePage(p)}
              className={`text-xs px-3.5 py-2 rounded-full border transition-all ${
                pages.includes(p)
                  ? 'bg-accent text-[#0A0A0A] border-accent font-semibold'
                  : 'border-white/15 text-white/55 hover:border-white/35'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 03 — Design & identité */}
      <Section number="03" title="Design & identité" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Avez-vous un logo ?">
          <select name="hasLogo" value={form.hasLogo} onChange={set} className={`${field} appearance-none cursor-pointer`}>
            <option value="" className="bg-[#141414]">Sélectionner…</option>
            <option value="Oui, logo professionnel" className="bg-[#141414]">Oui, logo professionnel</option>
            <option value="Oui, mais à refaire" className="bg-[#141414]">Oui, mais à refaire</option>
            <option value="Non, à créer" className="bg-[#141414]">Non, à créer</option>
          </select>
        </Field>
        <Field label="Univers visuel souhaité">
          <select name="visualStyle" value={form.visualStyle} onChange={set} className={`${field} appearance-none cursor-pointer`}>
            <option value="" className="bg-[#141414]">Sélectionner…</option>
            <option value="Minimaliste & épuré" className="bg-[#141414]">Minimaliste & épuré</option>
            <option value="Moderne & dynamique" className="bg-[#141414]">Moderne & dynamique</option>
            <option value="Corporate & professionnel" className="bg-[#141414]">Corporate & professionnel</option>
            <option value="Luxe & premium" className="bg-[#141414]">Luxe & premium</option>
            <option value="Chaleureux & accessible" className="bg-[#141414]">Chaleureux & accessible</option>
            <option value="Je fais confiance à votre créativité" className="bg-[#141414]">Je fais confiance à votre créativité</option>
          </select>
        </Field>
      </div>
      <Field label="Sites inspirants (URLs)">
        <input name="references" type="text" placeholder="ex : apple.com, monsite.ch, …" value={form.references} onChange={set} className={field} />
      </Field>
      <Field label="Couleurs ou univers visuel (si précis)">
        <input name="colors" type="text" placeholder="ex : vert sapin + crème, bleu marine…" value={form.colors} onChange={set} className={field} />
      </Field>

      {/* 04 — Contenu */}
      <Section number="04" title="Contenu & situation actuelle" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Avez-vous un site existant ?">
          <select name="existingSite" value={form.existingSite} onChange={set} className={`${field} appearance-none cursor-pointer`}>
            <option value="" className="bg-[#141414]">Sélectionner…</option>
            <option value="Non" className="bg-[#141414]">Non, premier site</option>
            <option value="Oui, à refondre" className="bg-[#141414]">Oui, à refondre</option>
          </select>
        </Field>
        <Field label="URL du site actuel (si refonte)">
          <input name="existingUrl" type="url" placeholder="https://…" value={form.existingUrl} onChange={set} className={field} />
        </Field>
        <Field label="Le contenu (textes / photos) est-il prêt ?">
          <select name="contentReady" value={form.contentReady} onChange={set} className={`${field} appearance-none cursor-pointer`}>
            <option value="" className="bg-[#141414]">Sélectionner…</option>
            <option value="Oui, tout est prêt" className="bg-[#141414]">Oui, tout est prêt</option>
            <option value="Partiellement" className="bg-[#141414]">Partiellement</option>
            <option value="Non, besoin d'aide" className="bg-[#141414]">Non, besoin d&apos;aide</option>
          </select>
        </Field>
        <Field label="Avez-vous un nom de domaine ?">
          <select name="hasDomain" value={form.hasDomain} onChange={set} className={`${field} appearance-none cursor-pointer`}>
            <option value="" className="bg-[#141414]">Sélectionner…</option>
            <option value="Oui" className="bg-[#141414]">Oui</option>
            <option value="Non" className="bg-[#141414]">Non, à acheter</option>
          </select>
        </Field>
      </div>

      {/* 05 — Planning */}
      <Section number="05" title="Planning & infos complémentaires" />
      <Field label="Délai souhaité de mise en ligne">
        <select name="deadline" value={form.deadline} onChange={set} className={`${field} appearance-none cursor-pointer`}>
          {deadlineCfg.options.map(o => (
            <option key={o.value} value={o.value} className="bg-[#141414]">{o.label}</option>
          ))}
        </select>
        {deadlineCfg.note && (
          <p className="text-[11px] text-white/35 mt-2">{deadlineCfg.note}</p>
        )}
      </Field>
      <Field label="Informations complémentaires">
        <textarea name="notes" rows={4} placeholder="Tout ce qui vous semble important à nous dire pour démarrer dans les meilleures conditions…" value={form.notes} onChange={set} className={`${field} resize-none`} />
      </Field>

      {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-4 rounded-full hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all mt-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="#0A0A0A" strokeOpacity="0.25" strokeWidth="2"/>
              <path d="M14 8a6 6 0 01-6 6" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer mon brief
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
      <p className="text-xs text-white/30 text-center mt-4">Réponse sous 24h · Devis gratuit · Sans engagement</p>

    </form>
  )
}

function Section({ number, title }: { number: string; title: string }) {
  return (
    <div className="border-t border-white/8 pt-10 mt-10 mb-6">
      <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">{number} —</p>
      <h2 className="font-display font-bold text-white text-xl">{title}</h2>
    </div>
  )
}

function Field({ label: l, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className={label}>{l}</label>
      {children}
    </div>
  )
}
