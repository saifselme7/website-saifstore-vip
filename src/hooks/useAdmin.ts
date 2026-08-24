import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product, Order, Category, Coupon, Review, Profile } from '@/types'

export function useAdminStats() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    lowStock: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const [ordersRes, productsRes, customersRes] = await Promise.all([
      supabase.from('orders').select('status, total'),
      supabase.from('products').select('stock'),
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'customer'),
    ])

    const orders = ordersRes.data || []
    const products = productsRes.data || []

    setStats({
      totalOrders: orders.length,
      totalRevenue: orders.reduce((s, o) => s + (o.total || 0), 0),
      totalCustomers: customersRes.count || 0,
      totalProducts: products.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      lowStock: products.filter(p => (p.stock || 0) < 5).length,
    })
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { stats, loading, refetch: fetch }
}

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name), product_variants(*)')
      .order('created_at', { ascending: false })
    setProducts((data || []) as Product[])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = async (product: Partial<Product>) => {
    const { data, error } = await supabase.from('products').insert(product).select().single()
    if (!error) fetch()
    return { data, error }
  }

  const update = async (id: string, product: Partial<Product>) => {
    const { error } = await supabase.from('products').update(product).eq('id', id)
    if (!error) fetch()
    return { error }
  }

  const remove = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) fetch()
    return { error }
  }

  return { products, loading, create, update, remove, refetch: fetch }
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    setCategories((data || []) as Category[])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = async (cat: Partial<Category>) => {
    const { error } = await supabase.from('categories').insert(cat)
    if (!error) fetch()
    return { error }
  }

  const update = async (id: string, cat: Partial<Category>) => {
    const { error } = await supabase.from('categories').update(cat).eq('id', id)
    if (!error) fetch()
    return { error }
  }

  const remove = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (!error) fetch()
    return { error }
  }

  return { categories, loading, create, update, remove, refetch: fetch }
}

export function useAdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false })
    setCoupons((data || []) as Coupon[])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = async (coupon: Partial<Coupon>) => {
    const { error } = await supabase.from('coupons').insert(coupon)
    if (!error) fetch()
    return { error }
  }

  const update = async (id: string, coupon: Partial<Coupon>) => {
    const { error } = await supabase.from('coupons').update(coupon).eq('id', id)
    if (!error) fetch()
    return { error }
  }

  const remove = async (id: string) => {
    const { error } = await supabase.from('coupons').delete().eq('id', id)
    if (!error) fetch()
    return { error }
  }

  return { coupons, loading, create, update, remove, refetch: fetch }
}

export function useAdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*, profiles(full_name), products(name)')
      .order('created_at', { ascending: false })
    setReviews((data || []) as Review[])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('reviews').update({ status }).eq('id', id)
    if (!error) fetch()
    return { error }
  }

  const remove = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (!error) fetch()
    return { error }
  }

  return { reviews, loading, updateStatus, remove, refetch: fetch }
}
