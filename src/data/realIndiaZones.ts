export interface TouristZone {
  id: string
  name: string
  monumentName: string
  location: { lat: number; lng: number }
  city: string
  state: string
  type: 'safe' | 'caution' | 'danger' | 'restricted'
  radius: number // meters
  safetyLevel: number // 1-10
  description: string
  emergencyContacts: {
    police: string
    medical: string
    tourist_helpline: string
  }
  facilities: string[]
  riskFactors: string[]
  lastUpdated: string
  isActive: boolean
}

export const REAL_INDIA_TOURIST_ZONES: TouristZone[] = [
  // TAJ MAHAL, AGRA
  {
    id: 'taj_mahal_main',
    name: 'Taj Mahal Main Complex',
    monumentName: 'Taj Mahal',
    location: { lat: 27.1751, lng: 78.0421 },
    city: 'Agra',
    state: 'Uttar Pradesh',
    type: 'safe',
    radius: 300,
    safetyLevel: 9,
    description: 'UNESCO World Heritage Site with maximum security and tourist police presence',
    emergencyContacts: {
      police: '100',
      medical: '108', 
      tourist_helpline: '1363'
    },
    facilities: ['CCTV', 'Security Personnel', 'First Aid', 'Tourist Information', 'Guides'],
    riskFactors: ['Overcrowding during peak season', 'Heat during summer months'],
    lastUpdated: '2025-09-20',
    isActive: true
  },
  {
    id: 'taj_mahal_parking',
    name: 'Taj Mahal Parking Area',
    monumentName: 'Taj Mahal',
    location: { lat: 27.1730, lng: 78.0390 },
    city: 'Agra',
    state: 'Uttar Pradesh',
    type: 'caution',
    radius: 200,
    safetyLevel: 6,
    description: 'Main parking area with basic security, risk of vehicle theft',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Parking Security', 'CCTV', 'Refreshments'],
    riskFactors: ['Vehicle theft', 'Pickpocketing', 'Overcharging by vendors'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // RED FORT, DELHI
  {
    id: 'red_fort_main',
    name: 'Red Fort Main Complex',
    monumentName: 'Red Fort (Lal Qila)',
    location: { lat: 28.6562, lng: 77.2410 },
    city: 'New Delhi',
    state: 'Delhi',
    type: 'safe',
    radius: 250,
    safetyLevel: 8,
    description: 'Historic Mughal fort with ASI security and Delhi Police presence',
    emergencyContacts: {
      police: '100',
      medical: '102',
      tourist_helpline: '1363'
    },
    facilities: ['ASI Security', 'Metro Station Nearby', 'Audio Guides', 'Museum'],
    riskFactors: ['Overcrowding during national holidays', 'Summer heat'],
    lastUpdated: '2025-09-20',
    isActive: true
  },
  {
    id: 'chandni_chowk_market',
    name: 'Chandni Chowk Market',
    monumentName: 'Red Fort Area',
    location: { lat: 28.6506, lng: 77.2334 },
    city: 'New Delhi',
    state: 'Delhi',
    type: 'caution',
    radius: 400,
    safetyLevel: 5,
    description: 'Busy traditional market area with moderate safety concerns',
    emergencyContacts: {
      police: '100',
      medical: '102',
      tourist_helpline: '1363'
    },
    facilities: ['Market Security', 'ATMs', 'Traditional Food', 'Shopping'],
    riskFactors: ['Pickpocketing', 'Overcrowding', 'Traffic congestion', 'Food safety'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // GOLDEN TEMPLE, AMRITSAR
  {
    id: 'golden_temple_main',
    name: 'Golden Temple Complex',
    monumentName: 'Harmandir Sahib (Golden Temple)',
    location: { lat: 31.6200, lng: 74.8765 },
    city: 'Amritsar',
    state: 'Punjab',
    type: 'safe',
    radius: 300,
    safetyLevel: 9,
    description: 'Holiest Sikh shrine with excellent community security and volunteers',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Community Security', 'Free Food', 'Medical Aid', 'Accommodation', 'Shoe Storage'],
    riskFactors: ['Large crowds during festivals', 'Slippery marble floors when wet'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // GATEWAY OF INDIA, MUMBAI
  {
    id: 'gateway_of_india_main',
    name: 'Gateway of India',
    monumentName: 'Gateway of India',
    location: { lat: 18.9220, lng: 72.8347 },
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'safe',
    radius: 200,
    safetyLevel: 7,
    description: 'Iconic Mumbai landmark with Mumbai Police and Coast Guard presence',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Police Booth', 'Boat Services', 'Photography', 'Street Food'],
    riskFactors: ['Sea spray during monsoon', 'Pickpocketing in crowds'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // HAWA MAHAL, JAIPUR
  {
    id: 'hawa_mahal_main',
    name: 'Hawa Mahal Palace',
    monumentName: 'Hawa Mahal (Palace of Winds)',
    location: { lat: 26.9239, lng: 75.8267 },
    city: 'Jaipur',
    state: 'Rajasthan',
    type: 'safe',
    radius: 150,
    safetyLevel: 8,
    description: 'Famous pink sandstone palace with Rajasthan Police protection',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Security Guards', 'Photography', 'Guided Tours', 'Souvenir Shop'],
    riskFactors: ['Narrow stairs for elderly', 'Heat during summer'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // MYSORE PALACE, KARNATAKA
  {
    id: 'mysore_palace_main',
    name: 'Mysore Palace',
    monumentName: 'Mysore Palace',
    location: { lat: 12.3051, lng: 76.6551 },
    city: 'Mysore',
    state: 'Karnataka',
    type: 'safe',
    radius: 250,
    safetyLevel: 8,
    description: 'Magnificent royal palace with Karnataka Police security',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Palace Security', 'Audio Guides', 'Light Show', 'Museum'],
    riskFactors: ['Crowds during Dussehra festival', 'Photography restrictions'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // LOTUS TEMPLE, DELHI
  {
    id: 'lotus_temple_main',
    name: 'Lotus Temple',
    monumentName: "Bahá'í House of Worship",
    location: { lat: 28.5535, lng: 77.2588 },
    city: 'New Delhi',
    state: 'Delhi',
    type: 'safe',
    radius: 200,
    safetyLevel: 9,
    description: 'Peaceful Bahá\'í temple with excellent security and maintenance',
    emergencyContacts: {
      police: '100',
      medical: '102',
      tourist_helpline: '1363'
    },
    facilities: ['Temple Security', 'Meditation Hall', 'Gardens', 'Information Center'],
    riskFactors: ['Silence required inside', 'No photography inside'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // VICTORIA MEMORIAL, KOLKATA
  {
    id: 'victoria_memorial_main',
    name: 'Victoria Memorial',
    monumentName: 'Victoria Memorial',
    location: { lat: 22.5448, lng: 88.3426 },
    city: 'Kolkata',
    state: 'West Bengal',
    type: 'safe',
    radius: 300,
    safetyLevel: 7,
    description: 'British-era monument with West Bengal Police security',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Police Security', 'Museum', 'Gardens', 'Light Show'],
    riskFactors: ['Monsoon flooding', 'Political demonstrations nearby'],
    lastUpdated: '2025-09-20',
    isActive: true
  },

  // MEENAKSHI TEMPLE, MADURAI
  {
    id: 'meenakshi_temple_main',
    name: 'Meenakshi Amman Temple',
    monumentName: 'Meenakshi Amman Temple',
    location: { lat: 9.9195, lng: 78.1193 },
    city: 'Madurai',
    state: 'Tamil Nadu',
    type: 'safe',
    radius: 200,
    safetyLevel: 8,
    description: 'Ancient Tamil temple with temple security and Tamil Nadu Police',
    emergencyContacts: {
      police: '100',
      medical: '108',
      tourist_helpline: '1363'
    },
    facilities: ['Temple Security', 'Shoe Storage', 'Prasadam', 'Guide Services'],
    riskFactors: ['Large crowds during festivals', 'Strict dress code'],
    lastUpdated: '2025-09-20',
    isActive: true
  }
]
