'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Target, BarChart3, Zap, Shield, Clock, Users, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const reasons = [
  {
    icon: Target,
    title: 'Better Audiences',
    subtitle: 'Precision targeting at scale',
    description:
      'Our AI maps your audience across every medium — from PIN codes for hyperlocal lift branding to national prime-time slots on TV. No wasted impressions.',
    features: ['Geo-targeted campaigns', 'Audience persona mapping', 'Cross-channel frequency capping'],
    color: '#6F4CF5',
    gradient: 'from-violet-500/10 to-violet-500/5',
  },
  {
    icon: BarChart3,
    title: 'Better Analytics',
    subtitle: 'Real data, real insights',
    description:
      'Every campaign gets a live dashboard with impressions, reach, GRP, CPM and footfall correlation. Automated reports every Monday morning.',
    features: ['Real-time campaign dashboard', 'GRP & CPM tracking', 'Weekly automated reports'],
    color: '#22D3EE',
    gradient: 'from-cyan-brand/10 to-cyan-brand/5',
  },
  {
    icon: Zap,
    title: 'Better Output',
    subtitle: 'Faster, smoother, smarter',
    description:
      'From booking to execution to reporting — everything moves faster at Zebracat. Our booking engine can get your ads live within 24 hours in most metros.',
    features: ['24-hour go-live in metros', 'AI creative assistance', 'Dedicated account manager'],
    color: '#10B981',
    gradient: 'from-success/10 to-success/5',
  },
]

const features = [
  { icon: Shield, text: 'Pan-India booking in one platform' },
  { icon: BarChart3, text: '360° media planning' },
  { icon: Target, text: 'Real-time campaign monitoring' },
  { icon: Users, text: 'Dedicated account management' },
  { icon: Clock, text: 'Campaign live in 24 hours' },
  { icon: Zap, text: 'AI-assisted creative & planning' },
]

type Reason = (typeof reasons)[number]

function ReasonRow({ reason, index }: { reason: Reason; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = reason.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      {/* Visual side */}
      <div className="flex-1">
        <div
          className={`relative rounded-3xl bg-gradient-to-br ${reason.gradient} border border-ink/8 dark:border-white/8 p-10 min-h-[280px] flex items-center justify-center overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${reason.color}30, transparent 60%)`,
            }}
            aria-hidden
          />
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: `${reason.color}20` }}
          >
            <Icon className="w-14 h-14" style={{ color: reason.color }} aria-hidden />
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className="flex-1">
        <span className="label-sm text-violet-500 mb-3 block">{reason.subtitle}</span>
        <h3 className="display-md text-ink dark:text-white mb-4">{reason.title}</h3>
        <p className="body-lg text-ink/60 dark:text-white/50 mb-6">{reason.description}</p>
        <ul className="space-y-3">
          {reason.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink/70 dark:text-white/60">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: `${reason.color}20` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reason.color }} aria-hidden />
              </div>
              {f}
            </li>
          ))}
        </ul>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-violet-500 hover:gap-3 transition-all"
        >
          Learn more <ArrowUpRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </motion.div>
  )
}

export function WhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-padding bg-white dark:bg-ink/80" id="why-us" aria-labelledby="why-heading">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            className="section-chip mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why Zebracat
          </motion.span>
          <motion.h2
            id="why-heading"
            className="display-md text-ink dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Three Things We Do{' '}
            <span className="font-serif italic gradient-text">Differently</span>
          </motion.h2>
          <motion.p
            className="body-lg text-ink/60 dark:text-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We combine a physical pan-India media network with AI-powered planning tools that no
            traditional agency can match.
          </motion.p>
        </div>

        {/* Story blocks */}
        <div className="space-y-8 mb-24">
          {reasons.map((reason, i) => (
            <ReasonRow key={reason.title} reason={reason} index={i} />
          ))}
        </div>

        {/* Features grid */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-500/5 to-cyan-brand/5 border border-violet-500/15 p-10">
          <h3 className="text-center font-bold text-xl text-ink dark:text-white mb-8">
            Everything you need to run{' '}
            <span className="gradient-text font-serif italic">great campaigns</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-violet-500" aria-hidden />
                </div>
                <span className="text-sm font-medium text-ink dark:text-white">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
