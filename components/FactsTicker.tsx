const FACTS = [
  'Sites vitrines', 'E-commerce', 'Applications web', 'Maintenance', 'Refonte',
  'Next.js', 'Webflow', 'WordPress', 'Shopify',
  'Sion, Valais', 'Réponse sous 24h', 'Dès CHF 690', 'Hébergement inclus', 'Code livré et documenté',
]

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {FACTS.map(f => (
        <li key={f} className="flex items-center whitespace-nowrap font-display font-bold text-[#0A0A0A] text-lg sm:text-xl tracking-tight px-6">
          {f}
          <span aria-hidden="true" className="ml-12 w-1.5 h-1.5 rounded-full bg-[#0A0A0A]/35" />
        </li>
      ))}
    </ul>
  )
}

export default function FactsTicker() {
  return (
    <section aria-label="Ce que fait WebAlp" className="bg-accent overflow-hidden py-4 border-y border-[#0A0A0A]">
      <div className="ticker">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
