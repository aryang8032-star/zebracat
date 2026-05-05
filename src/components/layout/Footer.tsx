import Link from 'next/link'
import {
  Facebook, Twitter, Instagram, Linkedin,
  Mail, Phone, MapPin, ArrowUpRight, Zap
} from 'lucide-react'
import { COMPANY, SERVICES } from '@/lib/constants'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

const footerNav = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'ZAP STAR', href: '/zap-star' },
    { label: 'FAQs', href: '/#faqs' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const socials = [
  { label: 'Facebook', href: COMPANY.socials.facebook, icon: Facebook },
  { label: 'X (Twitter)', href: COMPANY.socials.twitter, icon: Twitter },
  { label: 'Instagram', href: COMPANY.socials.instagram, icon: Instagram },
  { label: 'LinkedIn', href: COMPANY.socials.linkedin, icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="relative bg-ink text-white/80 overflow-hidden" aria-label="Site footer">
      {/* Starfield background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-ink to-ink/95" />
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {/* Violet glow */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-brand/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-deep flex items-center justify-center shadow-violet">
                <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
                  <path d="M12 2L3 19h4.5L12 9l4.5 10H21L12 2z" fill="white" />
                  <path d="M8 15h8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-brand">
                  Zebracat
                </div>
                <div className="text-white/40 text-xs -mt-0.5">AI Publicity</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs mb-6">
              India&apos;s offline + AI‑powered media growth engine. Pan‑India reach across
              newspapers, radio, TV, cinema, OOH, digital and influencer — all in one platform.
            </p>
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/70 mb-3 tracking-wide uppercase">Stay Updated</p>
              <NewsletterForm />
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${COMPANY.name} on ${label}`}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-violet-400 hover:border-violet-400 transition-colors"
                >
                  <Icon className="w-4 h-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/50 hover:text-violet-400 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-violet-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-start gap-2.5 text-sm text-white/50 hover:text-violet-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-2.5 text-sm text-white/50 hover:text-violet-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-white/50 hover:text-violet-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden />
                  <span>{COMPANY.addressFull}</span>
                </a>
              </li>
            </ul>

            {/* Partner program */}
            <div className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-violet-400" aria-hidden />
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">ZAP STAR</span>
              </div>
              <p className="text-xs text-white/40 mb-3 leading-relaxed">
                Partner with us. Earn more. Grow together.
              </p>
              <Link
                href="/zap-star"
                className="inline-flex items-center gap-1 text-xs text-violet-400 font-semibold hover:text-violet-300"
              >
                Join Now <ArrowUpRight className="w-3 h-3" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>© {new Date().getFullYear()} Zebracat AI Publicity. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-white/30 hover:text-white/50 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-xs text-white/20 flex items-center gap-1">
            <span>🇮🇳</span>
            <span>Made in Gurugram</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
