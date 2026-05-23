import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().email().max(200) })

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 3
const ipHits = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipHits.get(ip)
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count += 1
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 })
    }

    const { email } = schema.parse(await req.json())

    // CRM webhook (optional) — forward subscriber to whatever list system is wired up.
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'website-newsletter', timestamp: new Date().toISOString() }),
      }).catch(() => { /* non-blocking */ })
    }

    // Resend confirmation (optional)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Zebracat <noreply@zebracatindia.com>',
        to: 'info@zebracatindia.com',
        subject: `Newsletter signup: ${email}`,
        text: `New newsletter subscription from ${email}`,
      }).catch(() => { /* non-blocking */ })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
