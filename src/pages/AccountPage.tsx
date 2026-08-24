import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useApp } from '@/context/AppContext'
import { useOrders } from '@/hooks/useOrders'
import { Link } from 'react-router-dom'
import { LogOut, Package, User, Heart } from 'lucide-react'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'

export default function AccountPage() {
  const { user, profile, signOut, updateProfile } = useAuth()
  const { addToast } = useApp()
  const { orders, loading } = useOrders()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
  })

  async function handleSave() {
    const { error } = await updateProfile(form)
    if (error) addToast('Failed to update profile', 'error')
    else { addToast('Profile updated'); setEditing(false) }
  }

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <div className="p-4 border border-saif-border">
              <p className="text-sm font-semibold text-saif-text">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-saif-dim mt-1">{user?.email}</p>
              <p className="text-xs text-saif-accent mt-1 uppercase tracking-wider">{profile?.role}</p>
            </div>
            <Link to="/orders" className="flex items-center gap-3 p-4 border border-saif-border text-saif-text hover:bg-white/5 transition-colors">
              <Package size={18} />
              <span className="text-sm font-medium">Orders</span>
            </Link>
            <Link to="/wishlist" className="flex items-center gap-3 p-4 border border-saif-border text-saif-text hover:bg-white/5 transition-colors">
              <Heart size={18} />
              <span className="text-sm font-medium">Wishlist</span>
            </Link>
            <button onClick={signOut} className="flex items-center gap-3 p-4 border border-saif-border text-saif-accent hover:bg-white/5 transition-colors w-full">
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
            {profile?.role === 'admin' && (
              <Link to="/admin" className="flex items-center gap-3 p-4 border border-saif-accent text-saif-accent hover:bg-saif-accent/10 transition-colors">
                <User size={18} />
                <span className="text-sm font-medium">Admin Dashboard</span>
              </Link>
            )}
          </div>

          {/* Main */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile */}
            <div className="border border-saif-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-saif-text">Profile</h2>
                <button onClick={() => setEditing(!editing)} className="text-xs text-saif-dim hover:text-saif-text transition-colors">
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              {editing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={e => setForm({ ...form, full_name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-2.5 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-2.5 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
                  />
                  <button onClick={handleSave} className="btn btn-primary text-xs">Save Changes</button>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="text-saif-dim">Name: <span className="text-saif-text">{profile?.full_name || 'Not set'}</span></p>
                  <p className="text-saif-dim">Email: <span className="text-saif-text">{user?.email}</span></p>
                  <p className="text-saif-dim">Phone: <span className="text-saif-text">{profile?.phone || 'Not set'}</span></p>
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="border border-saif-border p-6">
              <h2 className="text-lg font-bold text-saif-text mb-4">Recent Orders</h2>
              {loading ? <Loading /> : orders.length === 0 ? (
                <p className="text-sm text-saif-dim">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <Link key={order.id} to={`/orders/${order.id}`} className="flex items-center justify-between p-3 border border-saif-border hover:bg-white/5 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-saif-text">{order.order_number}</p>
                        <p className="text-xs text-saif-dim">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs font-semibold uppercase ${ORDER_STATUS_COLORS[order.status] || 'text-saif-dim'}`}>
                        {ORDER_STATUS_LABELS[order.status] || order.status}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
