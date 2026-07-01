'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

export default function FAQ() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState<number | null>(0)

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
    <section className="py-20 sm:py-24 bg-white" ref={ref} aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="block w-[3px] h-4 bg-accent rounded-full shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-black/50">{t.faq.label}</span>
            </div>
            <h2 id="faq-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(32px, 6vw, 80px)' }}>
              {t.faq.h2}
            </h2>
          </div>
          <p className="text-black/55 text-sm max-w-xs md:text-right leading-relaxed">
            {t.faq.contactText}{' '}
            <a href="mailto:contact@webalp.ch" className="text-black font-medium underline underline-offset-2 hover:no-underline">
              {t.faq.contactLink}
            </a>
          </p>
        </motion.div>

        <div className="border-t border-black/10">
          {t.faq.items.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: 0.06 + i * 0.055 }}
              className="border-b border-black/8"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                aria-expanded={open === i}
              >
                <span className={`font-medium text-base leading-snug transition-colors ${open === i ? 'text-black' : 'text-black/65 group-hover:text-black'}`}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0, backgroundColor: open === i ? '#0A0A0A' : 'transparent' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center text-lg leading-none ${
                    open === i ? 'border-black text-white' : 'border-black/20 text-black/40 group-hover:border-black/40'
                  }`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-black/60 text-sm leading-relaxed max-w-2xl">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
