'use client'

import { useState } from 'react'

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm text-success font-medium py-3">
        ✓ You&apos;re subscribed! Check your inbox.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className ?? ''}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-label="Email for newsletter"
        className="flex-1 px-4 py-2.5 rounded-full border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
