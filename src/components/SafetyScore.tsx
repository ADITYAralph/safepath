'use client'

import { useState, useEffect } from 'react'
import { Shield } from 'lucide-react'

export function SafetyScore() {
  const [score, setScore] = useState(85)
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="text-blue-500" size={24} />
        <h2 className="text-xl font-bold">Safety Score</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </div>
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Based on current location and travel patterns
          </p>
        </div>
      </div>
    </div>
  )
}
