'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

const spring = { type: 'spring', stiffness: 260, damping: 22 } as const

const steps = [
  { n: '01', t: 'Analyse de votre demande', d: 'On prend le temps de comprendre votre secteur, vos objectifs, vos contraintes.' },
  { n: '02', t: 'Retour personnalisé', d: 'Pas un template — un vrai retour sur votre situation spécifique.' },
  { n: '03', t: 'On vous contacte sous 24h', d: 'Par e-mail ou par téléphone, selon votre préférence.' },
]

export default function MerciPage() {
  useGoogleAdsConversion()

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-hidden relative flex flex-col">

      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Lime glow top-right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(179,255,71,0.07) 0%, transparent 70%)' }}
      />

      {/* Nav */}
      <nav className="relative z-10 px-6 sm:px-10 md:px-16 pt-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display font-extrabold text-lg text-white tracking-tight">WebAlp</span>
          <span className="w-[5px] h-[5px] bg-[#B3FF47] mt-0.5" />
        </Link>
        <span className="text-[11px] text-white/20 tracking-[0.12em] uppercase">Sion, Valais · CH</span>
      </nav>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-2xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.05 }}
            className="flex items-center gap-2.5 mb-8"
          >
            <span className="block w-[3px] h-4 bg-[#B3FF47] rounded-full shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white/30">Message reçu</span>
          </motion.div>

          {/* Big heading */}
          <motion.h1
            initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
            className="font-display font-extrabold text-white tracking-[-0.04em] leading-[0.87] mb-6"
            style={{ fontSize: 'clamp(52px, 10vw, 120px)' }}
          >
            Merci.<br />
            <span className="text-[#B3FF47]">À vous</span><br />
            <span className="text-white/15">bientôt.</span>
          </motion.h1>

          {/* Human message */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.28 }}
            className="flex items-start gap-4 mb-12 mt-10"
          >
            {/* Avatar */}
            <div className="shrink-0 w-11 h-11 bg-[#B3FF47] flex items-center justify-center">
              <span className="font-display font-extrabold text-[#0A0A0A] text-base leading-none">B</span>
            </div>
            <div className="border-l border-white/10 pl-4">
              <p className="text-white/60 text-base leading-relaxed mb-2">
                Je prends personnellement connaissance de chaque demande. Vous aurez un retour concret de ma part — pas un copié-collé.
              </p>
              <p className="text-white/25 text-sm font-medium">Bastien · Fondateur, WebAlp</p>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.4 }}
            className="border-t border-white/8"
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.45 + i * 0.08 }}
                className="flex items-start gap-5 py-5 border-b border-white/8"
              >
                <span className="font-mono text-xs text-[#B3FF47] shrink-0 mt-1 w-5">{s.n}</span>
                <div>
                  <p className="text-white/80 text-sm font-semibold mb-0.5">{s.t}</p>
                  <p className="text-white/30 text-sm leading-relaxed">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-10 flex items-center gap-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-sm font-medium px-5 py-3 rounded-full hover:bg-white/8 hover:text-white/70 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour au site
            </Link>
            <a
              href="mailto:contact@webalp.ch"
              className="text-white/20 text-sm hover:text-white/40 transition-colors"
            >
              contact@webalp.ch
            </a>
          </motion.div>

        </div>
      </main>

      {/* Bottom */}
      <footer className="relative z-10 px-6 sm:px-10 md:px-16 pb-8 flex justify-between items-center">
        <p className="text-white/10 text-xs">© 2025 WebAlp</p>
        <p className="text-white/10 text-xs">Sion, Valais 🇨🇭</p>
      </footer>

    </div>
  )
}
