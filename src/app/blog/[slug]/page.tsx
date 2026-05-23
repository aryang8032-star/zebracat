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
    content: `Newspaper advertising remains one of India's most trusted and cost-effective mediums, reaching over 400 million readers daily across English, Hindi and regional language publications.

## Why Newspaper Advertising Still Works in India

Despite the digital revolution, newspapers in India carry enormous trust — particularly in Tier 2 and Tier 3 cities where they remain the primary news source. Key advantages:

- High trust quotient: Readers engage deeply with print content
- Geographic targeting: City-specific, district-specific or national insertions
- Supplement targeting: Career, property, lifestyle supplements reach specific audiences
- Same-day bookings: Most metros allow same-day ad insertion

## Choosing the Right Publication

India has 500+ major newspaper publications. The right choice depends on language (Hindi has the largest circulation, English is premium urban, regional is hyper-local), geography (national dailies vs state editions vs city-specific papers), audience profile, and the ad format you need.

## Pricing Structure

Newspaper ad rates are calculated per sq. cm (for classified) or per page fraction (for display). Classifieds run roughly INR 100–500 per sq. cm. Display quarter pages range INR 5,000 to 2 Lakh depending on the publication. Full-page slots in national dailies can cost 15,000 to 20 Lakh, and front-page placements carry a 200–400% premium over inside pages.

## Measuring ROI

The simplest tactics still work best: QR codes on print ads to track digital conversions, unique phone numbers or URLs per publication, coupon codes for offline redemption, and pre/post brand recall surveys.

Book your newspaper campaign with Zebracat and get same-day placement in 500+ publications across India.`,
  },
  'ooh-advertising-india': {
    title: 'OOH Advertising in India: LED Screens, Hoardings & Transit Media',
    excerpt: 'How outdoor advertising is evolving with programmatic digital OOH, LED screens and transit media across Indian cities.',
    category: 'OOH',
    readTime: '6 min read',
    date: '2025-04-08',
    content: `Out-of-home (OOH) advertising in India is undergoing a quiet revolution. Static hoardings are giving way to programmatic digital OOH (DOOH), LED grids in malls and metros are everywhere, and transit media — buses, autos, cabs — now reach urban commuters with surgical timing.

## The three modern OOH formats

Static hoardings still dominate by surface count and remain effective for awareness in Tier 2 and Tier 3 cities. Digital OOH is growing fastest in metros: LED screens at high-footfall junctions, mall atriums and retail catchments let brands rotate creative by daypart. Transit media — wraps, panels and rear-window decals — turns the city's vehicles into moving billboards.

## When DOOH beats traditional hoardings

DOOH wins whenever you need creative agility (multiple offers in a single week), audience timing (rush-hour vs evening), or programmatic buying with measurement. Traditional hoardings remain better when you need 24x7 dominance over a single high-value site.

## Planning a pan-city OOH burst

Combine three layers: a few flagship hoardings for prestige, DOOH grids for frequency in commercial belts, and transit media for residential reach. This three-layer mix typically delivers a 2–3x lift over single-format buys at the same budget.

## Measurement

Modern OOH measurement combines telco footfall data, beacon pings and lift studies. Ask your agency for footfall-attributed reports — anything less is a guess.

Run your next OOH plan with Zebracat across 10,000+ LED screens and 1,00,000+ vehicles.`,
  },
  'influencer-marketing-india-sme': {
    title: 'Influencer Marketing for Indian SMEs: What Actually Works',
    excerpt: "Stop chasing mega-influencers. Here's why micro and nano influencers deliver better ROI for Indian small businesses.",
    category: 'Influencer Marketing',
    readTime: '5 min read',
    date: '2025-04-01',
    content: `If you run an SME in India, the conventional wisdom about influencer marketing is wrong. Mega-influencers look impressive on a deck but rarely move a small brand's needle. Here is what actually works.

## The micro-influencer advantage

Creators with 10K to 100K followers deliver 3–7x higher engagement than celebrity accounts, charge a fraction of the fee, and produce content that feels native. For most SMEs this is the sweet spot.

## Pick creators by audience, not vanity metrics

Reach is easy to fake; engagement quality is not. Look at the comments — are they substantive, in your target language, from accounts in your geography? A 30K-follower creator in Indore with active Hindi comments beats a 300K Mumbai creator whose audience is mostly bots.

## Pay for output, not posts

Tie a portion of payment to deliverables: clicks via a tracked link, redemptions of a unique coupon, or attributed orders. Most serious creators will accept this structure.

## The Reels and Shorts shift

Short-form video is now the highest-converting format on Instagram and YouTube in India. If a creator only does static carousels, move on.

Talk to Zebracat about a vetted creator panel across 50,000+ Indian micro-influencers.`,
  },
  'ott-advertising-india-2025': {
    title: 'OTT Advertising in India: Hotstar, JioCinema & the Opportunity',
    excerpt: "Connected TV and OTT audiences are growing 40% YoY in India. Here's how brands can capture that attention cost-effectively.",
    category: 'OTT',
    readTime: '7 min read',
    date: '2025-03-20',
    content: `India's OTT audience crossed 550 million in 2024 and is forecast to add another 200 million by 2027. For advertisers, this is the most attractive screen growth story since the rise of smartphones.

## Where the audience actually is

JioCinema dominates sports and Hindi general entertainment. Hotstar still leads premium English content and ICC cricket. Sony LIV owns South Asian football and original dramas. SonyLIV plus Zee5 cover a wide regional-language base. The right mix depends on what you sell and who you sell to.

## Buying models

Three options matter for Indian advertisers: programmatic open auctions for reach, premium PG deals for brand-safe placements, and live-event sponsorships during marquee tournaments. Most brands underweight programmatic and overweight live-event — the math usually favours the opposite.

## Creative for the small screen

CTV ads work harder when they assume the viewer has the sound on but is sometimes second-screening. Open with a brand cue in the first 1–2 seconds, hold the key message at the centre of frame, and end with a unique URL or QR code that the second screen can capture.

## Measurement

Click-through is a weak signal on CTV. Better metrics: completion rate, lift in brand search, and view-through attribution to web traffic.

Plan your OTT burst with Zebracat across 15+ Indian streaming platforms.`,
  },
  'cinema-advertising-india': {
    title: 'Cinema Advertising in India: Why the Big Screen Still Wins',
    excerpt: 'With 4,000+ cinema screens and post-pandemic footfall recovery, cinema advertising offers some of the best CPMs in India.',
    category: 'Cinema PR',
    readTime: '5 min read',
    date: '2025-03-10',
    content: `Theatrical footfalls in India crossed pre-pandemic levels in 2024. For advertisers that is a buying opportunity hiding in plain sight: cinema delivers some of the best attention-per-rupee on the planet.

## What makes cinema unique

Captive audience, large screen, premium sound, no second screen — for two to three minutes per slot the audience belongs entirely to your message. No other medium offers that focus.

## PVR, INOX and the regional chains

PVR and INOX (now merged) cover most premium metro screens. Carnival, MovieMax and several regional chains dominate Tier 2 and Tier 3. Combine the two for true pan-India reach at a sensible cost.

## Buying smarter

Slot timing matters: pre-feature ads command higher recall than mid-rolls. Genre matching matters more: an SUV ad before an action release usually outperforms the same ad before a romantic comedy. Push your agency for genre-weighted plans.

## Production notes

Cinema demands the highest production values. Anything that looks fine on Instagram will look amateur at 40 feet. Budget for proper 5.1 mix and a colour grade for the big screen.

Book pre-feature slots in 4,000+ Indian cinema screens via Zebracat.`,
  },
  'radio-advertising-india-tips': {
    title: '10 Tips for a Killer Radio Ad Campaign in India',
    excerpt: "From script writing to slot selection, here's what separates forgettable radio ads from ones that drive footfall and recall.",
    category: 'Radio Advertising',
    readTime: '4 min read',
    date: '2025-03-01',
    content: `Radio still reaches more than 65% of urban Indians weekly. Done well, it drives footfall, recall and lower-funnel action. Done badly it is the most easily ignored ad medium in the country. Here are ten tips to land on the right side.

## 1. Write for the ear, not the page
Read every script aloud before approving it. If it does not sound natural, it will not land.

## 2. Open with a sound, not a tagline
The first 1.5 seconds decide whether listeners tune in or tune out. Use a sound effect, a question or a music sting to hook attention.

## 3. Repeat the brand three times
Brand recall on radio is a function of repetition. Three mentions in a 30-second spot is the proven minimum.

## 4. Use a single call-to-action
One URL, one phone number, one offer. Multiple CTAs collapse to zero.

## 5. Match daypart to message
Morning drive time suits awareness; evening drive time suits offers and footfall pulls.

## 6. RJ mentions beat spots
A genuine RJ endorsement still outperforms produced spots on recall in most Indian markets.

## 7. Mix English and the local language
Bilingual scripts perform best in metros. Use 100% local language in Tier 2 and Tier 3.

## 8. Pair radio with OOH near the same locations
Listeners hear the ad in the car, then see a hoarding two blocks later. Recall jumps 2x.

## 9. Track via unique URLs and codes
&ldquo;Mention RJ Vikas for 10% off&rdquo; remains the best low-tech attribution.

## 10. Refresh creative every 4–6 weeks
Listeners tire faster than you think. Plan three creative variants per campaign.

Book prime-time slots across 200+ Indian FM stations via Zebracat.`,
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

// Minimal, safe markdown renderer for our trusted internal posts.
// We only support: ## headings, **bold**, - bullets, and paragraphs.
function renderMarkdown(md: string): React.ReactNode {
  const blocks = md.trim().split(/\n{2,}/)
  return blocks.map((block, blockIndex) => {
    const trimmed = block.trim()

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={blockIndex} className="text-xl font-bold text-ink dark:text-white mt-8 mb-3">
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      )
    }

    if (trimmed.split('\n').every((line) => line.trim().startsWith('- '))) {
      const items = trimmed.split('\n').map((line) => line.replace(/^-\s+/, ''))
      return (
        <ul key={blockIndex} className="list-disc pl-5 space-y-2 mb-4 text-ink/70 dark:text-white/60">
          {items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      )
    }

    return (
      <p key={blockIndex} className="mb-4 leading-relaxed text-ink/70 dark:text-white/60">
        {renderInline(trimmed)}
      </p>
    )
  })
}

function renderInline(text: string): React.ReactNode {
  // Split on **bold** markers and render strong text safely (no innerHTML).
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-ink dark:text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
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

          <article className="prose prose-slate dark:prose-invert max-w-none">
            {renderMarkdown(post.content)}
          </article>

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
