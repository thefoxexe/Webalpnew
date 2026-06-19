import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de WebAlp.',
  robots: { index: false, follow: false },
}

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M12 7H2M7 12l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour
        </Link>

        <h1 className="font-display text-4xl font-extrabold text-black mb-8">Politique de confidentialité</h1>

        <div className="prose prose-sm text-black/70 space-y-6">
          <section>
            <h2 className="font-bold text-black text-lg mb-2">Collecte des données</h2>
            <p>WebAlp collecte uniquement les données que vous nous fournissez volontairement via le formulaire de contact : nom, email, entreprise et message. Ces données sont utilisées uniquement pour répondre à votre demande.</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Utilisation</h2>
            <p>Vos données personnelles ne sont jamais vendues, partagées ou transmises à des tiers. Elles sont conservées uniquement le temps nécessaire au traitement de votre demande.</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Cookies</h2>
            <p>Ce site utilise des cookies analytiques anonymes (Google Analytics) pour mesurer les performances. Aucun cookie publicitaire n&apos;est utilisé. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Vos droits</h2>
            <p>Conformément à la loi fédérale suisse sur la protection des données (LPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à contact@webalp.ch pour exercer ces droits.</p>
          </section>

          <section>
            <h2 className="font-bold text-black text-lg mb-2">Contact</h2>
            <p>Pour toute question relative à vos données personnelles : contact@webalp.ch</p>
          </section>
        </div>
      </div>
    </div>
  )
}
