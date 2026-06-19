'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: 'WebAlp a complètement transformé notre présence en ligne. Notre nouveau site reflète parfaitement notre identité et a considérablement augmenté nos demandes de devis.',
    author: 'Drone Valais Production',
    role: 'Entreprise · Site web 2025',
    initial: 'D',
  },
  {
    quote: 'Service impeccable et résultat qui dépasse nos attentes. Notre site est désormais rapide, moderne et convertit beaucoup mieux qu\'avant.',
    author: 'Golden Bulls',
    role: 'Entreprise · Site web 2024',
    initial: 'G',
  },
  {
    quote: 'Très compétent, motivé, compréhensif ! Rendu au-delà de l\'espéré ! Magnifique ! Merci à WebAlp !!',
    author: 'Jose Gustavsson',
    role: 'Client particulier',
    initial: 'J',
  },
  {
    quote: 'Notre nouvelle application web est fluide, moderne et pensée pour l\'utilisateur. Bastien et Noé ont su allier efficacité, écoute et qualité. Le résultat est au-delà de nos attentes !',
    author: 'Cook\'Eazy',
    role: 'Application culinaire · 2025',
    initial: 'C',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="py-28 bg-[#0A0A0A] overflow-hidden"
      ref={ref}
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">
              — Ce qu&apos;ils disent
            </p>
            <h2 id="testimonials-title" className="font-display text-5xl md:text-6xl font-extrabold text-white leading-tight">
              100% de clients<br />satisfaits.
            </h2>
          </div>

          {/* Navigation pills */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-400 ${i === active ? 'w-10 bg-white' : 'w-5 bg-white/20 hover:bg-white/35'}`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Main quote */}
        <div className="relative min-h-[240px] md:min-h-[200px] mb-12">
          {/* Giant decorative quote mark */}
          <span className="absolute -top-4 -left-2 font-display text-[180px] leading-none text-white/4 select-none pointer-events-none" aria-hidden="true">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(24px, 4vw, 54px)' }}
            >
              &ldquo;{testimonials[active].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Author + cards row */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${active}`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-4 flex-shrink-0"
            >
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-display font-extrabold text-lg">
                {testimonials[active].initial}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{testimonials[active].author}</p>
                <p className="text-white/35 text-xs mt-0.5">{testimonials[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stars */}
          <div className="flex items-center gap-1.5 md:ml-auto" aria-label="Note 5/5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="#FAFAFA" aria-hidden="true">
                <path d="M9 1.5l2.06 4.17 4.61.67-3.34 3.25.79 4.59L9 12l-4.12 2.18.79-4.59L2.33 6.34l4.61-.67L9 1.5z"/>
              </svg>
            ))}
            <span className="text-white/30 text-xs font-mono ml-2">5.0</span>
          </div>
        </div>

        {/* Bottom: all testimonials mini */}
        <div className="mt-14 pt-10 border-t border-white/8 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                i === active
                  ? 'border-white/20 bg-white/6'
                  : 'border-white/6 bg-transparent hover:bg-white/4 hover:border-white/12'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === active ? 'bg-white text-black' : 'bg-white/10 text-white/50'}`}>
                  {t.initial}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold truncate ${i === active ? 'text-white' : 'text-white/50'}`}>{t.author}</p>
                </div>
              </div>
              <p className={`text-xs leading-relaxed line-clamp-2 ${i === active ? 'text-white/60' : 'text-white/25'}`}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
