import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useApp } from '@/context/AppContext'
import { useCategories } from '@/hooks/useCategories'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile } = useAuth()
  const { count } = useCart()
  const { mobileMenuOpen, setMobileMenuOpen, settings } = useApp()
  const { categories } = useCategories()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Announcement bar */}
      {settings?.announcement && (
        <div className="bg-saif-accent text-black text-center text-xs font-semibold py-2 px-4 tracking-wide">
          {settings.announcement}
        </div>
      )}

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-saif ${
        scrolled || searchOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      } ${settings?.announcement ? 'mt-8' : ''}`}>
        <div className="flex items-center justify-between px-6 lg:px-10 py-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-saif-text hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight text-saif-text hover:opacity-70 transition-opacity">
            SAIF STORE<sup className="text-[10px] font-normal ml-0.5">®</sup>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/products" className="text-sm font-medium text-saif-text hover:opacity-60 transition-opacity relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-saif-text transition-all duration-300 group-hover:w-full" />
            </Link>
            {categories.slice(0, 4).map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="text-sm font-medium text-saif-text hover:opacity-60 transition-opacity relative group"
              >
                {cat.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-saif-text transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-saif-text hover:opacity-60 transition-opacity"
            >
              <Search size={20} />
            </button>
            {user && (
              <Link to="/wishlist" className="text-saif-text hover:opacity-60 transition-opacity hidden sm:block">
                <Heart size={20} />
              </Link>
            )}
            <Link to={user ? '/account' : '/login'} className="text-saif-text hover:opacity-60 transition-opacity hidden sm:block">
              <User size={20} />
            </Link>
            <button
              onClick={() => navigate('/cart')}
              className="text-saif-text hover:opacity-60 transition-opacity relative"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-saif-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="border-t border-saif-border px-6 lg:px-10 py-4 animate-[fadeUp_0.3s_ease]">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-saif-text text-lg border-b border-saif-border pb-2 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/50"
              />
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <Link to="/" className="text-3xl font-bold tracking-tight text-saif-text">Home</Link>
        <Link to="/products" className="text-3xl font-bold tracking-tight text-saif-text">Shop</Link>
        {categories.map(cat => (
          <Link key={cat.id} to={`/products?category=${cat.id}`} className="text-2xl font-semibold text-saif-dim">
            {cat.name}
          </Link>
        ))}
        {user ? (
          <>
            <Link to="/account" className="text-2xl font-semibold text-saif-dim">Account</Link>
            <Link to="/orders" className="text-2xl font-semibold text-saif-dim">Orders</Link>
            {profile?.role === 'admin' && (
              <Link to="/admin" className="text-2xl font-semibold text-saif-accent">Admin</Link>
            )}
          </>
        ) : (
          <Link to="/login" className="text-2xl font-semibold text-saif-dim">Sign In</Link>
        )}
      </div>
    </>
  )
}
