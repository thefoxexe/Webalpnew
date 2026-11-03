import Link from 'next/link'
import JsonLd from './JsonLd'

export type Crumb = { name: string; href: string }

export default function Breadcrumbs({ items, dark = true }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ name: 'Accueil', href: '/' }, ...items]
  return (
    <>
      <nav aria-label="Fil d'Ariane" className={`text-xs ${dark ? 'text-white/45' : 'text-black/45'}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < all.length - 1 ? (
                <Link href={c.href} className={dark ? 'hover:text-white' : 'hover:text-black'}>{c.name}</Link>
              ) : (
                <span aria-current="page" className={dark ? 'text-white/75' : 'text-black/75'}>{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: `https://webalp.ch${c.href === '/' ? '' : c.href}`,
          })),
        }}
      />
    </>
  )
}
