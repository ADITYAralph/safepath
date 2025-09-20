'use client'

import { useState } from 'react'
import { Phone, AlertTriangle, MapPin, Clock } from 'lucide-react'

interface EmergencyAlertProps {
  zone: any
  onClose: () => void
}

export function EmergencyAlert({ zone, onClose }: EmergencyAlertProps) {
  const [alertSent, setAlertSent] = useState(false)

  const sendEmergencyAlert = () => {
    // In a real implementation, this would send actual alerts
    setAlertSent(true)
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-red-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          {!alertSent ? (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Emergency Alert</h3>
              <p className="text-gray-600 mb-4">Send emergency alert to local authorities?</p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-left">
                <p className="text-sm"><strong>Location:</strong> {zone?.name}</p>
                <p className="text-sm"><strong>Zone Type:</strong> {zone?.type}</p>
                <p className="text-sm"><strong>Police:</strong> {zone?.emergencyContacts?.police}</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendEmergencyAlert}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Send Alert
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Alert Sent!</h3>
              <p className="text-gray-600">Emergency services have been notified.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
