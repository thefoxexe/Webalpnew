'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const items = t.testimonials.items

  useEffect(() => { setActive(0) }, [items])
  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % items.length), 5500)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section className="bg-[#F5F4F0] overflow-hidden" ref={ref} aria-labelledby="testimonials-title">

      {/* Giant quote zone */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-6" id="testimonials-title">
            — {t.testimonials.label}
          </p>
          <h2 className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
            {t.testimonials.h2a}<br />
            <span className="text-black/18">{t.testimonials.h2b}</span>
          </h2>
        </motion.div>

        {/* Quote block */}
        <div className="relative min-h-[160px] md:min-h-[200px]">
          <span className="absolute -top-6 -left-3 font-display text-[12rem] leading-none text-black/[0.05] select-none pointer-events-none" aria-hidden="true">&ldquo;</span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 font-display font-extrabold text-black leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(24px, 4.5vw, 58px)' }}
            >
              &ldquo;{items[active].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar: author + stars + nav */}
      <div className="border-t border-black/8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`a-${active}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-display font-extrabold text-sm shrink-0">
                {items[active].initial}
              </div>
              <div>
                <p className="text-sm font-bold text-black">{items[active].author}</p>
                <p className="font-mono text-[10px] text-black/35">{items[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-1 sm:ml-auto">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 18 18" fill="#0A0A0A" aria-hidden="true">
                <path d="M9 1.5l2.06 4.17 4.61.67-3.34 3.25.79 4.59L9 12l-4.12 2.18.79-4.59L2.33 6.34l4.61-.67L9 1.5z"/>
              </svg>
            ))}
          </div>

          <div className="flex gap-1.5 sm:ml-4">
            {items.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-400 ${i === active ? 'w-8 bg-black' : 'w-3 bg-black/20 hover:bg-black/40'}`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
