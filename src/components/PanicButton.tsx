'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

interface PanicButtonProps {
  touristId: string
}

export function PanicButton({ touristId }: PanicButtonProps) {
  const [alerted, setAlerted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePanic = async () => {
    setLoading(true)
    
    try {
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      // Send panic alert
      await fetch('/api/panic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          touristId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
        })
      })

      setAlerted(true)
      
      // Show confirmation
      alert(`🚨 EMERGENCY ALERT SENT!\n\nLocation: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}\n\nPolice and emergency contacts have been notified!`)
      
    } catch (error) {
      console.error('Panic alert failed:', error)
      alert('Failed to send alert. Please try again or call emergency services directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
      <div className="text-center">
        <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
        <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Assistance</h3>
        <p className="text-sm text-red-600 mb-4">
          Press this button if you need immediate help. Your location will be shared with authorities.
        </p>
        
        <button
          onClick={handlePanic}
          disabled={alerted || loading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
            alerted 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending Alert...
            </div>
          ) : alerted ? (
            <>✅ Alert Sent!</>
          ) : (
            <>🚨 Emergency Panic Button</>
          )}
        </button>
        
        {alerted && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-green-800 text-sm font-semibold">
              Alert sent successfully! Help is on the way.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
