'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Zap } from 'lucide-react'

interface Incident {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high'
  lat: number
  lng: number
  description?: string
  timeAgo?: string
  reports?: number
  verified?: boolean
}

interface RiskArea {
  id: string
  center: { lat: number; lng: number }
  risk: 'low' | 'medium' | 'high'
  radius: number
  reason: string
}

interface CctvCamera {
  id: string
  lat: number
  lng: number
  active: boolean
}

interface SafetyMetrics {
  safetyScore: number
  cctvCount: number
  incidentCount: number
  peopleCount: number
}

interface Hotspot {
  lat: number
  lng: number
  radius: number
  name: string
}

interface SafetyData {
  incidents: Incident[]
  riskAreas: RiskArea[]
  cctvCameras: CctvCamera[]
  safetyMetrics: SafetyMetrics
  hotspots?: Hotspot[]
}

interface SafetyMapProps {
  userLocation: { lat: number; lng: number } | null
  onToggleAR?: () => void
  isARMode?: boolean
  safetyData?: SafetyData
}

export function SafetyMap({ userLocation, onToggleAR, isARMode = false, safetyData }: SafetyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<'safest' | 'fastest'>('safest')

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return

    const initMap = () => {
      try {
        // Check if Google Maps API is loaded
        if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
          console.log('Google Maps API not yet loaded, waiting...')
          setTimeout(initMap, 100)
          return
        }

        // Professional dark map style
        const map = new google.maps.Map(mapContainer.current!, {
          center: { lat: userLocation.lat, lng: userLocation.lng },
          zoom: 15,
          styles: [
            { "elementType": "geometry", "stylers": [{ "color": "#1d2c4d" }] },
            { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] },
            { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a3646" }] },
            { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] },
            { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#64779e" }] },
            { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] },
            { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "color": "#334e87" }] },
            { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#023e58" }] },
            { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#283d6a" }] },
            { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#6f9ba5" }] },
            { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] },
            { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#023e58" }] },
            { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#3C7680" }] },
            { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304a7d" }] },
            { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#98a5be" }] },
            { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] },
            { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#2c6675" }] },
            { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#255763" }] },
            { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#b0d5ce" }] },
            { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#023e58" }] },
            { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#98a5be" }] },
            { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] },
            { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [{ "color": "#283d6a" }] },
            { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#3a4762" }] },
            { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0e1626" }] },
            { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#4e6d70" }] }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false
        })

        mapInstance.current = map

        // Your real location marker
        new google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
          title: `Your Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
        })

        // Accuracy circle for real location
        new google.maps.Circle({
          strokeColor: '#3b82f6',
          strokeOpacity: 0.4,
          strokeWeight: 2,
          fillColor: '#3b82f6',
          fillOpacity: 0.1,
          map: map,
          center: { lat: userLocation.lat, lng: userLocation.lng },
          radius: 50
        })

        // Add your real data markers if provided
        if (safetyData?.incidents) {
          safetyData.incidents.forEach((incident: Incident) => {
            const color = incident.severity === 'high' ? '#ef4444' : 
                         incident.severity === 'medium' ? '#f59e0b' : '#10b981'
            
            new google.maps.Marker({
              position: { lat: incident.lat, lng: incident.lng },
              map: map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: incident.severity === 'high' ? 12 : 8,
                fillColor: color,
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              },
              title: `${incident.type} - ${incident.severity}`
            })
          })
        }

        setIsMapLoaded(true)
      } catch (error) {
        console.error('Map initialization error:', error)
        setIsMapLoaded(true)
      }
    }

    // Start initialization
    initMap()
  }, [userLocation, selectedRoute, safetyData])

  if (!userLocation) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Shield size={48} className="mx-auto text-blue-400 mb-4" />
          </motion.div>
          <h3 className="text-lg font-semibold text-white mb-2">Getting Your Location</h3>
          <p className="text-gray-400">Please allow location access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Controls - Top Left - Moved right to avoid sidebar */}
      <div className="absolute top-6 left-20 z-20">
        <div className="bg-black/50 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-white/10">
          <div className="flex gap-2 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedRoute('safest')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedRoute === 'safest' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Shield size={14} className="inline mr-2" />
              Safest
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedRoute('fastest')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedRoute === 'fastest' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Zap size={14} className="inline mr-2" />
              Fastest
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onToggleAR}
            className={`w-full px-4 py-2 rounded-xl font-medium transition-all ${
              isARMode 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
            }`}
          >
            <Eye size={16} className="inline mr-2" />
            {isARMode ? 'Exit AR' : 'AR Walk'}
          </motion.button>
        </div>
      </div>

      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-30">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-white font-medium">Loading Map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
