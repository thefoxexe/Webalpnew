'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: StatItem[] = [
  {
    value: 45,
    suffix: '+',
    label: 'Projets livrés',
    description: 'Sites web lancés avec succès pour des clients suisses',
  },
  {
    value: 340,
    suffix: '%',
    label: 'Trafic moyen gagné',
    description: "Augmentation du trafic organique après 3 mois d'optimisation SEO",
  },
  {
    value: 14,
    suffix: 'j',
    label: 'Délai de livraison',
    description: 'Du brief à la mise en ligne, on respecte nos délais',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Score performance',
    description: 'Score moyen Google PageSpeed de nos sites en production',
  },
]

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
  return (
    <section className="py-20 bg-[#F5F5F5] border-y border-black/8" aria-label="Nos chiffres clés">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <p className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-2 tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm font-bold text-black mb-1">{stat.label}</p>
              <p className="text-xs text-black/45 leading-snug hidden md:block">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
