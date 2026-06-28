'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center select-none"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.05 }}
          >
            <Image
              src="/logos/webalp-blanc-vert.svg"
              alt="WebAlp"
              width={160}
              height={46}
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/25 text-xs tracking-widest uppercase mt-5 font-light"
          >
            Agence web · Sion, Valais
          </motion.p>

          {/* Progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: [0.12, 0, 0.28, 1], delay: 0.05 }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
