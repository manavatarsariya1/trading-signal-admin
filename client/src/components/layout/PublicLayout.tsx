import { Outlet, useLocation } from 'react-router-dom'
import MarketingBackground from '../marketing/MarketingBackground'
import MarketingNavbar from '../marketing/MarketingNavbar'

export default function PublicLayout() {
  const { pathname } = useLocation()
  const isHero = pathname === '/'

  return (
    <div className="relative min-h-screen text-tsai-text">
      <MarketingBackground variant={isHero ? 'hero' : 'auth'} />
      <MarketingNavbar />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  )
}
