'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=WebAlp+Sion+avis'

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  )
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5" aria-label="5 étoiles sur 5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 18 18" fill="#FBBC04" aria-hidden="true">
          <path d="M9 1.5l2.06 4.17 4.61.67-3.34 3.25.79 4.59L9 12l-4.12 2.18.79-4.59L2.33 6.34l4.61-.67L9 1.5z"/>
        </svg>
      ))}
    </span>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const items = t.testimonials.items

  return (
    <section id="testimonials" className="bg-[#F5F4F0]" aria-labelledby="testimonials-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 sm:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="rv inline-flex items-center gap-2 rounded-full bg-white border border-black/10 px-4 py-2 text-sm font-medium text-black/70 mb-6">
              <GoogleG /> {t.testimonials.label}
            </p>
            <h2 id="testimonials-title" className="rv font-display font-extrabold text-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(32px, 6vw, 76px)', ['--d' as string]: '80ms' }}>
              {t.testimonials.h2a}<br />
              <span className="text-black/25">{t.testimonials.h2b}</span>
            </h2>
          </div>
          <div className="rv max-w-sm" style={{ ['--d' as string]: '160ms' }}>
            <p className="text-black/60 text-sm leading-relaxed">{t.testimonials.sub}</p>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"
              className="nudge inline-flex items-center gap-2 mt-4 text-sm font-semibold text-black underline underline-offset-4">
              {t.testimonials.cta}
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((r, i) => (
            <li key={r.author} className="rv lift rounded-2xl bg-white border border-black/8 p-7 flex flex-col"
              style={{ ['--d' as string]: `${i * 90}ms` }}>
              <div className="flex items-center justify-between">
                <Stars />
                <span className="inline-flex items-center gap-1.5 text-xs text-black/45"><GoogleG size={14} /> {t.testimonials.source}</span>
              </div>
              <blockquote className="mt-5 text-black/80 text-lg leading-relaxed flex-1">
                « {r.quote} »
              </blockquote>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-black/8">
                <span className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white grid place-items-center font-display font-bold text-sm shrink-0" aria-hidden="true">
                  {r.initial}
                </span>
                <div>
                  <p className="text-sm font-bold text-black">{r.author}</p>
                  <p className="text-xs text-black/50">{r.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
