'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Combien de temps faut-il pour créer mon site web ?',
    a: 'Notre délai standard est de 14 jours ouvrés, du brief signé à la mise en ligne. Pour les projets complexes (e-commerce, sur mesure), comptez 3 à 4 semaines. Nous respectons nos délais — c\'est une promesse.',
  },
  {
    q: 'Est-ce que je peux modifier mon site moi-même après livraison ?',
    a: 'Oui, absolument. Nous construisons vos sites sur des CMS modernes et accessibles (WordPress ou autre selon votre projet). Une formation est incluse à la livraison pour que vous puissiez modifier textes, images et contenus en toute autonomie.',
  },
  {
    q: 'Pourquoi vos prix sont-ils plus bas que d\'autres agences en Suisse ?',
    a: 'Nous utilisons des outils et processus modernes (IA, templates optimisés, workflows automatisés) qui nous permettent d\'être plus rapides sans sacrifier la qualité. On travaille en petite équipe avec peu de frais fixes — on répercute ces économies sur nos tarifs.',
  },
  {
    q: 'Est-ce que le SEO est vraiment inclus dès le départ ?',
    a: 'Oui. Chaque site que nous créons inclut le SEO technique de base : structure URL, balises meta, schema markup, performance, Core Web Vitals, sitemap, robots.txt. Pour aller plus loin (stratégie mots-clés, contenu, netlinking), notre offre SEO mensuelle est disponible.',
  },
  {
    q: 'Que se passe-t-il si je ne suis pas satisfait du résultat ?',
    a: 'On travaille par rounds de révisions inclus dans chaque plan. Si après les révisions, le résultat ne vous convient pas, on continue jusqu\'à ce que ce soit parfait. Notre objectif est un client qui nous recommande — pas un client mécontent.',
  },
  {
    q: 'Proposez-vous un hébergement et un nom de domaine ?',
    a: 'Oui, nous pouvons vous accompagner sur le choix et la configuration de votre hébergement et de votre nom de domaine (.ch, .com, etc.). L\'hébergement suisse n\'est pas obligatoire mais recommandé pour le SEO local.',
  },
  {
    q: 'Travaillez-vous aussi avec des clients hors du Valais ?',
    a: 'Absolument. Nous travaillons avec des clients dans toute la Suisse romande et Suisse alémanique. Tout se passe à distance via des appels vidéo, et ça fonctionne très bien. Nos clients sont à Genève, Lausanne, Berne, Zurich...',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            Questions fréquentes
          </p>
          <h2
            id="faq-title"
            className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight"
          >
            On a les réponses.
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
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

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-black/40 mt-8"
        >
          Une autre question ?{' '}
          <a href="mailto:contact@webalp.ch" className="text-black underline underline-offset-2 hover:no-underline">
            Écrivez-nous directement
          </a>
        </motion.p>
      </div>
    </section>
  )
}
