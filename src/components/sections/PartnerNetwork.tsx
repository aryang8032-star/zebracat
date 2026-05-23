'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Zap, Users, TrendingUp, Gift, ArrowUpRight, Star } from 'lucide-react'
import { ZAP_STAR } from '@/lib/constants'

const states = [
  { name: 'Delhi', x: 40, y: 28, partners: 48 },
  { name: 'Haryana', x: 38, y: 30, partners: 32 },
  { name: 'UP', x: 48, y: 30, partners: 55 },
  { name: 'Rajasthan', x: 33, y: 38, partners: 28 },
  { name: 'Maharashtra', x: 35, y: 55, partners: 67 },
  { name: 'Gujarat', x: 28, y: 50, partners: 43 },
  { name: 'Karnataka', x: 37, y: 68, partners: 52 },
  { name: 'TN', x: 40, y: 76, partners: 44 },
  { name: 'WB', x: 62, y: 40, partners: 38 },
  { name: 'Punjab', x: 35, y: 22, partners: 25 },
  { name: 'MP', x: 42, y: 46, partners: 36 },
  { name: 'AP', x: 43, y: 66, partners: 41 },
]

const benefits = [
  { icon: Gift, title: 'Co-branded Campaigns', desc: 'Run Zebracat-powered campaigns under your own brand name.' },
  { icon: TrendingUp, title: 'Revenue Sharing', desc: 'Earn 8–15% commission on every referral you bring.' },
  { icon: Users, title: 'Priority Booking', desc: 'Skip the queue — your clients get first access to inventory.' },
  { icon: Star, title: 'Free Creative Support', desc: 'Full creative assistance at no extra cost for partners.' },
]

export function PartnerNetwork() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-padding bg-ink text-white relative overflow-hidden" id="partners" aria-labelledby="partner-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80 pointer-events-none" aria-hidden />

      <div className="container-wide relative">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/40 bg-violet-400/10 mb-4"
          >
            <Zap className="w-3.5 h-3.5 text-violet-400" aria-hidden />
            <span className="text-violet-400 text-xs font-semibold tracking-widest uppercase">ZAP STAR</span>
          </motion.div>
          <motion.h2
            id="partner-heading"
            className="display-md text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Powering Your Success{' '}
            <span className="font-serif italic text-violet-400">Nationwide</span>
          </motion.h2>
          <motion.p
            className="body-lg text-white/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {ZAP_STAR.tagline}
          </motion.p>
          <motion.p
            className="text-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {ZAP_STAR.description}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* India map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
            aria-label="Partner network map of India"
          >
            <div className="relative rounded-3xl bg-white/5 border border-white/10 p-8 aspect-[4/5] max-w-sm mx-auto overflow-hidden">
              {/* SVG map placeholder */}
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full"
                aria-label="Map showing partner locations across India"
              >
                {/* Simplified India outline */}
                <path
                  d="M45,8 L55,8 L65,15 L70,25 L72,35 L68,45 L72,55 L70,65 L65,72 L60,80 L55,88 L50,95 L45,88 L40,80 L35,72 L30,65 L28,55 L32,45 L28,35 L30,25 L35,15 Z"
                  fill="rgba(111,76,245,0.15)"
                  stroke="rgba(111,76,245,0.4)"
                  strokeWidth="0.8"
                />
                {/* State pins */}
                {states.map((state, i) => (
                  <g key={state.name}>
                    <motion.circle
                      cx={state.x}
                      cy={state.y}
                      r="2.5"
                      fill="#6F4CF5"
                      opacity={0.8}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.06, type: 'spring' }}
                    />
                    <motion.circle
                      cx={state.x}
                      cy={state.y}
                      r="5"
                      fill="none"
                      stroke="#6F4CF5"
                      strokeWidth="0.5"
                      opacity={0.3}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] } : {}}
                      transition={{ delay: 0.5 + i * 0.06, repeat: Infinity, duration: 2 }}
                    />
                  </g>
                ))}
              </svg>

              {/* Overlay stats */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                {[
                  { label: 'States', value: '28' },
                  { label: 'Partners', value: '500+' },
                  { label: 'Cities', value: '200+' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-black/40 backdrop-blur-sm p-3 text-center">
                    <div className="font-mono font-bold text-violet-400 text-lg">{value}</div>
                    <div className="text-white/40 text-2xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Benefits grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-violet-400" aria-hidden />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/zap-star"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors shadow-violet"
              >
                Join ZAP STAR <ArrowUpRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link
                href={ZAP_STAR.deckUrl}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all"
              >
                Request Deck
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
