import { useAdminStats } from '@/hooks/useAdmin'
import { Package, ShoppingCart, Users, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Loading from '@/components/Loading'

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats()

  const cards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart },
    { label: 'Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign },
    { label: 'Customers', value: stats.totalCustomers, icon: Users },
    { label: 'Products', value: stats.totalProducts, icon: Package },
    { label: 'Pending', value: stats.pendingOrders, icon: TrendingUp },
    { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, alert: stats.lowStock > 0 },
  ]

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <h1 className="text-3xl font-black tracking-tight text-saif-text mb-8">Dashboard</h1>
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 border border-saif-border skeleton rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(card => (
            <div key={card.label} className={`border p-5 ${card.alert ? 'border-saif-accent' : 'border-saif-border'}`}>
              <div className="flex items-center justify-between mb-3">
                <card.icon size={18} className={card.alert ? 'text-saif-accent' : 'text-saif-dim'} />
                <span className="text-2xl font-bold text-saif-text">{card.value}</span>
              </div>
              <p className="text-xs text-saif-dim uppercase tracking-wider">{card.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
