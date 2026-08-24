import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

export default function Footer() {
  const { settings } = useApp()

  return (
    <footer className="border-t border-saif-border pt-20 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-bold tracking-tight text-saif-text">
              SAIF STORE<sup className="text-[10px] font-normal ml-0.5">®</sup>
            </Link>
            <p className="mt-4 text-sm text-saif-dim max-w-sm leading-relaxed">
              {settings?.store_description || 'Premium fashion and digital products. Carefully curated for the modern individual.'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-saif-text mb-4 tracking-wide">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm text-saif-dim hover:text-saif-text transition-colors">All Products</Link></li>
              <li><Link to="/products?type=physical" className="text-sm text-saif-dim hover:text-saif-text transition-colors">Physical</Link></li>
              <li><Link to="/products?type=digital" className="text-sm text-saif-dim hover:text-saif-text transition-colors">Digital</Link></li>
              <li><Link to="/products?featured=true" className="text-sm text-saif-dim hover:text-saif-text transition-colors">Featured</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-saif-text mb-4 tracking-wide">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/shipping" className="text-sm text-saif-dim hover:text-saif-text transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-sm text-saif-dim hover:text-saif-text transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-saif-dim hover:text-saif-text transition-colors">Contact</Link></li>
              <li><Link to="/about" className="text-sm text-saif-dim hover:text-saif-text transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-saif-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-saif-dim">
            © {new Date().getFullYear()} {settings?.store_name || 'SAIF STORE'}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-saif-dim hover:text-saif-text transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-saif-dim hover:text-saif-text transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
