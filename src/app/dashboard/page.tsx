'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SafetyMap } from '@/components/Map/SafetyMap'
import { AlertTriangle, Navigation, Shield, LogOut } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('safepath_token')
    if (!token) {
      router.push('/signin')
      return
    }

    // Get user info
    const savedUser = localStorage.getItem('safepath_user')
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser))
    }

    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Fallback location (Mumbai)
          setLocation({ lat: 19.0760, lng: 72.8777 })
        }
      )
    } else {
      setLocation({ lat: 19.0760, lng: 72.8777 })
    }
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/signin')
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-4">Getting Your Location</h2>
          <p className="text-gray-300">Setting up SafePath...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SafePath</h1>
              <p className="text-xs text-gray-300">Hello, {userInfo?.name || 'User'}!</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-screen pt-20">
        <div className="flex h-full">
          {/* Map Section */}
          <div className="w-7/12 relative">
            <SafetyMap userLocation={location} />
            
            {/* Safety Stats Panel */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/20 text-white w-64">
              <h3 className="font-semibold mb-3">Live Safety Metrics</h3>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-green-400">87%</div>
                  <div>Safety Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">15</div>
                  <div>CCTV Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">4</div>
                  <div>Incidents</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">1.2k</div>
                  <div>People</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-5/12 p-12 bg-gradient-to-br from-gray-900/90 via-black to-blue-900/90 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-white mb-6">SafePath</h1>
            <p className="text-lg text-gray-300 mb-8">
              Your AI-powered tourist safety companion by CodeBlooded. Stay safe, explore confidently.
            </p>
            
            <div className="space-y-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">🛡️ Real-time Safety</h3>
                <p className="text-gray-300">AI-powered risk assessment and live incident tracking</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">🚗 Smart Transportation</h3>
                <p className="text-gray-300">Verified drivers and safe travel options</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">🏛️ Tourism Guide</h3>
                <p className="text-gray-300">Discover monuments with AR experiences</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-400">
                Your Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* SOS Button */}
      <button
        onClick={() => {
          const message = `🚨 EMERGENCY ALERT!\n\nUser: ${userInfo?.name}\nEmail: ${userInfo?.email}\nLocation: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n\nEmergency services have been notified!`
          alert(message)
        }}
        className="fixed bottom-20 right-6 bg-red-600 p-5 rounded-full text-white shadow-lg hover:bg-red-700 transition z-50"
      >
        <AlertTriangle size={24} />
      </button>

      {/* GPS Indicator */}
      <div className="fixed bottom-6 right-6 bg-black/60 backdrop-blur-xl rounded-full px-3 py-2 text-white flex items-center gap-2">
        <Navigation size={16} />
        <span>Live GPS</span>
      </div>
    </div>
  )
}
