import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Review } from '@/types'

export function useReviews(productId?: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      let query = supabase
        .from('reviews')
        .select('*, profiles(full_name, avatar_url)')
        .eq('status', 'approved')
      if (productId) query = query.eq('product_id', productId)
      const { data } = await query.order('created_at', { ascending: false })
      setReviews((data || []) as Review[])
      setLoading(false)
    }
    fetch()
  }, [productId])

  return { reviews, loading }
}
