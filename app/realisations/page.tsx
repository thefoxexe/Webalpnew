import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactButtons from '@/components/site/ContactButtons'
import ProjectCard from '@/components/site/ProjectCard'
import { PROJECTS } from '@/lib/projects'

const TITLE = 'Réalisations : sites et applications web en Valais'
const DESC = 'Les projets livrés par WebAlp, agence web à Sion : sites vitrines, réservation en ligne, boutique Shopify, espace membres, SaaS et plateforme Web3.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://webalp.ch/realisations' },
  openGraph: { title: TITLE, description: DESC, url: 'https://webalp.ch/realisations', type: 'website', locale: 'fr_CH', siteName: 'WebAlp' },
}

export default function RealisationsPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <Navbar />
      <section className="pt-28 md:pt-36 pb-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ name: 'Réalisations', href: '/realisations' }]} />
          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] mt-8" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
            Nos réalisations
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mt-6">
            Sites vitrines, réservation en ligne, boutique en ligne, espace membres ou application SaaS : voici des projets livrés pour nos clients, avec le contexte, ce qu&apos;on a construit et le lien vers le site.
          </p>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[0.95]">Votre projet sera le prochain.</h2>
          <p className="text-white/65 mt-4 max-w-2xl">Décrivez-nous votre besoin : réponse et devis gratuit sous 24h.</p>
          <div className="mt-8"><ContactButtons /></div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
