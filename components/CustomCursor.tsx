'use client'

import { useEffect, useRef } from 'react'

const DOTS = 7

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -300, y: -300 })
  const dots = useRef(Array.from({ length: DOTS }, () => ({ x: -300, y: -300 })))
  const onGreen = useRef(false)

  useEffect(() => {
    // Only on desktop (pointer: fine = real cursor)
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      onGreen.current = !!el?.closest(
        '.bg-accent, [class*="bg-accent"], [class*="bg-\\[#B3FF47\\]"]'
      )
    }

    let raf: number
    const tick = () => {
      dots.current[0].x += (mouse.current.x - dots.current[0].x) * 0.9
      dots.current[0].y += (mouse.current.y - dots.current[0].y) * 0.9

      for (let i = 1; i < DOTS; i++) {
        const lag = 0.55 - i * 0.06
        dots.current[i].x += (dots.current[i - 1].x - dots.current[i].x) * lag
        dots.current[i].y += (dots.current[i - 1].y - dots.current[i].y) * lag
      }

      const el = containerRef.current
      if (el) {
        for (let i = 0; i < DOTS; i++) {
          const dot = el.children[i] as HTMLElement
          if (!dot) continue
          const size = 9 - i * 0.9
          dot.style.transform = `translate(${dots.current[i].x - size / 2}px, ${dots.current[i].y - size / 2}px)`
          const color = onGreen.current ? '#0A0A0A' : '#B3FF47'
          dot.style.background = color
          dot.style.boxShadow = onGreen.current ? 'none' : `0 0 ${7 - i}px ${color}, 0 0 ${12 - i * 2}px rgba(179,255,71,0.3)`
        }
      }

      raf = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {Array.from({ length: DOTS }).map((_, i) => {
        const size = 9 - i * 0.9
        return (
          <div
            key={i}
            className="absolute top-0 left-0 rounded-full will-change-transform"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: '#B3FF47',
              opacity: 1 - i * 0.12,
              boxShadow: `0 0 6px #B3FF47`,
              transform: 'translate(-300px, -300px)',
            }}
          />
        )
      })}
    </div>
  )
}
