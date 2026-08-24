import { useState } from 'react'
import { useAllOrders } from '@/hooks/useOrders'
import { useApp } from '@/context/AppContext'
import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'
import Loading from '@/components/Loading'

export default function AdminOrders() {
  const { orders, loading, refetch } = useAllOrders()
  const { addToast } = useApp()
  const [filter, setFilter] = useState('')

  async function updateStatus(orderId: string, status: string) {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)
    if (error) addToast('Failed to update status', 'error')
    else { addToast('Status updated'); refetch() }
  }

  const filtered = orders.filter(o => !filter || o.status === filter)

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <h1 className="text-3xl font-black tracking-tight text-saif-text mb-8">Orders</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button onClick={() => setFilter('')} className={`px-3 py-1.5 text-xs border ${!filter ? 'border-saif-text text-saif-text' : 'border-saif-border text-saif-dim'}`}>All</button>
        {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs border capitalize ${filter === s ? 'border-saif-text text-saif-text' : 'border-saif-border text-saif-dim'}`}>{s}</button>
        ))}
      </div>

      {loading ? <Loading /> : (
        <div className="border border-saif-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-saif-border text-left">
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Order</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Customer</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Total</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Status</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-b border-saif-border hover:bg-white/5">
                  <td className="p-4 font-medium text-saif-text">{order.order_number}</td>
                  <td className="p-4 text-saif-dim">{order.customer_name}<br/><span className="text-xs">{order.customer_email}</span></td>
                  <td className="p-4 text-saif-text">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className={`bg-transparent text-xs uppercase border px-2 py-1 ${ORDER_STATUS_COLORS[order.status] || 'text-saif-dim'} border-current`}
                    >
                      {Object.keys(ORDER_STATUS_LABELS).map(s => (
                        <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-saif-dim text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
