import type { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/constants'

const BASE_URL = 'https://zebracatindia.com'

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
  ]

  const servicePages = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
