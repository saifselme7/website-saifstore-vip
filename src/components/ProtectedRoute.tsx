import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Loading from './Loading'

interface Props {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly }: Props) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
