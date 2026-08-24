import { useAdminReviews } from '@/hooks/useAdmin'
import Loading from '@/components/Loading'

export default function AdminReviews() {
  const { reviews, loading, updateStatus, remove } = useAdminReviews()

  return (
    <div className="animate-[pageIn_0.6s_ease]">
      <h1 className="text-3xl font-black tracking-tight text-saif-text mb-8">Reviews</h1>
      {loading ? <Loading /> : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="border border-saif-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-saif-text">{r.title}</p>
                  <p className="text-xs text-saif-dim mt-0.5">By user · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                  <p className="text-sm text-saif-dim mt-2">{r.body}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs uppercase px-2 py-0.5 border ${r.status === 'approved' ? 'border-green-500 text-green-400' : r.status === 'rejected' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'}`}>
                    {r.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => updateStatus(r.id, 'approved')} className="text-xs text-green-400 hover:underline">Approve</button>
                <button onClick={() => updateStatus(r.id, 'rejected')} className="text-xs text-red-400 hover:underline">Reject</button>
                <button onClick={() => { if (confirm('Delete?')) remove(r.id) }} className="text-xs text-saif-dim hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
