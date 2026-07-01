import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Portfolio from '@/components/Portfolio'

export const metadata: Metadata = {
  title: 'Portfolio — Nos réalisations',
  description: 'Découvrez tous les projets réalisés par WebAlp : sites vitrines, e-commerce, SaaS, Web3 et plus encore.',
}

export default function PortfolioPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Portfolio full />
      </div>
      <Footer />
    </main>
  )
}
