import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="pointer-events-none absolute top-32 left-1/2 h-[280px] w-[min(100%,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,120,255,0.25)_0%,rgba(0,60,180,0.1)_50%,transparent_75%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-tsai-muted uppercase backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-tsai-accent-cyan shadow-[0_0_8px_#12d7f5]" />
          Used by 10,000+ traders
        </p>

        <h1 className="mt-8 text-4xl leading-tight font-bold tracking-tight text-[#f9f9f9] sm:text-5xl md:text-6xl">
          Trade Smarter, Grow Faster
          <span className="mt-2 block bg-linear-to-r from-white via-[#c7c7c7] to-[#adb1b8] bg-clip-text text-transparent">
            Trading Signal AI Admin
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#c7ccd2] sm:text-lg">
          Manage signals, users, and platform settings — connected to the{' '}
          <a
            href="https://www.tradingsignals.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tsai-accent-cyan hover:underline"
          >
            Trading Signals AI
          </a>{' '}
          ecosystem.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-linear-to-r from-tsai-accent to-tsai-accent-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(18,215,245,0.35)] transition hover:opacity-90"
            >
              Go to Dashboard
            </Link>
          ) : !isLoading ? (
            <Link
              to="/login"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-linear-to-r from-tsai-accent to-tsai-accent-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(18,215,245,0.35)] transition hover:opacity-90"
            >
              Admin Login
            </Link>
          ) : null}
          <a
            href="https://www.tradingsignals.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Visit Main Site
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-white/8 bg-[#00000033] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-white/6 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="mx-auto rounded-md bg-white/5 px-4 py-1 font-mono text-[11px] text-tsai-subtle">
              tradingsignals.ai/admin
            </span>
          </div>
          <div className="aspect-video rounded-b-xl bg-linear-to-br from-[#0b1736]/80 to-[#02081e]/90 p-6 text-left">
            <p className="text-sm text-tsai-muted">Platform preview</p>
            <p className="mt-2 text-2xl font-semibold text-tsai-text">Admin Dashboard</p>
            <p className="mt-2 max-w-md text-sm text-tsai-subtle">
              AI-driven signals, structured strategies, and real-time analytics in one unified
              platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
