import { Link } from 'react-router-dom'
import { useOrders } from '@/hooks/useOrders'
import { useAuth } from '@/context/AuthContext'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'

export default function OrdersPage() {
  const { user } = useAuth()
  const { orders, loading } = useOrders()

  if (!user) return (
    <div className="pt-28 px-6 text-center">
      <p className="text-saif-dim">Please sign in to view your orders.</p>
      <Link to="/login" className="btn mt-4">Sign In</Link>
    </div>
  )

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Orders</h1>
        {loading ? <Loading /> : orders.length === 0 ? (
          <EmptyState title="No orders yet" description="Your order history will appear here." />
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Link key={order.id} to={`/orders/${order.id}`} className="block border border-saif-border p-6 hover:bg-white/5 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-saif-text">{order.order_number}</p>
                    <p className="text-xs text-saif-dim mt-1">{new Date(order.created_at).toLocaleDateString()} · {order.items?.length || 0} items</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-saif-text">{formatPrice(order.total)}</span>
                    <span className={`text-xs font-semibold uppercase px-2 py-1 border ${ORDER_STATUS_COLORS[order.status] || 'text-saif-dim'} border-current`}>
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
