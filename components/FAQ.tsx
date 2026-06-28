'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(0)
  const [mobileOpen, setMobileOpen] = useState<number | null>(0)

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <section className="bg-[#0A0A0A] overflow-hidden" ref={ref} aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12 md:pb-14 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-[10px] text-white/20 tracking-[0.25em] uppercase mb-6 md:mb-8">— {t.faq.label}</p>
            <h2 id="faq-title" className="font-display font-extrabold text-white leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
              {t.faq.h2}
            </h2>
          </div>
          <p className="text-white/25 text-sm max-w-xs md:text-right leading-relaxed">
            {t.faq.contactText}{' '}
            <a href="mailto:contact@webalp.ch" className="text-white/50 underline underline-offset-2 hover:no-underline">
              {t.faq.contactLink}
            </a>
          </p>
        </motion.div>
      </div>

      {/* ── MOBILE: accordion ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="md:hidden max-w-7xl mx-auto px-6 py-8"
      >
        {t.faq.items.map((faq, i) => (
          <div key={i} className="border-b border-white/[0.06]">
            <button
              onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
              aria-expanded={mobileOpen === i}
            >
              <span className={`text-sm font-medium leading-snug transition-colors ${mobileOpen === i ? 'text-white' : 'text-white/40'}`}>
                {faq.q}
              </span>
              <span className={`font-mono text-[10px] shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                mobileOpen === i ? 'border-accent text-accent rotate-45' : 'border-white/15 text-white/20'
              }`}>
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {mobileOpen === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-white/40 text-sm leading-[1.9]">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* ── DESKTOP: 2-col selected panel ── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-3 items-start">

          {/* Left: question list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white/[0.03] rounded-xl overflow-hidden"
          >
            {t.faq.items.map((faq, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-6 py-5 flex items-center justify-between gap-4 border-b border-white/[0.05] last:border-b-0 transition-colors ${
                  selected === i ? 'bg-white/[0.06]' : 'hover:bg-white/[0.02]'
                }`}
                aria-pressed={selected === i}
              >
                <span className={`text-sm font-medium leading-snug transition-colors ${
                  selected === i ? 'text-white' : 'text-white/35'
                }`}>
                  {faq.q}
                </span>
                <span className={`font-mono text-[10px] shrink-0 transition-colors ${
                  selected === i ? 'text-accent' : 'text-white/15'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Right: answer panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-white/[0.03] rounded-xl p-8 md:p-10 min-h-[300px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full"
              >
                <p className="font-mono text-[10px] text-white/15 tracking-widest uppercase mb-6">
                  {String(selected + 1).padStart(2, '0')} / {String(t.faq.items.length).padStart(2, '0')}
                </p>
                <h3 className="font-display font-extrabold text-white text-xl md:text-2xl leading-tight mb-6">
                  {t.faq.items[selected].q}
                </h3>
                <p className="text-white/40 text-sm leading-[1.9] flex-1">
                  {t.faq.items[selected].a}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
