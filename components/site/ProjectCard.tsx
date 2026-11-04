import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/projects'

export const PROJECT_IMAGES: Record<string, string> = {
  dronevalais: '/work/dronevalais.png',
  goldenbulls: '/work/goldenbulls.png',
  monhygiene: '/work/monhygiene.png',
  vestedwear: '/work/vestedwear.png',
  yourbizflow: '/work/yourbizflow.png',
}

export default function ProjectCard({ p }: { p: Project }) {
  const img = PROJECT_IMAGES[p.slug]
  return (
    <Link href={`/realisations/${p.slug}`}
      className="group lift block rounded-2xl overflow-hidden bg-[#0A0A0A] text-white border border-white/10 hover:border-white/25 transition-colors">
      {img && (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#141414]">
          <Image src={img} alt={`Site ${p.name} réalisé par WebAlp`} fill sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <p className="text-sm font-medium text-white/40">{p.type}</p>
        <p className="font-display font-bold text-xl mt-2">{p.name}</p>
        <p className="text-sm text-white/55 mt-2 line-clamp-3">{p.enjeu}</p>
        <p className="text-sm font-semibold text-accent mt-4">Voir le projet →</p>
      </div>
    </Link>
  )
}
