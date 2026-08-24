import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Truck, Shield } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { useApp } from '@/context/AppContext'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function HomePage() {
  const { products: featured, loading: fLoading } = useProducts({ featured: true })
  const { products: digital, loading: dLoading } = useProducts({ type: 'digital' })
  const { products: bestsellers, loading: bLoading } = useProducts({ bestseller: true })
  const { categories } = useCategories()
  const { settings } = useApp()
  const aboutRef = useReveal()

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-32 pb-16">
        <h1 className="text-[clamp(80px,18vw,280px)] font-black tracking-tighter leading-[0.85] text-center text-saif-text">
          {settings?.hero_title || 'SAIF STORE'}<sup className="text-[0.15em] font-normal align-super ml-1">®</sup>
        </h1>
        <p className="mt-8 text-sm text-saif-dim text-center max-w-md leading-relaxed animate-[fadeUp_0.8s_0.4s_both]">
          {settings?.hero_subtitle || 'Premium fashion and digital products. Carefully curated for the modern individual.'}
        </p>
        <div className="mt-10 flex gap-4 animate-[fadeUp_0.8s_0.6s_both]">
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
          <Link to="/products?type=digital" className="btn">Digital</Link>
        </div>

        {/* Hero product strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-6xl animate-[fadeUp_0.8s_0.8s_both]">
          {featured.slice(0, 4).map(p => (
            <Link key={p.id} to={`/products/${p.slug}`} className="group relative aspect-[3/4] overflow-hidden">
              <img src={p.thumbnail || p.images?.[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 ease-saif group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {p.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-saif-text mb-10">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group relative aspect-square overflow-hidden bg-[#111]"
              >
                {cat.image && (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 ease-saif group-hover:scale-110 opacity-60 group-hover:opacity-80" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold uppercase tracking-wider text-saif-text">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-saif-text">Featured</h2>
            <Link to="/products?featured=true" className="text-sm text-saif-dim hover:text-saif-text transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {fLoading ? <Loading /> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {featured.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Digital Products */}
      <section className="px-6 lg:px-10 py-20 border-t border-saif-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-saif-text">Digital</h2>
            <Link to="/products?type=digital" className="text-sm text-saif-dim hover:text-saif-text transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {dLoading ? <Loading /> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {digital.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="px-6 lg:px-10 py-20 border-t border-saif-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-saif-text">Bestsellers</h2>
            <Link to="/products?bestseller=true" className="text-sm text-saif-dim hover:text-saif-text transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {bLoading ? <Loading /> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {bestsellers.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-10 py-20 border-t border-saif-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Truck size={28} className="mx-auto mb-4 text-saif-text" />
            <h3 className="text-sm font-semibold text-saif-text mb-2">Free Shipping</h3>
            <p className="text-sm text-saif-dim">On orders over $50</p>
          </div>
          <div className="text-center">
            <Shield size={28} className="mx-auto mb-4 text-saif-text" />
            <h3 className="text-sm font-semibold text-saif-text mb-2">Secure Checkout</h3>
            <p className="text-sm text-saif-dim">Your data is protected</p>
          </div>
          <div className="text-center">
            <Zap size={28} className="mx-auto mb-4 text-saif-text" />
            <h3 className="text-sm font-semibold text-saif-text mb-2">Instant Digital</h3>
            <p className="text-sm text-saif-dim">Digital products delivered fast</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 lg:px-10 py-32">
        <div className="max-w-2xl mx-auto text-center reveal" ref={aboutRef}>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-tight leading-tight text-saif-text mb-8">
            Made to be worn.<br />Or judged. Or both.
          </h2>
          <p className="text-base text-saif-dim leading-relaxed">
            We design for the people. That is our obsession, no matter who you are.
            Designed with enough spacing to keep your thoughts aligned. Perfect for grid minds and shady days.
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn">View Collection</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
