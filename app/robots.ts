import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/netlify-forms/', '/api/'],
    },
    sitemap: 'https://webalp.ch/sitemap.xml',
    host: 'https://webalp.ch',
  }
}
