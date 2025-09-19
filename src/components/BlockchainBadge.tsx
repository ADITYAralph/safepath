'use client'

import { Shield } from 'lucide-react'

export function BlockchainBadge() {
  return (
    <div className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
      <Shield size={16} className="mr-2" />
      Secured by Blockchain
    </div>
  )
}
