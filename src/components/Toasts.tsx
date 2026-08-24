import { useApp } from '@/context/AppContext'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

export default function Toasts() {
  const { toasts, removeToast } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-3.5 min-w-[280px] max-w-md animate-[toastIn_0.4s_ease] ${
            toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-saif-text'
          } text-black`}
        >
          {toast.type === 'error' ? <XCircle size={18} /> : toast.type === 'info' ? <Info size={18} /> : <CheckCircle size={18} />}
          <span className="text-sm font-medium flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
