'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMessage(null)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.error ?? 'Subscription failed')
      }
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Could not subscribe right now. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-success font-medium py-3" role="status">
        You&apos;re subscribed. Check your inbox to confirm.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className ?? ''}`} noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        aria-label="Email for newsletter"
        aria-invalid={status === 'error'}
        className="flex-1 px-4 py-2.5 rounded-full border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-2.5 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden /> Subscribing</>
        ) : (
          'Subscribe'
        )}
      </button>
      {errorMessage && (
        <span className="sr-only" role="alert">{errorMessage}</span>
      )}
    </form>
  )
}
