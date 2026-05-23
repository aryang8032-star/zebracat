import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock, Tag } from 'lucide-react'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { BLOG_IMAGES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Blog — Advertising & Media Insights | Zebracat AI Publicity',
  description: 'Expert insights on newspaper advertising, radio spots, TV campaigns, OOH, digital signage and influencer marketing in India. Tips, trends and case studies.',
}

const posts = [
  {
    slug: 'newspaper-advertising-india-guide',
    title: 'The Complete Guide to Newspaper Advertising in India (2025)',
    excerpt: 'Everything you need to know about booking newspaper ads in India — from choosing the right publication to measuring ROI.',
    category: 'Newspaper Advertising',
    readTime: '8 min read',
    date: '2025-04-15',
    featured: true,
  },
  {
    slug: 'ooh-advertising-india',
    title: 'OOH Advertising in India: LED Screens, Hoardings & Transit Media',
    excerpt: 'How outdoor advertising is evolving with programmatic digital OOH, LED screens and transit media across Indian cities.',
    category: 'OOH',
    readTime: '6 min read',
    date: '2025-04-08',
    featured: false,
  },
  {
    slug: 'influencer-marketing-india-sme',
    title: 'Influencer Marketing for Indian SMEs: What Actually Works',
    excerpt: 'Stop chasing mega-influencers. Here\'s why micro and nano influencers deliver better ROI for Indian small businesses.',
    category: 'Influencer Marketing',
    readTime: '5 min read',
    date: '2025-04-01',
    featured: false,
  },
  {
    slug: 'ott-advertising-india-2025',
    title: 'OTT Advertising in India: Hotstar, JioCinema & the Opportunity',
    excerpt: 'Connected TV and OTT audiences are growing 40% YoY in India. Here\'s how brands can capture that attention cost-effectively.',
    category: 'OTT',
    readTime: '7 min read',
    date: '2025-03-20',
    featured: false,
  },
  {
    slug: 'cinema-advertising-india',
    title: 'Cinema Advertising in India: Why the Big Screen Still Wins',
    excerpt: 'With 4,000+ cinema screens and post-pandemic footfall recovery, cinema advertising offers some of the best CPMs in India.',
    category: 'Cinema PR',
    readTime: '5 min read',
    date: '2025-03-10',
    featured: false,
  },
  {
    slug: 'radio-advertising-india-tips',
    title: '10 Tips for a Killer Radio Ad Campaign in India',
    excerpt: 'From script writing to slot selection, here\'s what separates forgettable radio ads from ones that drive footfall and recall.',
    category: 'Radio Advertising',
    readTime: '4 min read',
    date: '2025-03-01',
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  'Newspaper Advertising': '#6F4CF5',
  'OOH': '#22D3EE',
  'Influencer Marketing': '#EC4899',
  'OTT': '#10B981',
  'Cinema PR': '#F59E0B',
  'Radio Advertising': '#14B8A6',
}

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="section-chip mb-4">Insights & Ideas</span>
          <h1 className="display-lg text-ink dark:text-white mb-4">
            Media Intelligence.{' '}
            <span className="font-serif italic gradient-text">India Focus.</span>
          </h1>
          <p className="text-ink/60 dark:text-white/50">
            Expert content on Indian advertising mediums, campaign planning, and growth strategies for brands.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-3xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative min-h-[250px] overflow-hidden">
              {BLOG_IMAGES[featured.slug] ? (
                <Image
                  src={BLOG_IMAGES[featured.slug]}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-violet" />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/30 to-transparent" />
              <div className="relative h-full flex items-end p-10">
                <div className="text-white">
                  <div className="text-white/70 text-sm mb-2 uppercase tracking-wider">Featured Article</div>
                  <div className="text-2xl font-bold leading-snug">{featured.title}</div>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: `${categoryColors[featured.category]}15`, color: categoryColors[featured.category] }}
              >
                <Tag className="w-3 h-3" aria-hidden />
                {featured.category}
              </div>
              <h2 className="font-bold text-xl text-ink dark:text-white mb-3 group-hover:text-violet-500 transition-colors">
                {featured.title}
              </h2>
              <p className="text-ink/60 dark:text-white/50 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-ink/40 dark:text-white/30">
                  <Clock className="w-3.5 h-3.5" aria-hidden />
                  {featured.readTime}
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-violet-500 group-hover:gap-2 transition-all">
                  Read more <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {BLOG_IMAGES[post.slug] && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={BLOG_IMAGES[post.slug]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                  style={{ backgroundColor: `${categoryColors[post.category] || '#6F4CF5'}15`, color: categoryColors[post.category] || '#6F4CF5' }}
                >
                  {post.category}
                </div>
                <h2 className="font-bold text-ink dark:text-white mb-3 leading-snug group-hover:text-violet-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-ink/50 dark:text-white/40 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-ink/8 dark:border-white/8">
                  <div className="flex items-center gap-1 text-xs text-ink/30 dark:text-white/30">
                    <Clock className="w-3.5 h-3.5" aria-hidden />
                    {post.readTime}
                  </div>
                  <span className="text-xs font-semibold text-violet-500">
                    {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 max-w-xl mx-auto text-center">
          <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Stay ahead of Indian advertising trends</h3>
          <p className="text-sm text-ink/50 dark:text-white/40 mb-5">Weekly insights for marketers and media planners. No spam, ever.</p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
