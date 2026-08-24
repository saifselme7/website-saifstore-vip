import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useApp } from '@/context/AppContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const { addToast } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      addToast(error.message || 'Login failed', 'error')
    } else {
      addToast('Welcome back!')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black tracking-tight text-saif-text mb-2">Sign In</h1>
        <p className="text-sm text-saif-dim mb-8">Welcome back to SAIF STORE.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
          />
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-sm text-saif-dim text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-saif-text hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}
