import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sanityWriteClient, canWriteToSanity } from '@/lib/sanityWriteClient'

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().optional().default(''),
  service: z.string().min(1),
  cities: z.array(z.string()).min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  slot: z.string().min(1),
  hasCreative: z.boolean(),
  wantsAiCreative: z.boolean(),
  creativeName: z.string().optional(),
  priceBreakdown: z.object({
    base: z.number(),
    slots: z.number(),
    production: z.number(),
    gst: z.number(),
    total: z.number(),
  }),
  consent: z.boolean().optional().default(true),
})

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)
    const submittedAt = new Date().toISOString()

    // Email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Zebracat Website <noreply@zebracatindia.com>',
        to: 'info@zebracatindia.com',
        subject: `New Booking Request: ${data.name} — ${data.service} (${inr(data.priceBreakdown.total)})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6F4CF5;">New Booking Wizard Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Medium</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Cities</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.cities.join(', ')}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Dates</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.startDate} → ${data.endDate}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Slot</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.slot}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Creative</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.wantsAiCreative ? 'AI-generated' : data.creativeName || 'Uploaded'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Base</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inr(data.priceBreakdown.base)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Slot Premium</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inr(data.priceBreakdown.slots)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Production</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inr(data.priceBreakdown.production)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">GST</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${inr(data.priceBreakdown.gst)}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; font-size: 16px;">Total</td><td style="padding: 8px; font-size: 16px; color: #6F4CF5; font-weight: bold;">${inr(data.priceBreakdown.total)}</td></tr>
            </table>
          </div>
        `,
      })
    }

    // Persist to Sanity (best-effort)
    if (canWriteToSanity()) {
      await sanityWriteClient
        .create({
          _type: 'inquiry',
          kind: 'booking',
          status: 'new',
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city || data.cities[0] || '',
          service: data.service,
          budget: String(data.priceBreakdown.total),
          mediums: [data.service],
          cities: data.cities,
          startDate: data.startDate,
          endDate: data.endDate,
          slot: data.slot,
          hasCreative: data.hasCreative,
          wantsAiCreative: data.wantsAiCreative,
          priceBreakdown: data.priceBreakdown,
          source: 'website-booking-wizard',
          submittedAt,
        })
        .catch((err) => {
          console.error('Sanity write failed:', err)
        })
    }

    // CRM webhook (optional)
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'website-booking-wizard', submittedAt }),
      }).catch(() => { /* non-blocking */ })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 })
    }
    console.error('Booking form error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
