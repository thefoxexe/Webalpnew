'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 260, damping: 24 } as const

export default function Testimonials() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)
  const items = t.testimonials.items

  useEffect(() => { setActive(0) }, [items])
  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % items.length), 5500)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section className="bg-[#F5F4F0]" ref={ref} aria-labelledby="testimonials-title">

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 sm:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="mb-10"
        >
          <p className="text-xs text-black/45 uppercase tracking-widest mb-4" id="testimonials-title">
            — {t.testimonials.label}
          </p>
          <h2 className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
            {t.testimonials.h2a}<br />
            <span className="text-black/20">{t.testimonials.h2b}</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[120px] sm:min-h-[160px] md:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="font-display font-extrabold text-black leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(20px, 4vw, 52px)' }}
            >
              {'"'}{items[active].quote}{'"'}
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`a-${active}`}
              initial={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-display font-extrabold text-sm shrink-0">
                {items[active].initial}
              </div>
              <div>
                <p className="text-sm font-bold text-black">{items[active].author}</p>
                <p className="text-xs text-black/50">{items[active].role}</p>
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
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                animate={{ width: i === active ? 28 : 12, opacity: i === active ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`h-1.5 rounded-full bg-black`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
