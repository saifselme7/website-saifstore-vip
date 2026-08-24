import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [input, setInput] = useState(query)
  const [activeQuery, setActiveQuery] = useState(query)
  const { products, loading } = useProducts({ search: activeQuery || undefined })

  useEffect(() => {
    setActiveQuery(query)
    setInput(query)
  }, [query])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setActiveQuery(input)
  }

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-6">Search</h1>

        <form onSubmit={handleSearch} className="max-w-xl mb-10">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-saif-dim" />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border border-saif-border text-saif-text text-sm pl-11 pr-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
            />
          </div>
        </form>

        {activeQuery && <p className="text-sm text-saif-dim mb-6">Results for &quot;{activeQuery}&quot; ({products.length})</p>}

        {loading ? <Loading /> : products.length === 0 ? (
          <EmptyState title="No results" description="Try a different search term." />
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
