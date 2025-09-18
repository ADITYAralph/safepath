'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Zap, MapPin } from 'lucide-react'

interface SafetyMapProps {
  userLocation: { lat: number; lng: number } | null
  onToggleAR?: () => void
  isARMode?: boolean
}

export function SafetyMap({ userLocation, onToggleAR, isARMode = false }: SafetyMapProps) {
  const [selectedRoute, setSelectedRoute] = useState<'safest' | 'fastest'>('safest')

  if (!userLocation) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <MapPin size={48} className="mx-auto mb-4 text-blue-400" />
          <p className="text-lg">Loading location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Map Placeholder with Location Info */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 bg-blue-500/30 rounded-full flex items-center justify-center mb-6 mx-auto"
          >
            <MapPin size={48} className="text-blue-300" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-4">SafePath Map</h3>
          <p className="text-lg mb-2">Your Location:</p>
          <p className="text-blue-300 font-mono text-sm">
            {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 text-center max-w-md mx-auto">
            <div className="bg-green-500/20 rounded-lg p-3">
              <div className="text-green-400 font-bold text-xl">Safe</div>
              <div className="text-xs">Current Area</div>
            </div>
            <div className="bg-blue-500/20 rounded-lg p-3">
              <div className="text-blue-400 font-bold text-xl">15</div>
              <div className="text-xs">CCTV Nearby</div>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-3">
              <div className="text-orange-400 font-bold text-xl">2</div>
              <div className="text-xs">Incidents</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-3">
              <div className="text-purple-400 font-bold text-xl">5</div>
              <div className="text-xs">Monuments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Safety Indicators */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-20 w-4 h-4 bg-green-400 rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute top-40 right-32 w-4 h-4 bg-blue-400 rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        className="absolute bottom-32 left-40 w-4 h-4 bg-yellow-400 rounded-full"
      />

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-black/50 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedRoute('safest')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedRoute === 'safest' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Shield size={14} className="inline mr-2" />
              Safest Route
            </button>
            
            <button
              onClick={() => setSelectedRoute('fastest')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedRoute === 'fastest' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Zap size={14} className="inline mr-2" />
              Fastest Route
            </button>
          </div>

          <button
            onClick={onToggleAR}
            className={`w-full px-4 py-2 rounded-lg font-medium transition ${
              isARMode 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Eye size={16} className="inline mr-2" />
            {isARMode ? 'Exit AR' : 'AR Walk Mode'}
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute bottom-6 right-6 bg-green-500/20 backdrop-blur-xl rounded-full px-4 py-2 text-green-300 border border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">SafePath Active</span>
        </div>
      </div>
    </div>
  )
}
