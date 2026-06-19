'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 bg-[#0A0A0A] overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Big numbers */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/30">
              Consultation gratuite
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Votre prochaine
            <br />
            <span className="text-white/40">meilleure décision.</span>
          </h2>

          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            45 minutes. Gratuit. Sans engagement.
            On analyse votre situation et vous montre exactement comment
            votre site web peut générer plus de clients.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold text-base px-8 py-4 rounded-full hover:bg-white/85 active:scale-95 transition-all duration-150 shadow-2xl shadow-white/10"
            >
              Réserver ma consultation gratuite
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="mailto:contact@webalp.ch"
              className="text-white/50 text-sm hover:text-white transition-colors"
            >
              ou écrivez-nous directement →
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              '✓ Devis sous 2h',
              '✓ Aucun engagement',
              '✓ 100% en ligne ou à Sion',
              '✓ Réponse garantie sous 24h',
            ].map((item) => (
              <span key={item} className="text-sm text-white/35 font-medium">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
