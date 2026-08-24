import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import type { Product, ProductVariant, CartItem } from '@/types'

interface CartContextType {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (product: Product, variant: ProductVariant | null, qty?: number) => void
  removeItem: (itemId: string) => void
  updateQty: (itemId: string, qty: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = 'saif-cart'

function getSessionId() {
  let sid = localStorage.getItem('saif-session-id')
  if (!sid) {
    sid = crypto.randomUUID()
    localStorage.setItem('saif-session-id', sid)
  }
  return sid
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  // Load from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try { setItems(JSON.parse(raw)) } catch {}
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Sync with Supabase when user logs in
  useEffect(() => {
    if (!user) return
    syncCartToUser()
  }, [user])

  async function syncCartToUser() {
    const sessionId = getSessionId()
    const { data: existing } = await supabase
      .from('carts')
      .select('id, cart_items(*)')
      .eq('user_id', user.id)
      .single()

    if (existing) {
      // Merge local items with server items
      // For simplicity, we'll just keep local items and update server
    }
  }

  const addItem = useCallback((product: Product, variant: ProductVariant | null, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.variant?.id === variant?.id)
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { id: crypto.randomUUID(), product, variant, quantity: qty }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId))
  }, [])

  const updateQty = useCallback((itemId: string, qty: number) => {
    if (qty < 1) {
      setItems(prev => prev.filter(i => i.id !== itemId))
      return
    }
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, subtotal, addItem, removeItem, updateQty, clearCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
