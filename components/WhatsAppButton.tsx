'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppButton() {
  const [showBear, setShowBear] = useState(false)

  useEffect(() => {
    const show = () => {
      setShowBear(true)
      setTimeout(() => setShowBear(false), 4000)
    }

    const timer = setTimeout(show, 5000)
    const interval = setInterval(show, 12000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <AnimatePresence>
        {showBear && (
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="mb-3 flex flex-col items-end gap-2"
          >
            <div className="relative bg-white rounded-2xl rounded-br-sm shadow-xl px-4 py-3 max-w-[200px]">
              <p className="text-[#0A0A0A] text-xs leading-relaxed font-medium">
                Écrivez-nous sur WhatsApp pour une réponse plus rapide&nbsp;⚡
              </p>
              <div className="absolute -bottom-2 right-3 w-3 h-3 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
            </div>

            <motion.span
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
              className="text-3xl select-none"
              aria-hidden="true"
            >
              🧸
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/41798235862?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter WebAlp sur WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
        style={{ background: '#25D366' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 2C7.373 2 2 7.373 2 14c0 2.136.557 4.14 1.528 5.876L2 26l4.303-1.504A11.943 11.943 0 0014 26c6.627 0 12-5.373 12-12S20.627 2 14 2z"
            fill="white"
          />
          <path
            d="M14 3.8c-5.63 0-10.2 4.57-10.2 10.2 0 1.98.567 3.825 1.55 5.38L4.2 23.8l4.52-1.14A10.155 10.155 0 0014 24.2c5.63 0 10.2-4.57 10.2-10.2S19.63 3.8 14 3.8z"
            fill="#25D366"
          />
          <path
            d="M10.56 9.2c-.22-.49-.45-.5-.66-.51-.17-.01-.37-.01-.56-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.89 1.22 3.09.15.2 2.07 3.27 5.07 4.46 2.51.99 3.02.79 3.57.74.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.56-.35-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.62-.92-2.21z"
            fill="white"
          />
        </svg>
      </a>
    </div>
  )
}
