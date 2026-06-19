'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const painPoints = [
  {
    icon: '🔍',
    text: 'Vos clients ne vous trouvent pas sur Google',
  },
  {
    icon: '💸',
    text: 'Votre site ne convertit pas les visiteurs en clients',
  },
  {
    icon: '📱',
    text: 'Votre site est lent et mal optimisé sur mobile',
  },
  {
    icon: '😩',
    text: 'Votre agence actuelle ne répond pas à vos besoins',
  },
]

export default function Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28 bg-[#0A0A0A] text-white overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Problem statement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Le problème
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              La plupart des sites web ne convertissent pas.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              En Suisse, 73% des PME ont un site web qui n&apos;attire aucun client nouveau.
              Un site beau mais invisible sur Google, c&apos;est de l&apos;argent jeté.
              Un site visible mais sans copywriting, c&apos;est du trafic qui repart.
            </p>
            <p className="text-white/80 text-lg font-semibold leading-relaxed">
              Chez WebAlp, on règle les deux en même temps.
            </p>
          </motion.div>

          {/* Right: Pain points */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="space-y-4"
          >
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-2xl px-5 py-4 hover:bg-white/8 transition-colors"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{point.icon}</span>
                <p className="text-white/70 font-medium">{point.text}</p>
                <svg className="ml-auto flex-shrink-0 text-white/20" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-4 bg-white text-black rounded-2xl px-5 py-4"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">✓</span>
              <p className="font-bold">WebAlp résout tout ça, en 14 jours.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
