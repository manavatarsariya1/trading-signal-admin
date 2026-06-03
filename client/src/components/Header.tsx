import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/dashboard': 'Dashboard',
  '/admin/blogs': 'All Blogs',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings',
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const pageTitle = pageTitles[pathname] ?? 'Admin'

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'AD'

  return (
    <header className="relative z-10 flex h-[4.25rem] shrink-0 items-center justify-between border-b border-white/8 bg-tsai-surface/60 px-6 backdrop-blur-xl lg:px-8">
      <div>
        <p className="text-xs text-tsai-subtle">{getGreeting()}</p>
        <h1 className="text-lg font-semibold tracking-tight text-tsai-text">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pr-4 pl-1.5 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-tsai-accent to-tsai-accent-cyan text-xs font-bold text-white">
              {initials}
            </span>
            <div className="text-left">
              <p className="text-sm font-medium leading-none text-tsai-text">{user.name}</p>
              <p className="mt-0.5 max-w-[140px] truncate text-[11px] text-tsai-subtle">{user.email}</p>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-tsai-muted transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-200"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
