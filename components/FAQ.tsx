'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <section className="py-28 bg-[#F5F5F5]" ref={ref} aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            {t.faq.label}
          </p>
          <h2
            id="faq-title"
            className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight"
          >
            {t.faq.h2}
          </h2>
        </motion.div>

        <div className="space-y-2">
          {t.faq.items.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-black/8 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-black text-sm md:text-base">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full border border-black/15 flex items-center justify-center transition-transform duration-200 ${
                    openIndex === i ? 'rotate-45 bg-black border-black' : 'bg-transparent'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v8M2 6h8" stroke={openIndex === i ? 'white' : 'black'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-black/60 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-black/40 mt-8"
        >
          {t.faq.contactText}{' '}
          <a href="mailto:contact@webalp.ch" className="text-black underline underline-offset-2 hover:no-underline">
            {t.faq.contactLink}
          </a>
        </motion.p>
      </div>
    </section>
  )
}
