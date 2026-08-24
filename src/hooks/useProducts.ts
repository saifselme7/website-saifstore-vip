import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

export function useProducts(filters?: {
  category?: string
  type?: 'physical' | 'digital'
  featured?: boolean
  bestseller?: boolean
  search?: string
  minPrice?: number
  maxPrice?: number
  tags?: string[]
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('products')
      .select('*, categories(*), product_variants(*)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (filters?.category) query = query.eq('category_id', filters.category)
    if (filters?.type) query = query.eq('product_type', filters.type)
    if (filters?.featured) query = query.eq('featured', true)
    if (filters?.bestseller) query = query.eq('bestseller', true)
    if (filters?.search) query = query.ilike('name', `%${filters.search}%`)
    if (filters?.minPrice !== undefined) query = query.gte('price', filters.minPrice)
    if (filters?.maxPrice !== undefined) query = query.lte('price', filters.maxPrice)

    const { data, error } = await query
    if (error) setError(error.message)
    else setProducts((data || []) as Product[])
    setLoading(false)
  }, [JSON.stringify(filters)])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*), product_variants(*)')
        .eq('slug', slug)
        .single()
      if (error) setError(error.message)
      else setProduct(data as Product)
      setLoading(false)
    }
    fetch()
  }, [slug])

  return { product, loading, error }
}
