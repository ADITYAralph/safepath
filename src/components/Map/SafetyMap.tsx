'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Zap, MapPin } from 'lucide-react'

interface SafetyMapProps {
  userLocation: { lat: number; lng: number } | null
  onToggleAR?: () => void
  isARMode?: boolean
}

export function SafetyMap({ userLocation, onToggleAR, isARMode = false }: SafetyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<'safest' | 'fastest'>('safest')

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return

    const initMap = () => {
      try {
        // Check if Google Maps API is available
        if (typeof window === 'undefined' || !window.google || !window.google.maps) {
          console.log('Google Maps API not available yet, retrying...')
          setTimeout(initMap, 1000)
          return
        }

        console.log('Initializing Google Maps...')

        // Create map with real Google Maps
        const map = new google.maps.Map(mapContainer.current!, {
          center: userLocation,
          zoom: 15,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#283d6a" }] },
            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#283d6a" }] }
          ],
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative'
        })

        mapInstance.current = map

        // Add user location marker
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          }
        })

        // Add safety zone circle
        new google.maps.Circle({
          strokeColor: '#10b981',
          strokeOpacity: 0.4,
          strokeWeight: 2,
          fillColor: '#10b981',
          fillOpacity: 0.1,
          map: map,
          center: userLocation,
          radius: 500
        })

        // Add some sample incident markers
        const incidents = [
          { lat: userLocation.lat + 0.001, lng: userLocation.lng + 0.001, severity: 'low' },
          { lat: userLocation.lat - 0.002, lng: userLocation.lng + 0.0015, severity: 'medium' },
          { lat: userLocation.lat + 0.0015, lng: userLocation.lng - 0.001, severity: 'high' }
        ]

        incidents.forEach((incident, index) => {
          const color = incident.severity === 'high' ? '#ef4444' : 
                       incident.severity === 'medium' ? '#f59e0b' : '#10b981'
          
          new google.maps.Marker({
            position: { lat: incident.lat, lng: incident.lng },
            map: map,
            title: `Incident ${index + 1} - ${incident.severity}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: color,
              fillOpacity: 0.8,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }
          })
        })

        console.log('Google Maps initialized successfully')
        setIsMapLoaded(true)
        setMapError(false)
      } catch (error) {
        console.error('Map initialization error:', error)
        setMapError(true)
        setIsMapLoaded(true)
      }
    }

    // Start initialization with delay
    const timer = setTimeout(initMap, 2000)
    return () => clearTimeout(timer)
  }, [userLocation])

  if (!userLocation) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center text-white">
          <MapPin size={48} className="mx-auto mb-4 text-blue-400" />
          <p className="text-lg">Getting your location...</p>
        </div>
      </div>
    )
  }

  if (mapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900 to-black">
        <div className="text-center text-white bg-red-500/20 rounded-xl p-8 border border-red-500/50 max-w-md">
          <h3 className="text-xl font-bold mb-4">Map Service Unavailable</h3>
          <p className="mb-4">Google Maps couldn't load. This might be due to:</p>
          <ul className="text-sm text-gray-300 mb-4 space-y-1">
            <li>• Missing or invalid API key</li>
            <li>• Network connectivity issues</li>
            <li>• API quota exceeded</li>
          </ul>
          <p className="text-sm text-gray-400 mb-4">
            Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
          <div className="grid grid-cols-2 gap-4 text-center mt-6">
            <div className="bg-green-500/20 rounded-lg p-3">
              <div className="text-green-400 font-bold text-xl">Safe</div>
              <div className="text-xs">Current Area</div>
            </div>
            <div className="bg-blue-500/20 rounded-lg p-3">
              <div className="text-blue-400 font-bold text-xl">15</div>
              <div className="text-xs">CCTV Nearby</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
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

      {/* Loading Overlay */}
      {!isMapLoaded && !mapError && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-30">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-white">Loading Safety Map...</p>
            <p className="text-gray-400 text-sm mt-2">Connecting to Google Maps...</p>
          </div>
        </div>
      )}

      {/* Map Status */}
      <div className="absolute bottom-6 right-6 bg-green-500/20 backdrop-blur-xl rounded-full px-4 py-2 text-green-300 border border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            {isMapLoaded ? 'Map Active' : 'Loading Map...'}
          </span>
        </div>
      </div>
    </div>
  )
}
