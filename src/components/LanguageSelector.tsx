'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'

export function LanguageSelector() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="flex items-center gap-2">
      <Globe size={20} className="text-gray-600" />
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  )
}
