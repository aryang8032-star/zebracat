import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from 'lucide-react'

interface Props {
  params: { slug: string }
}

const posts: Record<string, { title: string; excerpt: string; content: string; category: string; readTime: string; date: string }> = {
  'newspaper-advertising-india-guide': {
    title: 'The Complete Guide to Newspaper Advertising in India (2025)',
    excerpt: 'Everything you need to know about booking newspaper ads in India — from choosing the right publication to measuring ROI.',
    category: 'Newspaper Advertising',
    readTime: '8 min read',
    date: '2025-04-15',
    content: `
Newspaper advertising remains one of India's most trusted and cost-effective mediums, reaching over 400 million readers daily across English, Hindi and regional language publications.

## Why Newspaper Advertising Still Works in India

Despite the digital revolution, newspapers in India carry enormous trust — particularly in Tier 2 and Tier 3 cities where they remain the primary news source. Key advantages:

- **High trust quotient**: Readers engage deeply with print content
- **Geographic targeting**: City-specific, district-specific or national insertions
- **Supplement targeting**: Career, property, lifestyle supplements reach specific audiences
- **Same-day bookings**: Most metros allow same-day ad insertion

## Choosing the Right Publication

India has 500+ major newspaper publications. The right choice depends on:

1. **Language**: Hindi (largest circulation), English (premium urban), Regional (hyper-local)
2. **Geography**: National dailies vs state editions vs city-specific papers
3. **Audience**: Age, income, interest profile of the publication's readers
4. **Ad formats**: Quarter page, half page, full page, front page strip, jacket ads

## Pricing Structure

Newspaper ad rates are calculated per sq. cm (for classified) or per page fraction (for display):

- **Classified**: ₹100–500 per sq. cm
- **Display quarter page**: ₹5,000–₹2 Lakh depending on publication
- **Full page**: ₹15,000–₹20 Lakh for national dailies
- **Front page**: Premium of 200–400% over inside pages

## Measuring ROI

- **QR codes** on print ads to track digital conversions
- **Unique phone numbers** or URLs per publication
- **Coupon codes** for offline redemption tracking
- **Pre/post brand recall surveys**

Book your newspaper campaign with Zebracat and get same-day placement in 500+ publications across India.
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return {}
  return {
    title: `${post.title} | Zebracat Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug]
  if (!post) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zebracatindia.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://zebracatindia.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Zebracat AI Publicity',
      logo: { '@type': 'ImageObject', url: 'https://zebracatindia.com/images/logo.svg' },
    },
  }

  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="container-wide">
        <div className="max-w-2xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink/50 dark:text-white/40 hover:text-violet-500 mb-8">
            <ArrowLeft className="w-4 h-4" aria-hidden /> Back to Blog
          </Link>

          <div className="mb-3 text-xs font-semibold text-violet-500 uppercase tracking-wider">{post.category}</div>
          <h1 className="text-3xl font-bold text-ink dark:text-white mb-4 leading-snug">{post.title}</h1>

          <div className="flex items-center gap-4 text-xs text-ink/40 dark:text-white/30 mb-10 pb-8 border-b border-ink/10 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden />
              {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              {post.readTime}
            </div>
          </div>

          <article
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-p:text-ink/70 dark:prose-p:text-white/60 prose-a:text-violet-500 prose-li:text-ink/70 dark:prose-li:text-white/60"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-violet text-white text-center">
            <h3 className="font-bold text-xl mb-2">Ready to book your campaign?</h3>
            <p className="text-white/70 mb-6 text-sm">Get a live quote in minutes. Pan-India network. AI-powered planning.</p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-violet-600 font-semibold hover:bg-white/90 transition-colors"
            >
              Book Now <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
