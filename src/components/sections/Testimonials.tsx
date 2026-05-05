'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, MapPin } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative p-6 rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-3.5 h-3.5',
              i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-ink/20 dark:text-white/20',
            )}
            aria-hidden
          />
        ))}
      </div>

      {/* Quote icon */}
      <Quote className="w-6 h-6 text-violet-500/30 mb-3" aria-hidden />

      {/* Review text */}
      <blockquote className="text-sm text-ink/70 dark:text-white/60 leading-relaxed mb-5 italic">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm text-ink dark:text-white">{testimonial.name}</div>
          <div className="text-xs text-ink/50 dark:text-white/40">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-500 bg-violet-500/10 px-2.5 py-1 rounded-full">
            {testimonial.medium}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-ink/40 dark:text-white/30">
            <MapPin className="w-3 h-3" aria-hidden />
            {testimonial.city}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const prefersReducedMotion = useReducedMotion()

  const aggregateSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Organization',
      name: 'Zebracat AI Publicity',
    },
    ratingValue: '4.5',
    reviewCount: '450',
    bestRating: '5',
  }

  return (
    <section className="section-padding bg-offwhite dark:bg-ink" id="testimonials" aria-labelledby="testimonials-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }} />

      <div className="container-wide">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="section-chip mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Client Stories
          </motion.span>
          <motion.h2
            id="testimonials-heading"
            className="display-md text-ink dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real Brands.{' '}
            <span className="font-serif italic gradient-text">Real Results.</span>
          </motion.h2>

          {/* Aggregate rating */}
          <motion.div
            className="inline-flex items-center gap-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-1" aria-label="4.5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn('w-4 h-4', i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400/50')}
                  aria-hidden
                />
              ))}
            </div>
            <span className="font-mono font-bold text-ink dark:text-white">4.5</span>
            <span className="text-sm text-ink/50 dark:text-white/40">/ 450+ verified reviews</span>
          </motion.div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
