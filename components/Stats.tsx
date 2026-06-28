'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

function Counter({ value, suffix, dark, accent }: { value: number; suffix: string; dark?: boolean; accent?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 1500 / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className={`tabular-nums font-display font-extrabold leading-none ${
      accent ? 'text-[#0A0A0A]' : dark ? 'text-white' : 'text-black'
    }`} style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const { t } = useLanguage()

  const cardStyles = [
    { bg: 'bg-[#0A0A0A]', dark: true, accent: false },
    { bg: 'bg-white border border-black/8', dark: false, accent: false },
    { bg: 'bg-white border border-black/8', dark: false, accent: false },
    { bg: 'bg-accent', dark: false, accent: true },
  ]

  return (
    <section className="bg-[#F5F4F0] py-6" aria-label="Stats">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {t.stats.items.map((stat, i) => {
            const style = cardStyles[i] ?? cardStyles[0]
            return (
              <div key={stat.label} className={`rounded-xl p-6 md:p-12 flex flex-col justify-between min-h-[140px] md:min-h-[200px] ${style.bg}`}>
                <Counter value={stat.value} suffix={stat.suffix} dark={style.dark} accent={style.accent} />
                <p className={`font-mono text-[10px] uppercase tracking-widest mt-4 ${
                  style.accent ? 'text-[#0A0A0A]/50' : style.dark ? 'text-white/25' : 'text-black/30'
                }`}>{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
