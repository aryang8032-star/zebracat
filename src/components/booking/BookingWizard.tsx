'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronLeft, Check, Upload, CreditCard,
  Newspaper, Radio, Tv, Film, Monitor, Users, Building2, Bus, Zap, Info
} from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, label: 'Choose Medium' },
  { id: 2, label: 'Select Location' },
  { id: 3, label: 'Pick Dates' },
  { id: 4, label: 'Upload Creative' },
  { id: 5, label: 'Review & Pay' },
]

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  newspaper: Newspaper, radio: Radio, tv: Tv, film: Film, monitor: Monitor,
  'monitor-dot': Monitor, users: Users, 'building-2': Building2, bus: Bus,
}

const indianCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Gurugram', 'Noida', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Surat', 'Kochi', 'Bhopal', 'Indore', 'Nagpur',
  'Ratlam', 'Agra', 'Varanasi', 'Patna', 'Ranchi', 'Bhubaneswar',
]

const slotTypes = [
  { id: 'prime', label: 'Prime Time', desc: 'Peak audience hours', multiplier: 2.5 },
  { id: 'morning', label: 'Morning', desc: '6 AM – 11 AM', multiplier: 1.5 },
  { id: 'afternoon', label: 'Afternoon', desc: '11 AM – 5 PM', multiplier: 1.0 },
  { id: 'evening', label: 'Evening', desc: '5 PM – 9 PM', multiplier: 2.0 },
]

interface BookingState {
  service: string | null
  cities: string[]
  startDate: string
  endDate: string
  slotType: string
  creative: File | null
  aiCreativeHelp: boolean
  priceBreakdown: { base: number; slots: number; production: number; gst: number }
  name: string
  email: string
  phone: string
}

function computePrice(booking: BookingState) {
  const basePrice = 25000
  const multiplier = booking.cities.length || 1
  const slotMult = booking.slotType === 'prime' ? 2.5 : booking.slotType === 'evening' ? 2.0 : 1.5
  const base = basePrice * multiplier
  const slots = Math.round(base * (slotMult - 1))
  const production = booking.aiCreativeHelp ? 0 : 5000
  const subtotal = base + slots + production
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst
  return { base, slots, production, gst, total }
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Booking progress" className="flex items-center gap-1 mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-1 flex-1">
          <div
            className={cn(
              'flex items-center gap-2 flex-shrink-0',
              step.id <= currentStep ? 'text-violet-500' : 'text-ink/30 dark:text-white/30',
            )}
            aria-current={step.id === currentStep ? 'step' : undefined}
          >
            <div
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                step.id < currentStep
                  ? 'bg-violet-500 border-violet-500 text-white'
                  : step.id === currentStep
                    ? 'border-violet-500 text-violet-500 bg-violet-500/10'
                    : 'border-ink/20 dark:border-white/20 text-ink/30 dark:text-white/30',
              )}
            >
              {step.id < currentStep ? <Check className="w-3.5 h-3.5" aria-hidden /> : step.id}
            </div>
            <span className="text-xs font-medium hidden sm:block">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('flex-1 h-px mx-1', step.id < currentStep ? 'bg-violet-500' : 'bg-ink/10 dark:bg-white/10')} aria-hidden />
          )}
        </div>
      ))}
    </nav>
  )
}

