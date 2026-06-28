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

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="border-y border-white/[0.06] bg-[#0A0A0A]" aria-label="Stats">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {t.stats.items.map(stat => (
            <div key={stat.label} className="px-6 md:px-10 py-12 text-center first:pl-0 last:pr-0">
              <p className="font-display font-extrabold text-white leading-none mb-2"
                style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
