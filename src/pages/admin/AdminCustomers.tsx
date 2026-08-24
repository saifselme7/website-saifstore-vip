import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Loading from '@/components/Loading'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'customer')
        .order('created_at', { ascending: false })
      setCustomers((data || []) as any[])
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <h1 className="text-3xl font-black tracking-tight text-saif-text mb-8">Customers</h1>
      {loading ? <Loading /> : (
        <div className="border border-saif-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-saif-border text-left">
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Name</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Phone</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-b border-saif-border hover:bg-white/5">
                  <td className="p-4 text-saif-text font-medium">{c.full_name || 'Anonymous'}</td>
                  <td className="p-4 text-saif-dim">{c.phone || '—'}</td>
                  <td className="p-4 text-saif-dim text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
