import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactButtons from '@/components/site/ContactButtons'
import JsonLd from '@/components/site/JsonLd'
import { translations } from '@/lib/translations'

const TITLE = 'Tarifs : prix d\'un site internet en Valais'
const DESC = 'Prix de création de site internet chez WebAlp à Sion : site vitrine dès CHF 690, Croissance dès CHF 1\'490, e-commerce et application web dès CHF 1\'990, maintenance dès CHF 49/mois.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://webalp.ch/tarifs' },
  openGraph: { title: TITLE, description: DESC, url: 'https://webalp.ch/tarifs', type: 'website', locale: 'fr_CH', siteName: 'WebAlp' },
}

const PLAN_LINKS: Record<string, string> = {
  Starter: '/creation-site-vitrine-valais',
  Croissance: '/creation-site-vitrine-valais',
  'Sur mesure': '/application-web-sur-mesure-valais',
}

const FACTORS = [
  'Le nombre de pages et la quantité de contenu à intégrer',
  'Les fonctions : simple formulaire, réservation, paiement en ligne, espace client',
  'La rédaction des textes : fournis par vous ou rédigés avec nous',
  'Le nombre de langues (FR, DE, EN)',
  'Les intégrations avec vos outils existants (agenda, CRM, comptabilité)',
  'La plateforme choisie : sur mesure (Next.js), Webflow ou WordPress',
]

const FAQ = [
  { q: 'Combien coûte un site internet en Valais ?', a: 'Chez WebAlp, un site vitrine démarre à CHF 690 (Starter), un site plus complet avec blog et travail sur le contenu à CHF 1\'490 (Croissance), et une boutique en ligne ou une application web à CHF 1\'990. Le prix exact est fixé dans un devis gratuit, envoyé sous 24h.' },
  { q: 'Pourquoi vos prix sont-ils plus bas que ceux de grandes agences ?', a: 'On est deux, sans structure lourde : pas de directeur de compte, pas de réunions facturées, pas de marge sur des sous-traitants. Ce que vous payez va dans votre site.' },
  { q: 'Le prix annoncé est-il le prix final ?', a: 'Les prix « dès » sont des repères. Votre devis détaille ce qui est inclus et son prix. Ce qui est signé est ce qui est payé : s\'il y a un ajout en cours de route, il est chiffré et validé avec vous avant.' },
  { q: 'Y a-t-il des frais chaque mois ?', a: 'L\'hébergement chez WebAlp est inclus dans les formules. La maintenance (mises à jour, sauvegardes, modifications) est en option, dès CHF 49 par mois. Pour une boutique en ligne, l\'abonnement de la plateforme (par exemple Shopify) et les frais de paiement sont à votre charge.' },
  { q: 'La TVA est-elle comprise ?', a: 'WebAlp n\'est pas assujetti à la TVA : les prix sont des prix finaux, sans TVA ajoutée.' },
]

export default function TarifsPage() {
  const t = translations.fr.pricing
  return (
    <main>
      <Navbar />
      <section className="bg-[#0A0A0A] text-white pt-28 md:pt-36 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ name: 'Tarifs', href: '/tarifs' }]} />
          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] mt-8" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
            Prix d&apos;un site internet en Valais
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mt-6">
            Des prix clairs, affichés, pour savoir à quoi vous attendre avant même de nous appeler. Ce sont des repères : chaque projet reçoit un devis précis et gratuit sous 24h, adapté à ce que vous voulez faire.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 grid gap-5 md:grid-cols-3">
          {t.plans.map(p => (
            <div key={p.name} className={`rounded-2xl p-7 flex flex-col ${p.popular ? 'bg-[#0A0A0A] text-white' : 'bg-[#F5F4F0] text-black'}`}>
              {p.popular && <p className="text-xs font-semibold text-accent mb-3">{t.popular}</p>}
              <h2 className="font-display font-bold text-2xl">{p.name}</h2>
              <p className={`text-sm mt-1 ${p.popular ? 'text-white/60' : 'text-black/60'}`}>{p.tagline}</p>
              <p className="font-display font-extrabold text-4xl tracking-tight mt-6">dès CHF {p.price}</p>
              <p className={`text-xs mt-1 ${p.popular ? 'text-white/45' : 'text-black/45'}`}>{t.period}</p>
              <ul className="mt-6 space-y-2 text-sm flex-1">
                {p.features.map(f => <li key={f} className="flex gap-2"><span aria-hidden="true" className="text-accent font-bold">✓</span><span className={p.popular ? 'text-white/80' : 'text-black/75'}>{f}</span></li>)}
              </ul>
              <Link href={PLAN_LINKS[p.name] ?? '/contact'} className={`mt-6 text-sm font-semibold underline underline-offset-4 ${p.popular ? 'text-white' : 'text-black'}`}>En savoir plus</Link>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pb-16 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-7">
            <h2 className="font-display font-bold text-2xl">Maintenance et gestion</h2>
            <p className="font-display font-extrabold text-3xl tracking-tight mt-3">dès CHF 49/mois</p>
            <p className="text-black/65 mt-3 text-sm leading-relaxed">Jusqu&apos;à 2 modifications par mois, sauvegardes quotidiennes, sécurité et rapport mensuel.</p>
            <Link href="/maintenance-site-internet-valais" className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">La maintenance en détail</Link>
          </div>
          <div className="rounded-2xl border border-black/10 p-7">
            <h2 className="font-display font-bold text-2xl">E-commerce et application web</h2>
            <p className="font-display font-extrabold text-3xl tracking-tight mt-3">dès CHF 1&apos;990</p>
            <p className="text-black/65 mt-3 text-sm leading-relaxed">Boutique Shopify, WooCommerce ou sur mesure, réservation en ligne, portail client, intranet, SaaS.</p>
            <p className="mt-4 text-sm font-semibold">
              <Link href="/creation-site-ecommerce-valais" className="underline underline-offset-4">E-commerce</Link>{' · '}
              <Link href="/application-web-sur-mesure-valais" className="underline underline-offset-4">Application web</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F4F0]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[0.95]">Ce qui fait varier le prix</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {FACTORS.map(f => <li key={f} className="rounded-xl bg-white p-5 text-black/75">{f}</li>)}
          </ul>
          <p className="mt-6 text-black/65 text-sm">{t.guarantee}</p>
          <p className="mt-3 text-sm">Pour aller plus loin : <Link href="/blog/prix-site-web-professionnel-suisse-2025" className="font-semibold underline underline-offset-4">combien coûte vraiment un site web professionnel en Suisse</Link>.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[0.95] mb-8">Questions sur les prix</h2>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {FAQ.map(f => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between gap-6 font-semibold">{f.q}<span aria-hidden="true" className="text-black/40 group-open:rotate-45 transition-transform">+</span></summary>
                <p className="text-black/70 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[0.95]">Votre devis, gratuit, sous 24h.</h2>
          <div className="mt-8"><ContactButtons /></div>
        </div>
      </section>
      <Footer />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
    </main>
  )
}
