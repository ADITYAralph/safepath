export interface User {
  id: string
  email: string
  name: string
  travelerType: 'solo' | 'group' | 'female' | 'elderly'
  emergencyContacts: EmergencyContact[]
  safetyScore: number
  createdAt: Date
}

export interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
  isPrimary: boolean
}

export interface Location {
  lat: number
  lng: number
  accuracy?: number
  timestamp?: Date
}

export interface SafetyIncident {
  id: string
  type: 'theft' | 'assault' | 'accident' | 'harassment' | 'emergency'
  severity: 'low' | 'medium' | 'high'
  location: Location
  description: string
  reportedBy: string
  reportedAt: Date
  verified: boolean
  timeAgo: string
}
