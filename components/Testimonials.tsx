'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote:
      'WebAlp a complètement transformé notre présence en ligne. En 3 mois, notre trafic a augmenté de 280% et on reçoit des demandes de clients qu\'on n\'aurait jamais atteint avant. L\'équipe est réactive et le résultat est vraiment professionnel.',
    author: 'Marc Dupont',
    role: 'Fondateur, StartUp Sion',
    initial: 'MD',
    metric: '+280%',
    metricLabel: 'Trafic organique',
  },
  {
    id: 2,
    quote:
      'J\'avais peur que ce soit compliqué ou que ça prenne des mois. En 12 jours, mon site était en ligne et je commençais déjà à recevoir des réservations. Le processus est clair, on sait où on en est à chaque étape. Exactement ce qu\'il me fallait.',
    author: 'Sophie Michoud',
    role: 'Propriétaire, Boulangerie des Alpes',
    initial: 'SM',
    metric: '12j',
    metricLabel: 'Délai de livraison',
  },
  {
    id: 3,
    quote:
      'Pour un cabinet médical, la crédibilité en ligne est essentielle. WebAlp a su créer un site à la fois professionnel, rassurant et bien référencé sur Google. Nous sommes maintenant premiers sur "cabinet médical Sion". Incroyable.',
    author: 'Dr. Thomas Roux',
    role: 'Médecin généraliste, Cabinet Morard',
    initial: 'TR',
    metric: '#1',
    metricLabel: 'Google Sion',
  },
  {
    id: 4,
    quote:
      'Le rapport qualité-prix est imbattable en Suisse. Pour CHF 1\'490, j\'ai eu un site qui vaut facilement le triple chez d\'autres agences. Et le suivi après livraison est top — ils répondent toujours en moins de 24h.',
    author: 'Lucie Favre',
    role: 'CEO, Alpine Fitness Club',
    initial: 'LF',
    metric: '3×',
    metricLabel: 'Valeur perçue',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-28 bg-[#0A0A0A]" ref={ref} aria-labelledby="testimonials-title">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
            Témoignages
          </p>
          <h2
            id="testimonials-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-2xl"
          >
            Ce que nos clients disent vraiment.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_280px] gap-8">
          {/* Main testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/8 rounded-3xl p-8 md:p-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6" aria-label="5 étoiles">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FAFAFA" aria-hidden="true">
                      <path d="M8 1l1.76 3.57L14 5.27l-3 2.92.7 4.1L8 10.16l-3.7 2.13.7-4.1L2 5.27l4.24-.7z"/>
                    </svg>
                  ))}
                </div>

                <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {testimonials[activeIndex].initial}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{testimonials[activeIndex].author}</p>
                      <p className="text-white/40 text-xs">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-3xl font-extrabold text-white">
                      {testimonials[activeIndex].metric}
                    </p>
                    <p className="text-white/35 text-xs">{testimonials[activeIndex].metricLabel}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-white' : 'w-4 bg-white/25 hover:bg-white/40'
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Side list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                  i === activeIndex
                    ? 'bg-white/8 border-white/20'
                    : 'bg-transparent border-white/6 hover:bg-white/4 hover:border-white/12'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === activeIndex ? 'bg-white text-black' : 'bg-white/10 text-white/60'}`}>
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm truncate ${i === activeIndex ? 'text-white' : 'text-white/60'}`}>
                      {t.author}
                    </p>
                    <p className="text-white/30 text-xs truncate">{t.role}</p>
                  </div>
                </div>
              </button>
            ))}

            <div className="pt-4 border-t border-white/8">
              <p className="text-white/30 text-xs text-center">
                100% de clients satisfaits
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
