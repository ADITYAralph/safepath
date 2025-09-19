'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, RotateCcw, Zap, Shield, AlertTriangle } from 'lucide-react'

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
  address?: string
}

interface LiveLocationMapProps {
  monumentLocation?: { lat: number; lng: number }
  monumentName?: string
  showRoute?: boolean
}

export function LiveLocationMap({ monumentLocation, monumentName, showRoute = false }: LiveLocationMapProps) {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState<string>('')
  const [isTracking, setIsTracking] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [distance, setDistance] = useState<number>(0)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const watchIdRef = useRef<number | null>(null)
  const mapInstanceRef = useRef<any>(null)

  // Initialize Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        setMapLoaded(true)
        return
      }

      if (typeof window !== 'undefined') {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qby&libraries=geometry`
        script.async = true
        script.defer = true
        script.onload = () => setMapLoaded(true)
        script.onerror = () => {
          console.log('Google Maps failed to load, using basic functionality')
          setMapLoaded(true)
        }
        document.head.appendChild(script)
      }
    }

    loadGoogleMaps()
  }, [])

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      return
    }

    setLocationError('')
    setIsTracking(true)

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        }
        
        setUserLocation(locationData)
        setIsTracking(false)
        reverseGeocode(locationData.latitude, locationData.longitude)
        
        if (monumentLocation) {
          calculateDistance(locationData, monumentLocation)
        }
      },
      (error) => {
        setIsTracking(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.')
            break
          case error.TIMEOUT:
            setLocationError('Location request timed out.')
            break
          default:
            setLocationError('An unknown error occurred.')
        }
      },
      options
    )
  }

  // Start continuous location tracking
  const startLocationTracking = () => {
    if (!navigator.geolocation) return

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1000
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        }
        
        setUserLocation(locationData)
        reverseGeocode(locationData.latitude, locationData.longitude)
        
        if (monumentLocation) {
          calculateDistance(locationData, monumentLocation)
        }
      },
      (error) => console.error('Location tracking error:', error),
      options
    )
  }

  // Stop location tracking
  const stopLocationTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
  }

  // Reverse geocode to get address
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await response.json()
      setAddress(data.display_name || 'Unknown location')
    } catch (error) {
      console.error('Reverse geocoding failed:', error)
      setAddress('Address unavailable')
    }
  }

  // Calculate distance between user and monument
  const calculateDistance = (userLoc: LocationData, monumentLoc: { lat: number; lng: number }) => {
    const R = 6371 // Earth's radius in km
    const dLat = (monumentLoc.lat - userLoc.latitude) * Math.PI / 180
    const dLon = (monumentLoc.lng - userLoc.longitude) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLoc.latitude * Math.PI / 180) * Math.cos(monumentLoc.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    setDistance(distance)
  }

  // Initialize map when loaded
  useEffect(() => {
    if (mapLoaded && mapRef.current && userLocation) {
      initializeMap()
    }
  }, [mapLoaded, userLocation, monumentLocation])

  const initializeMap = () => {
    if (typeof window === 'undefined' || !(window as any).google || !userLocation || !mapRef.current) {
      return
    }

    try {
      const googleMaps = (window as any).google.maps
      const map = new googleMaps.Map(mapRef.current, {
        center: { lat: userLocation.latitude, lng: userLocation.longitude },
        zoom: 15,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      })

      // User location marker
      const userMarker = new googleMaps.Marker({
        position: { lat: userLocation.latitude, lng: userLocation.longitude },
        map: map,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new googleMaps.Size(24, 24)
        }
      })

      // Monument marker if provided
      if (monumentLocation) {
        const monumentMarker = new googleMaps.Marker({
          position: monumentLocation,
          map: map,
          title: monumentName || 'Monument',
          icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17L12 23L3 10C3 6.13 7.03 3 12 3S21 6.13 21 10Z" fill="#dc2626" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new googleMaps.Size(32, 32)
          }
        })

        // Show route if requested
        if (showRoute) {
          const directionsService = new googleMaps.DirectionsService()
          const directionsRenderer = new googleMaps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#3b82f6',
              strokeWeight: 4
            }
          })

          directionsRenderer.setMap(map)

          directionsService.route({
            origin: { lat: userLocation.latitude, lng: userLocation.longitude },
            destination: monumentLocation,
            travelMode: googleMaps.TravelMode.WALKING
          }, (result: any, status: any) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result)
            }
          })
        }
      }

      mapInstanceRef.current = map
    } catch (error) {
      console.error('Error initializing map:', error)
      setLocationError('Failed to load map. Please try again.')
    }
  }

  // Auto-get location on component mount
  useEffect(() => {
    getCurrentLocation()
    return () => stopLocationTracking()
  }, [])

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 1000) return `±${Math.round(accuracy)}m`
    return `±${(accuracy / 1000).toFixed(1)}km`
  }

  const formatDistance = (dist: number) => {
    if (dist < 1) return `${Math.round(dist * 1000)}m away`
    return `${dist.toFixed(1)}km away`
  }

  return (
    <>
      <div className="live-location-container">
        {/* Header */}
        <div className="location-header">
          <div className="header-left">
            <div className="location-icon">
              📍
            </div>
            <div>
              <h3>Live Location</h3>
              <p>Real-time GPS tracking</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              onClick={getCurrentLocation}
              disabled={isTracking}
              className={`location-btn ${isTracking ? 'loading' : ''}`}
            >
              {isTracking ? <RotateCcw className="spin" size={16} /> : <Navigation size={16} />}
              {isTracking ? 'Getting...' : 'Update'}
            </button>
          </div>
        </div>

        {/* Location Info */}
        {userLocation && (
          <div className="location-info">
            <div className="location-details">
              <div className="location-item">
                <MapPin size={16} />
                <div>
                  <span className="label">Current Location</span>
                  <p>{address || 'Loading address...'}</p>
                </div>
              </div>
              
              <div className="location-stats">
                <div className="stat">
                  <Zap size={14} />
                  <span>Accuracy: {formatAccuracy(userLocation.accuracy)}</span>
                </div>
                
                {distance > 0 && (
                  <div className="stat">
                    <Shield size={14} />
                    <span>{formatDistance(distance)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {locationError && (
          <div className="location-error">
            <AlertTriangle size={16} />
            <span>{locationError}</span>
            <button onClick={getCurrentLocation} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Map */}
        <div className="map-container">
          <div ref={mapRef} className="google-map"></div>
          
          {!userLocation && !locationError && (
            <div className="map-loading">
              <div className="loading-spinner"></div>
              <p>Getting your location...</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="map-controls">
          <button 
            onClick={startLocationTracking}
            className="control-btn primary"
          >
            Start Tracking
          </button>
          <button 
            onClick={stopLocationTracking}
            className="control-btn secondary"
          >
            Stop Tracking
          </button>
          {monumentLocation && userLocation && (
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${monumentLocation.lat},${monumentLocation.lng}`, '_blank')
                }
              }}
              className="control-btn accent"
            >
              Get Directions
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .live-location-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .location-header {
          padding: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .location-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }

        .location-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .location-header p {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
        }

        .location-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .location-btn:hover:not(:disabled) {
          background: #2563eb;
        }

        .location-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .location-btn .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .location-info {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .location-item {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .location-item .label {
          font-size: 12px;
          font-weight: 600;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .location-item p {
          margin: 4px 0 0 0;
          color: #374151;
          font-size: 14px;
          line-height: 1.4;
        }

        .location-stats {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 12px;
        }

        .location-error {
          padding: 12px 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-left: 4px solid #ef4444;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #dc2626;
          font-size: 14px;
        }

        .retry-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          margin-left: auto;
        }

        .map-container {
          height: 300px;
          position: relative;
        }

        .google-map {
          width: 100%;
          height: 100%;
        }

        .map-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .map-controls {
          padding: 16px;
          background: #f9fafb;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .control-btn {
          flex: 1;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          min-width: 100px;
        }

        .control-btn.primary {
          background: #10b981;
          color: white;
        }

        .control-btn.primary:hover {
          background: #059669;
        }

        .control-btn.secondary {
          background: #6b7280;
          color: white;
        }

        .control-btn.secondary:hover {
          background: #4b5563;
        }

        .control-btn.accent {
          background: #f59e0b;
          color: white;
        }

        .control-btn.accent:hover {
          background: #d97706;
        }
      `}</style>
    </>
  )
}
