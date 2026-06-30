'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const spring = { type: 'spring', stiffness: 280, damping: 24 } as const

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
    }`} style={{ fontSize: 'clamp(26px, 4.5vw, 90px)' }}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const styles = [
    { bg: 'bg-[#0A0A0A]', dark: true, accent: false, label: 'text-white/55' },
    { bg: 'bg-white border border-black/10', dark: false, accent: false, label: 'text-black/50' },
    { bg: 'bg-white border border-black/10', dark: false, accent: false, label: 'text-black/50' },
    { bg: 'bg-accent', dark: false, accent: true, label: 'text-[#0A0A0A]/60' },
  ]

  return (
    <section className="bg-[#F5F4F0] py-6" aria-label="Stats" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {t.stats.items.map((stat, i) => {
            const s = styles[i] ?? styles[0]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ ...spring, delay: i * 0.08 }}
                className={`rounded-2xl p-4 sm:p-6 md:p-10 flex flex-col justify-between min-h-[110px] sm:min-h-[150px] md:min-h-[200px] ${s.bg}`}
              >
                <Counter value={stat.value} suffix={stat.suffix} dark={s.dark} accent={s.accent} />
                <p className={`text-xs sm:text-sm mt-4 font-medium ${s.label}`}>{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
