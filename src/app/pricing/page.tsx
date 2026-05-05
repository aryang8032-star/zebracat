import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { Check, ArrowUpRight, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advertising Rates & Pricing — Newspaper, Radio, TV, OOH India',
  description: 'Transparent indicative pricing for all advertising mediums in India. Newspaper ads from ₹5,000, radio spots from ₹10,000, TV campaigns, cinema, OTT, digital signage and more.',
}

const pricingData = SERVICES.map((s) => ({
  ...s,
  tiers: [
    { name: 'Starter', price: s.budgetRange.split('–')[0].trim(), features: ['1 city', '1 week duration', 'Standard slot', 'Basic reporting'] },
    { name: 'Growth', price: s.budgetRange, features: ['3–5 cities', '2–4 weeks', 'Prime slots available', 'Weekly reports', 'Creative assistance'] },
    { name: 'Enterprise', price: `${s.budgetRange.split('–')[1]?.trim() ?? '₹20 Lakh'}+`, features: ['Pan-India', 'Custom duration', 'All slots', 'Live dashboard', 'Dedicated AM', 'Custom reporting'] },
  ],
}))

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="section-chip mb-4">Transparent Pricing</span>
          <h1 className="display-lg text-ink dark:text-white mb-4">
            Indicative Rates.{' '}
            <span className="font-serif italic gradient-text">No Surprises.</span>
          </h1>
          <p className="body-lg text-ink/60 dark:text-white/50">
            All prices shown are indicative ranges. Actual rates depend on city, publication,
            season and slot. Get an exact quote via our booking engine.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 max-w-2xl mx-auto mb-12 p-4 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20">
          <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-cyan-700 dark:text-cyan-300">
            Prices are indicative and exclude GST (18%). Actual rates vary by season, publication/station tier,
            slot time, and city. Use our booking engine for an exact live quote.
          </p>
        </div>

        {/* Service tabs */}
        <div className="space-y-10">
          {SERVICES.slice(0, 5).map((service) => (
            <div key={service.id} className="bg-white dark:bg-white/5 rounded-3xl border border-ink/8 dark:border-white/8 overflow-hidden">
              <div
                className="px-8 py-6 border-b border-ink/8 dark:border-white/8"
                style={{ backgroundColor: `${service.color}08` }}
              >
                <h2 className="font-bold text-xl text-ink dark:text-white">{service.name}</h2>
                <p className="text-sm text-ink/50 dark:text-white/40 mt-1">{service.description}</p>
              </div>
              <div className="p-8 grid sm:grid-cols-3 gap-5">
                {[
                  { name: 'Starter', price: service.budgetRange.split('–')[0].trim() },
                  { name: 'Growth', price: service.budgetRange },
                  { name: 'Enterprise', price: 'Custom' },
                ].map(({ name, price }, i) => (
                  <div
                    key={name}
                    className={`p-5 rounded-2xl border ${i === 1 ? 'border-violet-500/40 bg-violet-500/5' : 'border-ink/8 dark:border-white/8'}`}
                  >
                    <div className="text-xs font-semibold text-ink/50 dark:text-white/40 uppercase tracking-wider mb-2">{name}</div>
                    <div className="font-mono font-bold text-xl text-ink dark:text-white mb-4">{price}</div>
                    <ul className="space-y-2">
                      {['Dedicated AM', 'Live dashboard', 'GST invoice'].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-ink/60 dark:text-white/50">
                          <Check className="w-3 h-3 text-success" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="px-8 pb-6">
                <Link
                  href={`/book?service=${service.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors"
                >
                  Get exact quote <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet"
          >
            Get a Full Media Plan Quote <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
