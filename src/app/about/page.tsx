import type { Metadata } from 'next'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Zebracat AI Publicity — India\'s 360° Media Agency',
  description: `Zebracat AI Publicity is Gurugram's leading 360° advertising agency. Learn about our story, team, and our AI-powered approach to media buying across India.`,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-ink pt-28 pb-20">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="mb-16">
            <span className="section-chip mb-6">About Us</span>
            <h1 className="display-lg text-ink dark:text-white mb-6">
              We Are India&apos;s{' '}
              <span className="font-serif italic gradient-text">Media Growth Engine</span>
            </h1>
            <p className="body-lg text-ink/60 dark:text-white/50 max-w-2xl">
              Zebracat AI Publicity is a Gurugram-based 360° advertising and media agency combining
              a pan-India physical media network with AI-powered planning, booking and reporting tools.
              We help brands — from funded startups to established enterprises — own every media surface.
            </p>
          </div>

          {/* Story sections */}
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">Our Story</h2>
                <p className="text-ink/60 dark:text-white/50 leading-relaxed mb-4">
                  Founded in Gurugram&apos;s Sector 72, Zebracat AI Publicity was born from a simple
                  frustration: booking media in India was opaque, slow, and dominated by middlemen.
                  We set out to change that.
                </p>
                <p className="text-ink/60 dark:text-white/50 leading-relaxed">
                  Today, we manage ₹50 Cr+ in annual media spend across newspapers, radio, TV,
                  cinema, OOH, digital signage, influencers, lift branding and transit media —
                  for 1,200+ brands across 28 Indian states.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-violet p-8 text-white">
                <div className="text-4xl font-bold font-mono mb-2">2019</div>
                <div className="text-white/70 mb-4">Founded in Gurugram</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {[
                    { val: '₹50 Cr+', label: 'Media Managed' },
                    { val: '1,200+', label: 'Brands Served' },
                    { val: '28', label: 'States Active' },
                    { val: '4.5★', label: 'Client Rating' },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <div className="font-mono font-bold text-2xl">{val}</div>
                      <div className="text-white/60 text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-white/5 border border-ink/8 dark:border-white/8 p-10">
              <h2 className="text-2xl font-bold text-ink dark:text-white mb-6">Our Positioning</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Offline + AI',
                    desc: 'We combine the breadth of India\'s physical media network with AI-powered planning tools. Best of both worlds.',
                  },
                  {
                    title: 'Pan-India Reach',
                    desc: 'From Jammu to Kanyakumari — our network covers all 28 states with active inventory across every medium.',
                  },
                  {
                    title: 'Human-Led',
                    desc: 'Every campaign gets a dedicated account manager. AI handles the data; humans handle the relationships.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <h3 className="font-bold text-ink dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-ink/60 dark:text-white/50 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink dark:text-white mb-2">Brand Clarity</h2>
              <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                <p className="text-sm text-ink dark:text-white leading-relaxed">
                  <strong>Zebracat AI Publicity</strong> (zebracatindia.com) is an Indian 360° advertising and media agency
                  specialising in newspaper, radio, TV, cinema, OOH, digital signage, influencer marketing,
                  lift branding and transit media. We are <em>not</em> an AI video generation SaaS tool.
                  Our business is <strong>real-world media buying and advertising</strong> — offline + digital,
                  pan-India, powered by AI-assisted planning.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">Find Us</h2>
              <address className="not-italic text-ink/60 dark:text-white/50">
                <strong className="text-ink dark:text-white">{COMPANY.name}</strong><br />
                {COMPANY.addressFull}<br />
                <a href={`mailto:${COMPANY.email}`} className="text-violet-500 hover:underline">{COMPANY.email}</a><br />
                <a href={`tel:${COMPANY.phoneRaw}`} className="text-violet-500 hover:underline">{COMPANY.phone}</a>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
