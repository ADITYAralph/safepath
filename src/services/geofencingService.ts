import { GeofenceZone, geofenceZones } from '@/data/geofenceZones'

export interface UserLocation {
  latitude: number
  longitude: number
  timestamp: number
  accuracy?: number
}

export interface GeofenceAlert {
  zone: GeofenceZone
  action: 'enter' | 'exit'
  timestamp: number
  userLocation: UserLocation
}

export class GeofencingService {
  private static instance: GeofencingService
  private watchId: number | null = null
  private currentUserLocation: UserLocation | null = null
  private activeZones: Set<string> = new Set()
  private alertCallbacks: Array<(alert: GeofenceAlert) => void> = []
  private locationCallbacks: Array<(location: UserLocation) => void> = []

  static getInstance(): GeofencingService {
    if (!GeofencingService.instance) {
      GeofencingService.instance = new GeofencingService()
    }
    return GeofencingService.instance
  }

  // Start continuous location monitoring
  startMonitoring(enableHighAccuracy: boolean = true): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      const options: PositionOptions = {
        enableHighAccuracy,
        timeout: 15000,
        maximumAge: 5000
      }

      // Get initial position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.handleLocationUpdate(position)
          
          // Start watching position
          this.watchId = navigator.geolocation.watchPosition(
            (pos) => this.handleLocationUpdate(pos),
            (error) => this.handleLocationError(error),
            options
          )
          
          console.log('Geofencing monitoring started')
          resolve(true)
        },
        (error) => {
          console.error('Initial location failed:', error)
          reject(error)
        },
        options
      )
    })
  }

  // Stop monitoring
  stopMonitoring(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
      console.log('Geofencing monitoring stopped')
    }
  }

  // Handle location updates
  private handleLocationUpdate(position: GeolocationPosition): void {
    const userLocation: UserLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: position.timestamp,
      accuracy: position.coords.accuracy
    }

    this.currentUserLocation = userLocation

    // Notify location callbacks
    this.locationCallbacks.forEach(callback => callback(userLocation))

    // Check all geofence zones
    this.checkGeofences(userLocation)
  }

  // Handle location errors
  private handleLocationError(error: GeolocationPositionError): void {
    console.error('Geolocation error:', error)
    // Could implement fallback to IP-based location here
  }

  // Check if user is inside any geofence zones
  private checkGeofences(userLocation: UserLocation): void {
    const currentZones = new Set<string>()

    geofenceZones.forEach(zone => {
      if (this.isInsideZone(userLocation, zone)) {
        currentZones.add(zone.id)

        // Check if this is a new entry
        if (!this.activeZones.has(zone.id)) {
          this.triggerAlert({
            zone,
            action: 'enter',
            timestamp: Date.now(),
            userLocation
          })
        }
      }
    })

    // Check for exits
    this.activeZones.forEach(zoneId => {
      if (!currentZones.has(zoneId)) {
        const zone = geofenceZones.find(z => z.id === zoneId)
        if (zone) {
          this.triggerAlert({
            zone,
            action: 'exit',
            timestamp: Date.now(),
            userLocation
          })
        }
      }
    })

    this.activeZones = currentZones
  }

  // Check if point is inside polygon using ray casting algorithm
  private isInsideZone(location: UserLocation, zone: GeofenceZone): boolean {
    // If zone has radius, treat as circular zone
    if (zone.radius) {
      const centerLat = zone.coordinates[0].lat
      const centerLng = zone.coordinates[0].lng
      const distance = this.calculateDistance(
        location.latitude, 
        location.longitude, 
        centerLat, 
        centerLng
      )
      return distance <= zone.radius
    }

    // Polygon-based geofence using ray casting
    const { latitude: lat, longitude: lng } = location
    const coords = zone.coordinates
    let inside = false

    for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
      const xi = coords[i].lat, yi = coords[i].lng
      const xj = coords[j].lat, yj = coords[j].lng

      if (((yi > lng) !== (yj > lng)) &&
          (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi)) {
        inside = !inside
      }
    }

    return inside
  }

  // Calculate distance between two points in meters
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000 // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Trigger alert
  private triggerAlert(alert: GeofenceAlert): void {
    console.log(`Geofence ${alert.action}:`, alert.zone.name)
    this.alertCallbacks.forEach(callback => callback(alert))
  }

  // Subscribe to alerts
  onAlert(callback: (alert: GeofenceAlert) => void): () => void {
    this.alertCallbacks.push(callback)
    return () => {
      const index = this.alertCallbacks.indexOf(callback)
      if (index > -1) {
        this.alertCallbacks.splice(index, 1)
      }
    }
  }

  // Subscribe to location updates
  onLocationUpdate(callback: (location: UserLocation) => void): () => void {
    this.locationCallbacks.push(callback)
    return () => {
      const index = this.locationCallbacks.indexOf(callback)
      if (index > -1) {
        this.locationCallbacks.splice(index, 1)
      }
    }
  }

  // Get current location
  getCurrentLocation(): UserLocation | null {
    return this.currentUserLocation
  }

  // Get active zones
  getActiveZones(): GeofenceZone[] {
    return geofenceZones.filter(zone => this.activeZones.has(zone.id))
  }

  // Get all zones
  getAllZones(): GeofenceZone[] {
    return geofenceZones
  }

  // Get zones by type
  getZonesByType(type: GeofenceZone['type']): GeofenceZone[] {
    return geofenceZones.filter(zone => zone.type === type)
  }
}
