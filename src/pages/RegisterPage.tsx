import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useApp } from '@/context/AppContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const { addToast } = useApp()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6) {
      addToast('Password must be at least 6 characters', 'error')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password, fullName)
    setLoading(false)
    if (error) {
      addToast(error.message || 'Registration failed', 'error')
    } else {
      addToast('Account created! Please check your email to confirm.')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black tracking-tight text-saif-text mb-2">Create Account</h1>
        <p className="text-sm text-saif-dim mb-8">Join SAIF STORE today.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
          />
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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-transparent border border-saif-border text-saif-text text-sm px-4 py-3 focus:outline-none focus:border-saif-text placeholder:text-saif-dim/40"
          />
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-sm text-saif-dim text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-saif-text hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
