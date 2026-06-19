import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de WebAlp, agence web à Sion, Valais, Suisse.',
  robots: { index: false, follow: false },
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M12 7H2M7 12l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour
        </Link>

        <h1 className="font-display text-4xl font-extrabold text-black mb-8">Mentions légales</h1>

        <div className="prose prose-sm text-black/70 space-y-6">
          <section>
            <h2 className="font-bold text-black text-lg mb-2">Éditeur du site</h2>
            <p>WebAlp<br />
            Sion, 1950 Valais, Suisse<br />
            Email : contact@webalp.ch<br />
            Téléphone : +41 77 274 17 26</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Hébergement</h2>
            <p>Ce site est hébergé en Suisse. Les coordonnées de l&apos;hébergeur sont disponibles sur demande.</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Propriété intellectuelle</h2>
            <p>L&apos;ensemble du contenu de ce site (textes, images, graphismes, logos) est la propriété exclusive de WebAlp et est protégé par les lois suisses sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Responsabilité</h2>
            <p>WebAlp s&apos;efforce de maintenir les informations de ce site à jour et exactes. Toutefois, aucune garantie n&apos;est donnée quant à l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des informations publiées.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
