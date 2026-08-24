import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/hooks/useWishlist'
import { useApp } from '@/context/AppContext'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { user } = useAuth()
  const { add, remove, isInWishlist } = useWishlist()
  const { addToast } = useApp()
  const [hovered, setHovered] = useState(false)
  const inWishlist = isInWishlist(product.id)

  async function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { addToast('Please sign in to use wishlist', 'error'); return }
    if (inWishlist) {
      await remove(product.id)
      addToast('Removed from wishlist')
    } else {
      await add(product.id)
      addToast('Added to wishlist')
    }
  }

  const image = hovered && product.images?.[1] ? product.images[1] : (product.thumbnail || product.images?.[0] || '')

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 ease-saif group-hover:scale-105"
        />
        {product.compare_at_price && (
          <span className="absolute top-3 left-3 bg-saif-accent text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Sale
          </span>
        )}
        {product.bestseller && (
          <span className="absolute top-3 right-3 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Bestseller
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className="absolute bottom-3 right-3 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black"
        >
          <Heart size={16} className={inWishlist ? 'fill-saif-accent text-saif-accent' : 'text-saif-text'} />
        </button>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-saif-text group-hover:opacity-70 transition-opacity">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-saif-text">{formatPrice(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-sm text-saif-dim line-through">{formatPrice(product.compare_at_price)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
