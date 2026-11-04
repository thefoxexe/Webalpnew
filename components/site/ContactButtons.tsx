import Link from 'next/link'

const WA = 'https://wa.me/41798235862?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20mon%20site.'

export default function ContactButtons({ dark = true }: { dark?: boolean; service?: string }) {
  const href = "/contact"
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={href}
        className="nudge inline-flex items-center gap-2 bg-accent text-[#0A0A0A] font-bold text-sm px-7 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all">
        Demander un devis gratuit
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
      <a href="tel:+41798235862"
        className={`inline-flex items-center gap-2 font-semibold text-sm px-6 py-4 rounded-full border transition-colors ${dark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/15 text-black hover:bg-black/5'}`}>
        079 823 58 62
      </a>
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 font-semibold text-sm px-6 py-4 rounded-full border transition-colors ${dark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/15 text-black hover:bg-black/5'}`}>
        WhatsApp
      </a>
    </div>
  )
}
