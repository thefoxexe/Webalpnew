'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

// Fire Google Ads conversion when this page loads
function useGoogleAdsConversion() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // @ts-ignore
    if (typeof window.gtag !== 'function') return
    // @ts-ignore
    window.gtag('event', 'conversion', {
      send_to: 'AW-11013404464/REMPLACE_PAR_TON_LABEL',
    })
  }, [])
}

export default function MerciPage() {
  useGoogleAdsConversion()

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <Link href="/" className="mb-16 flex items-center gap-2 group">
        <span className="font-space-grotesk font-bold text-xl text-white tracking-tight">WebAlp</span>
        <span className="w-2 h-2 bg-[#B3FF47]" />
      </Link>

      {/* Card */}
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mb-8 inline-flex">
          <div className="w-16 h-16 bg-[#B3FF47] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-space-grotesk font-bold text-4xl text-white tracking-tight leading-tight mb-4">
          Message reçu.
        </h1>

        {/* Subheading */}
        <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-sm mx-auto">
          On vous répond dans les <span className="text-white/70 font-medium">24 heures</span> avec un retour concret sur votre projet.
        </p>

        {/* What's next */}
        <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6 mb-10 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/20 mb-4">Ce qui se passe maintenant</p>
          <div className="space-y-4">
            {[
              { num: '01', text: 'On analyse votre demande et votre secteur' },
              { num: '02', text: 'On prépare un retour personnalisé — pas un template' },
              { num: '03', text: 'On vous contacte par e-mail ou téléphone sous 24h' },
            ].map(({ num, text }) => (
              <div key={num} className="flex items-start gap-4">
                <span className="font-mono text-xs text-[#B3FF47] shrink-0 mt-0.5">{num}</span>
                <span className="text-white/40 text-sm leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour au site
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-20 text-white/15 text-xs">
        WebAlp · Agence web · Sion, Valais 🇨🇭
      </p>
    </div>
  )
}
