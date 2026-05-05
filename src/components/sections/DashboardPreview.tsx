'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Users, Eye, BarChart3, Globe2, Zap } from 'lucide-react'

function AnimatedBar({ value, max, color }: { value: number; max: number; color: string }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const pct = (value / max) * 100

  return (
    <div ref={ref} className="w-full bg-ink/8 dark:bg-white/8 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  )
}

function MetricCard({
  icon: Icon, label, value, change, color
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
  change: string
  color: string
}) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-ink/50 dark:text-white/40">{label}</span>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} aria-hidden />
        </div>
      </div>
      <div className="font-mono font-bold text-xl text-ink dark:text-white mb-1">{value}</div>
      <div className="text-xs text-success font-medium">{change}</div>
    </div>
  )
}

const cityData = [
  { city: 'Delhi NCR', impressions: 4200000, color: '#6F4CF5' },
  { city: 'Mumbai', impressions: 3800000, color: '#22D3EE' },
  { city: 'Bangalore', impressions: 2900000, color: '#10B981' },
  { city: 'Hyderabad', impressions: 1800000, color: '#F59E0B' },
  { city: 'Chennai', impressions: 1500000, color: '#EC4899' },
]

export function DashboardPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => setTick((t) => t + 1), 2000)
    return () => clearInterval(interval)
  }, [inView])

  const impressions = 14200000 + tick * 12847
  const reach = 8400000 + tick * 7234
  const grp = 245 + tick * 0.3

  return (
    <section className="section-padding bg-white dark:bg-ink/80" aria-labelledby="dashboard-heading">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div ref={ref}>
            <motion.span
              className="section-chip mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Campaign Intelligence
            </motion.span>
            <motion.h2
              id="dashboard-heading"
              className="display-md text-ink dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Campaign.{' '}
              <span className="font-serif italic gradient-text">Live. Always.</span>
            </motion.h2>
            <motion.p
              className="body-lg text-ink/60 dark:text-white/50 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Every Zebracat campaign comes with a real-time intelligence dashboard. Track
              impressions, GRP, CPM, city-wise reach and frequency — all updating live.
            </motion.p>
            <motion.ul
              className="space-y-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                'Real-time impressions counter',
                'City-wise reach breakdown',
                'GRP and CPM tracking for TV/Radio',
                'Weekly automated email reports',
                'Campaign-end wrap deck',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink/70 dark:text-white/60">
                  <Zap className="w-4 h-4 text-violet-500 flex-shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: dashboard mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl bg-offwhite dark:bg-ink/50 border border-ink/10 dark:border-white/10 shadow-card overflow-hidden"
            role="img"
            aria-label="Campaign dashboard preview showing live metrics"
          >
            {/* Dashboard header */}
            <div className="px-5 py-3 border-b border-ink/8 dark:border-white/8 flex items-center justify-between bg-white dark:bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-success" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-ink/40 dark:text-white/30 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden />
                LIVE — Campaign #ZC-2024-1842
              </div>
            </div>

            <div className="p-5">
              {/* Metrics row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <MetricCard
                  icon={Eye}
                  label="Total Impressions"
                  value={`${(impressions / 1000000).toFixed(1)}M`}
                  change={`+${(tick * 12847).toLocaleString()} today`}
                  color="#6F4CF5"
                />
                <MetricCard
                  icon={Users}
                  label="Unique Reach"
                  value={`${(reach / 1000000).toFixed(1)}M`}
                  change="↑ 12% vs target"
                  color="#22D3EE"
                />
                <MetricCard
                  icon={BarChart3}
                  label="GRP"
                  value={grp.toFixed(1)}
                  change="↑ 8% above plan"
                  color="#10B981"
                />
                <MetricCard
                  icon={TrendingUp}
                  label="CPM"
                  value="₹145"
                  change="↓ 18% below target"
                  color="#F59E0B"
                />
              </div>

              {/* City breakdown */}
              <div className="rounded-xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-ink/60 dark:text-white/50 uppercase tracking-wider">City Performance</span>
                  <Globe2 className="w-3.5 h-3.5 text-ink/30 dark:text-white/30" aria-hidden />
                </div>
                <div className="space-y-3">
                  {cityData.map((item) => (
                    <div key={item.city}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-ink dark:text-white">{item.city}</span>
                        <span className="text-xs font-mono text-ink/50 dark:text-white/40">
                          {(item.impressions / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <AnimatedBar
                        value={item.impressions}
                        max={cityData[0].impressions}
                        color={item.color}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
