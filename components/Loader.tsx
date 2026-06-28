'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const duration = 1300
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setPct(Math.round(progress * 100))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setVisible(false), 280)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 140, damping: 24 }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex items-center justify-center select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Dot grid (same as hero) */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* Accent glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #B3FF47 0%, transparent 70%)' }}
          />

          <div className="relative flex flex-col items-center gap-8">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.06 }}
            >
              <Image
                src="/logos/webalp-blanc-vert.svg"
                alt="WebAlp"
                width={168}
                height={48}
                priority
              />
            </motion.div>

            {/* Terminal line */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
              className="font-mono text-xs text-white/25 tracking-wider flex items-center gap-2"
            >
              <span className="text-accent/50">▶</span>
              <span>init webalp.ch</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                className="text-accent/60"
              >_</motion.span>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.3 }}
              className="flex flex-col items-center gap-2.5"
            >
              <div className="w-36 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.28, ease: [0.12, 0, 0.28, 1], delay: 0.18 }}
                  style={{ transformOrigin: 'left' }}
                  className="h-full w-full bg-accent"
                />
              </div>
              <span className="font-mono text-[10px] text-white/20 tabular-nums tracking-widest">
                {String(pct).padStart(3, '0')}%
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
