import { Suspense } from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BriefForm from '@/components/BriefForm'

export const metadata: Metadata = {
  title: 'Démarrer un projet — Brief WebAlp',
  description: 'Partagez votre projet en quelques minutes. On revient avec un devis et une première direction créative sous 24h.',
  robots: { index: false, follow: false },
}

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <div className="h-16" />

      <div className="max-w-2xl mx-auto px-6 md:px-12 pt-12 pb-4">
        <p className="text-[11px] text-white/35 uppercase tracking-widest mb-4">— Brief projet</p>
        <h1
          className="font-display font-extrabold text-white leading-[0.9] tracking-tight mb-3"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          Démarrons<br />
          <span className="text-white/22">votre projet.</span>
        </h1>
        <p className="text-white/45 text-sm leading-relaxed">
          Remplissez ce brief en 3 minutes. On revient vers vous avec un devis personnalisé et une première direction créative sous 24h.
        </p>
      </div>

      <Suspense fallback={<div className="h-96" />}>
        <BriefForm />
      </Suspense>
    </div>
  )
}
