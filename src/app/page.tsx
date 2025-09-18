'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SafetyMap } from '@/components/Map/SafetyMap'
import { LoadingScreen } from '@/components/UI/LoadingScreen'
import { DriverBooking } from '@/components/DriverBooking'
import { MonumentSidebar } from '@/components/MonumentSidebar'
import { useGeofence } from '@/hooks/useGeofence'
import { Shield, AlertTriangle, Menu, X, Activity, Navigation, LogOut } from 'lucide-react'

// Your real safety data with hotspots for geofencing
const YOUR_SAFETY_DATA = {
  incidents: [
    {
      id: 'real-inc-1',
      type: 'theft',
      severity: 'high' as const,
      lat: 28.6139,
      lng: 77.2090,
      description: 'Phone theft reported near Connaught Place',
      timeAgo: '30 minutes ago',
      reports: 5,
      verified: true
    }
  ],
  riskAreas: [
    {
      id: 'risk-1',
      center: { lat: 28.6139, lng: 77.2090 },
      risk: 'high' as const,
      radius: 300,
      reason: 'Multiple theft incidents reported'
    }
  ],
  cctvCameras: [
    { id: 'cctv-1', lat: 28.6139, lng: 77.2090, active: true }
  ],
  safetyMetrics: {
    safetyScore: 87,
    cctvCount: 15,
    incidentCount: 4,
    peopleCount: 1200
  },
  // Geofencing hotspots
  hotspots: [
    {
      lat: 28.6139,
      lng: 77.2090,
      radius: 200,
      name: 'Connaught Place High Risk Area'
    },
    {
      lat: 28.6562,
      lng: 77.2410,
      radius: 150,
      name: 'Red Fort Risk Zone'
    }
  ]
}

