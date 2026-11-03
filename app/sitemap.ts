import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { SERVICES } from '@/lib/services'
import { PROJECTS } from '@/lib/projects'

// Date de la dernière modification réelle des pages (à mettre à jour quand une page change).
const SITE_UPDATED = new Date('2026-11-03')

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `https://webalp.ch${path}`,
    lastModified: SITE_UPDATED,
    priority,
  })

  return [
    page('', 1),
    ...SERVICES.map(s => page(`/${s.slug}`, 0.9)),
    page('/tarifs', 0.8),
    page('/realisations', 0.8),
    ...PROJECTS.map(p => page(`/realisations/${p.slug}`, 0.6)),
    page('/contact', 0.7),
    page('/blog', 0.6),
    // Dates de publication d'origine inconnues : pas de lastmod inventé pour les articles.
    ...BLOG_POSTS.map(post => ({ url: `https://webalp.ch/blog/${post.slug}`, priority: 0.5 })),
  ]
}
