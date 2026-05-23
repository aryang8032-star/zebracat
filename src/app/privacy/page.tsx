import type { Metadata } from 'next'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy — Zebracat AI Publicity',
  description: 'How Zebracat AI Publicity collects, uses, stores and protects your personal information.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <span className="section-chip mb-4 not-prose inline-flex">Legal</span>
          <h1 className="display-md text-ink dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-ink/40 dark:text-white/30 not-prose mb-10">Last updated: 1 January 2025</p>

          <p className="text-ink/70 dark:text-white/60">
            {COMPANY.name} (&ldquo;Zebracat&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates {COMPANY.website}. This
            policy explains what personal information we collect, how we use it, who we share it with, and your rights.
          </p>

          <h2 className="text-ink dark:text-white">1. Information we collect</h2>
          <ul className="text-ink/70 dark:text-white/60">
            <li><strong>Contact details</strong> you submit via our forms: name, email, phone, city, company.</li>
            <li><strong>Campaign details</strong>: budget range, preferred media channels, message content.</li>
            <li><strong>Technical data</strong>: IP address, browser type, pages viewed, referrer. Used for analytics and abuse prevention.</li>
            <li><strong>Cookies</strong> only after you consent via the banner — see Cookie Usage below.</li>
          </ul>

          <h2 className="text-ink dark:text-white">2. How we use your information</h2>
          <ul className="text-ink/70 dark:text-white/60">
            <li>Respond to your enquiry and prepare a media plan.</li>
            <li>Send service updates or newsletters you opted into.</li>
            <li>Operate, secure and improve our website.</li>
            <li>Comply with legal and regulatory obligations under Indian law.</li>
          </ul>

          <h2 className="text-ink dark:text-white">3. Sharing</h2>
          <p className="text-ink/70 dark:text-white/60">
            We do not sell your personal information. We share data only with vetted processors that help us
            operate the site (hosting, email delivery via Resend, analytics) and with media partners only when
            necessary to fulfil a campaign you have authorised.
          </p>

          <h2 className="text-ink dark:text-white">4. Data retention</h2>
          <p className="text-ink/70 dark:text-white/60">
            Enquiries are retained for up to 24 months unless you ask us to delete them sooner. Campaign and
            invoice records are retained as long as required by Indian tax law.
          </p>

          <h2 className="text-ink dark:text-white">5. Your rights</h2>
          <p className="text-ink/70 dark:text-white/60">
            You may request access to, correction of or deletion of your personal data at any time. Email{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-violet-500 hover:underline">{COMPANY.email}</a>
            {' '}and we will respond within 30 days.
          </p>

          <h2 className="text-ink dark:text-white">6. Cookie usage</h2>
          <p className="text-ink/70 dark:text-white/60">
            We use a small number of first-party cookies for theme preferences and consent state. Optional
            analytics cookies load only after you accept the cookie banner.
          </p>

          <h2 className="text-ink dark:text-white">7. Contact</h2>
          <address className="not-italic text-ink/70 dark:text-white/60">
            <strong className="text-ink dark:text-white">{COMPANY.name}</strong><br />
            {COMPANY.addressFull}<br />
            Email: <a href={`mailto:${COMPANY.email}`} className="text-violet-500 hover:underline">{COMPANY.email}</a><br />
            Phone: <a href={`tel:${COMPANY.phoneRaw}`} className="text-violet-500 hover:underline">{COMPANY.phone}</a>
          </address>
        </article>
      </div>
    </div>
  )
}
