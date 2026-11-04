'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Ajoute .is-in aux éléments .rv / .rv-mask / .rv-line quand ils entrent à l'écran.
// Un élément entièrement masqué (clip-path) n'est jamais « visible » pour l'observer :
// pour .rv-mask, on observe donc son parent.
export default function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.is-in), .rv-mask:not(.is-in), .rv-line:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'))
      return
    }
    const targets = new Map<Element, HTMLElement[]>()
    els.forEach(el => {
      const watch = el.classList.contains('rv-mask') && el.parentElement ? el.parentElement : el
      targets.set(watch, [...(targets.get(watch) ?? []), el])
    })
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (!e.isIntersecting) return
        targets.get(e.target)?.forEach(el => el.classList.add('is-in'))
        io.unobserve(e.target)
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    targets.forEach((_, t) => io.observe(t))
    return () => io.disconnect()
  }, [pathname])
  return null
}
