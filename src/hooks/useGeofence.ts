import { useEffect } from 'react';

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2-lat1) * Math.PI / 180;
  const Δλ = (lon2-lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // in meters
}

export function useGeofence(
  hotspots: {lat: number, lng: number, radius: number, name: string}[], 
  userLocation: {lat: number, lng: number} | null
) {
  useEffect(() => {
    if (!userLocation || !('Notification' in window)) return;

    // Request notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    hotspots.forEach(hotspot => {
      const dist = getDistance(userLocation.lat, userLocation.lng, hotspot.lat, hotspot.lng);
      if (dist < hotspot.radius) {
        // Show notification
        if (Notification.permission === "granted") {
          new Notification('⚠️ SafePath Safety Alert', {
            body: `You entered high-risk area: ${hotspot.name}. Stay alert and consider taking a safer route.`,
            icon: '/alert-icon.png',
            badge: '/alert-icon.png'
          });
        }
      }
    });
  }, [userLocation, hotspots]);
}
