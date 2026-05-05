'use client'

import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const clients = [
  'Hindustan Times', 'Times of India', 'Aaj Tak', 'Star Sports', 'Sony LIV',
  'Hotstar', 'JioCinema', 'Big FM', 'Red FM', 'PVR Cinemas',
  'INOX', 'Carnival', 'Makemytrip', 'Swiggy', 'Zomato',
  'Reliance Trends', 'Patanjali', 'Dabur', 'Havells', 'Bajaj Finance',
  'HDFC Bank', 'Hero MotoCorp', 'Maruti Suzuki', 'LIC India', 'Byju\'s',
]

function LogoCard({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-12 px-6 mx-4 rounded-xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 shadow-sm hover:shadow-card hover:border-violet-500/30 transition-all duration-300 group cursor-default min-w-[140px]">
      <span className="text-sm font-semibold text-ink/40 dark:text-white/30 group-hover:text-violet-500 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function TrustStrip() {
  const prefersReducedMotion = useReducedMotion()
  const doubled = [...clients, ...clients]

  return (
    <section className="py-16 bg-offwhite dark:bg-ink overflow-hidden border-y border-ink/8 dark:border-white/8" aria-label="Trusted by leading brands">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold text-ink/30 dark:text-white/30 uppercase tracking-widest">
          Trusted by 1,200+ brands across India
        </p>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative mb-4">
        <div
          className={cn(
            'flex items-center',
            !prefersReducedMotion && 'animate-marquee',
          )}
          style={{ width: 'max-content' }}
          aria-hidden={!prefersReducedMotion}
        >
          {doubled.map((name, i) => (
            <LogoCard key={`r1-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative">
        <div
          className={cn(
            'flex items-center',
            !prefersReducedMotion && 'animate-marquee-reverse',
          )}
          style={{ width: 'max-content' }}
          aria-hidden={!prefersReducedMotion}
        >
          {[...doubled].reverse().map((name, i) => (
            <LogoCard key={`r2-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Accessible static fallback */}
      {prefersReducedMotion && (
        <div className="flex flex-wrap justify-center gap-3 mt-4 max-w-4xl mx-auto px-4">
          {clients.map((name) => (
            <span key={name} className="text-sm text-ink/40 dark:text-white/30 font-medium">{name}</span>
          ))}
        </div>
      )}
    </section>
  )
}
