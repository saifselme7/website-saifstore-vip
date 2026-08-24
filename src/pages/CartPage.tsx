import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useApp } from '@/context/AppContext'
import { formatPrice } from '@/lib/utils'
import Footer from '@/components/Footer'
import EmptyState from '@/components/EmptyState'

export default function CartPage() {
  const { items, count, subtotal, updateQty, removeItem } = useCart()
  const { settings } = useApp()
  const shipping = settings?.shipping_fee || 0
  const freeThreshold = settings?.free_shipping_threshold
  const shippingCost = freeThreshold && subtotal >= freeThreshold ? 0 : shipping
  const total = subtotal + shippingCost

  if (count === 0) {
    return (
      <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 min-h-[60vh]">
        <EmptyState
          title="Your bag is empty"
          description="Add some products and they will appear here."
        />
        <div className="text-center mt-6">
          <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">
          Your Bag ({count})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-saif-border">
                <Link to={`/products/${item.product.slug}`} className="w-24 h-32 bg-[#111] flex-shrink-0 overflow-hidden">
                  <img src={item.product.thumbnail || item.product.images?.[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/products/${item.product.slug}`} className="text-sm font-semibold text-saif-text hover:opacity-70 transition-opacity">
                        {item.product.name}
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-saif-dim mt-0.5">{item.variant.name}</p>
                      )}
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-saif-dim hover:text-saif-accent transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-saif-border">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-1.5 text-saif-text hover:bg-white/5">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm text-saif-text">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-1.5 text-saif-text hover:bg-white/5">
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-saif-text">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-saif-border p-6">
              <h2 className="text-lg font-bold text-saif-text mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-saif-dim">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-saif-dim">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                {freeThreshold && subtotal < freeThreshold && (
                  <p className="text-xs text-saif-accent">
                    Add {formatPrice(freeThreshold - subtotal)} more for free shipping
                  </p>
                )}
                <div className="border-t border-saif-border pt-3 flex justify-between text-base font-bold text-saif-text">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn btn-primary w-full mt-6 text-center">
                Checkout
              </Link>
              <Link to="/products" className="btn w-full mt-3 text-center text-xs">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
