'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface LocationContextType {
  location: { lat: number; lng: number } | null
  loading: boolean
  error: string | null
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLoading(false)
        },
        (error) => {
          // Use Mumbai as default location for demo
          setLocation({
            lat: 19.0760,
            lng: 72.8777,
          })
          setError('Location access denied, using demo location (Mumbai)')
          setLoading(false)
        }
      )
    } else {
      // Use Mumbai as default location
      setLocation({
        lat: 19.0760,
        lng: 72.8777,
      })
      setError('Geolocation not supported, using demo location (Mumbai)')
      setLoading(false)
    }
  }, [])

  return (
    <LocationContext.Provider value={{ location, loading, error }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
