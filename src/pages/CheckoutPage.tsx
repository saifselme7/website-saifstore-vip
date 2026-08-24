import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useApp } from '@/context/AppContext'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const { settings, addToast } = useApp()
  const [submitting, setSubmitting] = useState(false)

  const shipping = settings?.shipping_fee || 0
  const freeThreshold = settings?.free_shipping_threshold
  const hasPhysical = items.some(i => i.product.product_type === 'physical')
  const shippingCost = !hasPhysical || (freeThreshold && subtotal >= freeThreshold) ? 0 : shipping
  const total = subtotal + shippingCost

  const [form, setForm] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: '',
    city: '',
    country: '',
    notes: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) { addToast('Please sign in to checkout', 'error'); return }
    if (items.length === 0) { addToast('Your bag is empty', 'error'); return }

    setSubmitting(true)

    const orderNumber = generateOrderNumber()
    const orderData = {
      order_number: orderNumber,
      user_id: user.id,
      status: 'pending',
      subtotal,
      discount: 0,
      total,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone || null,
      shipping_address: hasPhysical ? {
        address: form.address,
        city: form.city,
        country: form.country,
      } : null,
      notes: form.notes || null,
    }

    const { data: order, error } = await supabase.from('orders').insert(orderData).select().single()

    if (error || !order) {
      addToast('Failed to create order. Please try again.', 'error')
      setSubmitting(false)
      return
    }

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      variant_id: item.variant?.id || null,
      product_name: item.product.name,
      variant_name: item.variant?.name || null,
      price: item.product.price,
      quantity: item.quantity,
      total: item.product.price * item.quantity,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

    if (itemsError) {
      addToast('Failed to save order items.', 'error')
      setSubmitting(false)
      return
    }

    clearCart()
    addToast('Order placed successfully!')
    navigate(`/orders/${order.id}/confirmation?number=${orderNumber}`)
  }

  if (items.length === 0) {
    return (
      <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 text-center">
        <h1 className="text-3xl font-bold text-saif-text mb-4">Your bag is empty</h1>
        <button onClick={() => navigate('/products')} className="btn">Continue Shopping</button>
        <Footer />
      </div>
    )
  }

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-saif-dim mb-4">Contact</h2>
              <div className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                />
              </div>
            </div>

            {hasPhysical && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-saif-dim mb-4">Shipping</h2>
                <div className="space-y-4">
                  <input
                    required={hasPhysical}
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required={hasPhysical}
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                    />
                    <input
                      required={hasPhysical}
                      type="text"
                      placeholder="Country"
                      value={form.country}
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-saif-dim mb-4">Notes</h2>
              <textarea
                placeholder="Order notes (optional)"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40 resize-none"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? 'Processing...' : `Complete Order — ${formatPrice(total)}`}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="border border-saif-border p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-saif-dim mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-saif-dim">{item.product.name} × {item.quantity}</span>
                    <span className="text-saif-text font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-saif-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-saif-dim">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-saif-dim">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-saif-text pt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
