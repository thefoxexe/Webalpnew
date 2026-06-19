'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const clients = [
  'Boulangerie des Alpes',
  'StartUp Sion',
  'Cabinet Morard',
  'Alpine Fitness',
  'Hotel Beaumont',
  'Fiduciaire Valais',
  'Atelier Créatif',
  'ProConseil SA',
  'Boulangerie des Alpes',
  'StartUp Sion',
  'Cabinet Morard',
  'Alpine Fitness',
  'Hotel Beaumont',
  'Fiduciaire Valais',
  'Atelier Créatif',
  'ProConseil SA',
]

export default function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="py-12 border-y border-black/8 overflow-hidden bg-white" aria-label="Clients">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-black/35 mb-8">
        {t.trust.label}
      </p>

      <div className="marquee-container relative flex">
        <ul className="animate-marquee flex items-center gap-12 whitespace-nowrap" aria-hidden="true">
          {clients.map((client, i) => (
            <li key={`a-${i}`} className="flex items-center gap-3 text-sm font-semibold text-black/30 hover:text-black/60 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
              {client}
            </li>
          ))}
        </ul>
        <ul className="animate-marquee flex items-center gap-12 whitespace-nowrap" aria-hidden="true">
          {clients.map((client, i) => (
            <li key={`b-${i}`} className="flex items-center gap-3 text-sm font-semibold text-black/30 hover:text-black/60 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20 flex-shrink-0" />
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
