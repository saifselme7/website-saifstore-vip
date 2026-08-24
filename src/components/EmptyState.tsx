import { Package } from 'lucide-react'

interface Props {
  title?: string
  description?: string
}

export default function EmptyState({ title = 'Nothing here yet', description = 'Check back later for updates.' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Package size={40} className="text-saif-dim mb-4" />
      <h3 className="text-lg font-semibold text-saif-text mb-2">{title}</h3>
      <p className="text-sm text-saif-dim">{description}</p>
    </div>
  )
}
