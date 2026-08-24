import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, Tags, Ticket, MessageSquare, Settings, ArrowLeft } from 'lucide-react'

const nav = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/admin/categories', label: 'Categories', icon: Tags },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { path: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen pt-20 flex">
      <aside className="w-64 border-r border-saif-border hidden md:flex flex-col fixed h-full pt-20 top-0 left-0 bg-black z-30">
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-2">Admin</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {nav.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${
                  active ? 'bg-white/10 text-saif-text' : 'text-saif-dim hover:text-saif-text hover:bg-white/5'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-saif-border">
          <Link to="/" className="flex items-center gap-2 text-xs text-saif-dim hover:text-saif-text transition-colors">
            <ArrowLeft size={14} /> Back to Store
          </Link>
        </div>
      </aside>

      <div className="md:hidden fixed top-20 left-0 right-0 z-30 bg-black border-b border-saif-border overflow-x-auto">
        <div className="flex gap-1 px-3 py-2">
          {nav.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs whitespace-nowrap rounded ${
                location.pathname === item.path ? 'bg-white/10 text-saif-text' : 'text-saif-dim'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 md:ml-64 pt-12 md:pt-0">
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
