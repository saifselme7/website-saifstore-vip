import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import type { Product } from '@/types'

export function useWishlist() {
  const { user } = useAuth()
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (!user) { setLoading(false); return }
    const { data } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', user.id)
    const ids = (data || []).map(d => d.product_id)
    if (ids.length === 0) { setItems([]); setLoading(false); return }
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .in('id', ids)
    setItems((products || []) as Product[])
    setLoading(false)
  }, [user])

  useEffect(() => { fetch() }, [fetch])

  const add = async (productId: string) => {
    if (!user) return
    await supabase.from('wishlists').insert({ user_id: user.id, product_id: productId })
    fetch()
  }

  const remove = async (productId: string) => {
    if (!user) return
    await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', productId)
    fetch()
  }

  const isInWishlist = (productId: string) => items.some(p => p.id === productId)

  return { items, loading, add, remove, isInWishlist, refetch: fetch }
}
