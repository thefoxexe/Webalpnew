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
    const timer = setInterval(() => setActive(i => (i + 1) % items.length), 5000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section className="py-32 bg-[#0A0A0A] overflow-hidden" ref={ref} aria-labelledby="testimonials-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-mono text-[10px] text-white/20 tracking-[0.25em] uppercase mb-6">— {t.testimonials.label}</p>
            <h2 id="testimonials-title" className="font-display font-extrabold text-white leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(30px, 5vw, 64px)' }}>
              {t.testimonials.h2a}<br />
              <span className="text-white/20">{t.testimonials.h2b}</span>
            </h2>
          </div>
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-px transition-all duration-400 ${i === active ? 'w-10 bg-white' : 'w-4 bg-white/15 hover:bg-white/30'}`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Main quote */}
        <div className="relative mb-10 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-white leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(22px, 4vw, 52px)' }}
            >
              &ldquo;{items[active].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-t border-white/[0.06] pt-8">
          <AnimatePresence mode="wait">
            <motion.div key={`a-${active}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-display font-extrabold text-sm shrink-0">
                {items[active].initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{items[active].author}</p>
                <p className="font-mono text-[11px] text-white/30">{items[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-1 sm:ml-auto">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 18 18" fill="#FAFAFA" aria-hidden="true">
                <path d="M9 1.5l2.06 4.17 4.61.67-3.34 3.25.79 4.59L9 12l-4.12 2.18.79-4.59L2.33 6.34l4.61-.67L9 1.5z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          {items.map((item, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                i === active ? 'border-white/15 bg-white/5' : 'border-white/[0.05] hover:border-white/10 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-extrabold text-[11px] shrink-0 ${i === active ? 'bg-white text-black' : 'bg-white/8 text-white/40'}`}>
                  {item.initial}
                </div>
                <p className={`text-[11px] font-semibold truncate ${i === active ? 'text-white' : 'text-white/35'}`}>{item.author}</p>
              </div>
              <p className={`text-[11px] leading-relaxed line-clamp-2 ${i === active ? 'text-white/50' : 'text-white/20'}`}>
                &ldquo;{item.quote}&rdquo;
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
