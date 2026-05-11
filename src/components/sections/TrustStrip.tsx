'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const logos = [
  { name: 'Hindustan Times', src: '/logos/hindustan-times.svg' },
  { name: 'Times of India',  src: '/logos/times-of-india.svg'  },
  { name: 'Aaj Tak',         src: '/logos/aaj-tak.svg'         },
  { name: 'Star Sports',     src: '/logos/star-sports.svg'     },
  { name: 'Sony LIV',        src: '/logos/sony-liv.svg'        },
  { name: 'Hotstar',         src: '/logos/hotstar.svg'         },
  { name: 'JioCinema',       src: '/logos/jiocinema.svg'       },
  { name: 'Big FM',          src: '/logos/big-fm.svg'          },
  { name: 'Red FM',          src: '/logos/red-fm.svg'          },
  { name: 'PVR',             src: '/logos/pvr.svg'             },
  { name: 'INOX',            src: '/logos/inox.svg'            },
  { name: 'Swiggy',          src: '/logos/swiggy.svg'          },
  { name: 'Zomato',          src: '/logos/zomato.svg'          },
  { name: 'HDFC',            src: '/logos/hdfc.svg'            },
  { name: "Byju's",          src: '/logos/byjus.svg'           },
  { name: 'LIC',             src: '/logos/lic.svg'             },
  { name: 'Maruti',          src: '/logos/maruti.svg'          },
  { name: 'Hero',            src: '/logos/hero.svg'            },
  { name: 'Dabur',           src: '/logos/dabur.svg'           },
  { name: 'Patanjali',       src: '/logos/patanjali.svg'       },
]

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-6 group cursor-default">
      <Image
        src={src}
        alt={name}
        height={40}
        width={160}
        className="h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      />
    </div>
  )
}

export function TrustStrip() {
  const prefersReducedMotion = useReducedMotion()
  const doubled = [...logos, ...logos]

  return (
    <section
      className="py-16 bg-offwhite dark:bg-ink overflow-hidden border-y border-ink/8 dark:border-white/8"
      aria-label="Trusted by leading brands"
    >
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold text-ink/30 dark:text-white/30 uppercase tracking-widest">
          Trusted by 1,200+ brands across India
        </p>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-offwhite dark:from-ink to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-offwhite dark:from-ink to-transparent" />

        {prefersReducedMotion ? (
          /* Static grid for reduced-motion users */
          <div className="flex flex-wrap justify-center gap-8 px-8">
            {logos.map(({ name, src }) => (
              <LogoItem key={name} name={name} src={src} />
            ))}
          </div>
        ) : (
          <div
            className="flex items-center animate-marquee"
            style={{ width: 'max-content' }}
            aria-hidden="true"
          >
            {doubled.map(({ name, src }, i) => (
              <LogoItem key={`${name}-${i}`} name={name} src={src} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
