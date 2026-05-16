'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { COMPANY, SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const HeroScene = dynamic(
  () => import('@/components/3d/HeroScene').then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#1a1035] to-violet-900/30" aria-hidden /> }
)

const heroWords = SERVICES.map((s) => s.heroWord)
const heroColors = [
  '#6F4CF5', '#22D3EE', '#3B2EE0', '#F59E0B',
  '#10B981', '#6F4CF5', '#EC4899', '#F97316', '#14B8A6',
]

const stats = [
  { value: `₹${COMPANY.stats.mediaManagedCr} Cr+`, label: 'media handled' },
  { value: COMPANY.stats.brands, label: 'brands served' },
  { value: `${COMPANY.stats.states} states`, label: 'pan-India reach' },
  { value: `${COMPANY.rating}★`, label: `${COMPANY.reviewCount} reviews` },
]

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayWord, setDisplayWord] = useState(heroWords[0])
  const [isChanging, setIsChanging] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - left) / width - 0.5) * 60)
    mouseY.set(((e.clientY - top) / height - 0.5) * 60)
  }

  useEffect(() => {
    if (prefersReducedMotion) return

    intervalRef.current = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % heroWords.length
          setDisplayWord(heroWords[next])
          return next
        })
        setIsChanging(false)
      }, 300)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [prefersReducedMotion])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-ink"
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
    >
      {/* 3D Background scene */}
      <HeroScene activeIndex={activeIndex} />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80 pointer-events-none"
        aria-hidden
      />

      {/* Spring parallax glow — follows cursor with spring physics */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            x: springX,
            y: springY,
            top: 'calc(50% - 300px)',
            left: 'calc(50% - 300px)',
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${heroColors[activeIndex]}22 0%, transparent 65%)`,
            filter: 'blur(90px)',
          }}
          aria-hidden
        />
      )}

      {/* Animated mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${heroColors[activeIndex]}18 0%, transparent 60%),
                       radial-gradient(ellipse at 70% 20%, #22D3EE10 0%, transparent 50%)`,
          transition: 'background 1s ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl">
          {/* Section chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/15 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand animate-pulse" aria-hidden />
              <span className="text-cyan-brand text-xs font-semibold tracking-widest uppercase font-sans">
                India&apos;s 360° Media Growth Engine
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <h1 className="display-xl text-white mb-6 text-balance">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block"
            >
              Book Your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block"
            >
              <span className="relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayWord}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20, filter: 'blur(8px)' }}
                    transition={{ duration: 0.4 }}
                    className="font-serif italic"
                    style={{
                      background: `linear-gradient(135deg, ${heroColors[activeIndex]}, #22D3EE)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    aria-live="polite"
                  >
                    {displayWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="block text-white/90"
            >
              Instantly — Fast, Easy &amp; Affordable.
            </motion.span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="body-lg text-white/60 max-w-2xl mb-10"
          >
            Pan-India network · AI-powered planning · Human-supported execution.
            From Gurugram to Guwahati — one platform to own every media surface.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/book"
              className="group inline-flex items-stretch rounded-full overflow-hidden shadow-violet hover:shadow-violet-lg transition-shadow duration-300"
            >
              <span className="flex items-center gap-2 bg-violet-500 group-hover:bg-violet-600 text-white font-semibold px-7 py-4 text-base transition-colors">
                Get Instant Quote
              </span>
              <span className="flex items-center justify-center bg-violet-600 group-hover:bg-violet-700 text-white px-4 transition-colors" aria-hidden>
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full border-2 border-white/25 text-white hover:border-white/50 hover:bg-white/10 backdrop-blur-sm font-semibold px-6 py-3.5 text-base transition-all duration-300"
            >
              Talk to a Strategist
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100" aria-hidden />
            </Link>
          </motion.div>

          {/* Service medium pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-2"
          >
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveIndex(i)
                  setDisplayWord(s.heroWord)
                }}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300',
                  activeIndex === i
                    ? 'border-violet-500 bg-violet-500/20 text-white'
                    : 'border-white/15 bg-white/5 text-white/50 hover:border-white/30 hover:text-white/70',
                )}
                aria-pressed={activeIndex === i}
              >
                {s.shortName}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats ticker bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 overflow-x-auto no-scrollbar gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                {i > 0 && <div className="w-px h-6 bg-white/10" aria-hidden />}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-lg font-bold text-white">{stat.value}</span>
                  <span className="text-white/40 text-xs">{stat.label}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
              <div className="w-px h-6 bg-white/10" aria-hidden />
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" aria-hidden />
                <span className="font-mono text-sm font-bold text-white">{COMPANY.rating}</span>
                <span className="text-white/40 text-xs">/ {COMPANY.reviewCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-white/30 text-xs font-sans tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-violet-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
