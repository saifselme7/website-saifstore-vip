import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS } from '@/lib/constants'
import type { Order } from '@/types'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      if (!id) return
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', id)
        .single()
      setOrder(data as Order)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return <div className="pt-28"><Loading /></div>
  if (!order) return (
    <div className="pt-28 px-6 text-center">
      <p className="text-saif-dim">Order not found.</p>
    </div>
  )

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle size={48} className="mx-auto text-green-400 mb-6" />
        <h1 className="text-3xl font-black tracking-tight text-saif-text mb-2">Order Confirmed</h1>
        <p className="text-sm text-saif-dim mb-8">Thank you for your purchase. We will process your order shortly.</p>

        <div className="border border-saif-border p-6 text-left mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-saif-dim">Order Number</span>
            <span className="text-sm font-bold text-saif-text">{order.order_number}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm text-saif-dim">Status</span>
            <span className="text-sm font-semibold text-saif-text">{ORDER_STATUS_LABELS[order.status]}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm text-saif-dim">Date</span>
            <span className="text-sm text-saif-text">{new Date(order.created_at).toLocaleDateString()}</span>
          </div>
          <div className="border-t border-saif-border pt-4 space-y-2">
            {order.items?.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-saif-dim">{item.product_name} × {item.quantity}</span>
                <span className="text-saif-text">{formatPrice(item.total)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-saif-border pt-4 flex justify-between">
            <span className="text-base font-bold text-saif-text">Total</span>
            <span className="text-base font-bold text-saif-text">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="btn btn-primary">View Orders</Link>
          <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
