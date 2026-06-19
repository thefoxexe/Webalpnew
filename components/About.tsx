'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-white" ref={ref} aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-black/35 tracking-widest uppercase mb-5">
              — Qui sommes-nous
            </p>
            <h2
              id="about-title"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-6"
            >
              Bastien & Noé.
              <br />
              <span className="text-black/25">Basés en Valais.</span>
            </h2>
            <p className="text-black/55 text-lg leading-relaxed mb-6">
              On a fondé WebAlp avec une conviction simple : les petites entreprises
              méritent des sites web aussi bons que ceux des grandes marques.{' '}
              <strong className="text-black font-semibold">Sans budget de grande marque.</strong>
            </p>
            <p className="text-black/45 text-base leading-relaxed mb-10">
              En combinant design moderne, code performant et stratégie SEO dès le départ,
              on crée des sites qui travaillent pour vous — même quand vous dormez.
              Chaque projet est suivi personnellement. Pas d&apos;intermédiaire, pas de chaîne de prod.
              Vous parlez directement à celui qui crée votre site.
            </p>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-black font-semibold text-sm hover:gap-3 transition-all duration-150 underline underline-offset-4"
            >
              Nous contacter directement
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Founders visual */}
            <div className="relative">
              <div className="flex gap-4 mb-6">
                {/* Bastien */}
                <div className="flex-1 bg-[#0A0A0A] rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-display font-extrabold text-white text-2xl">
                    B
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-white text-lg leading-none">Bastien</p>
                    <p className="text-white/35 text-xs mt-1">Design & Stratégie</p>
                  </div>
                </div>
                {/* Noé */}
                <div className="flex-1 bg-[#F5F4F0] rounded-2xl p-6 flex flex-col items-center gap-3 text-center border border-black/8">
                  <div className="w-16 h-16 rounded-full bg-black/8 border border-black/10 flex items-center justify-center font-display font-extrabold text-black text-2xl">
                    N
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-black text-lg leading-none">Noé</p>
                    <p className="text-black/40 text-xs mt-1">Développement & SEO</p>
                  </div>
                </div>
              </div>

              {/* Philosophy card */}
              <div className="bg-[#0A0A0A] rounded-2xl p-6 border-shine">
                <p className="text-white/60 text-sm leading-relaxed mb-0 italic">
                  &ldquo;On ne fait pas des sites pour faire des sites.
                  On fait des sites pour que vos clients arrivent, lisent, et vous appellent.&rdquo;
                </p>
                <p className="text-white/25 text-xs mt-3 font-mono">— Bastien & Noé, co-fondateurs WebAlp</p>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full border border-black/10 shadow-sm">
                Disponibles maintenant ✓
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: '⚡', label: 'Rapidité' },
                { icon: '🎯', label: 'Précision' },
                { icon: '🤝', label: 'Proximité' },
              ].map((v) => (
                <div key={v.label} className="bg-[#F5F4F0] rounded-xl p-3 text-center border border-black/6">
                  <span className="text-xl block mb-1" aria-hidden="true">{v.icon}</span>
                  <span className="text-xs font-semibold text-black/60">{v.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
