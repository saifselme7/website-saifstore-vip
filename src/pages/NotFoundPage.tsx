import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-black tracking-tighter text-saif-text mb-4">404</h1>
      <p className="text-saif-dim mb-8">Page not found.</p>
      <Link to="/" className="btn">Back Home</Link>
    </div>
  )
}
