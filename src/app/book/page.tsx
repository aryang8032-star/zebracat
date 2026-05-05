import type { Metadata } from 'next'
import { BookingWizard } from '@/components/booking/BookingWizard'

export const metadata: Metadata = {
  title: 'Book an Ad Campaign — Get Instant Quote',
  description: 'Book newspaper, radio, TV, cinema, OTT, digital signage, influencer, lift branding and transit media campaigns instantly. Get a live quote in minutes.',
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-chip mb-4">Instant Booking Engine</span>
          <h1 className="display-md text-ink dark:text-white mb-4">
            Book Your Campaign{' '}
            <span className="font-serif italic gradient-text">in Minutes</span>
          </h1>
          <p className="body-lg text-ink/60 dark:text-white/50">
            Choose your medium, pick your cities, set your dates and get a live price.
            No brokers. No delays. Just results.
          </p>
        </div>

        <BookingWizard />
      </div>
    </div>
  )
}
