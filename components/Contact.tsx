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

  return (
    <section id="contact" className="bg-[#0A0A0A]" ref={ref} aria-labelledby="contact-title">

      {/* Headline */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs text-white/50 uppercase tracking-widest mb-6">— {t.contact.label}</p>
          <h2 id="contact-title" className="font-display font-extrabold text-white leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(40px, 8vw, 120px)' }}>
            {t.contact.h2a}<br />
            <span className="text-white/25">{t.contact.h2b}</span>
          </h2>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-white/65 text-base leading-relaxed mb-10">{t.contact.body}</p>

            <div className="space-y-0">
              {[
                { label: t.contact.location, sub: t.contact.locationSub },
                { label: 'contact@webalp.ch', sub: t.contact.emailSub },
                { label: '079 823 58 62', sub: t.contact.phoneSub },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/10">
                  <span className="text-xs text-white/35 w-5 pt-0.5 shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-white/45 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="#B3FF47" aria-hidden="true">
                    <path d="M8 1l1.76 3.57L14 5.27l-3 2.92.7 4.1L8 10.16l-3.7 2.13.7-4.1L2 5.27l4.24-.7z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic mb-2">{t.contact.quoteText}</p>
              <p className="text-xs text-white/40">{t.contact.quoteAuthor}</p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {submitted ? (
              <div className="border border-white/15 rounded-2xl p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M4 14l7 7 13-13" stroke="#B3FF47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-extrabold text-white text-2xl mb-3">{f.successTitle}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: f.name, type: 'text', placeholder: f.namePlaceholder, required: true },
                    { id: 'email', label: f.email, type: 'email', placeholder: f.emailPlaceholder, required: true },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-xs text-white/55 uppercase tracking-widest mb-2">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required={field.required}
                        value={form[field.id as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full bg-white/6 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/35 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs text-white/55 uppercase tracking-widest mb-2">{f.company}</label>
                  <input id="company" name="company" type="text" value={form.company} onChange={handleChange}
                    placeholder={f.companyPlaceholder}
                    className="w-full bg-white/6 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/35 transition-colors" />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs text-white/55 uppercase tracking-widest mb-2">{f.budget}</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}
                    className="w-full bg-white/6 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/35 transition-colors appearance-none cursor-pointer">
                    <option value="" className="bg-[#1a1a1a]">{f.budgetDefault}</option>
                    {f.budgets.map(b => <option key={b.value} value={b.value} className="bg-[#1a1a1a]">{b.label}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-white/55 uppercase tracking-widest mb-2">{f.message}</label>
                  <textarea id="message" name="message" required value={form.message} onChange={handleChange}
                    rows={4} placeholder={f.messagePlaceholder}
                    className="w-full bg-white/6 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/35 transition-colors resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-4 rounded-full hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all">
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="6" stroke="#0A0A0A" strokeOpacity="0.25" strokeWidth="2"/>
                        <path d="M14 8a6 6 0 01-6 6" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>
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

                {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                <p className="text-xs text-white/40 text-center">{f.privacy}</p>
              </form>
            )}
          </motion.div>

        </div>
      </div>

    </section>
  )
}
