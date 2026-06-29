import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mentions légales | WebAlp',
  description: 'Mentions légales de WebAlp, agence web à Sion, Valais, Suisse. Éditeur, hébergement, propriété intellectuelle.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://webalp.ch/mentions-legales' },
}

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-6">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M12 7H2M7 12l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour
            </Link>
            <p className="text-[10px] font-mono text-black/30 uppercase tracking-widest mb-3">— Légal</p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-black">Mentions légales</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Éditeur du site</h2>
              <address className="not-italic text-black/65 leading-relaxed space-y-1">
                <p className="font-semibold text-black">WebAlp</p>
                <p>Sion, 1950 Valais, Suisse</p>
                <p>Email : <a href="mailto:contact@webalp.ch" className="text-black font-medium hover:underline">contact@webalp.ch</a></p>
                <p>Téléphone : <a href="tel:+41798235862" className="text-black font-medium hover:underline">079 823 58 62</a></p>
              </address>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Hébergement</h2>
              <p className="text-black/65 leading-relaxed">Ce site est hébergé en Suisse. Les coordonnées de l&apos;hébergeur sont disponibles sur demande.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Propriété intellectuelle</h2>
              <p className="text-black/65 leading-relaxed">L&apos;ensemble du contenu de ce site (textes, images, graphismes, logos) est la propriété exclusive de WebAlp et est protégé par les lois suisses sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Responsabilité</h2>
              <p className="text-black/65 leading-relaxed">WebAlp s&apos;efforce de maintenir les informations de ce site à jour et exactes. Toutefois, aucune garantie n&apos;est donnée quant à l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des informations publiées.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
