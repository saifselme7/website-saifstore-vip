import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/hooks/useWishlist'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'

export default function WishlistPage() {
  const { user } = useAuth()
  const { items, loading } = useWishlist()

  if (!user) return (
    <div className="pt-28 px-6 text-center">
      <p className="text-saif-dim">Please sign in to view your wishlist.</p>
      <Link to="/login" className="btn mt-4">Sign In</Link>
    </div>
  )

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Wishlist</h1>
        {loading ? <Loading /> : items.length === 0 ? (
          <EmptyState title="Your wishlist is empty" description="Save items you love for later." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
