export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  ready: 'Ready',
  shipped: 'Shipped',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-400',
  confirmed: 'text-blue-400',
  processing: 'text-purple-400',
  ready: 'text-cyan-400',
  shipped: 'text-indigo-400',
  delivered: 'text-green-400',
  completed: 'text-emerald-400',
  cancelled: 'text-red-400',
  rejected: 'text-red-500',
}
