const SERVICES = [
  'Site vitrine', 'Boutique en ligne', 'Application web', 'Réservation en ligne', 'Espace client',
  'Refonte de site', 'Maintenance', 'Référencement Google', 'Site multilingue', 'Landing page',
  'Blog', 'Nom de domaine et e-mail pro', 'Hébergement',
]

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {SERVICES.map((f, i) => (
        <li key={f} className="flex items-center whitespace-nowrap px-7">
          <span className={`font-display font-extrabold tracking-[-0.03em] text-2xl sm:text-3xl ${i % 2 ? 'ticker-outline' : 'text-[#0A0A0A]'}`}>{f}</span>
          <svg className="ml-14 shrink-0" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14l-1.6-5.4L0 7l5.4-1.6z" fill="#0A0A0A" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

export default function FactsTicker() {
  return (
    <section aria-label="Ce que WebAlp réalise" className="bg-accent overflow-hidden py-5 border-y border-[#0A0A0A]">
      <div className="ticker">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
