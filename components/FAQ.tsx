'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
    <section className="py-32 bg-white" ref={ref} aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-6">— {t.faq.label}</p>
            <h2 id="faq-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(30px, 5vw, 64px)' }}>
              {t.faq.h2}
            </h2>
          </div>
          <p className="text-black/30 text-sm max-w-xs md:text-right leading-relaxed">
            {t.faq.contactText}{' '}
            <a href="mailto:contact@webalp.ch" className="text-black underline-offset-2 underline hover:no-underline">
              {t.faq.contactLink}
            </a>
          </p>
        </motion.div>

        <div className="border-t border-black/8">
          {t.faq.items.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-b border-black/6"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className={`font-display font-bold text-base md:text-lg transition-colors ${openIndex === i ? 'text-black' : 'text-black/70 group-hover:text-black'}`}>
                  {faq.q}
                </span>
                <span className={`w-7 h-7 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'border-black bg-black rotate-45' : 'border-black/15 group-hover:border-black/35'
                }`}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v8M2 6h8" stroke={openIndex === i ? 'white' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-black/50 leading-[1.8] max-w-2xl">{faq.a}</p>
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
