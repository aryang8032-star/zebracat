'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { TrendingUp, Award, MapPin, Star } from 'lucide-react'

const stats = [
  {
    icon: TrendingUp,
    value: 50,
    suffix: ' Cr+',
    prefix: '₹',
    label: 'Media Managed',
    description: 'Total media value planned and booked across all channels',
    color: '#6F4CF5',
  },
  {
    icon: Award,
    value: 1200,
    suffix: '+',
    label: 'Brands Served',
    description: 'Startups, SMEs and enterprise brands trust Zebracat',
    color: '#22D3EE',
  },
  {
    icon: MapPin,
    value: 28,
    suffix: ' States',
    label: 'Pan-India Reach',
    description: 'Active campaigns running across all major Indian states',
    color: '#10B981',
  },
  {
    icon: Star,
    value: 95,
    suffix: '%',
    label: 'On-Time Delivery',
    description: 'Campaigns delivered on schedule, every time',
    color: '#F59E0B',
  },
]

function StatCard({
  icon: Icon, value, suffix, prefix = '', label, description, color, index
}: typeof stats[0] & { index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Gauge SVG */}
      <div className="relative mb-6">
        <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
          <circle cx="40" cy="40" r="32" fill="none" stroke={`${color}20`} strokeWidth="4" />
          {inView && (
            <motion.circle
              cx="40" cy="40" r="32"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - Math.min(value / 100, 1))}`}
              transform="rotate(-90 40 40)"
              initial={{ strokeDashoffset: `${2 * Math.PI * 32}` }}
              animate={{ strokeDashoffset: `${2 * Math.PI * 32 * (1 - Math.min(value / 100, 1))}` }}
              transition={{ duration: 1.5, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
            />
          )}
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}12` }}
        >
          <Icon className="w-7 h-7" style={{ color }} aria-hidden />
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <span className="font-mono font-bold text-4xl text-ink dark:text-white" aria-label={`${prefix}${value}${suffix}`}>
          {prefix}
          {inView ? (
            <CountUp end={value} duration={2} delay={index * 0.12} separator="," />
          ) : '0'}
          {suffix}
        </span>
      </div>

      <h3 className="font-bold text-ink dark:text-white mb-2">{label}</h3>
      <p className="text-sm text-ink/50 dark:text-white/40 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-padding bg-offwhite dark:bg-ink relative overflow-hidden" aria-labelledby="stats-heading">
      {/* Background mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-40 dark:opacity-20 pointer-events-none" aria-hidden />

      <div className="container-wide relative">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="section-chip mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            By the Numbers
          </motion.span>
          <motion.h2
            id="stats-heading"
            className="display-md text-ink dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Numbers That Prove{' '}
            <span className="font-serif italic gradient-text">the Impact</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
