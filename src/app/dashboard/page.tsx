'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SafetyMap } from '@/components/Map/SafetyMap'
import { DriverBooking } from '@/components/DriverBooking'
import { MonumentSidebar } from '@/components/MonumentSidebar'
import { AlertTriangle, Navigation, Shield, LogOut } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null)
  const [isARMode, setIsARMode] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check authentication only on client-side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('safepath_token')
      if (!token) {
        router.push('/signin')
        return
      }

      // Get user info safely
      try {
        const savedUser = localStorage.getItem('safepath_user')
        if (savedUser) {
          setUserInfo(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }

    // Get location
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Location error:', error)
          // Fallback location (Mumbai)
          setLocation({ lat: 19.0760, lng: 72.8777 })
        }
      )
    } else {
      setLocation({ lat: 19.0760, lng: 72.8777 })
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      router.push('/signin')
    }
  }

  // Don't render until mounted to prevent SSR issues
  if (!isMounted || !location) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-4">Setting Up SafePath</h2>
          <p className="text-gray-300">Loading your dashboard...</p>
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
              <p className="text-xs text-gray-300">Welcome, {userInfo?.name || 'User'}!</p>
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

      {/* Monument Sidebar */}
      <MonumentSidebar />

      {/* Main Content */}
      <main className="h-screen pt-20">
        <div className="flex h-full">
          {/* Map Section - Adjusted for sidebar */}
          <div className="w-full md:w-7/12 relative md:ml-80">
            <SafetyMap 
              userLocation={location}
              onToggleAR={() => setIsARMode(!isARMode)}
              isARMode={isARMode}
            />
            
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

          {/* Info Section - Desktop Only */}
          <div className="hidden md:flex w-5/12 p-12 bg-gradient-to-br from-gray-900/90 via-black to-blue-900/90 flex-col justify-center">
            <h1 className="text-5xl font-bold text-white mb-6">SafePath</h1>
            <p className="text-lg text-gray-300 mb-8">
              Your AI-powered tourist safety companion by <span className="text-blue-400 font-semibold">CodeBlooded</span>. Stay safe, explore confidently.
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

            <div className="mt-8 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <p className="text-sm text-green-200">
                📍 <strong>Your Location:</strong> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
              <p className="text-xs text-green-300 mt-1">SafePath is actively monitoring your safety</p>
            </div>
          </div>
        </div>
      </main>

      {/* Driver Booking Component */}
      <DriverBooking />

      {/* SOS Button */}
      <button
        onClick={() => {
          const message = `🚨 EMERGENCY ALERT!\n\nUser: ${userInfo?.name || 'Unknown'}\nEmail: ${userInfo?.email || 'Unknown'}\nLocation: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n\nEmergency services notified!`
          alert(message)
        }}
        className="fixed bottom-20 right-6 bg-red-600 p-5 rounded-full text-white shadow-lg hover:bg-red-700 transition z-50"
      >
        <AlertTriangle size={24} />
      </button>

      {/* GPS Indicator */}
      <div className="fixed bottom-6 right-6 bg-black/60 backdrop-blur-xl rounded-full px-3 py-2 text-white flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <Navigation size={16} />
        <span>Live GPS</span>
      </div>
    </div>
  )
}
