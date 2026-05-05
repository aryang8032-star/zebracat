import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, Check, Zap } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: `${service.name} in India — Book Instantly | Zebracat AI Publicity`,
    description: `${service.description} ${service.promise}. Budget: ${service.budgetRange}. Pan-India booking available.`,
  }
}

export default function ServicePage({ params }: Props) {
  const service = SERVICES.find((s) => s.slug === params.slug)
  if (!service) notFound()

  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/40 dark:text-white/30 mb-8">
          <Link href="/" className="hover:text-violet-500">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-violet-500">Services</Link>
          <span>/</span>
          <span className="text-ink/70 dark:text-white/60">{service.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          {/* Main content */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: `${service.color}15`, color: service.color }}
            >
              <Zap className="w-3 h-3" aria-hidden />
              {service.promise}
            </div>
            <h1 className="display-lg text-ink dark:text-white mb-4">{service.name}</h1>
            <p className="body-lg text-ink/60 dark:text-white/50 mb-8">{service.description}</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Coverage', value: service.stats },
                { label: 'Budget Range', value: service.budgetRange },
                { label: 'Go-Live', value: '24–48 hours' },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 text-center">
                  <div className="font-bold text-ink dark:text-white mb-1">{value}</div>
                  <div className="text-xs text-ink/40 dark:text-white/30">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 mb-8">
              <h2 className="font-bold text-lg text-ink dark:text-white mb-4">What&apos;s included</h2>
              <ul className="space-y-3">
                {[
                  'Dedicated account manager',
                  'AI-assisted campaign planning',
                  'Real-time performance dashboard',
                  'Creative assistance (optional)',
                  'Weekly automated reports',
                  'Post-campaign wrap deck',
                  'GST invoice',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink/70 dark:text-white/60">
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-success" aria-hidden />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-gradient-violet p-6 text-white sticky top-24">
              <h3 className="font-bold text-lg mb-2">Book {service.shortName} Campaign</h3>
              <p className="text-white/70 text-sm mb-5">
                Get a live quote in minutes. No broker fees.
              </p>
              <Link
                href={`/book?service=${service.id}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white text-violet-600 font-semibold hover:bg-white/90 transition-colors mb-3"
              >
                Get Instant Quote <ArrowUpRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-sm"
              >
                Talk to Strategist
              </Link>
            </div>

            <div className="rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 p-5">
              <p className="text-xs font-semibold text-ink/50 dark:text-white/40 uppercase tracking-wider mb-3">Related Services</p>
              <div className="space-y-2">
                {SERVICES.filter((s) => s.id !== service.id).slice(0, 4).map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="block text-sm text-ink/60 dark:text-white/50 hover:text-violet-500 py-1"
                  >
                    → {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
