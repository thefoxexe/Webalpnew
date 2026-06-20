'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-[#0A0A0A] border-y border-white/6" aria-label="Stats">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {t.stats.items.map((stat) => (
            <div key={stat.label} className="text-center group px-4 py-6 rounded-2xl hover:bg-white/4 transition-colors">
              <p className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-xs text-white/25 leading-snug hidden md:block">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
