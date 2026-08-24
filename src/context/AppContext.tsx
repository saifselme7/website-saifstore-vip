import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { SiteSettings } from '@/types'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface AppContextType {
  settings: SiteSettings | null
  toasts: Toast[]
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const { data } = await supabase.from('site_settings').select('*').limit(1).single()
    if (data) setSettings(data as SiteSettings)
  }

  function addToast(message: string, type: Toast['type'] = 'success') {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }

  function removeToast(id: string) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <AppContext.Provider value={{ settings, toasts, addToast, removeToast, mobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
