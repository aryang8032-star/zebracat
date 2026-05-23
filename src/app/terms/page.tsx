import type { Metadata } from 'next'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service — Zebracat AI Publicity',
  description: 'Terms and conditions governing the use of the Zebracat AI Publicity website and services.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <span className="section-chip mb-4 not-prose inline-flex">Legal</span>
          <h1 className="display-md text-ink dark:text-white mb-2">Terms of Service</h1>
          <p className="text-sm text-ink/40 dark:text-white/30 not-prose mb-10">Last updated: 1 January 2025</p>

          <p className="text-ink/70 dark:text-white/60">
            These Terms govern your use of {COMPANY.website} (the &ldquo;Site&rdquo;) operated by{' '}
            {COMPANY.name}. By using the Site you agree to these Terms.
          </p>

          <h2 className="text-ink dark:text-white">1. Services</h2>
          <p className="text-ink/70 dark:text-white/60">
            Zebracat plans and books advertising across newspaper, radio, TV, cinema, OTT, digital signage,
            influencer, lift and transit media in India. All campaign quotes are indicative; the binding rate
            is the one confirmed on the signed insertion order.
          </p>

          <h2 className="text-ink dark:text-white">2. Bookings and payment</h2>
          <ul className="text-ink/70 dark:text-white/60">
            <li>Bookings are confirmed only after payment realisation or signed PO.</li>
            <li>All prices exclude GST (18%) unless stated otherwise.</li>
            <li>Campaign go-live dates depend on creative approval and inventory availability.</li>
            <li>Refunds for cancelled bookings follow each medium&apos;s vendor policy and may be partial.</li>
          </ul>

          <h2 className="text-ink dark:text-white">3. Creative and content</h2>
          <p className="text-ink/70 dark:text-white/60">
            You warrant that any creative you supply does not infringe third-party rights and complies with
            ASCI codes and applicable Indian law. We may decline creative that violates these rules.
          </p>

          <h2 className="text-ink dark:text-white">4. Reporting</h2>
          <p className="text-ink/70 dark:text-white/60">
            We provide post-campaign reports based on publisher-supplied data and our own monitoring. Metrics
            such as reach, GRP and recall are estimates and may vary from third-party measurement.
          </p>

          <h2 className="text-ink dark:text-white">5. Limitation of liability</h2>
          <p className="text-ink/70 dark:text-white/60">
            To the maximum extent allowed by law, our aggregate liability for any campaign is limited to the
            fees paid for that campaign. We are not liable for indirect or consequential losses.
          </p>

          <h2 className="text-ink dark:text-white">6. Governing law</h2>
          <p className="text-ink/70 dark:text-white/60">
            These Terms are governed by the laws of India. Courts at Gurugram, Haryana have exclusive
            jurisdiction over any dispute.
          </p>

          <h2 className="text-ink dark:text-white">7. Contact</h2>
          <address className="not-italic text-ink/70 dark:text-white/60">
            <strong className="text-ink dark:text-white">{COMPANY.name}</strong><br />
            {COMPANY.addressFull}<br />
            <a href={`mailto:${COMPANY.email}`} className="text-violet-500 hover:underline">{COMPANY.email}</a>
          </address>
        </article>
      </div>
    </div>
  )
}
