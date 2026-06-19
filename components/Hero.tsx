'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const rotatingStats = [
  { value: '45+', label: 'projets livrés' },
  { value: '+340%', label: 'trafic moyen gagné' },
  { value: '14 jours', label: 'délai de livraison' },
  { value: '98/100', label: 'score performance' },
]

function RotatingStat() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % rotatingStats.length), 2800)
    return () => clearInterval(t)
  }, [])

  const stat = rotatingStats[index]
  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="inline-flex items-baseline gap-1.5"
    >
      <span className="font-display font-extrabold text-white text-sm">{stat.value}</span>
      <span className="text-white/40 text-xs">{stat.label}</span>
    </motion.span>
  )
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1

      const spacing = 72
      const cols = Math.ceil(canvas.width / spacing) + 2
      const rows = Math.ceil(canvas.height / spacing) + 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing
          const y = r * spacing
          const wave = Math.sin(t * 0.8 + c * 0.4 + r * 0.3) * 6
          ctx.beginPath()
          ctx.arc(x, y + wave, 1, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
      t += 0.012
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex flex-col"
      aria-label="Section principale WebAlp"
    >
      {/* Animated dot grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-[60vh] bg-gradient-to-b from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 md:px-12 pt-36 pb-12">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
          <span className="text-xs font-mono text-white/35 tracking-widest uppercase">
            Agence web · Sion · Valais · Suisse
          </span>
          <span className="ml-auto hidden md:flex items-center gap-2 border border-white/10 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
            <span className="text-xs text-white/30 font-mono">Disponible · juillet 2026</span>
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-10 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-display font-extrabold text-white leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(52px, 9.5vw, 130px)' }}
          >
            Votre site<br />
            <span>rapporte.</span>
            <br />
            <span className="text-white/18">Ou il coûte.</span>
          </motion.h1>
        </div>

        {/* Sub row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="text-white/45 text-base md:text-lg max-w-md leading-relaxed">
            Nous créons des sites web performants qui génèrent de vrais clients
            pour les startups et PME suisses.{' '}
            <span className="text-white/70">Design, SEO, conversion — tout inclus.</span>
          </p>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-6 py-3.5 rounded-full hover:bg-white/88 active:scale-95 transition-all duration-150"
            >
              Démarrer mon projet
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-sm font-medium px-6 py-3.5 rounded-full hover:border-white/40 hover:text-white/90 active:scale-95 transition-all duration-150"
            >
              Nos projets
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="relative z-10 border-t border-white/8"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-white/20 text-xs font-mono">STAT →</span>
            <RotatingStat />
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            {[
              { n: '6', l: 'projets actifs' },
              { n: '2', l: 'fondateurs' },
              { n: 'CHF 890', l: "à partir de" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display font-extrabold text-white text-sm leading-none">{s.n}</p>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          <a
            href="tel:+41772741726"
            className="hidden md:flex items-center gap-2 text-white/30 text-xs font-mono hover:text-white/60 transition-colors"
          >
            +41 77 274 17 26
          </a>
        </div>
      </motion.div>
    </section>
  )
}