export default function Home() {
  const [appLoaded, setAppLoaded] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationLoading, setLocationLoading] = useState(true)
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null)
  const [isARMode, setIsARMode] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // Geofencing integration
  useGeofence(YOUR_SAFETY_DATA.hotspots, location)

  // Enhanced Real Location Detection
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setLocationLoading(false)
        return
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords
          
          setLocation({
            lat: latitude,
            lng: longitude,
          })
          setLocationAccuracy(accuracy)
          setLocationLoading(false)
        },
        (error) => {
          // Use Mumbai as fallback
          setLocation({
            lat: 19.0760,
            lng: 72.8777,
          })
          setLocationLoading(false)
        },
        options
      )
    }

    if (appLoaded) {
      getCurrentLocation()
    }
  }, [appLoaded])

  // Show loading screen until app is loaded
  if (!appLoaded) {
    return <LoadingScreen onAnimationComplete={() => setAppLoaded(true)} />
  }

  // Show location loading after app loaded
  if (locationLoading || !location) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-4">Getting Your Location</h2>
          <p className="text-gray-300">Please allow location access for safety features</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* GLASS HEADER WITH ANIMATED SAFEPATH TITLE */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
      >
        <div 
          className="border-b border-white/20 shadow-2xl backdrop-blur-xl"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)"
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.div 
              className="flex items-center gap-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg"
                whileHover={{ 
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                  rotate: 5 
                }}
              >
                <Shield className="text-white" size={20} />
              </motion.div>
              
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-xl font-black text-white"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  SafePath
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-xs text-gray-300"
                >
                  AI Tourist Safety Companion
                </motion.p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="hidden md:flex items-center gap-2 text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20"
                whileHover={{ 
                  background: "rgba(255, 255, 255, 0.15)",
                  scale: 1.05 
                }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Location</span>
                {locationAccuracy && (
                  <span className="text-xs text-gray-400">±{Math.round(locationAccuracy)}m</span>
                )}
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
                whileHover={{ 
                  background: "rgba(255, 255, 255, 0.2)",
                  scale: 1.1 
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-200 border border-white/20"
              >
                {showSidebar ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MONUMENT SIDEBAR */}
      <MonumentSidebar />

      {/* MAIN CONTENT - SPLIT LAYOUT */}
      <main className="h-screen pt-20">
        <div className="flex h-full">
          {/* MAP SECTION - 70% WIDTH with left margin for sidebar */}
          <div className="w-7/12 relative ml-16">
            <SafetyMap 
              userLocation={location} 
              onToggleAR={() => setIsARMode(!isARMode)}
              isARMode={isARMode}
              safetyData={YOUR_SAFETY_DATA}
            />

            {/* Real Safety Stats Panel - Moved right to avoid sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="absolute bottom-6 left-20 z-30"
            >

              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
                <h3 className="font-semibold text-white text-sm mb-4">Live Safety Metrics</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`font-bold text-2xl ${
                      YOUR_SAFETY_DATA.safetyMetrics.safetyScore >= 90 ? 'text-green-400' :
                      YOUR_SAFETY_DATA.safetyMetrics.safetyScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {YOUR_SAFETY_DATA.safetyMetrics.safetyScore}%
                    </div>
                    <div className="text-gray-300 text-xs">Safety Score</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold text-2xl">{YOUR_SAFETY_DATA.safetyMetrics.cctvCount}</div>
                    <div className="text-gray-300 text-xs">CCTV Active</div>
                  </div>
                  <div>
                    <div className="text-orange-400 font-bold text-2xl">{YOUR_SAFETY_DATA.safetyMetrics.incidentCount}</div>
                    <div className="text-gray-300 text-xs">Incidents</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-2xl">
                      {YOUR_SAFETY_DATA.safetyMetrics.peopleCount > 1000 ? 
                        `${(YOUR_SAFETY_DATA.safetyMetrics.peopleCount/1000).toFixed(1)}k` : 
                        YOUR_SAFETY_DATA.safetyMetrics.peopleCount
                      }
                    </div>
                    <div className="text-gray-300 text-xs">People</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* TEXT SECTION - 30% WIDTH */}
          <div className="w-5/12 flex flex-col justify-center p-12 bg-gradient-to-br from-gray-900/90 via-black to-blue-900/90 backdrop-blur-md border-l border-white/10">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(59, 130, 246, 0.8)", 
                    "0 0 20px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SafePath
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="text-xl leading-relaxed text-gray-300 mb-8"
              >
                SafePath is an ideal initiative of some innovative students and their club{' '}
                <span className="text-blue-400 font-semibold">CodeBlooded</span>{' '}
                to provide tourism with safety, convenience and better experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-2">🛡️ Real-time Safety</h3>
                  <p className="text-sm text-gray-300">AI-powered risk assessment and live incident tracking</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-2">🚗 Smart Transportation</h3>
                  <p className="text-sm text-gray-300">Verified drivers and safe travel options</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-2">🏛️ Tourism Guide</h3>
                  <p className="text-sm text-gray-300">Discover monuments with AR experiences</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* DRIVER BOOKING COMPONENT */}
      <DriverBooking />

      {/* SOS BUTTON - POSITIONED ABOVE LOCATION ICON */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.8)" 
        }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-36 right-6 z-50 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl backdrop-blur-xl border-2 border-red-400/20 flex items-center justify-center"
        onClick={() => {
          if (location) {
            alert(`🚨 EMERGENCY ALERT ACTIVATED!\n\n📍 Your Location: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n📱 Emergency contacts notified\n🚔 Local authorities alerted\n⏰ Help is on the way`)
          }
        }}
      >
        <AlertTriangle size={22} />
      </motion.button>

      {/* LOCATION ICON - BOTTOM RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.7, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-40 bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 shadow-2xl border border-white/20 flex items-center gap-2 text-white text-sm"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <Navigation size={16} />
        <span className="hidden sm:inline">Live GPS</span>
      </motion.div>

      {/* SAFETY DASHBOARD SIDEBAR */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-20 right-6 w-80 h-[calc(100vh-6rem)] bg-black/40 backdrop-blur-2xl shadow-2xl z-40 overflow-y-auto rounded-2xl border border-white/10"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity size={20} />
                Live Safety Dashboard
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30">
                  <h3 className="font-semibold text-blue-300 mb-2">Your Location</h3>
                  <p className="text-sm text-blue-200 font-mono">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                  {locationAccuracy && (
                    <p className="text-xs text-blue-300 mt-1">Accuracy: ±{Math.round(locationAccuracy)} meters</p>
                  )}
                </div>

                <div className="bg-green-500/20 backdrop-blur-sm p-4 rounded-xl border border-green-500/30">
                  <h3 className="font-semibold text-green-300 mb-3">Area Safety</h3>
                  <div className="space-y-2 text-sm text-green-200">
                    <div className="flex justify-between">
                      <span>Safety Score:</span>
                      <span className="font-medium">{YOUR_SAFETY_DATA.safetyMetrics.safetyScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CCTV Coverage:</span>
                      <span className="font-medium">{YOUR_SAFETY_DATA.safetyMetrics.cctvCount} cameras</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Incidents:</span>
                      <span className="font-medium">{YOUR_SAFETY_DATA.safetyMetrics.incidentCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crowd Density:</span>
                      <span className="font-medium">{YOUR_SAFETY_DATA.safetyMetrics.peopleCount} people</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  View Full Analytics
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
