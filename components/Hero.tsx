'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return
      const rect = gridRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      gridRef.current.style.setProperty('--mouse-x', `${x}%`)
      gridRef.current.style.setProperty('--mouse-y', `${y}%`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Section principale"
    >
      {/* Subtle grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-28 left-6 md:left-10 text-xs font-mono text-black/25 tracking-widest uppercase hidden md:block">
        <span>46°N 7°E</span>
        <br />
        <span>Sion, Valais</span>
      </div>
      <div className="absolute top-28 right-6 md:right-10 text-xs font-mono text-black/25 tracking-widest uppercase text-right hidden md:block">
        <span>Est. 2025</span>
        <br />
        <span>Suisse</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 border border-black/12 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-black/60">
            Agence web · Sion, Valais, Suisse
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black leading-[1.02] tracking-tight mb-6">
          Des sites web qui
          <br />
          <span className="relative inline-block">
            travaillent pour vous
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 400 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 9C50 3 150 1 200 5C250 9 320 11 398 6"
                stroke="#0A0A0A"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          ,<br />
          24h/24.
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/55 leading-relaxed mb-10">
          Nous créons des sites web performants pour les startups, indépendants et PME suisses.
          Design sur mesure, SEO natif, résultats mesurables.
          <strong className="text-black/80 font-semibold"> À partir de CHF 890.</strong>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-black text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-black/85 active:scale-95 transition-all duration-150 shadow-lg shadow-black/20"
          >
            Démarrer mon projet
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 bg-transparent text-black font-semibold text-base px-8 py-4 rounded-full border border-black/20 hover:border-black/60 hover:bg-black/4 active:scale-95 transition-all duration-150"
          >
            Voir nos réalisations
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Social proof bar */}
        <div className="mt-16 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {[
            { number: '45+', label: 'Projets livrés' },
            { number: '100%', label: 'Clients satisfaits' },
            { number: '14j', label: 'Délai de livraison' },
            { number: 'CHF 890', label: "Tarif d'entrée" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-display font-extrabold text-black leading-none">
                {stat.number}
              </p>
              <p className="text-xs text-black/45 mt-1 tracking-wide uppercase font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
