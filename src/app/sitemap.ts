import type { MetadataRoute } from 'next'
import { SERVICES, CASE_STUDIES } from '@/lib/constants'

const BASE_URL = 'https://zebracatindia.com'

// Blog slugs that exist as real detail pages — keep in sync with src/app/blog/[slug]/page.tsx
const BLOG_SLUGS = [
  'newspaper-advertising-india-guide',
  'ooh-advertising-india',
  'influencer-marketing-india-sme',
  'ott-advertising-india-2025',
  'cinema-advertising-india',
  'radio-advertising-india-tips',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/services`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${BASE_URL}/book`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/zap-star`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const servicePages = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const caseStudyPages = CASE_STUDIES.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages]
}
