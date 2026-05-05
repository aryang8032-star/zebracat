import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { ArrowUpRight, Newspaper, Radio, Tv, Film, Monitor, Users, Building2, Bus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advertising Services — Newspaper, Radio, TV, Cinema, OTT, OOH & More',
  description: 'Book advertising across all major media channels in India. Newspaper ads, radio spots, TV campaigns, cinema advertising, OTT, digital signage, influencer marketing, lift branding and transit media.',
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  newspaper: Newspaper, radio: Radio, tv: Tv, film: Film, monitor: Monitor,
  'monitor-dot': Monitor, users: Users, 'building-2': Building2, bus: Bus,
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-chip mb-4">Our Services</span>
          <h1 className="display-lg text-ink dark:text-white mb-4">
            Every Media Surface.{' '}
            <span className="font-serif italic gradient-text">One Partner.</span>
          </h1>
          <p className="body-lg text-ink/60 dark:text-white/50">
            Nine advertising mediums. Pan-India network. AI-powered planning.
            All managed by a dedicated team who knows Indian media inside out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Monitor
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group p-7 rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 hover:border-violet-500/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} aria-hidden />
                </div>
                <h2 className="font-bold text-lg text-ink dark:text-white mb-2 group-hover:text-violet-500 transition-colors">
                  {service.name}
                </h2>
                <p className="text-sm text-ink/60 dark:text-white/50 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-ink/40 dark:text-white/30">{service.stats}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-violet-500">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet"
          >
            Book a Campaign <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
