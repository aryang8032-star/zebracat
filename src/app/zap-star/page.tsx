import type { Metadata } from 'next'
import Link from 'next/link'
import { ZAP_STAR } from '@/lib/constants'
import { Zap, ArrowUpRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ZAP STAR — Zebracat Partner Program | Powering Retailers Across India',
  description: 'Join ZAP STAR, the Zebracat AI Publicity partner and retailer program. Earn commissions, get co-branded campaigns, priority booking and marketing support.',
}

export default function ZapStarPage() {
  return (
    <div className="min-h-screen bg-ink text-white pt-28 pb-20">
      <div className="container-wide">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/40 bg-violet-400/10 mb-6">
            <Zap className="w-4 h-4 text-violet-400" aria-hidden />
            <span className="text-violet-400 text-sm font-semibold tracking-wider uppercase">ZAP STAR Program</span>
          </div>
          <h1 className="display-lg text-white mb-6">{ZAP_STAR.tagline}</h1>
          <p className="body-lg text-white/50 mb-8">{ZAP_STAR.description}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact?subject=zap-star"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet"
            >
              Apply Now <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              href={ZAP_STAR.deckUrl}
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              Request Deck
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Partner Benefits</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ZAP_STAR.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-violet-400" aria-hidden />
                </div>
                <span className="font-medium text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How It Works</h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Apply Online', desc: 'Fill a simple form with your business details. Our partner team reviews within 48 hours.' },
              { step: '02', title: 'Get Onboarded', desc: 'Receive your ZAP STAR kit — access to rate cards, co-branded materials and your account dashboard.' },
              { step: '03', title: 'Refer & Earn', desc: 'Refer clients or run campaigns via Zebracat. Earn 8–15% commission on every booking.' },
              { step: '04', title: 'Grow Together', desc: 'Scale with Zebracat\'s network. Priority support, training sessions and co-branded campaigns.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6 items-start">
                <div className="font-mono font-bold text-3xl text-violet-400/30 flex-shrink-0">{step}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
