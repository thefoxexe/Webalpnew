import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { getPost, getAllSlugs, BLOG_POSTS, type Block } from '@/lib/blog-posts'
import ReadingProgress from './ReadingProgress'
import ArticleActions from './ArticleActions'

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://webalp.ch/blog/${post.slug}`,
      siteName: 'WebAlp',
      type: 'article',
      publishedTime: post.date,
      authors: ['WebAlp'],
      tags: post.tags,
    },
    alternates: { canonical: `https://webalp.ch/blog/${post.slug}` },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-display font-extrabold text-black text-2xl md:text-3xl leading-tight mt-12 mb-4 first:mt-0">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-display font-bold text-black text-xl md:text-2xl leading-tight mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'p':
      return <p className="text-black/65 text-base md:text-lg leading-[1.8] mb-5">{block.text}</p>
    case 'ul':
      return (
        <ul className="space-y-2.5 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-black/65 text-base leading-relaxed">
              <svg className="flex-shrink-0 mt-1.5" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1.5 6l3 3 6-6" stroke="#B3FF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="space-y-2.5 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-black/65 text-base leading-relaxed">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case 'highlight':
      return (
        <div className="my-8 px-6 py-5 border-l-[3px] border-accent bg-accent/5 rounded-r-xl">
          <p className="text-black/80 text-base md:text-lg font-semibold leading-relaxed">{block.text}</p>
        </div>
      )
    case 'quote':
      return (
        <blockquote className="my-8 px-6 py-6 bg-[#0A0A0A] rounded-2xl">
          <p className="text-white/70 text-base md:text-lg leading-relaxed italic mb-3">{`"${block.text}"`}</p>
          {block.author && (
            <p className="text-white/35 text-xs font-mono">— {block.author}</p>
          )}
        </blockquote>
      )
    case 'cta':
      return (
        <div className="my-10 bg-[#0A0A0A] rounded-2xl p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 6px #B3FF47' }} />
              <p className="text-white font-display font-bold text-lg">{block.title}</p>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-md">{block.body}</p>
          </div>
          <Link
            href={block.href}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-[#0A0A0A] text-sm font-bold px-6 py-3.5 rounded-full hover:brightness-110 active:scale-95 transition-all accent-glow whitespace-nowrap"
          >
            {block.label}
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: { '@type': 'Organization', name: 'WebAlp', url: 'https://webalp.ch' },
    publisher: { '@type': 'Organization', name: 'WebAlp', url: 'https://webalp.ch' },
    datePublished: post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://webalp.ch/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />

      <div className="min-h-screen bg-white">
        {/* Navbar spacer */}
        <div className="h-20" />

        {/* Article header */}
        <div className="bg-[#F5F4F0] pb-0">
          <div className="max-w-3xl mx-auto px-6 md:px-8 pt-16 pb-12">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/blog" className="text-[10px] font-mono text-black/35 hover:text-black/60 transition-colors flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M12 7H2M7 12l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Blog
              </Link>
              <span className="text-black/15">/</span>
              <span className="text-[10px] font-mono text-black/30 border border-black/8 px-2 py-0.5 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-black leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              {post.title}
            </h1>

            <p className="text-black/50 text-base md:text-lg leading-relaxed mb-8">{post.excerpt}</p>

            <div className="flex items-center gap-5 text-[11px] font-mono text-black/30 pt-6 border-t border-black/8">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} min de lecture</span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 md:px-8 py-14">
          {post.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </article>

        {/* Likes + Views + Tags */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 pb-14">
          <div className="pt-8 border-t border-black/6 space-y-6">
            <ArticleActions slug={post.slug} />
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono text-black/35 border border-black/8 px-3 py-1.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="bg-[#F5F4F0] py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <p className="text-[10px] font-mono text-black/30 uppercase tracking-widest mb-8">— Articles similaires</p>
              <div className="grid md:grid-cols-2 gap-4">
                {related.map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-white border border-black/8 rounded-2xl p-6 hover:border-black/20 hover:shadow-md transition-all">
                    <span className="text-[10px] font-mono text-black/30 border border-black/8 px-2 py-0.5 rounded-full">{p.category}</span>
                    <h3 className="font-display font-extrabold text-black text-lg leading-tight mt-3 mb-2 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-black/40 text-sm line-clamp-2">{p.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/6">
                      <span className="text-[10px] font-mono text-black/25">{p.readTime} min</span>
                      <span className="text-xs font-bold text-black/30 group-hover:text-black transition-colors">Lire →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="bg-[#0A0A0A] py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">{"— Passez à l'action"}</p>
            <h2 className="font-display font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}>
              Prêt à appliquer ces conseils à votre site ?
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
              {"Audit gratuit de votre présence en ligne. Réponse sous 24h. On s'occupe de tout."}
            </p>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 bg-accent text-[#0A0A0A] text-sm font-bold px-7 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all accent-glow">
              Obtenir un audit gratuit
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
