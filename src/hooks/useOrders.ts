import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import type { Order } from '@/types'

export function useOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    async function fetch() {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setOrders((data || []) as Order[])
      setLoading(false)
    }
    fetch()
  }, [user])

  return { orders, loading }
}

export function useAllOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*), profiles(full_name, email)')
      .order('created_at', { ascending: false })
    setOrders((data || []) as Order[])
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [])

  return { orders, loading, refetch: fetchOrders }
}
