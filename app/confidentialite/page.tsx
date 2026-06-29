import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | WebAlp',
  description: 'Politique de confidentialité de WebAlp, agence web à Sion, Valais. Comment nous collectons et utilisons vos données personnelles.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://webalp.ch/confidentialite' },
}

export default function Confidentialite() {
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
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-black">Politique de confidentialité</h1>
          </div>

          <div className="prose prose-sm text-black/70 space-y-8">
            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Collecte des données</h2>
              <p className="text-black/65 leading-relaxed">WebAlp collecte uniquement les données que vous nous fournissez volontairement via le formulaire de contact : nom, email, entreprise et message. Ces données sont utilisées uniquement pour répondre à votre demande.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Utilisation</h2>
              <p className="text-black/65 leading-relaxed">Vos données personnelles ne sont jamais vendues, partagées ou transmises à des tiers. Elles sont conservées uniquement le temps nécessaire au traitement de votre demande.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Cookies</h2>
              <p className="text-black/65 leading-relaxed">Ce site utilise des cookies analytiques anonymes (Google Analytics) pour mesurer les performances. Aucun cookie publicitaire n&apos;est utilisé. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Vos droits</h2>
              <p className="text-black/65 leading-relaxed">Conformément à la loi fédérale suisse sur la protection des données (LPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à <a href="mailto:contact@webalp.ch" className="text-black font-medium hover:underline">contact@webalp.ch</a> pour exercer ces droits.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-black text-xl mb-3">Contact</h2>
              <p className="text-black/65 leading-relaxed">Pour toute question relative à vos données personnelles : <a href="mailto:contact@webalp.ch" className="text-black font-medium hover:underline">contact@webalp.ch</a></p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
