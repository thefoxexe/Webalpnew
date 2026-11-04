import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactButtons from '@/components/site/ContactButtons'
import JsonLd from '@/components/site/JsonLd'
import ProjectCard from '@/components/site/ProjectCard'
import { SERVICES, getService } from '@/lib/services'
import { PROJECTS } from '@/lib/projects'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map(s => ({ service: s.slug }))
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = getService(params.service)
  if (!s) return {}
  const url = `https://webalp.ch/${s.slug}`
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url, type: 'website', locale: 'fr_CH', siteName: 'WebAlp' },
  }
}

function Section({ title, children, tone = 'white' }: { title: string; children: React.ReactNode; tone?: 'white' | 'cream' }) {
  return (
    <section className={tone === 'cream' ? 'bg-[#F5F4F0]' : 'bg-white'}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <h2 className="rv font-display font-extrabold text-black tracking-tight leading-[0.95] mb-8" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          {title}
        </h2>
        <div className="rv" style={{ ['--d' as string]: '120ms' }}>{children}</div>
      </div>
    </section>
  )
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = getService(params.service)
  if (!s) notFound()
  const projects = s.projects.map(slug => PROJECTS.find(p => p.slug === slug)).filter(Boolean) as typeof PROJECTS
  const related = s.related.map(getService).filter(Boolean) as typeof SERVICES
  const articles = s.articles.map(slug => BLOG_POSTS.find(p => p.slug === slug)).filter(Boolean) as typeof BLOG_POSTS
  const url = `https://webalp.ch/${s.slug}`

  return (
    <main>
      <Navbar />

      <section className="bg-[#0A0A0A] text-white pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ name: s.name, href: `/${s.slug}` }]} />
          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] mt-8" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
            {s.h1}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mt-6">{s.intro}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] bg-accent rounded-full px-4 py-2">
            {s.priceLabel} · devis gratuit sous 24h
          </p>
          <div className="mt-8"><ContactButtons service={s.name} /></div>
        </div>
      </section>

      <Section title="Pour qui ?">
        <ul className="grid gap-4 md:grid-cols-3">
          {s.forWho.map((x, i) => (
            <li key={x} className="rv lift rounded-2xl bg-[#F5F4F0] p-6 text-black/75 leading-relaxed" style={{ ['--d' as string]: `${i * 90}ms` }}>{x}</li>
          ))}
        </ul>
      </Section>

      <Section title="Ce qui est inclus" tone="cream">
        <ul className="grid gap-3 md:grid-cols-2">
          {s.included.map(x => (
            <li key={x} className="flex gap-3 items-start text-black/80">
              <span aria-hidden="true" className="mt-1 w-5 h-5 shrink-0 rounded-full bg-accent text-[#0A0A0A] grid place-items-center text-xs font-bold">✓</span>
              {x}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Comment on travaille">
        <ol className="grid gap-4 md:grid-cols-2">
          {s.process.map((p, i) => (
            <li key={p.title} className="rv lift rounded-2xl border border-black/10 p-6" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <p className="font-mono text-xs text-black/40">0{i + 1}</p>
              <p className="font-display font-bold text-xl mt-2">{p.title}</p>
              <p className="text-black/65 mt-2 leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-black/70"><strong>Délai :</strong> {s.delay}</p>
      </Section>

      <Section title="Combien ça coûte ?" tone="cream">
        <p className="font-display font-extrabold text-4xl tracking-tight">{s.priceLabel}</p>
        <p className="text-black/70 leading-relaxed mt-4 max-w-3xl">{s.priceNote}</p>
        <p className="mt-4"><Link href="/tarifs" className="font-semibold underline underline-offset-4">Voir tous nos tarifs</Link></p>
      </Section>

      {projects.length > 0 && (
        <Section title="Exemples de projets livrés">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(p => <ProjectCard key={p.slug} p={p} />)}
          </div>
          <p className="mt-6"><Link href="/realisations" className="font-semibold underline underline-offset-4">Toutes nos réalisations</Link></p>
        </Section>
      )}

      <Section title="Questions fréquentes" tone={projects.length > 0 ? 'cream' : 'white'}>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {s.faq.map(f => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex justify-between gap-6 font-semibold text-black">
                {f.q}<span aria-hidden="true" className="text-black/40 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-black/70 leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="À lire aussi">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-black/45 mb-3">Services proches</p>
            <ul className="space-y-2">
              {related.map(r => (
                <li key={r.slug}><Link href={`/${r.slug}`} className="font-semibold underline underline-offset-4">{r.name}</Link> <span className="text-black/50">· {r.priceLabel}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-black/45 mb-3">Sur le blog</p>
            <ul className="space-y-2">
              {articles.map(a => (
                <li key={a.slug}><Link href={`/blog/${a.slug}`} className="font-semibold underline underline-offset-4">{a.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <section className="bg-[#0A0A0A] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <h2 className="font-display font-extrabold tracking-tight leading-[0.95]" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Parlons de votre projet.
          </h2>
          <p className="text-white/65 mt-4 max-w-2xl">Décrivez-nous votre besoin : on vous répond sous 24h avec un devis clair et gratuit, sans engagement.</p>
          <div className="mt-8"><ContactButtons service={s.name} /></div>
        </div>
      </section>

      <Footer />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        description: s.metaDescription,
        url,
        serviceType: s.name,
        provider: { '@id': 'https://webalp.ch/#business' },
        areaServed: { '@type': 'AdministrativeArea', name: 'Valais' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CHF',
          price: s.priceFrom,
          priceSpecification: { '@type': 'PriceSpecification', minPrice: s.priceFrom, priceCurrency: 'CHF', ...(s.monthly ? { unitText: 'mois' } : {}) },
        },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: s.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }} />
    </main>
  )
}
