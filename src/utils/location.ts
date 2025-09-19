export const requestLocationPermission = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location.'
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  })
}

export const watchUserLocation = (
  onLocationUpdate: (position: GeolocationPosition) => void,
  onError: (error: GeolocationPositionError) => void
): number | null => {
  if (!navigator.geolocation) {
    return null
  }

  return navigator.geolocation.watchPosition(
    onLocationUpdate,
    onError,
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    }
  )
}
