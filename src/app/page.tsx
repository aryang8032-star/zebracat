import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsSection } from '@/components/sections/StatsSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Zebracat AI Publicity — India\'s 360° Advertising & Media Agency | Book Newspaper, Radio, TV, OOH Ads',
  description: 'Book newspaper ads, radio spots, TV campaigns, cinema advertising, OTT, digital signage, influencer marketing, lift branding and transit media across India. Gurugram-based 360° media agency with AI-powered planning.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <StatsSection />
      <WhyChooseUs />
      <DashboardPreview />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  )
}
