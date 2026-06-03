import { Link } from 'react-router-dom'
import StatCard from '../components/dashboard/StatCard'
import { useAuth } from '../hooks/useAuth'

const stats = [
  {
    label: 'Registered Users',
    value: '12,480',
    change: '+8.2% this month',
    trend: 'up' as const,
    accent: 'cyan' as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.748-.5" />
      </svg>
    ),
  },
  {
    label: 'Active Signals',
    value: '8',
    change: 'All channels live',
    trend: 'neutral' as const,
    accent: 'blue' as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-6 10.5 6M4.5 19.5h15" />
      </svg>
    ),
  },
  {
    label: 'Assets Under Mgmt',
    value: '$4.2M',
    change: '+12.4% vs last quarter',
    trend: 'up' as const,
    accent: 'violet' as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Followers PNL',
    value: '$892K',
    change: '+5.1% last 7 days',
    trend: 'up' as const,
    accent: 'emerald' as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

const channels = [
  { name: 'Prime', tag: 'AI Strategy', status: 'Live', pnl: '+24.8%' },
  { name: 'VolFlash', tag: 'Scalping', status: 'Live', pnl: '+18.2%' },
  { name: 'CoreAlts', tag: 'Swing', status: 'Live', pnl: '+11.5%' },
  { name: 'Assist', tag: 'Low Risk', status: 'Paused', pnl: '+6.1%' },
]

const activity = [
  { time: '2m ago', text: 'New user registered via Binance connect' },
  { time: '18m ago', text: 'Prime channel signal executed — BTC/USDT' },
  { time: '1h ago', text: 'Weekly performance report generated' },
  { time: '3h ago', text: 'Admin password policy updated' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'Admin'

  return (
    <div className="space-y-8">
      {/* Welcome hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#00000033] p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,240,255,0.12)_0%,transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_80%_30%,rgba(18,61,255,0.2)_0%,transparent_60%)]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-tsai-accent-cyan uppercase">
              Admin Control Center
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-tsai-text sm:text-4xl">
              Welcome back, {firstName}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-tsai-muted">
              Monitor platform health, signal channels, and user growth — aligned with{' '}
              <a
                href="https://www.tradingsignals.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tsai-accent-cyan hover:underline"
              >
                Trading Signals AI
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="https://www.tradingsignals.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              View Live Site
            </a>
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-tsai-accent to-tsai-accent-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(18,215,245,0.35)] transition hover:opacity-90"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold text-tsai-text">Platform Overview</h3>
            <p className="text-sm text-tsai-subtle">Real-time metrics at a glance</p>
          </div>
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 sm:inline">
            All systems operational
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Signal channels */}
        <section className="xl:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#00000033] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <div>
                <h3 className="font-semibold text-tsai-text">Trading Channels</h3>
                <p className="text-xs text-tsai-subtle">Structured strategies powered by AI</p>
              </div>
              <span className="text-xs text-tsai-muted">8 channels</span>
            </div>
            <div className="divide-y divide-white/6">
              {channels.map((ch) => (
                <div
                  key={ch.name}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-tsai-accent-deep/80 to-tsai-accent/40 text-sm font-bold text-white">
                      {ch.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-tsai-text">{ch.name}</p>
                      <p className="text-xs text-tsai-subtle">{ch.tag}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ch.status === 'Live'
                          ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border border-amber-500/30 bg-amber-500/10 text-amber-300'
                      }`}
                    >
                      {ch.status}
                    </span>
                    <span className="min-w-[4rem] font-semibold text-emerald-400">{ch.pnl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity + quick actions */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#00000033] p-6 backdrop-blur-md">
            <h3 className="font-semibold text-tsai-text">Quick Actions</h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'User management', to: '/admin/users' },
                { label: 'Platform settings', to: '/admin/settings' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-tsai-muted transition hover:border-tsai-accent-cyan/30 hover:text-tsai-text"
                  >
                    {item.label}
                    <span className="text-tsai-accent-cyan">→</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.tradingsignals.ai/generate-blogs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-tsai-muted transition hover:border-tsai-accent-cyan/30 hover:text-tsai-text"
                >
                  Generate blog
                  <span className="text-tsai-accent-cyan">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#00000033] p-6 backdrop-blur-md">
            <h3 className="font-semibold text-tsai-text">Recent Activity</h3>
            <ul className="mt-4 space-y-4">
              {activity.map((item, i) => (
                <li key={i} className="relative pl-4">
                  <span
                    className="absolute top-1.5 left-0 h-2 w-2 rounded-full bg-tsai-accent-cyan shadow-[0_0_8px_#12d7f5]"
                    aria-hidden
                  />
                  <p className="text-xs text-tsai-subtle">{item.time}</p>
                  <p className="mt-0.5 text-sm text-tsai-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
