import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useAdminProducts } from '@/hooks/useAdmin'
import { useCategories } from '@/hooks/useCategories'
import { useApp } from '@/context/AppContext'
import { formatPrice, generateSlug } from '@/lib/utils'
import Loading from '@/components/Loading'

export default function AdminProducts() {
  const { products, loading, create, update, remove } = useAdminProducts()
  const { categories } = useCategories()
  const { addToast } = useApp()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<any>(undefined)
  const [form, setForm] = useState<any>({
    name: '', slug: '', description: '', short_description: '', price: '', compare_at_price: '',
    product_type: 'physical', category_id: '', stock: '', sku: '', status: 'draft', featured: false, bestseller: false,
    images: '', thumbnail: '',
  })

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  function openCreate() {
    setEditing(null)
    setForm({ name: '', slug: '', description: '', short_description: '', price: '', compare_at_price: '',
      product_type: 'physical', category_id: '', stock: '', sku: '', status: 'draft', featured: false, bestseller: false,
      images: '', thumbnail: '' })
  }

  function openEdit(product: any) {
    setEditing(product)
    setForm({
      name: product.name, slug: product.slug, description: product.description,
      short_description: product.short_description, price: product.price,
      compare_at_price: product.compare_at_price || '', product_type: product.product_type,
      category_id: product.category_id || '', stock: product.stock, sku: product.sku || '',
      status: product.status, featured: product.featured, bestseller: product.bestseller,
      images: (product.images || []).join(', '), thumbnail: product.thumbnail || '',
    })
  }

  async function handleSave() {
    const payload = {
      ...form,
      price: Number(form.price),
      compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
      stock: Number(form.stock),
      images: form.images ? form.images.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    }
    if (!payload.slug) payload.slug = generateSlug(payload.name)

    if (editing) {
      const { error } = await update(editing.id, payload)
      if (error) addToast('Failed to update product', 'error')
      else { addToast('Product updated'); setEditing(undefined) }
    } else {
      const { error } = await create(payload)
      if (error) addToast('Failed to create product', 'error')
      else { addToast('Product created'); setEditing(undefined) }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    const { error } = await remove(id)
    if (error) addToast('Failed to delete', 'error')
    else addToast('Product deleted')
  }

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight text-saif-text">Products</h1>
        <button onClick={openCreate} className="btn btn-primary btn-sm">
          <Plus size={14} className="mr-1" /> Add Product
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-saif-dim" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input pl-10" />
        </div>
      </div>

      {loading ? <Loading /> : (
        <div className="border border-saif-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-saif-border text-left">
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Product</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Price</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Stock</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Status</th>
                <th className="p-4 text-xs uppercase tracking-wider text-saif-dim font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-saif-border hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.thumbnail && (
                        <img src={product.thumbnail} alt="" className="w-10 h-10 object-cover bg-[#111]" />
                      )}
                      <div>
                        <p className="font-medium text-saif-text">{product.name}</p>
                        <p className="text-xs text-saif-dim">{product.categories?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-saif-text">{formatPrice(product.price)}</td>
                  <td className="p-4 text-saif-dim">{product.stock}</td>
                  <td className="p-4">
                    <span className={`text-xs uppercase px-2 py-0.5 border ${
                      product.status === 'active' ? 'border-green-500 text-green-400' :
                      product.status === 'draft' ? 'border-yellow-500 text-yellow-400' :
                      'border-saif-dim text-saif-dim'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(product)} className="p-1.5 text-saif-dim hover:text-saif-text transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 text-saif-dim hover:text-saif-accent transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== undefined && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-saif-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-saif-text mb-6">{editing ? 'Edit Product' : 'New Product'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Slug</label>
                <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="input" placeholder="auto-generated if empty" />
              </div>
              <div>
                <label className="label">Category</label>
                <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className="input">
                  <option value="">None</option>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Price</label>
                <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Compare at Price</label>
                <input type="number" step="0.01" value={form.compare_at_price} onChange={e => setForm({...form, compare_at_price: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Stock</label>
                <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">SKU</label>
                <input value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className="input" />
              </div>
              <div>
                <label className="label">Type</label>
                <select value={form.product_type} onChange={e => setForm({...form, product_type: e.target.value})} className="input">
                  <option value="physical">Physical</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input resize-none" />
              </div>
              <div className="md:col-span-2">
                <label className="label">Thumbnail URL</label>
                <input value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} className="input" />
              </div>
              <div className="md:col-span-2">
                <label className="label">Images (comma-separated URLs)</label>
                <input value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="input" placeholder="https://... , https://..." />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <label className="flex items-center gap-2 text-sm text-saif-text cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} /> Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-saif-text cursor-pointer">
                  <input type="checkbox" checked={form.bestseller} onChange={e => setForm({...form, bestseller: e.target.checked})} /> Bestseller
                </label>
              </div>
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
