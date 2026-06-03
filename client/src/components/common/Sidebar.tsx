import { NavLink } from 'react-router-dom'

const SITE_URL = 'https://www.tradingsignals.ai'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
    isActive
      ? 'border border-tsai-accent-cyan/25 bg-linear-to-r from-tsai-accent/25 to-tsai-accent-cyan/10 text-tsai-text shadow-[0_0_24px_rgba(18,215,245,0.08)]'
      : 'border border-transparent text-tsai-muted hover:border-white/8 hover:bg-white/5 hover:text-tsai-text'
  }`

function NavIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-tsai-accent-cyan group-hover:border-tsai-accent-cyan/30">
      {children}
    </span>
  )
}

export default function Sidebar() {
  return (
    <aside className="relative z-10 hidden w-64 shrink-0 flex-col border-r border-white/8 bg-tsai-surface/90 backdrop-blur-xl lg:flex">
      <div className="border-b border-white/8 px-5 py-6">
        <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
          <img
            src="/logofi.svg"
            alt="Trading Signals AI"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </a>
        <p className="mt-3 text-[10px] font-medium tracking-[0.18em] text-tsai-accent-cyan uppercase">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <NavIcon>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
            </svg>
          </NavIcon>
          Dashboard
        </NavLink>

        <NavLink to="/admin/blogs" className={linkClass}>
          <NavIcon>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V7.125c0-.621.504-1.125 1.125-1.125H9.75v-1.5A2.25 2.25 0 0112 4.5z"
              />
            </svg>
          </NavIcon>
          All Blogs
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <NavIcon>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.748-.5" />
            </svg>
          </NavIcon>
          Users
        </NavLink>

        <NavLink to="/admin/settings" className={linkClass}>
          <NavIcon>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            </svg>
          </NavIcon>
          Settings
        </NavLink>

        <a
          href={`${SITE_URL}/generate-blogs`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-tsai-muted transition hover:border-white/8 hover:bg-white/5 hover:text-tsai-text"
        >
          <NavIcon>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
          </NavIcon>
          Generate Blog
        </a>
      </nav>

      <div className="border-t border-white/8 p-4">
        <div className="rounded-xl border border-white/8 bg-linear-to-br from-tsai-card/50 to-transparent p-4">
          <p className="text-xs font-medium text-tsai-text">Need help?</p>
          <p className="mt-1 text-[11px] leading-relaxed text-tsai-subtle">
            Visit the main platform for docs and support.
          </p>
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-medium text-tsai-accent-cyan hover:underline"
          >
            tradingsignals.ai →
          </a>
        </div>
      </div>
    </aside>
  )
}
