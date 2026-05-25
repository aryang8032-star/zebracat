'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { FAQS, COMPANY } from '@/lib/constants'
import { cn } from '@/lib/utils'

const categories = ['All', 'Booking', 'Payments', 'Creative', 'Reporting']

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section className="section-padding bg-white dark:bg-ink/80" id="faqs" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container-wide">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left: header */}
          <div ref={ref} className="lg:sticky lg:top-28">
            <motion.span
              className="section-chip mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              FAQs
            </motion.span>
            <motion.h2
              id="faq-heading"
              className="display-md text-ink dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Got Questions?{' '}
              <span className="font-serif italic gradient-text">We have answers.</span>
            </motion.h2>
            <motion.p
              className="text-ink/60 dark:text-white/50 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Everything you need to know about booking campaigns with Zebracat. Can&apos;t find
              your answer? Chat with our team instantly.
            </motion.p>

            {/* Mini assistant */}
            <motion.div
              className="rounded-2xl bg-violet-500/10 border border-violet-500/20 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-violet-500" aria-hidden />
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink dark:text-white">Ask Zebracat</div>
                  <div className="text-xs text-ink/50 dark:text-white/40">Get instant answers</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Hi, I have a question about advertising with Zebracat.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Category filter */}
            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                    activeCategory === cat
                      ? 'bg-violet-500 text-white border-violet-500'
                      : 'border-ink/15 dark:border-white/15 text-ink/60 dark:text-white/50 hover:border-violet-500/50',
                  )}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: accordion */}
          <div className="space-y-3" role="list" aria-label="Frequently asked questions">
            <AnimatePresence mode="wait">
              {filtered.map((faq, i) => (
                <motion.div
                  key={`${activeCategory}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  role="listitem"
                >
                  <div
                    className={cn(
                      'rounded-xl border transition-all duration-300',
                      openIndex === i
                        ? 'border-violet-500/30 bg-violet-500/5 dark:bg-violet-500/10'
                        : 'border-ink/8 dark:border-white/8 bg-white dark:bg-white/5',
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex items-start justify-between w-full text-left px-5 py-4 gap-4"
                      aria-expanded={openIndex === i}
                      id={`faq-question-${i}`}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-semibold text-violet-500/60 mt-0.5 flex-shrink-0 font-mono">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-semibold text-sm text-ink dark:text-white leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-ink/40 dark:text-white/40 flex-shrink-0 mt-0.5 transition-transform duration-300',
                          openIndex === i && 'rotate-180 text-violet-500',
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pl-14 text-sm text-ink/60 dark:text-white/50 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
