import type { Metadata } from 'next'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact Us — Talk to a Media Strategist',
  description: 'Get in touch with Zebracat AI Publicity. Call, WhatsApp or fill our form. Our strategists reply within 2 hours with a custom media plan.',
}

export default function ContactPage() {
  return (
    <div className="pt-20 bg-offwhite dark:bg-ink">
      <div className="container-wide pt-12 pb-6">
        <div className="section-chip mb-4 inline-flex">Contact</div>
        <h1 className="display-lg text-ink dark:text-white max-w-2xl">
          Let&apos;s Plan Your{' '}
          <span className="font-serif italic gradient-text">Next Campaign</span>
        </h1>
      </div>
      <ContactSection />
    </div>
  )
}