function Step1({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  return (
    <div>
      <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Which medium do you want to advertise on?</h3>
      <p className="text-sm text-ink/50 dark:text-white/40 mb-6">Select one or start with your primary medium.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Advertising medium">
        {SERVICES.map((service) => {
          const Icon = iconMap[service.icon] || Monitor
          const selected = booking.service === service.id
          return (
            <button
              key={service.id}
              onClick={() => setBooking({ ...booking, service: service.id })}
              role="radio"
              aria-checked={selected}
              className={cn(
                'flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition-all',
                selected
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-ink/10 dark:border-white/10 hover:border-violet-500/40',
              )}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}20` }}>
                <Icon className="w-4.5 h-4.5" style={{ color: service.color }} aria-hidden />
              </div>
              <div>
                <div className="font-semibold text-sm text-ink dark:text-white">{service.shortName}</div>
                <div className="text-xs text-ink/40 dark:text-white/30 mt-0.5">{service.stats}</div>
              </div>
              {selected && <Check className="w-4 h-4 text-violet-500 ml-auto" aria-hidden />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Step2({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  const toggleCity = (city: string) => {
    const next = booking.cities.includes(city)
      ? booking.cities.filter((c) => c !== city)
      : [...booking.cities, city]
    setBooking({ ...booking, cities: next })
  }

  return (
    <div>
      <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Where should your campaign run?</h3>
      <p className="text-sm text-ink/50 dark:text-white/40 mb-6">
        Select one or multiple cities. Our AI will suggest optimal combinations based on your service.
      </p>

      {/* AI suggestion */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 mb-5">
        <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden />
        <p className="text-xs text-cyan-700 dark:text-cyan-300">
          <span className="font-semibold">AI Suggestion:</span> For your selected medium, Delhi, Gurugram and Noida typically yield 3× better recall when bundled together.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Select cities">
        {indianCities.map((city) => (
          <button
            key={city}
            onClick={() => toggleCity(city)}
            aria-pressed={booking.cities.includes(city)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium border transition-all',
              booking.cities.includes(city)
                ? 'bg-violet-500 text-white border-violet-500'
                : 'border-ink/15 dark:border-white/15 text-ink/70 dark:text-white/60 hover:border-violet-500/40',
            )}
          >
            {city}
          </button>
        ))}
      </div>

      {booking.cities.length > 0 && (
        <p className="mt-4 text-sm text-violet-500 font-medium">
          {booking.cities.length} cit{booking.cities.length === 1 ? 'y' : 'ies'} selected
        </p>
      )}
    </div>
  )
}

function Step3({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  return (
    <div>
      <h3 className="font-bold text-xl text-ink dark:text-white mb-2">When should your campaign run?</h3>
      <p className="text-sm text-ink/50 dark:text-white/40 mb-6">Choose your dates and preferred time slot.</p>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label htmlFor="start-date" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={booking.startDate}
            onChange={(e) => setBooking({ ...booking, startDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-xs font-semibold text-ink/60 dark:text-white/50 mb-1.5 uppercase tracking-wider">End Date</label>
          <input
            id="end-date"
            type="date"
            value={booking.endDate}
            onChange={(e) => setBooking({ ...booking, endDate: e.target.value })}
            min={booking.startDate || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-ink/60 dark:text-white/50 mb-3 uppercase tracking-wider">Time Slot Preference</p>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Time slot">
          {slotTypes.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setBooking({ ...booking, slotType: slot.id })}
              role="radio"
              aria-checked={booking.slotType === slot.id}
              className={cn(
                'flex flex-col items-start p-4 rounded-xl border text-left transition-all',
                booking.slotType === slot.id
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-ink/10 dark:border-white/10 hover:border-violet-500/30',
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-sm text-ink dark:text-white">{slot.label}</span>
                <span className="text-xs font-mono text-violet-500">{slot.multiplier}×</span>
              </div>
              <span className="text-xs text-ink/40 dark:text-white/30">{slot.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step4({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  return (
    <div>
      <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Upload your creative</h3>
      <p className="text-sm text-ink/50 dark:text-white/40 mb-6">Or let our AI Creative Studio generate it for you.</p>

      {/* AI help toggle */}
      <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-violet-500" aria-hidden />
            </div>
            <div>
              <div className="font-semibold text-sm text-ink dark:text-white">AI Creative Studio</div>
              <div className="text-xs text-ink/50 dark:text-white/40">Auto-generate copy, scripts & layouts</div>
            </div>
          </div>
          <button
            onClick={() => setBooking({ ...booking, aiCreativeHelp: !booking.aiCreativeHelp })}
            role="switch"
            aria-checked={booking.aiCreativeHelp}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              booking.aiCreativeHelp ? 'bg-violet-500' : 'bg-ink/20 dark:bg-white/20',
            )}
          >
            <span
              className={cn(
                'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all',
                booking.aiCreativeHelp ? 'left-7' : 'left-1',
              )}
            />
          </button>
        </div>
      </div>

      {/* File upload */}
      {!booking.aiCreativeHelp && (
        <label
          className="flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed border-ink/20 dark:border-white/20 hover:border-violet-500/50 bg-white dark:bg-white/5 cursor-pointer transition-all group"
          aria-label="Upload creative file"
        >
          <Upload className="w-8 h-8 text-ink/30 dark:text-white/30 group-hover:text-violet-500 transition-colors mb-3" aria-hidden />
          <p className="text-sm font-medium text-ink/60 dark:text-white/50 group-hover:text-violet-500 transition-colors">
            {booking.creative ? booking.creative.name : 'Drop files here or click to upload'}
          </p>
          <p className="text-xs text-ink/30 dark:text-white/30 mt-1">PDF, AI, PSD, MP4, JPG, PNG — max 50MB</p>
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.ai,.psd,.eps,.mp4,.mov,.jpg,.jpeg,.png,.mp3"
            onChange={(e) => setBooking({ ...booking, creative: e.target.files?.[0] ?? null })}
            aria-label="Upload creative"
          />
        </label>
      )}

      {booking.aiCreativeHelp && (
        <div className="space-y-3">
          {['Newspaper Ad Copy', 'Radio Script (30s)', 'TV Storyboard Outline', 'Influencer Brief'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8">
              <Check className="w-4 h-4 text-success flex-shrink-0" aria-hidden />
              <span className="text-sm text-ink dark:text-white">{item} will be generated</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Step5({
  booking,
  setBooking,
  onSubmit,
  status,
  errorMsg,
}: {
  booking: BookingState
  setBooking: (b: BookingState) => void
  onSubmit: () => void
  status: 'idle' | 'submitting' | 'success' | 'error'
  errorMsg: string
}) {
  const { base, slots, production, gst, total } = computePrice(booking)
  const selectedService = SERVICES.find((s) => s.id === booking.service)

  const contactValid =
    booking.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(booking.email) &&
    booking.phone.trim().length >= 10

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-success" aria-hidden />
        </div>
        <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Request received</h3>
        <p className="text-sm text-ink/60 dark:text-white/50 max-w-sm mx-auto">
          Thanks {booking.name.split(' ')[0] || 'there'}! Our team will reach out within 24 hours with your detailed quote.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-bold text-xl text-ink dark:text-white mb-2">Review & Confirm</h3>
      <p className="text-sm text-ink/50 dark:text-white/40 mb-6">Here&apos;s your campaign summary and live price.</p>

      {/* Summary */}
      <div className="rounded-2xl bg-white dark:bg-white/5 border border-ink/10 dark:border-white/10 p-6 mb-6">
        <div className="space-y-3 mb-5">
          {[
            { label: 'Medium', value: selectedService?.name ?? 'Not selected' },
            { label: 'Cities', value: booking.cities.length ? booking.cities.join(', ') : 'None selected' },
            { label: 'Duration', value: booking.startDate && booking.endDate ? `${booking.startDate} → ${booking.endDate}` : 'Not set' },
            { label: 'Slot', value: slotTypes.find((s) => s.id === booking.slotType)?.label ?? 'Not selected' },
            { label: 'Creative', value: booking.aiCreativeHelp ? 'AI-generated' : booking.creative?.name ?? 'Not uploaded' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-sm text-ink/50 dark:text-white/40">{label}</span>
              <span className="text-sm font-medium text-ink dark:text-white text-right">{value}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-ink/10 dark:border-white/10 pt-4 space-y-2">
          {[
            { label: 'Base rate', value: `₹${base.toLocaleString('en-IN')}` },
            { label: 'Prime slot premium', value: `₹${slots.toLocaleString('en-IN')}` },
            { label: 'Production', value: production === 0 ? 'Free (AI)' : `₹${production.toLocaleString('en-IN')}` },
            { label: 'GST (18%)', value: `₹${gst.toLocaleString('en-IN')}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-ink/50 dark:text-white/40">{label}</span>
              <span className="font-mono text-ink dark:text-white">{value}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t border-ink/10 dark:border-white/10">
            <span className="font-bold text-ink dark:text-white">Total</span>
            <span className="font-mono font-bold text-xl text-violet-500">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-ink/60 dark:text-white/50 mb-3 uppercase tracking-wider">Your Contact Details</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Full name"
            value={booking.name}
            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
            aria-label="Full name"
            className="px-4 py-3 rounded-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={booking.email}
            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            aria-label="Email"
            className="px-4 py-3 rounded-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="tel"
            placeholder="Phone (10+ digits)"
            value={booking.phone}
            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
            aria-label="Phone"
            className="px-4 py-3 rounded-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-500 mb-4">{errorMsg || 'Something went wrong. Please try again.'}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          disabled
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-500/40 text-white font-semibold cursor-not-allowed"
          title="Payments coming soon"
        >
          <CreditCard className="w-4 h-4" aria-hidden /> Pay Now
        </button>
        <button
          onClick={onSubmit}
          disabled={!contactValid || status === 'submitting'}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-ink/15 dark:border-white/15 text-ink dark:text-white font-semibold hover:border-violet-500 hover:text-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {status === 'submitting' ? 'Sending…' : 'Request Callback'}
        </button>
      </div>
      <p className="text-center text-xs text-ink/40 dark:text-white/30 mt-3">
        Secure payment via Razorpay · GST invoice provided · Quote valid for 48 hours
      </p>
    </div>
  )
}

export function BookingWizard() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    cities: [],
    startDate: '',
    endDate: '',
    slotType: 'prime',
    creative: null,
    aiCreativeHelp: true,
    priceBreakdown: { base: 0, slots: 0, production: 0, gst: 0 },
    name: '',
    email: '',
    phone: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const canNext = () => {
    if (step === 1) return !!booking.service
    if (step === 2) return booking.cities.length > 0
    if (step === 3) return !!booking.startDate && !!booking.endDate && !!booking.slotType
    if (step === 4) return booking.aiCreativeHelp || !!booking.creative
    return true
  }

  const handleSubmit = async () => {
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: booking.name.trim(),
          email: booking.email.trim(),
          phone: booking.phone.trim(),
          service: booking.service ?? '',
          cities: booking.cities,
          startDate: booking.startDate,
          endDate: booking.endDate,
          slot: booking.slotType,
          hasCreative: !!booking.creative,
          wantsAiCreative: booking.aiCreativeHelp,
          creativeName: booking.creative?.name,
          priceBreakdown: computePrice(booking),
          consent: true,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Request failed (${res.status})`)
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator currentStep={step} />

      <div className="bg-offwhite dark:bg-ink/50 rounded-3xl border border-ink/10 dark:border-white/10 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <Step1 booking={booking} setBooking={setBooking} />}
            {step === 2 && <Step2 booking={booking} setBooking={setBooking} />}
            {step === 3 && <Step3 booking={booking} setBooking={setBooking} />}
            {step === 4 && <Step4 booking={booking} setBooking={setBooking} />}
            {step === 5 && (
              <Step5
                booking={booking}
                setBooking={setBooking}
                onSubmit={handleSubmit}
                status={status}
                errorMsg={errorMsg}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-ink/10 dark:border-white/10">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink/15 dark:border-white/15 text-sm font-medium text-ink/60 dark:text-white/60 hover:border-violet-500 hover:text-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden /> Back
            </button>
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-violet"
            >
              {step === 4 ? 'See Live Price' : 'Continue'} <ChevronRight className="w-4 h-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
