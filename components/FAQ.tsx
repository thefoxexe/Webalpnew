'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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
    <section className="py-20 bg-white" ref={ref} aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs text-black/45 uppercase tracking-widest mb-4">— {t.faq.label}</p>
            <h2 id="faq-title" className="font-display font-extrabold text-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
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
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-b border-black/8"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                aria-expanded={open === i}
              >
                <span className={`font-medium text-base transition-colors ${open === i ? 'text-black' : 'text-black/65 group-hover:text-black'}`}>
                  {faq.q}
                </span>
                <span className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 text-lg leading-none ${
                  open === i ? 'border-black bg-black text-white rotate-45' : 'border-black/20 text-black/40 group-hover:border-black/40'
                }`}>
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
