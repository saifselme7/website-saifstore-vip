import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Minus, Plus, Truck, Shield, Zap } from 'lucide-react'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/hooks/useWishlist'
import { useApp } from '@/context/AppContext'
import { useReviews } from '@/hooks/useReviews'
import { formatPrice } from '@/lib/utils'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { product, loading } = useProduct(slug || '')
  const { addItem } = useCart()
  const { user } = useAuth()
  const { add, remove, isInWishlist } = useWishlist()
  const { addToast } = useApp()
  const { reviews } = useReviews(product?.id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  if (loading) return <div className="pt-28"><Loading /></div>
  if (!product) return (
    <div className="pt-28 px-6">
      <EmptyState title="Product not found" description="This product may have been removed or is unavailable." />
    </div>
  )

  const variant = product.variants?.find(v => v.id === selectedVariant)
  const inWishlist = isInWishlist(product.id)
  const isDigital = product.product_type === 'digital'

  async function handleAddToCart() {
    addItem(product, variant || null, quantity)
    addToast(`${product.name} added to bag`)
  }

  async function toggleWishlist() {
    if (!user) { addToast('Please sign in to use wishlist', 'error'); return }
    if (inWishlist) { await remove(product.id); addToast('Removed from wishlist') }
    else { await add(product.id); addToast('Added to wishlist') }
  }

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <div className="pt-28 px-6 lg:px-10 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="aspect-[3/4] bg-[#111] overflow-hidden mb-3">
              <img
                src={product.images?.[selectedImage] || product.thumbnail || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-saif-text' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pt-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-[clamp(32px,5vw,56px)] font-black tracking-tight leading-none text-saif-text">
                {product.name}
              </h1>
              <button onClick={toggleWishlist} className="mt-2">
                <Heart size={22} className={inWishlist ? 'fill-saif-accent text-saif-accent' : 'text-saif-text'} />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-bold text-saif-text">{formatPrice(product.price)}</span>
              {product.compare_at_price && (
                <span className="text-lg text-saif-dim line-through">{formatPrice(product.compare_at_price)}</span>
              )}
            </div>

            <p className="mt-6 text-base text-saif-dim leading-relaxed">{product.description}</p>

            {/* Variants */}
            {!isDigital && product.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <label className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-3 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id === selectedVariant ? null : v.id)}
                      className={`px-4 py-2 text-sm font-medium border transition-all ${
                        selectedVariant === v.id
                          ? 'border-saif-text bg-saif-text text-black'
                          : 'border-saif-border text-saif-text hover:border-saif-text'
                      }`}
                    >
                      {v.size || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {!isDigital && (
              <div className="mt-8">
                <label className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-3 block">Quantity</label>
                <div className="flex items-center border border-saif-border w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-saif-text hover:bg-white/5">
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-medium text-saif-text min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-saif-text hover:bg-white/5">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} className="btn btn-primary flex-1">
                Add to Bag
              </button>
              <Link to="/products" className="btn text-center">Back</Link>
            </div>

            {/* Meta */}
            <div className="mt-12 pt-8 border-t border-saif-border space-y-4">
              <div className="flex items-center gap-3 text-sm text-saif-dim">
                {isDigital ? <Zap size={16} /> : <Truck size={16} />}
                <span>{isDigital ? 'Instant digital delivery' : 'Free shipping on orders over $50'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-saif-dim">
                <Shield size={16} />
                <span>Secure checkout</span>
              </div>
              <p className="text-xs text-saif-dim">SKU: {product.sku || 'N/A'}</p>
              <p className="text-xs text-saif-dim">Category: {product.categories?.name || 'N/A'}</p>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="mt-12 pt-8 border-t border-saif-border">
                <h3 className="text-lg font-bold text-saif-text mb-4">Reviews ({reviews.length})</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map(r => (
                    <div key={r.id} className="border-b border-saif-border pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-saif-text">{r.user?.full_name || 'Anonymous'}</span>
                        <span className="text-xs text-saif-accent">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                      </div>
                      <p className="text-sm text-saif-dim">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
