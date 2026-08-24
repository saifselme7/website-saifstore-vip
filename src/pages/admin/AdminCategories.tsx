import { useState } from 'react'
import { useAdminCategories } from '@/hooks/useAdmin'
import { useApp } from '@/context/AppContext'
import { Pencil, Trash2, Plus } from 'lucide-react'
import Loading from '@/components/Loading'

export default function AdminCategories() {
  const { categories, loading, create, update, remove } = useAdminCategories()
  const { addToast } = useApp()
  const [editing, setEditing] = useState<any>(undefined)
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '', sort_order: 0, is_active: true })

  function openCreate() {
    setEditing(null)
    setForm({ name: '', slug: '', description: '', image: '', sort_order: 0, is_active: true })
  }

  function openEdit(cat: any) {
    setEditing(cat)
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', image: cat.image || '', sort_order: cat.sort_order, is_active: cat.is_active })
  }

  async function handleSave() {
    if (editing) {
      const { error } = await update(editing.id, form)
      if (error) addToast('Failed to update', 'error')
      else { addToast('Category updated'); setEditing(undefined) }
    } else {
      const { error } = await create(form)
      if (error) addToast('Failed to create', 'error')
      else { addToast('Category created'); setEditing(undefined) }
    }
  }

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight text-saif-text">Categories</h1>
        <button onClick={openCreate} className="btn btn-primary btn-sm"><Plus size={14} className="mr-1" /> Add</button>
      </div>

      {loading ? <Loading /> : (
        <div className="border border-saif-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-saif-border text-left">
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Name</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Slug</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Active</th>
                <th className="p-4 text-xs uppercase text-saif-dim font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="border-b border-saif-border hover:bg-white/5">
                  <td className="p-4 text-saif-text font-medium">{cat.name}</td>
                  <td className="p-4 text-saif-dim">{cat.slug}</td>
                  <td className="p-4"><span className={`text-xs ${cat.is_active ? 'text-green-400' : 'text-saif-dim'}`}>{cat.is_active ? 'Yes' : 'No'}</span></td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openEdit(cat)} className="p-1.5 text-saif-dim hover:text-saif-text"><Pencil size={14} /></button>
                    <button onClick={() => { if (confirm('Delete?')) remove(cat.id) }} className="p-1.5 text-saif-dim hover:text-saif-accent"><Trash2 size={14} /></button>
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
            <h2 className="text-xl font-bold text-saif-text mb-4">{editing ? 'Edit' : 'New'} Category</h2>
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" className="input" />
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="Slug" className="input" />
              <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" className="input" />
              <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Image URL" className="input" />
              <input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: Number(e.target.value)})} placeholder="Sort Order" className="input" />
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
