# Zebracat Neo — Official Website

**Zebracat AI Publicity** | Gurugram's 360° Media & Advertising Agency

A cinematic, 3D, conversion-focused Next.js 14 website for Zebracat AI Publicity — India's offline + AI-powered media growth engine.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | TailwindCSS + shadcn/ui |
| Animation | Framer Motion + GSAP |
| Scroll | Lenis (smooth scrolling) |
| 3D | React Three Fiber + Three.js |
| CMS | Sanity v3 |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Deployment | Vercel |

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/aryang8032-star/zebracat.git
cd zebracat

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your actual values in .env.local

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID from [sanity.io](https://sanity.io) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (usually `production`) |
| `SANITY_API_TOKEN` | Sanity API token with write permissions |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for transactional email |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps Embed API key |
| `RAZORPAY_KEY_ID` | Razorpay live key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `CRM_WEBHOOK_URL` | Optional: CRM webhook to receive leads |
| `OPENAI_API_KEY` | Optional: OpenAI key for AI Creative Studio |
| `NEXT_PUBLIC_SITE_URL` | Production URL: `https://zebracatindia.com` |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── services/           # Services listing + [slug] detail pages
│   ├── case-studies/       # Case studies
│   ├── pricing/            # Pricing / rate card
│   ├── blog/               # Blog listing + [slug] posts
│   ├── book/               # Booking wizard
│   ├── contact/            # Contact page
│   └── api/contact/        # Contact form API
├── components/
│   ├── 3d/                 # React Three Fiber scenes
│   ├── booking/            # Booking wizard
│   ├── layout/             # Header, Footer, FloatingActions
│   ├── sections/           # Page sections (Hero, Services, etc.)
│   └── ui/                 # Design system components
├── lib/
│   ├── constants.ts        # Company data, services, testimonials
│   ├── utils.ts            # Utility functions
│   └── sanity.ts           # Sanity client
└── styles/
    └── globals.css         # Global styles + Tailwind layers

sanity/
└── schemas/                # Sanity CMS content schemas

```

---

## Sanity CMS Setup

1. Create a project at [sanity.io](https://sanity.io/manage)
2. Copy your Project ID and Dataset
3. Add to `.env.local`
4. Run the Sanity Studio: `npx sanity dev` (in the project root)

Available content types:
- **Services** — 9 advertising mediums with full page content
- **Case Studies** — Campaign results with metrics
- **Testimonials** — Client reviews
- **Blog Posts** — Editorial content with rich text
- **FAQs** — Categorised FAQ entries

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run test         # Playwright E2E tests
npm run storybook    # Storybook component library
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy

The project is optimised for Vercel with:
- Edge functions for API routes
- Image optimisation (AVIF + WebP)
- Automatic static/ISR page generation

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage (Hero → Services → Stats → Why Us → Dashboard → Testimonials → FAQ → Contact) |
| `/about` | Company story and brand positioning |
| `/services` | All 9 advertising mediums |
| `/services/[slug]` | Individual service detail pages |
| `/case-studies` | Campaign results grid |
| `/pricing` | Indicative rate cards |
| `/book` | Multi-step booking wizard |
| `/blog` | Editorial content |
| `/contact` | Contact form + map + WhatsApp |

---

## Brand

- **Company**: Zebracat AI Publicity
- **Address**: Sector-72, Fazilpur, Gurugram – 122001
- **Email**: info@zebracatindia.com
- **Phone**: +91 8882861568
- **Twitter**: @ZebracatAi
- **Instagram**: @zebracatindia

> **Note**: Zebracat AI Publicity (zebracatindia.com) is an Indian 360° advertising and media agency. It is not an AI video generation SaaS tool.

---

## License

Proprietary — Zebracat AI Publicity. All rights reserved.
