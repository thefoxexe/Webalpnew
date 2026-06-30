import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page introuvable · WebAlp',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(179,255,71,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Big 404 */}
      <p
        aria-hidden="true"
        className="font-display font-extrabold text-white/[0.04] select-none leading-none absolute"
        style={{ fontSize: 'clamp(160px, 30vw, 360px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        404
      </p>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md">
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/40 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Erreur 404
        </div>

        <h1
          className="font-display font-extrabold text-white leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          Page<br />
          <span className="text-accent">introuvable.</span>
        </h1>

        <p className="text-white/45 text-sm leading-relaxed">
          Cette page n&apos;existe pas ou a été déplacée.<br />
          Revenez à l&apos;accueil, on s&apos;occupe du reste.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-6 py-3.5 rounded-full hover:brightness-110 active:scale-95 transition-all"
          >
            ← Retour à l&apos;accueil
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 border border-white/15 text-white/60 font-medium text-sm px-6 py-3.5 rounded-full hover:border-white/30 hover:text-white/80 active:scale-95 transition-all"
          >
            Nous contacter
          </Link>
        </div>
      </div>

    </div>
  )
}
