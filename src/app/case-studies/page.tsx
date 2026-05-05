import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, BarChart3, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies — Campaign Results & Success Stories | Zebracat AI Publicity',
  description: 'Real results from real campaigns. See how Zebracat AI Publicity has helped 1,200+ brands grow through strategic media buying across India.',
}

const caseStudies = [
  {
    slug: 'retail-digital-signage-ratlam',
    title: 'Retail Chain Drives 300+ Site Visits via Digital Signage',
    client: 'Shubham Sharma, Real Estate Developer',
    city: 'Ratlam',
    mediums: ['Digital Signage'],
    industry: 'Real Estate',
    results: { reach: '5 Lakh+', leads: '300+', cpl: '₹280' },
    summary: 'Strategic LED screen placements across Ratlam drove 300+ site visits for a residential project launch in a single week.',
  },
  {
    slug: 'edtech-newspaper-12-cities',
    title: 'EdTech Brand Goes Live in 12 Cities in 48 Hours',
    client: 'Amit Desai, EdTech Startup',
    city: 'Mumbai',
    mediums: ['Newspaper Advertising'],
    industry: 'Education',
    results: { reach: '45 Lakh+', signups: '1,200+', roi: '4.2×' },
    summary: 'Zebracat\'s same-day newspaper booking engine launched pan-India ads for an EdTech brand within 48 hours of brief receipt.',
  },
  {
    slug: 'healthcare-transit-chandigarh',
    title: 'Healthcare Group Achieves City-Wide Recall via Transit Media',
    client: 'Ramesh Garg, Healthcare Group',
    city: 'Chandigarh',
    mediums: ['Transit Media'],
    industry: 'Healthcare',
    results: { reach: '18 Lakh/week', routesCovered: '50+', brandRecall: '+42%' },
    summary: 'Bus branding across 50+ Chandigarh routes gave a healthcare network city-wide visibility at a fraction of TV costs.',
  },
  {
    slug: 'fmcg-radio-campaign',
    title: 'FMCG Brand Cuts CPL by 35% with AI-Optimised Radio Slots',
    client: 'Ashish Shrimar, FMCG Company',
    city: 'Delhi',
    mediums: ['Radio Advertising'],
    industry: 'FMCG',
    results: { stations: '8', duration: '4 weeks', cplReduction: '35%' },
    summary: 'AI-driven radio station and slot selection reduced CPL by 35% for an FMCG product launch across Delhi NCR.',
  },
  {
    slug: 'lift-branding-d2c',
    title: 'D2C Brand Builds Neighbourhood Presence via Lift Branding',
    client: 'Mohit Narang, D2C Brand',
    city: 'Gurgaon',
    mediums: ['Lift Branding', 'OTT Advertising'],
    industry: 'Consumer / D2C',
    results: { lifts: '800+', impressionsPerDay: '40,000+', roas: '4×' },
    summary: 'Combined lift branding in Gurgaon towers with OTT retargeting created a surround-sound effect for a D2C brand launch.',
  },
  {
    slug: 'retail-lift-branding-gurgaon',
    title: 'Retail Chain Sees Brand Recall Jump in Catchment Area',
    client: 'Ashutosh Rana, Marketing Head',
    city: 'Gurgaon',
    mediums: ['Lift Branding'],
    industry: 'Retail',
    results: { towersTargeted: '150+', residents: '60,000+', recallLift: '+55%' },
    summary: 'Precision lift branding across 150+ Gurgaon residential towers drove a 55% brand recall uplift in the target catchment.',
  },
]

const mediumColors: Record<string, string> = {
  'Digital Signage': '#6F4CF5', 'Newspaper Advertising': '#3B2EE0', 'Transit Media': '#14B8A6',
  'Radio Advertising': '#22D3EE', 'Lift Branding': '#F97316', 'OTT Advertising': '#10B981',
}

const industries = ['All', 'Real Estate', 'Education', 'Healthcare', 'FMCG', 'Consumer / D2C', 'Retail']

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-chip mb-4">Case Studies</span>
          <h1 className="display-lg text-ink dark:text-white mb-4">
            Real Campaigns.{' '}
            <span className="font-serif italic gradient-text">Measurable Results.</span>
          </h1>
          <p className="body-lg text-ink/60 dark:text-white/50">
            From single-city campaigns to pan-India brand launches — see how Zebracat delivers for brands across every medium.
          </p>
        </div>

        {/* Industry filter pills (display only — functional filter would require client component) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industries.map((ind) => (
            <span
              key={ind}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${ind === 'All' ? 'bg-violet-500 text-white border-violet-500' : 'border-ink/15 dark:border-white/15 text-ink/60 dark:text-white/50'}`}
            >
              {ind}
            </span>
          ))}
        </div>

        {/* Case studies grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Medium tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cs.mediums.map((m) => (
                  <span
                    key={m}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${mediumColors[m] || '#6F4CF5'}15`, color: mediumColors[m] || '#6F4CF5' }}
                  >
                    {m}
                  </span>
                ))}
                <span className="text-xs text-ink/40 dark:text-white/30 px-2.5 py-1">· {cs.industry}</span>
              </div>

              <h2 className="font-bold text-ink dark:text-white mb-3 leading-snug group-hover:text-violet-500 transition-colors">
                {cs.title}
              </h2>

              <p className="text-sm text-ink/50 dark:text-white/40 leading-relaxed mb-5 flex-1">{cs.summary}</p>

              {/* Key results */}
              <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl bg-offwhite dark:bg-white/5">
                {Object.entries(cs.results).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="font-mono font-bold text-sm text-ink dark:text-white">{val}</div>
                    <div className="text-2xs text-ink/40 dark:text-white/30 capitalize leading-tight mt-0.5">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Author + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-ink/8 dark:border-white/8">
                <div>
                  <div className="text-xs font-medium text-ink/70 dark:text-white/50">{cs.client.split(',')[0]}</div>
                  <div className="text-2xs text-ink/40 dark:text-white/30">{cs.city}</div>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-violet-500 group-hover:gap-2 transition-all">
                  Full case study <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet"
          >
            Start Your Campaign <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
