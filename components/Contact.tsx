'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
      const endpoint = formspreeId
        ? `https://formspree.io/f/${formspreeId}`
        : `mailto:contact@webalp.ch`

      if (!formspreeId) {
        // Fallback: open mail client
        const subject = encodeURIComponent(`Nouveau projet — ${form.name}`)
        const body = encodeURIComponent(
          `Nom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\nBudget: ${form.budget}\n\n${form.message}`
        )
        window.location.href = `mailto:contact@webalp.ch?subject=${subject}&body=${body}`
        setSubmitted(true)
        setLoading(false)
        return
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError("Une erreur s'est produite. Écrivez-nous directement à contact@webalp.ch")
      }
    } catch {
      setError("Une erreur s'est produite. Écrivez-nous directement à contact@webalp.ch")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-28 bg-white"
      ref={ref}
      aria-labelledby="contact-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-5">
              Parlons de votre projet
            </p>
            <h2
              id="contact-title"
              className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6"
            >
              Prêt à avoir un site qui rapporte ?
            </h2>
            <p className="text-black/55 text-lg leading-relaxed mb-10">
              Remplissez le formulaire et on vous répond sous 24h avec un premier audit
              gratuit de votre situation actuelle.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 1C5.69 1 3 3.69 3 7c0 4 6 10 6 10s6-6 6-10c0-3.31-2.69-6-6-6zm0 8a2 2 0 100-4 2 2 0 000 4z" stroke="#0A0A0A" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Sion, Valais, Suisse</p>
                  <p className="text-xs text-black/45">Interventions dans toute la Suisse</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 4a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="#0A0A0A" strokeWidth="1.2"/>
                    <path d="M2 5l7 5 7-5" stroke="#0A0A0A" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">contact@webalp.ch</p>
                  <p className="text-xs text-black/45">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 3h3l1.5 4-2 1c1 2 2.5 3.5 4.5 4.5l1-2 4 1.5V15c0 .55-.45 1-1 1C5.5 16 2 9.5 2 4c0-.55.45-1 1-1z" stroke="#0A0A0A" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">+41 77 274 17 26</p>
                  <p className="text-xs text-black/45">Lun-Ven, 9h-18h</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-10 p-6 bg-[#F5F5F5] rounded-2xl border border-black/6">
              <div className="flex gap-1 mb-2" aria-label="5 étoiles">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#0A0A0A" aria-hidden="true">
                    <path d="M8 1l1.76 3.57L14 5.27l-3 2.92.7 4.1L8 10.16l-3.7 2.13.7-4.1L2 5.27l4.24-.7z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-black/65 italic mb-3">
                &ldquo;On a eu notre devis sous 2 heures et le site en 12 jours. Impressionnant.&rdquo;
              </p>
              <p className="text-xs font-semibold text-black/45">— Marc D., StartUp Sion</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {submitted ? (
              <div className="bg-black text-white rounded-3xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M4 14l7 7 13-13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white mb-3">
                  Message envoyé !
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Merci pour votre message. On vous répond sous 24h avec un audit gratuit
                  de votre présence en ligne.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-[#F5F5F5] rounded-3xl p-8 border border-black/8"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-black/60 mb-1.5">
                      Nom & prénom *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full bg-white border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-black/60 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.ch"
                      className="w-full bg-white border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-black/60 mb-1.5">
                    Entreprise
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Ma Super Entreprise SA"
                    className="w-full bg-white border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold text-black/60 mb-1.5">
                    Budget approximatif
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full bg-white border border-black/12 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors appearance-none"
                  >
                    <option value="">Sélectionner un budget</option>
                    <option value="starter">CHF 890 – 1&apos;200 (Starter)</option>
                    <option value="growth">CHF 1&apos;200 – 2&apos;000 (Croissance)</option>
                    <option value="authority">CHF 2&apos;000 – 3&apos;500 (Autorité)</option>
                    <option value="custom">CHF 3&apos;500+ (Sur mesure)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-black/60 mb-1.5">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Mon activité est... J'ai besoin d'un site pour... Mes objectifs sont..."
                    className="w-full bg-white border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold text-sm px-6 py-4 rounded-xl hover:bg-black/85 active:scale-[0.99] disabled:opacity-60 transition-all duration-150"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.25" strokeWidth="2"/>
                        <path d="M14 8a6 6 0 01-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-xs text-red-600 text-center font-medium">{error}</p>
                )}

                <p className="text-xs text-black/35 text-center">
                  Vos données sont confidentielles et ne seront jamais partagées.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
