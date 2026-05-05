'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, Zap, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { COMPANY } from '@/lib/constants'

const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`

export function FloatingActions() {
  const [bookOpen, setBookOpen] = useState(false)

  return (
    <div className="fixed bottom-6 z-[90] flex items-end justify-between w-full px-4 pointer-events-none" aria-label="Floating action buttons">
      {/* Call button — bottom left */}
      <a
        href={`tel:${COMPANY.phoneRaw}`}
        aria-label={`Call Zebracat at ${COMPANY.phone}`}
        className="pointer-events-auto flex items-center gap-2 bg-call text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 py-3 px-4 font-semibold text-sm"
      >
        <Phone className="w-4 h-4" aria-hidden />
        <span className="hidden sm:inline">Call Us</span>
      </a>

      {/* Book Ad button — bottom center */}
      <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-0">
        <div className="relative">
          <button
            onClick={() => setBookOpen(!bookOpen)}
            aria-label="Book an ad campaign"
            aria-expanded={bookOpen}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-deep text-white rounded-full shadow-violet hover:shadow-violet-lg hover:scale-105 transition-all duration-300 py-3 px-5 font-semibold text-sm"
          >
            <Zap className="w-4 h-4" aria-hidden />
            Book Ad
            {bookOpen ? <X className="w-3.5 h-3.5" aria-hidden /> : <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />}
          </button>

          <AnimatePresence>
            {bookOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white dark:bg-ink border border-violet-500/20 rounded-2xl shadow-violet p-4 w-64"
                role="menu"
                aria-label="Booking options"
              >
                <p className="text-xs font-semibold text-ink/50 dark:text-white/40 uppercase tracking-wider mb-3">
                  Start Your Campaign
                </p>
                <div className="space-y-2">
                  <Link
                    href="/book"
                    role="menuitem"
                    onClick={() => setBookOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 font-medium text-sm transition-colors"
                  >
                    Get Instant Quote
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                  </Link>
                  <Link
                    href="/contact"
                    role="menuitem"
                    onClick={() => setBookOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-ink/5 dark:bg-white/5 hover:bg-ink/10 dark:hover:bg-white/10 text-ink dark:text-white font-medium text-sm transition-colors"
                  >
                    Talk to Strategist
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setBookOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-success/10 hover:bg-success/20 text-success font-medium text-sm transition-colors"
                  >
                    WhatsApp Us
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* WhatsApp — bottom right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Zebracat on WhatsApp"
        className="pointer-events-auto flex items-center gap-2 bg-whatsapp text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 py-3 px-4 font-semibold text-sm"
      >
        <MessageCircle className="w-4 h-4" aria-hidden />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  )
}
