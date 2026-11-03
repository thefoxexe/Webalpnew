import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactButtons from '@/components/site/ContactButtons'
import JsonLd from '@/components/site/JsonLd'
import { PROJECT_IMAGES } from '@/components/site/ProjectCard'
import { PROJECTS } from '@/lib/projects'
import { getService } from '@/lib/services'

export const dynamicParams = false

const SERVICE_FOR: Record<string, string> = {
  dronevalais: 'creation-site-vitrine-valais',
  goldenbulls: 'application-web-sur-mesure-valais',
  monhygiene: 'application-web-sur-mesure-valais',
  vestedwear: 'creation-site-ecommerce-valais',
  yourbizflow: 'application-web-sur-mesure-valais',
  neonbetx: 'application-web-sur-mesure-valais',
}

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find(x => x.slug === params.slug)
  if (!p) return {}
  const title = `${p.name} : ${p.type}`
  const description = `${p.enjeu.slice(0, 150).replace(/\s+\S*$/, '')}… Projet réalisé par WebAlp, agence web à Sion.`
  const url = `https://webalp.ch/realisations/${p.slug}`
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article', locale: 'fr_CH', siteName: 'WebAlp' } }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find(x => x.slug === params.slug)
  if (!p) notFound()
  const img = PROJECT_IMAGES[p.slug]
  const service = getService(SERVICE_FOR[p.slug] ?? '')
  const others = PROJECTS.filter(x => x.slug !== p.slug).slice(0, 3)
  const url = `https://webalp.ch/realisations/${p.slug}`

  return (
    <main className="bg-[#0A0A0A] text-white">
      <Navbar />
      <article>
        <header className="pt-28 md:pt-36 pb-10">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ name: 'Réalisations', href: '/realisations' }, { name: p.name, href: `/realisations/${p.slug}` }]} />
            <p className="text-xs uppercase tracking-[0.12em] text-white/45 mt-8">{p.sector} · {p.year}</p>
            <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] mt-3" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
              {p.name}
            </h1>
            <p className="text-white/70 text-lg mt-4">{p.type}</p>
          </div>
        </header>

        {img && (
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/10 bg-[#141414]">
              <Image src={img} alt={`Page d'accueil du site ${p.name}`} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover object-top" />
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 md:px-12 py-14 space-y-12">
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl">Le contexte</h2>
            <p className="text-white/70 leading-relaxed mt-4">{p.enjeu}</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl">Ce qu&apos;on a construit</h2>
            <p className="text-white/70 leading-relaxed mt-4">{p.description}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {p.deliverables.map(d => <li key={d} className="flex gap-2 text-white/80"><span aria-hidden="true" className="text-accent font-bold">✓</span>{d}</li>)}
            </ul>
          </section>
          {p.note && <p className="text-sm text-white/45 border-l-2 border-white/15 pl-4">{p.note}</p>}
          <section className="flex flex-wrap gap-4 items-center">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/5">
              Voir le site {p.url.replace('https://', '')} ↗
            </a>
            {service && <Link href={`/${service.slug}`} className="text-sm font-semibold underline underline-offset-4">Notre offre : {service.name.toLowerCase()}</Link>}
          </section>
        </div>
      </article>

      <section className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-14">
          <h2 className="font-display font-bold text-2xl md:text-3xl">Autres projets</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map(o => (
              <li key={o.slug}><Link href={`/realisations/${o.slug}`} className="block rounded-xl border border-white/10 p-5 hover:border-white/25"><span className="block font-semibold">{o.name}</span><span className="block text-sm text-white/50 mt-1">{o.type}</span></Link></li>
            ))}
          </ul>
          <div className="mt-12"><ContactButtons /></div>
        </div>
      </section>
      <Footer />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: `${p.name} : ${p.type}`,
        url,
        about: p.sector,
        description: p.description,
        creator: { '@id': 'https://webalp.ch/#business' },
        ...(img ? { image: `https://webalp.ch${img}` } : {}),
        mentions: { '@type': 'WebSite', url: p.url, name: p.name },
      }} />
    </main>
  )
}
