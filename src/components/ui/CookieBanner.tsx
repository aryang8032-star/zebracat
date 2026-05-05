'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('zc-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('zc-cookie-consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('zc-cookie-consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className={cn(
        'fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9000]',
        'bg-white dark:bg-ink border border-violet-500/20 rounded-2xl shadow-violet p-5',
        'animate-in slide-in-from-bottom-4 duration-500',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <Cookie className="w-5 h-5 text-violet-500" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <h2 id="cookie-banner-title" className="font-semibold text-sm text-ink dark:text-offwhite mb-1">
            We use cookies
          </h2>
          <p id="cookie-banner-desc" className="text-xs text-ink/60 dark:text-white/50 leading-relaxed">
            We use cookies to personalise content and analyse traffic. No tracking until you consent.{' '}
            <a href="/privacy" className="text-violet-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
        <button
          onClick={decline}
          aria-label="Close cookie banner"
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-ink/40 hover:text-ink dark:text-white/40 dark:hover:text-white hover:bg-ink/5"
        >
          <X className="w-3.5 h-3.5" aria-hidden />
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="ghost" size="sm" onClick={decline} className="flex-1 text-xs">
          Decline
        </Button>
        <Button variant="primary" size="sm" onClick={accept} className="flex-1 text-xs">
          Accept All
        </Button>
      </div>
    </div>
  )
}
