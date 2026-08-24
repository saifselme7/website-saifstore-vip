import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState({
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    featured: searchParams.get('featured') === 'true',
    bestseller: searchParams.get('bestseller') === 'true',
    search: searchParams.get('q') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  })

  const { products, loading } = useProducts({
    category: localFilters.category || undefined,
    type: localFilters.type as any || undefined,
    featured: localFilters.featured || undefined,
    bestseller: localFilters.bestseller || undefined,
    search: localFilters.search || undefined,
    minPrice: localFilters.minPrice ? Number(localFilters.minPrice) : undefined,
    maxPrice: localFilters.maxPrice ? Number(localFilters.maxPrice) : undefined,
  })
  const { categories } = useCategories()

  function applyFilter(key: string, value: any) {
    const next = { ...localFilters, [key]: value }
    setLocalFilters(next)
    const params = new URLSearchParams()
    Object.entries(next).forEach(([k, v]) => { if (v) params.set(k, String(v)) })
    setSearchParams(params)
  }

  function clearFilters() {
    setLocalFilters({ category: '', type: '', featured: false, bestseller: false, search: '', minPrice: '', maxPrice: '' })
    setSearchParams(new URLSearchParams())
  }

  const hasFilters = Object.values(localFilters).some(v => v !== '' && v !== false)

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-[clamp(48px,8vw,120px)] font-black tracking-tighter leading-[0.9] text-saif-text">
              Collection
            </h1>
            <p className="mt-3 text-sm text-saif-dim">{products.length} items</p>
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-sm text-saif-text hover:opacity-60 transition-opacity"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Filters */}
        {filtersOpen && (
          <div className="mb-10 p-6 border border-saif-border animate-[fadeUp_0.3s_ease]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-2 block">Category</label>
                <select
                  value={localFilters.category}
                  onChange={e => applyFilter('category', e.target.value)}
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-3 py-2 focus:outline-none focus:border-saif-text"
                >
                  <option value="" className="bg-black">All</option>
                  {categories.map(c => <option key={c.id} value={c.id} className="bg-black">{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-2 block">Type</label>
                <select
                  value={localFilters.type}
                  onChange={e => applyFilter('type', e.target.value)}
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-3 py-2 focus:outline-none focus:border-saif-text"
                >
                  <option value="" className="bg-black">All</option>
                  <option value="physical" className="bg-black">Physical</option>
                  <option value="digital" className="bg-black">Digital</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-2 block">Min Price</label>
                <input
                  type="number"
                  value={localFilters.minPrice}
                  onChange={e => applyFilter('minPrice', e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-3 py-2 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-saif-dim mb-2 block">Max Price</label>
                <input
                  type="number"
                  value={localFilters.maxPrice}
                  onChange={e => applyFilter('maxPrice', e.target.value)}
                  placeholder="999"
                  className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-3 py-2 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/30"
                />
              </div>
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="mt-4 text-xs text-saif-dim hover:text-saif-text transition-colors flex items-center gap-1">
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>
        )}

        {loading ? <Loading /> : products.length === 0 ? (
          <EmptyState title="No products found" description="Try adjusting your filters or search query." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
