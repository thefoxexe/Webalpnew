'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
      if (!formspreeId) {
        const subject = encodeURIComponent(`Nouveau projet — ${form.name}`)
        const body = encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\nBudget: ${form.budget}\n\n${form.message}`)
        window.location.href = `mailto:contact@webalp.ch?subject=${subject}&body=${body}`
        setSubmitted(true)
        setLoading(false)
        return
      }
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
      else setError(t.contact.fields.errorMsg)
    } catch {
      setError(t.contact.fields.errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const f = t.contact.fields

  const inputClass = "w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/25 focus:outline-none focus:border-black transition-colors"

  return (
    <section id="contact" className="py-32 bg-[#F5F4F0]" ref={ref} aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] text-black/30 tracking-[0.25em] uppercase mb-8">— {t.contact.label}</p>
            <h2 id="contact-title" className="font-display font-extrabold text-black leading-[0.92] tracking-tight mb-8"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              {t.contact.h2a}<br />
              <span className="text-black/20">{t.contact.h2b}</span>
            </h2>
            <p className="text-black/45 text-sm leading-[1.8] mb-12">{t.contact.body}</p>

            <div className="border-t border-black/8 space-y-0">
              {[
                { label: t.contact.location, sub: t.contact.locationSub },
                { label: 'contact@webalp.ch', sub: t.contact.emailSub },
                { label: '+41 77 274 17 26', sub: t.contact.phoneSub },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 py-4 border-b border-black/6">
                  <span className="font-mono text-[10px] text-black/20 w-4 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-semibold text-black">{item.label}</p>
                    <p className="font-mono text-[11px] text-black/35 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-10 pt-8 border-t border-black/8">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="#0A0A0A" aria-hidden="true">
                    <path d="M8 1l1.76 3.57L14 5.27l-3 2.92.7 4.1L8 10.16l-3.7 2.13.7-4.1L2 5.27l4.24-.7z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-black/55 italic leading-relaxed mb-3">{t.contact.quoteText}</p>
              <p className="font-mono text-[11px] text-black/35">{t.contact.quoteAuthor}</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            {submitted ? (
              <div className="bg-[#0A0A0A] rounded-2xl p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M4 14l7 7 13-13" stroke="#B3FF47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-extrabold text-white text-2xl mb-3">{f.successTitle}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[10px] text-black/35 tracking-widest uppercase mb-3">{f.name}</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                      placeholder={f.namePlaceholder} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-[10px] text-black/35 tracking-widest uppercase mb-3">{f.email}</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder={f.emailPlaceholder} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block font-mono text-[10px] text-black/35 tracking-widest uppercase mb-3">{f.company}</label>
                  <input id="company" name="company" type="text" value={form.company} onChange={handleChange}
                    placeholder={f.companyPlaceholder} className={inputClass} />
                </div>

                <div>
                  <label htmlFor="budget" className="block font-mono text-[10px] text-black/35 tracking-widest uppercase mb-3">{f.budget}</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value="">{f.budgetDefault}</option>
                    {f.budgets.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] text-black/35 tracking-widest uppercase mb-3">{f.message}</label>
                  <textarea id="message" name="message" required value={form.message} onChange={handleChange}
                    rows={4} placeholder={f.messagePlaceholder}
                    className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/25 focus:outline-none focus:border-black transition-colors resize-none" />
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold text-sm px-6 py-4 rounded-full hover:bg-black/85 active:scale-[0.99] disabled:opacity-50 transition-all duration-150">
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.25" strokeWidth="2"/>
                          <path d="M14 8a6 6 0 01-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {f.submitting}
                      </>
                    ) : (
                      <>
                        {f.submit}
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {error && <p className="font-mono text-xs text-red-500 text-center">{error}</p>}
                <p className="font-mono text-[10px] text-black/25 text-center">{f.privacy}</p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
