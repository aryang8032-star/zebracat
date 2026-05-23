import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, MapPin, TrendingUp, Check } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

const mediumColors: Record<string, string> = {
  'Digital Signage': '#6F4CF5',
  'Newspaper Advertising': '#3B2EE0',
  'Transit Media': '#14B8A6',
  'Radio Advertising': '#22D3EE',
  'Lift Branding': '#F97316',
  'OTT Advertising': '#10B981',
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!study) return {}
  return {
    title: `${study.title} | Zebracat Case Study`,
    description: study.summary,
  }
}

export default function CaseStudyPage({ params }: Props) {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug)
  if (!study) notFound()

  const related = CASE_STUDIES.filter((c) => c.slug !== study.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink/40 dark:text-white/30 mb-8">
            <Link href="/" className="hover:text-violet-500">Home</Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-violet-500">Case Studies</Link>
            <span>/</span>
            <span className="text-ink/70 dark:text-white/60 truncate">{study.title}</span>
          </nav>

          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-ink/50 dark:text-white/40 hover:text-violet-500 mb-6">
            <ArrowLeft className="w-4 h-4" aria-hidden /> All case studies
          </Link>

          {/* Medium tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.mediums.map((m) => (
              <span
                key={m}
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${mediumColors[m] || '#6F4CF5'}15`, color: mediumColors[m] || '#6F4CF5' }}
              >
                {m}
              </span>
            ))}
            <span className="text-xs text-ink/40 dark:text-white/30 px-2.5 py-1">{study.industry}</span>
          </div>

          <h1 className="display-md text-ink dark:text-white mb-4 leading-tight">{study.title}</h1>

          <div className="flex items-center gap-4 text-sm text-ink/50 dark:text-white/40 mb-10 pb-8 border-b border-ink/10 dark:border-white/10">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" aria-hidden /> {study.city}
            </span>
            <span>·</span>
            <span>{study.client}</span>
          </div>

          {/* Results headline */}
          <div className="grid grid-cols-3 gap-3 p-6 rounded-2xl bg-gradient-violet text-white mb-10">
            {Object.entries(study.results).slice(0, 3).map(([key, val]) => (
              <div key={key} className="text-center">
                <div className="font-mono font-bold text-2xl mb-1">{val}</div>
                <div className="text-2xs text-white/60 capitalize leading-tight">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-ink dark:text-white mb-3">The Challenge</h2>
              <p className="text-ink/70 dark:text-white/60 leading-relaxed">{study.challenge}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink dark:text-white mb-3">The Solution</h2>
              <p className="text-ink/70 dark:text-white/60 leading-relaxed">{study.solution}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink dark:text-white mb-3">The Outcome</h2>
              <p className="text-ink/70 dark:text-white/60 leading-relaxed mb-4">{study.outcome}</p>
              <ul className="space-y-2">
                {Object.entries(study.results).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-3 text-sm text-ink/70 dark:text-white/60">
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-success" aria-hidden />
                    </div>
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: <strong className="text-ink dark:text-white">{val}</strong></span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 text-center">
            <TrendingUp className="w-8 h-8 mx-auto text-violet-500 mb-4" aria-hidden />
            <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Want results like these?</h3>
            <p className="text-ink/60 dark:text-white/50 mb-6 text-sm">
              Tell us about your brand and we&apos;ll build a custom plan in 24 hours.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet"
            >
              Get a Plan <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-ink dark:text-white mb-6">More case studies</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/case-studies/${r.slug}`}
                    className="block p-5 rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 hover:border-violet-500/40 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="text-xs font-semibold text-violet-500 mb-2">{r.mediums[0]}</div>
                    <div className="font-semibold text-sm text-ink dark:text-white leading-snug">{r.title}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
