import { useState } from 'react'
import { useAdminCoupons } from '@/hooks/useAdmin'
import { useApp } from '@/context/AppContext'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Loading from '@/components/Loading'

export default function AdminCoupons() {
  const { coupons, loading, create, update, remove } = useAdminCoupons()
  const { addToast } = useApp()
  const [editing, setEditing] = useState<any>(undefined)
  const [form, setForm] = useState({ code: '', type: 'percentage', value: 0, min_order_value: '', max_uses: '', expires_at: '', is_active: true })

  function openCreate() {
    setEditing(null)
    setForm({ code: '', type: 'percentage', value: 0, min_order_value: '', max_uses: '', expires_at: '', is_active: true })
  }

  function openEdit(c: any) {
    setEditing(c)
    setForm({ code: c.code, type: c.type, value: c.value, min_order_value: c.min_order_value || '', max_uses: c.max_uses || '', expires_at: c.expires_at ? c.expires_at.split('T')[0] : '', is_active: c.is_active })
  }

  async function handleSave() {
    const payload = {
      ...form,
      value: Number(form.value),
      min_order_value: form.min_order_value ? Number(form.min_order_value) : null,
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
    }
    if (editing) {
      const { error } = await update(editing.id, payload)
      if (error) addToast('Failed to update', 'error')
      else { addToast('Coupon updated'); setEditing(undefined) }
    } else {
      const { error } = await create(payload)
      if (error) addToast('Failed to create', 'error')
      else { addToast('Coupon created'); setEditing(undefined) }
    }
  }

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight text-saif-text">Coupons</h1>
        <button onClick={openCreate} className="btn btn-primary btn-sm"><Plus size={14} className="mr-1" /> Add</button>
      </div>
      {loading ? <Loading /> : (
        <div className="border border-saif-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-saif-border text-left">
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Code</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Type</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Value</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Uses</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Active</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.id} className="border-b border-saif-border hover:bg-white/5">
                  <td className="p-4 font-mono text-saif-text">{c.code}</td>
                  <td className="p-4 text-saif-dim capitalize">{c.type}</td>
                  <td className="p-4 text-saif-text">{c.type === 'percentage' ? `${c.value}%` : `$${c.value}`}</td>
                  <td className="p-4 text-saif-dim">{c.uses_count}{c.max_uses ? ` / ${c.max_uses}` : ''}</td>
                  <td className="p-4"><span className={`text-xs ${c.is_active ? 'text-green-400' : 'text-saif-dim'}`}>{c.is_active ? 'Yes' : 'No'}</span></td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 text-saif-dim hover:text-saif-text"><Pencil size={14} /></button>
                    <button onClick={() => { if (confirm('Delete?')) remove(c.id) }} className="p-1.5 text-saif-dim hover:text-saif-accent"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== undefined && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-saif-border w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-saif-text mb-4">{editing ? 'Edit' : 'New'} Coupon</h2>
            <div className="space-y-3">
              <input value={form.code} onChange={e => setForm({...form, code: e.target.value})} placeholder="Code" className="input" />
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
              <input type="number" value={form.value} onChange={e => setForm({...form, value: Number(e.target.value)})} placeholder="Value" className="input" />
              <input type="number" value={form.min_order_value} onChange={e => setForm({...form, min_order_value: e.target.value})} placeholder="Min Order" className="input" />
              <input type="number" value={form.max_uses} onChange={e => setForm({...form, max_uses: e.target.value})} placeholder="Max Uses" className="input" />
              <input type="date" value={form.expires_at} onChange={e => setForm({...form, expires_at: e.target.value})} className="input" />
              <label className="flex items-center gap-2 text-sm text-saif-text">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} /> Active
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn btn-primary flex-1">Save</button>
              <button onClick={() => setEditing(undefined)} className="btn flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
