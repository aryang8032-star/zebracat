'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Newspaper, Radio, Tv, Film, Monitor, Users,
  Building2, Bus, ArrowUpRight, Zap
} from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  newspaper: Newspaper,
  radio: Radio,
  tv: Tv,
  film: Film,
  monitor: Monitor,
  'monitor-dot': Monitor,
  users: Users,
  'building-2': Building2,
  bus: Bus,
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const Icon = iconMap[service.icon] || Monitor
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          'group relative flex flex-col h-full p-6 rounded-2xl border transition-all duration-300',
          'bg-white dark:bg-ink/50',
          'border-ink/8 dark:border-white/8',
          'hover:border-violet-500/40 hover:shadow-card-hover hover:-translate-y-1',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
        )}
        aria-label={`Learn more about ${service.name}`}
      >
        {/* Gradient border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${service.color}20, transparent)`,
          }}
          aria-hidden
        />

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${service.color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: service.color }} aria-hidden />
        </div>

        {/* Service name */}
        <h3 className="font-bold text-ink dark:text-white mb-2 leading-tight group-hover:text-violet-500 transition-colors">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink/60 dark:text-white/50 leading-relaxed mb-4 flex-1">
          {service.description}
        </p>

        {/* Promise badge */}
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-3 h-3 text-violet-500 flex-shrink-0" aria-hidden />
          <span className="text-xs font-semibold text-violet-500">
            {service.promise}
          </span>
        </div>

        {/* Stats + CTA row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink/8 dark:border-white/8">
          <span className="text-xs font-mono text-ink/40 dark:text-white/30">
            {service.stats}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-violet-500 group-hover:gap-2 transition-all">
            Explore <ArrowUpRight className="w-3 h-3" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function ServicesGrid() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-padding bg-offwhite dark:bg-ink" id="services" aria-labelledby="services-heading">
      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-chip mb-4">What We Do</span>
          </motion.div>
          <motion.h2
            id="services-heading"
            className="display-md text-ink dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every Media Surface.{' '}
            <span className="font-serif italic gradient-text">One Platform.</span>
          </motion.h2>
          <motion.p
            className="body-lg text-ink/60 dark:text-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From your morning newspaper to the LED screen outside your competitor&apos;s store —
            Zebracat plans, books, and runs it all. AI-powered, human-led.
          </motion.p>
        </div>

        {/* Services bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet hover:shadow-violet-lg"
          >
            Book a Campaign Now
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
          <p className="mt-3 text-sm text-ink/40 dark:text-white/30">
            No commitment. Get a quote in minutes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
