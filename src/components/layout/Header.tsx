'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  Menu, X, ChevronDown, Sun, Moon, ArrowUpRight,
  Newspaper, Radio, Tv, Film, Monitor, Users, Building2, Bus, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICES } from '@/lib/constants'

const serviceIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  newspaper: Newspaper,
  radio: Radio,
  tv: Tv,
  film: Film,
  monitor: Monitor,
  'monitor-dot': Monitor,
  users: Users,
  'building-2': Building2,
  bus: Bus,
}

// Logo mark + wordmark — used in header and mobile nav
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/images/logo-mark.svg"
      alt="Zebracat logo mark"
      width={size}
      height={size}
      priority
    />
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 30))
    return unsubscribe
  }, [scrollY])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'ZAP STAR', href: '/zap-star', highlight: true },
    { label: 'Contact', href: '/contact' },
  ]

  // When not scrolled the header is transparent over the dark hero — always use white text.
  // When scrolled the header has a solid bg — use mode-aware colours.
  const navTextBase = scrolled
    ? 'text-ink/80 dark:text-white/90 hover:text-violet-500'
    : 'text-white/90 hover:text-white'

  const themeIconClass = scrolled
    ? 'text-ink/60 dark:text-white/70'
    : 'text-white/70'

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled
            ? 'bg-white/92 dark:bg-[#0B0A1F]/92 backdrop-blur-xl border-b border-violet-500/10 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
              aria-label="Zebracat AI Publicity — Home"
            >
              <LogoMark size={38} />
              <span className="font-bold text-lg leading-tight">
                <span className={cn(
                  'bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-[#3B2EE0]',
                )}>
                  Zebracat
                </span>
                <span className={cn(
                  'font-normal text-xs block -mt-0.5',
                  scrolled ? 'text-ink/40 dark:text-white/40' : 'text-white/50',
                )}>
                  AI Publicity
                </span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  {link.hasDropdown ? (
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onMouseEnter={() => setServicesOpen(true)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        pathname.startsWith('/services')
                          ? 'text-violet-500'
                          : navTextBase,
                      )}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn('w-3.5 h-3.5 transition-transform', servicesOpen && 'rotate-180')}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        link.highlight
                          ? scrolled
                            ? 'text-violet-500 bg-violet-500/10 hover:bg-violet-500/20'
                            : 'text-violet-300 bg-violet-500/20 hover:bg-violet-500/30'
                          : pathname === link.href
                            ? 'text-violet-500'
                            : navTextBase,
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* ── Right actions ── */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center hover:bg-violet-500/15 hover:text-violet-500 transition-colors',
                  themeIconClass,
                )}
              >
                {theme === 'dark'
                  ? <Sun className="w-4 h-4" aria-hidden />
                  : <Moon className="w-4 h-4" aria-hidden />}
              </button>
              <Link
                href="/book"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors shadow-violet"
              >
                Book Ad Now <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
              </Link>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-violet-500/15 transition-colors',
                scrolled ? 'text-ink dark:text-white' : 'text-white',
              )}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen
                ? <X className="w-5 h-5" aria-hidden />
                : <Menu className="w-5 h-5" aria-hidden />}
            </button>
          </div>
        </nav>

        {/* ── Services mega dropdown ── */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-[#0B0A1F] border-b border-violet-500/10 shadow-lg"
              onMouseLeave={() => setServicesOpen(false)}
              role="menu"
              aria-label="Services"
            >
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-3 gap-3">
                  {SERVICES.map((service) => {
                    const Icon = serviceIcons[service.icon] || Monitor
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-violet-500/5 transition-colors group"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}18` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: service.color }} aria-hidden />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink dark:text-white group-hover:text-violet-500 transition-colors leading-tight">
                            {service.name}
                          </div>
                          <div className="text-xs text-ink/45 dark:text-white/40 mt-0.5 leading-snug">
                            {service.promise}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <div className="mt-6 pt-5 border-t border-ink/10 dark:border-white/10 flex items-center justify-between">
                  <p className="text-sm text-ink/50 dark:text-white/40">
                    Pan-India network · 28 states · AI-powered planning
                  </p>
                  <Link
                    href="/book"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Book a Campaign <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Nav ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[99] bg-white dark:bg-[#0B0A1F] lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-ink/10 dark:border-white/10">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                <LogoMark size={32} />
                <span className="font-bold text-violet-500">Zebracat</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-ink dark:text-white hover:bg-ink/5 dark:hover:bg-white/10"
              >
                <X className="w-5 h-5" aria-hidden />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-ink dark:text-white',
                      pathname === link.href || (link.hasDropdown && pathname.startsWith('/services'))
                        ? 'bg-violet-500/10 text-violet-500'
                        : 'hover:bg-ink/5 dark:hover:bg-white/8',
                      link.highlight && 'text-violet-500',
                    )}
                  >
                    {link.label}
                    {link.highlight && <Zap className="w-4 h-4" aria-hidden />}
                  </Link>
                  {link.hasDropdown && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-ink/60 dark:text-white/60 hover:text-violet-500 rounded-lg"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-ink/10 dark:border-white/10 space-y-3">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
              >
                Book Ad Now <ArrowUpRight className="w-4 h-4" aria-hidden />
              </Link>
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-2 text-sm text-ink/60 dark:text-white/60"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark'
                    ? <Sun className="w-4 h-4" aria-hidden />
                    : <Moon className="w-4 h-4" aria-hidden />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
