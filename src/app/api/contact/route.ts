import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(10).max(20),
  service: z.string().min(1).max(60),
  budget: z.string().min(1).max(60),
  city: z.string().min(2).max(60),
  message: z.string().min(10).max(2000),
  consent: z.boolean(),
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Simple in-memory IP rate limit: 5 requests per 10 minutes per IP.
// In production replace with Upstash/Redis or Vercel KV for multi-instance safety.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const ipHits = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = ipHits.get(ip)
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count += 1
  return { allowed: true }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
    const limit = rateLimit(ip)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter ?? 60) } },
      )
    }

    const body = await req.json()
    const data = contactSchema.parse(body)

    if (!data.consent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 })
    }

    // Escape every user-supplied field before placing into the HTML email body.
    const safe = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone),
      service: escapeHtml(data.service),
      budget: escapeHtml(data.budget),
      city: escapeHtml(data.city),
      message: escapeHtml(data.message).replace(/\n/g, '<br/>'),
    }

    // Email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Zebracat Website <noreply@zebracatindia.com>',
        to: 'info@zebracatindia.com',
        reply_to: data.email,
        subject: `New Enquiry: ${safe.name} — ${safe.service}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6F4CF5;">New Campaign Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safe.name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safe.email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safe.phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safe.service}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safe.budget}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">City</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safe.city}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${safe.message}</td></tr>
            </table>
          </div>
        `,
      })
    }

    // CRM webhook (optional)
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'website-contact-form', timestamp: new Date().toISOString() }),
      }).catch(() => { /* non-blocking */ })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 })
    }
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
