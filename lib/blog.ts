export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'cta'; title: string; body: string; href: string; label: string }

export type CategoryKey = 'strategie' | 'design' | 'technologie' | 'seo' | 'ecommerce'

export interface Article {
  slug: string
  category: CategoryKey
  publishedAt: string
  readTime: number
  author: 'Bastien' | 'Noé'
  fr: { title: string; excerpt: string; tags: string[]; body: ContentBlock[] }
  en: { title: string; excerpt: string; tags: string[]; body: ContentBlock[] }
}

export const CATEGORY_LABELS: Record<CategoryKey, { fr: string; en: string }> = {
  strategie: { fr: 'Stratégie', en: 'Strategy' },
  design: { fr: 'Design', en: 'Design' },
  technologie: { fr: 'Technologie', en: 'Technology' },
  seo: { fr: 'SEO', en: 'SEO' },
  ecommerce: { fr: 'E-commerce', en: 'E-commerce' },
}

// Import articles from blog-articles.ts
export { ARTICLES } from './blog-articles'

// Helpers
import { ARTICLES as _ARTICLES } from './blog-articles'

export function getAllArticles(): Article[] {
  return _ARTICLES
}

export function getArticleBySlug(slug: string): Article | undefined {
  return _ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: CategoryKey): Article[] {
  return _ARTICLES.filter(a => a.category === category)
}

export function getAllSlugs(): string[] {
  return _ARTICLES.map(a => a.slug)
}
