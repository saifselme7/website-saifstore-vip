import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useApp } from '@/context/AppContext'
import type { SiteSettings } from '@/types'
import Loading from '@/components/Loading'

export default function AdminSettings() {
  const { addToast } = useApp()
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('site_settings').select('*').limit(1).single()
      if (data) {
        setSettings(data as SiteSettings)
        setForm(data)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  async function handleSave() {
    if (!settings) return
    const { error } = await supabase.from('site_settings').update(form).eq('id', settings.id)
    if (error) addToast('Failed to save', 'error')
    else addToast('Settings saved')
  }

  if (loading) return <Loading />

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <h1 className="text-3xl font-black tracking-tight text-saif-text mb-8">Settings</h1>
      <div className="max-w-xl space-y-4">
        <div>
          <label className="label">Store Name</label>
          <input value={form.store_name || ''} onChange={e => setForm({...form, store_name: e.target.value})} className="input" />
        </div>
        <div>
          <label className="label">Description</label>
          <input value={form.store_description || ''} onChange={e => setForm({...form, store_description: e.target.value})} className="input" />
        </div>
        <div>
          <label className="label">Contact Email</label>
          <input value={form.contact_email || ''} onChange={e => setForm({...form, contact_email: e.target.value})} className="input" />
        </div>
        <div>
          <label className="label">Currency</label>
          <input value={form.currency || 'USD'} onChange={e => setForm({...form, currency: e.target.value})} className="input" />
        </div>
        <div>
          <label className="label">Shipping Fee</label>
          <input type="number" step="0.01" value={form.shipping_fee || 0} onChange={e => setForm({...form, shipping_fee: Number(e.target.value)})} className="input" />
        </div>
        <div>
          <label className="label">Free Shipping Threshold</label>
          <input type="number" step="0.01" value={form.free_shipping_threshold || ''} onChange={e => setForm({...form, free_shipping_threshold: e.target.value ? Number(e.target.value) : null})} className="input" />
        </div>
        <div>
          <label className="label">Hero Title</label>
          <input value={form.hero_title || ''} onChange={e => setForm({...form, hero_title: e.target.value})} className="input" />
        </div>
        <div>
          <label className="label">Hero Subtitle</label>
          <input value={form.hero_subtitle || ''} onChange={e => setForm({...form, hero_subtitle: e.target.value})} className="input" />
        </div>
        <div>
          <label className="label">Announcement Bar</label>
          <input value={form.announcement || ''} onChange={e => setForm({...form, announcement: e.target.value})} className="input" placeholder="Leave empty to hide" />
        </div>
        <label className="flex items-center gap-2 text-sm text-saif-text mt-4">
          <input type="checkbox" checked={form.maintenance_mode || false} onChange={e => setForm({...form, maintenance_mode: e.target.checked})} />
          Maintenance Mode
        </label>
        <button onClick={handleSave} className="btn btn-primary w-full mt-6">Save Settings</button>
      </div>
    </div>
  )
}
