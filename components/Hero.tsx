'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

function RotatingStat() {
  const { t } = useLanguage()
  const stats = t.hero.rotating
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % stats.length), 2800)
    return () => clearInterval(id)
  }, [stats.length])
  return (
    <AnimatePresence mode="wait">
      <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="inline-flex items-baseline gap-1.5">
        <span className="font-display font-extrabold text-white text-sm">{stats[i].value}</span>
        <span className="text-white/35 text-xs">{stats[i].label}</span>
      </motion.span>
    </AnimatePresence>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number, tick = 0
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(255,255,255,0.055)'
      ctx.lineWidth = 1
      const sp = 72
      for (let r = 0; r <= Math.ceil(canvas.height / sp) + 1; r++) {
        for (let c = 0; c <= Math.ceil(canvas.width / sp) + 1; c++) {
          const wave = Math.sin(tick * 0.7 + c * 0.45 + r * 0.3) * 5
          ctx.beginPath()
          ctx.arc(c * sp, r * sp + wave, 1.2, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
      tick += 0.011
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex flex-col" aria-label="Hero WebAlp">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <div className="absolute top-0 right-[30%] w-px h-2/3 bg-gradient-to-b from-transparent via-white/6 to-transparent pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 md:px-12 pt-36 pb-12">
        {/* Tag */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
          <span className="text-xs font-mono text-white/30 tracking-widest uppercase">{t.hero.tag}</span>
          <span className="ml-auto hidden md:flex items-center gap-2 border border-white/10 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 animate-pulse" />
            <span className="text-xs text-white/25 font-mono">{t.hero.available}</span>
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-10 overflow-hidden">
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-display font-extrabold text-white leading-[0.93] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(48px, 9vw, 126px)' }}>
            {t.hero.h1}<br />
            {t.hero.h2}<br />
            <span className="text-white/16">{t.hero.h3}</span>
          </motion.h1>
        </div>

        {/* Sub + CTAs */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="max-w-md">
            <p className="text-white/45 text-base md:text-lg leading-relaxed">
              {t.hero.body}{' '}
              <span className="text-white/80 font-semibold">{t.hero.bold}</span>
            </p>
            <p className="text-white/30 text-sm mt-2 font-mono">{t.hero.price}</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="#contact"
              className="group relative inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-6 py-3.5 rounded-full hover:bg-white/88 active:scale-95 transition-all duration-150 overflow-hidden">
              <span className="relative z-10">{t.hero.cta1}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#portfolio"
              className="inline-flex items-center gap-2 border border-white/15 text-white/55 text-sm font-medium px-6 py-3.5 rounded-full hover:border-white/40 hover:text-white/90 active:scale-95 transition-all duration-150">
              {t.hero.cta2}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom stat bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }}
        className="relative z-10 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/15 text-xs font-mono">{t.hero.statPrefix}</span>
            <RotatingStat />
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            {t.hero.bottomStats.map(s => (
              <div key={s.l} className="text-center">
                <p className="font-display font-extrabold text-white text-sm leading-none">{s.n}</p>
                <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
          <a href="tel:+41772741726" className="hidden md:block text-white/25 text-xs font-mono hover:text-white/50 transition-colors">
            +41 77 274 17 26
          </a>
        </div>
      </motion.div>
    </section>
  )
}
