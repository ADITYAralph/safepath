export interface GeofenceZone {
  id: string
  name: string
  description: string
  type: 'safe' | 'caution' | 'danger' | 'restricted' | 'emergency'
  coordinates: Array<{ lat: number; lng: number }>
  radius?: number // for circular zones
  city: string
  state: string
  alertMessage: string
  safetyLevel: number // 1-10, 10 being safest
  lastUpdated: string
  activeHours?: { start: string; end: string } // 24hr format
}

export const geofenceZones: GeofenceZone[] = [
  // Delhi Zones
  {
    id: 'red-fort-safe',
    name: 'Red Fort Safe Zone',
    description: 'Tourist-friendly area around Red Fort with security presence',
    type: 'safe',
    coordinates: [
      { lat: 28.6560, lng: 77.2405 },
      { lat: 28.6565, lng: 77.2415 },
      { lat: 28.6555, lng: 77.2425 },
      { lat: 28.6550, lng: 77.2415 }
    ],
    city: 'Delhi',
    state: 'Delhi',
    alertMessage: '✅ You are in a safe tourist zone. Enjoy exploring Red Fort!',
    safetyLevel: 9,
    lastUpdated: '2025-09-19T14:30:00Z',
    activeHours: { start: '06:00', end: '19:00' }
  },
  {
    id: 'chandni-chowk-caution',
    name: 'Chandni Chowk Market Area',
    description: 'Crowded market area, be cautious of pickpockets',
    type: 'caution',
    coordinates: [
      { lat: 28.6506, lng: 77.2297 },
      { lat: 28.6520, lng: 77.2320 },
      { lat: 28.6495, lng: 77.2340 },
      { lat: 28.6485, lng: 77.2315 }
    ],
    city: 'Delhi',
    state: 'Delhi',
    alertMessage: '⚠️ Caution: Crowded area. Keep belongings secure and stay alert.',
    safetyLevel: 6,
    lastUpdated: '2025-09-19T14:30:00Z'
  },
  {
    id: 'yamuna-danger',
    name: 'Yamuna Bank Restricted Area',
    description: 'Unsafe area near river bank, avoid after dark',
    type: 'danger',
    coordinates: [
      { lat: 28.6580, lng: 77.2480 },
      { lat: 28.6590, lng: 77.2520 },
      { lat: 28.6560, lng: 77.2540 },
      { lat: 28.6550, lng: 77.2500 }
    ],
    city: 'Delhi',
    state: 'Delhi',
    alertMessage: '🚨 DANGER: This area is unsafe, especially after dark. Please exit immediately.',
    safetyLevel: 2,
    lastUpdated: '2025-09-19T14:30:00Z',
    activeHours: { start: '06:00', end: '18:00' }
  },

  // Agra Zones (Taj Mahal)
  {
    id: 'taj-mahal-safe',
    name: 'Taj Mahal Safe Zone',
    description: 'Protected UNESCO World Heritage Site with high security',
    type: 'safe',
    coordinates: [
      { lat: 27.1750, lng: 78.0420 },
      { lat: 27.1755, lng: 78.0425 },
      { lat: 27.1745, lng: 78.0430 },
      { lat: 27.1740, lng: 78.0415 }
    ],
    city: 'Agra',
    state: 'Uttar Pradesh',
    alertMessage: '✅ Welcome to Taj Mahal safe zone! Security personnel are nearby.',
    safetyLevel: 10,
    lastUpdated: '2025-09-19T14:30:00Z'
  },
  {
    id: 'agra-fort-caution',
    name: 'Agra Fort Surrounding Area',
    description: 'Tourist area but watch for aggressive vendors',
    type: 'caution',
    coordinates: [
      { lat: 27.1795, lng: 78.0205 },
      { lat: 27.1805, lng: 78.0215 },
      { lat: 27.1785, lng: 78.0225 },
      { lat: 27.1775, lng: 78.0195 }
    ],
    city: 'Agra',
    state: 'Uttar Pradesh',
    alertMessage: '⚠️ Tourist area: Be cautious of aggressive vendors and overcharging.',
    safetyLevel: 7,
    lastUpdated: '2025-09-19T14:30:00Z'
  },

  // Mumbai Zones
  {
    id: 'gateway-india-safe',
    name: 'Gateway of India Safe Zone',
    description: 'Well-patrolled tourist area with police presence',
    type: 'safe',
    coordinates: [
      { lat: 18.9218, lng: 72.8345 },
      { lat: 18.9225, lng: 72.8355 },
      { lat: 18.9210, lng: 72.8365 },
      { lat: 18.9205, lng: 72.8340 }
    ],
    city: 'Mumbai',
    state: 'Maharashtra',
    alertMessage: '✅ You are in Gateway of India safe zone. Police patrol regularly.',
    safetyLevel: 9,
    lastUpdated: '2025-09-19T14:30:00Z'
  },
  {
    id: 'mumbai-slum-danger',
    name: 'Dharavi Area',
    description: 'Slum area not recommended for tourists without guides',
    type: 'danger',
    coordinates: [
      { lat: 19.0425, lng: 72.8570 },
      { lat: 19.0445, lng: 72.8590 },
      { lat: 19.0405, lng: 72.8610 },
      { lat: 19.0385, lng: 72.8580 }
    ],
    city: 'Mumbai',
    state: 'Maharashtra',
    alertMessage: '🚨 WARNING: This area requires local guide. Not recommended for solo tourists.',
    safetyLevel: 3,
    lastUpdated: '2025-09-19T14:30:00Z'
  },

  // Jaipur Zones
  {
    id: 'hawa-mahal-safe',
    name: 'Hawa Mahal Tourist Area',
    description: 'Protected heritage site with good security',
    type: 'safe',
    coordinates: [
      { lat: 26.9238, lng: 75.8265 },
      { lat: 26.9245, lng: 75.8275 },
      { lat: 26.9230, lng: 75.8280 },
      { lat: 26.9225, lng: 75.8260 }
    ],
    city: 'Jaipur',
    state: 'Rajasthan',
    alertMessage: '✅ Hawa Mahal safe zone. Heritage site with security coverage.',
    safetyLevel: 8,
    lastUpdated: '2025-09-19T14:30:00Z'
  },
  {
    id: 'amber-fort-caution',
    name: 'Amber Fort Road Area',
    description: 'Winding mountain road, be cautious while traveling',
    type: 'caution',
    coordinates: [
      { lat: 26.9853, lng: 75.8510 },
      { lat: 26.9863, lng: 75.8520 },
      { lat: 26.9843, lng: 75.8530 },
      { lat: 26.9833, lng: 75.8505 }
    ],
    city: 'Jaipur',
    state: 'Rajasthan',
    alertMessage: '⚠️ Mountain road area: Drive carefully, road can be narrow and winding.',
    safetyLevel: 6,
    lastUpdated: '2025-09-19T14:30:00Z'
  }
]
