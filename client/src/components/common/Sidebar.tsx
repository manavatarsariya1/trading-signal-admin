import { LayoutDashboard, FileText, Users, Settings2, WandSparkles, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SITE_URL = 'https://www.tradingsignals.ai'

type SidebarItemProps = {
  to: string
  label: string
  icon: LucideIcon
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
    isActive
      ? 'border border-tsai-accent-cyan/25 bg-linear-to-r from-tsai-accent/25 to-tsai-accent-cyan/10 text-tsai-text shadow-[0_0_24px_rgba(18,215,245,0.08)]'
      : 'border border-transparent text-tsai-muted hover:border-white/8 hover:bg-white/5 hover:text-tsai-text'
  }`

function NavIcon({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
        active
          ? 'border-tsai-accent-cyan/35 bg-tsai-accent-cyan/15 text-white shadow-[0_0_18px_rgba(18,215,245,0.16)]'
          : 'border-white/8 bg-white/5 text-tsai-accent-cyan group-hover:border-tsai-accent-cyan/30 group-hover:bg-white/10'
      }`}
    >
      {children}
    </span>
  )
}

function SidebarItem({ to, label, icon: Icon }: SidebarItemProps) {
  return (
    <NavLink to={to} className={linkClass}>
      {({ isActive }) => (
        <>
          <NavIcon active={isActive}>
            <Icon className="h-4 w-4" strokeWidth={2.25} />
          </NavIcon>
          {label}
        </>
      )}
    </NavLink>
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
        <SidebarItem to="/admin/dashboard" label="Dashboard" icon={LayoutDashboard} />

        <SidebarItem to="/admin/blogs" label="All Blogs" icon={FileText} />

        <SidebarItem to="/admin/users" label="Users" icon={Users} />

        <SidebarItem to="/admin/settings" label="Settings" icon={Settings2} />

        <a
          href={`${SITE_URL}/generate-blogs`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-tsai-muted transition hover:border-white/8 hover:bg-white/5 hover:text-tsai-text"
        >
          <NavIcon>
            <WandSparkles className="h-4 w-4" strokeWidth={2.25} />
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
