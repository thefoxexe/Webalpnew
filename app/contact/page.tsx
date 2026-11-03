import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactButtons from '@/components/site/ContactButtons'

const TITLE = 'Contact : agence web à Sion, Valais'
const DESC = 'Contactez WebAlp, agence web à Sion : formulaire, téléphone 079 823 58 62, WhatsApp ou contact@webalp.ch. Réponse et devis gratuit sous 24h, du lundi au vendredi.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://webalp.ch/contact' },
  openGraph: { title: TITLE, description: DESC, url: 'https://webalp.ch/contact', type: 'website', locale: 'fr_CH', siteName: 'WebAlp' },
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0A0A0A] text-white pt-28 md:pt-36 pb-6">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />
          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] mt-8" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
            Contacter WebAlp
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mt-6">
            Agence web à Sion, en Valais. Écrivez-nous, appelez-nous ou envoyez un message WhatsApp : on vous répond sous 24h, du lundi au vendredi de 9h à 18h, avec un devis clair et gratuit.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
            <div><dt className="text-white/45">E-mail</dt><dd><a href="mailto:contact@webalp.ch" className="font-semibold hover:underline">contact@webalp.ch</a></dd></div>
            <div><dt className="text-white/45">Téléphone</dt><dd><a href="tel:+41798235862" className="font-semibold hover:underline">079 823 58 62</a></dd></div>
            <div><dt className="text-white/45">Zone</dt><dd className="font-semibold">Sion, Valais · en ligne partout en Suisse romande</dd></div>
          </dl>
          <div className="mt-8"><ContactButtons /></div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  )
}
