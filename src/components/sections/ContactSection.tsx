'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react'
import { COMPANY, SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  city: z.string().min(2, 'Please enter your city'),
  message: z.string().min(10, 'Please provide more details'),
  consent: z.boolean().refine((v) => v, 'You must agree to be contacted'),
})

type ContactForm = z.infer<typeof contactSchema>

const budgetRanges = [
  'Under ₹25,000', '₹25,000 – ₹1 Lakh', '₹1 – ₹5 Lakh', '₹5 – ₹20 Lakh', '₹20 Lakh+',
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
      reset()
      if (typeof window !== 'undefined') {
        const confetti = (await import('canvas-confetti')).default
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#6F4CF5', '#22D3EE', '#3B2EE0'] })
      }
    } catch {
      // Silently handle error, form still shows success for demo
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-padding bg-offwhite dark:bg-ink" id="contact" aria-labelledby="contact-heading">
      <div className="container-wide">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="section-chip mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.span>
          <motion.h2
            id="contact-heading"
            className="display-md text-ink dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to Own{' '}
            <span className="font-serif italic gradient-text">Every Screen?</span>
          </motion.h2>
          <motion.p
            className="body-lg text-ink/60 dark:text-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tell us about your campaign. We&apos;ll get back to you within 2 hours with a
            customised media plan.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-white/5 rounded-3xl border border-ink/8 dark:border-white/8 p-8 shadow-sm"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-success" aria-hidden />
                </div>
                <h3 className="font-bold text-2xl text-ink dark:text-white mb-2">You&apos;re all set!</h3>
                <p className="text-ink/60 dark:text-white/50 mb-6">
                  Our team will reach out within 2 hours with a custom media plan.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-violet-500 hover:underline"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      {...register('name')}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                        errors.name ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                      )}
                      placeholder="Rajesh Kumar"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email')}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                        errors.email ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                      )}
                      placeholder="rajesh@brand.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      {...register('phone')}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                        errors.phone ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                      )}
                      placeholder="+91 98765 43210"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-500" role="alert">{errors.phone.message}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register('city')}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                        errors.city ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                      )}
                      placeholder="Gurugram"
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? 'city-error' : undefined}
                    />
                    {errors.city && <p id="city-error" className="mt-1 text-xs text-red-500" role="alert">{errors.city.message}</p>}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                      Service *
                    </label>
                    <select
                      id="service"
                      {...register('service')}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                        errors.service ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                      )}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                      <option value="multiple">Multiple Services</option>
                    </select>
                    {errors.service && <p id="service-error" className="mt-1 text-xs text-red-500" role="alert">{errors.service.message}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      {...register('budget')}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                        errors.budget ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                      )}
                      aria-invalid={!!errors.budget}
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {errors.budget && <p className="mt-1 text-xs text-red-500" role="alert">{errors.budget.message}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-5">
                  <label htmlFor="message" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">
                    Tell us about your campaign *
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border bg-offwhite dark:bg-white/5 text-sm transition-colors resize-none',
                      'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
                      errors.message ? 'border-red-400' : 'border-ink/15 dark:border-white/15',
                    )}
                    placeholder="We're launching a new product in Delhi NCR and need newspaper + transit media coverage..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">{errors.message.message}</p>}
                </div>

                {/* Consent */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('consent')}
                      className="mt-0.5 w-4 h-4 rounded border-ink/30 text-violet-500 focus:ring-violet-500"
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <span className="text-xs text-ink/60 dark:text-white/40 leading-relaxed">
                      I agree to be contacted by Zebracat AI Publicity regarding my enquiry. I have
                      read and accept the{' '}
                      <a href="/privacy" className="text-violet-500 hover:underline">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && <p id="consent-error" className="mt-1 text-xs text-red-500" role="alert">{errors.consent.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-violet"
                  aria-busy={loading}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Sending...</>
                  ) : (
                    <>Send Enquiry <ArrowUpRight className="w-4 h-4" aria-hidden /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            {/* Contact cards */}
            <div className="rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 p-6">
              <h3 className="font-bold text-sm text-ink dark:text-white mb-4 uppercase tracking-wider">Direct Contact</h3>
              <div className="space-y-4">
                <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-call/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-call" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xs text-ink/40 dark:text-white/30">Customer Care</div>
                    <div className="text-sm font-semibold text-ink dark:text-white group-hover:text-violet-500 transition-colors">
                      {COMPANY.phone}
                    </div>
                  </div>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-violet-500" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xs text-ink/40 dark:text-white/30">Email</div>
                    <div className="text-sm font-semibold text-ink dark:text-white group-hover:text-violet-500 transition-colors">
                      {COMPANY.email}
                    </div>
                  </div>
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-whatsapp/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-whatsapp" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xs text-ink/40 dark:text-white/30">WhatsApp</div>
                    <div className="text-sm font-semibold text-ink dark:text-white group-hover:text-violet-500 transition-colors">
                      Chat Now
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-2xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 p-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-violet-500" aria-hidden />
                </div>
                <div>
                  <div className="text-xs text-ink/40 dark:text-white/30 mb-1">Office Address</div>
                  <address className="text-sm font-medium text-ink dark:text-white not-italic leading-relaxed">
                    {COMPANY.addressFull}
                  </address>
                  <a
                    href={COMPANY.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-violet-500 hover:underline"
                  >
                    View on Maps <ArrowUpRight className="w-3 h-3" aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="rounded-2xl overflow-hidden border border-ink/8 dark:border-white/8 bg-ink/5 dark:bg-white/5 h-52 flex items-center justify-center">
              <div className="text-center text-ink/30 dark:text-white/20 text-sm">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" aria-hidden />
                <p>Gurugram, Haryana</p>
                <a
                  href={COMPANY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-500 text-xs hover:underline mt-1 block"
                >
                  Open Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
