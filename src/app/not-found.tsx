import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[10rem] font-mono font-bold text-violet-500/10 leading-none select-none" aria-hidden>
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-violet-500/20 flex items-center justify-center">
              <Zap className="w-10 h-10 text-violet-400" aria-hidden />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          Looks like this page went off-air. Let&apos;s get you back to the right channel.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Go Home
          </Link>
          <Link
            href="/book"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
          >
            Book a Campaign
          </Link>
        </div>
      </div>
    </div>
  )
}
