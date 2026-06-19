'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Consultation gratuite',
    duration: 'Jour 1',
    description:
      'On discute de votre projet, vos objectifs, votre cible et votre budget. 45 minutes suffisent pour qu\'on comprenne exactement ce dont vous avez besoin.',
    deliverable: 'Brief validé + devis détaillé',
  },
  {
    number: '02',
    title: 'Stratégie & Design',
    duration: 'Jours 2-5',
    description:
      'Nos designers créent les maquettes de votre site. Structure, typographie, couleurs, contenu. Vous validez chaque étape avant qu\'on code une seule ligne.',
    deliverable: 'Maquettes Figma + architecture',
  },
  {
    number: '03',
    title: 'Développement',
    duration: 'Jours 6-11',
    description:
      'On transforme vos maquettes en site réel : code optimisé, SEO technique intégré, vitesse maximale, sécurité, responsive sur tous les écrans.',
    deliverable: 'Site en staging pour validation',
  },
  {
    number: '04',
    title: 'Lancement & Suivi',
    duration: 'Jours 12-14',
    description:
      'Mise en ligne, configuration Google Analytics, Search Console et Google Business. On vous forme à gérer votre site, puis on continue de surveiller les performances.',
    deliverable: 'Site live + rapport de lancement',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="py-28 bg-white" ref={ref} aria-labelledby="process-title">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-4">
            Notre processus
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h2
              id="process-title"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight max-w-lg"
            >
              De l&apos;idée au site en 14 jours.
            </h2>
            <p className="text-black/45 text-sm max-w-xs md:text-right leading-relaxed">
              Un processus clair, des délais respectés, un résultat professionnel.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[26px] top-0 bottom-0 w-px bg-black/10 hidden md:block" aria-hidden="true" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="relative grid md:grid-cols-[60px_1fr_1fr] gap-6 md:gap-8 pb-12 last:pb-0"
              >
                {/* Step number / dot */}
                <div className="flex md:flex-col items-center md:items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 relative z-10 font-mono text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-xl md:text-2xl font-extrabold text-black">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-black/35 bg-black/5 px-2 py-0.5 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-black/55 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Deliverable */}
                <div className="flex items-start">
                  <div className="inline-flex items-center gap-2 bg-[#F5F5F5] border border-black/8 rounded-xl px-4 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3 3 7-7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-semibold text-black/70">{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 bg-black rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-display text-xl font-bold mb-1">
              Consultation gratuite — 45 minutes
            </p>
            <p className="text-white/50 text-sm">
              Sans engagement. On analyse votre situation et on vous dit exactement ce qu&apos;on peut faire pour vous.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/85 active:scale-95 transition-all"
          >
            Réserver ma consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
