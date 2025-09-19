'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { v4 as uuidv4 } from 'uuid'
import { BlockchainBadge } from '@/components/BlockchainBadge'
import { LanguageSelector } from '@/components/LanguageSelector'
import { User, FileText, Phone, Calendar, CreditCard } from 'lucide-react'

// Simple inline translation function
const useTranslation = () => {
  return {
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'digitalId': 'Digital Tourist ID',
        'generateId': 'Generate Digital ID',
        'emergencyContacts': 'Emergency Contacts',
        'itinerary': 'Trip Itinerary'
      }
      return translations[key] || key
    }
  }
}

export default function DigitalIDPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    passport: '',
    phone: '',
    emergencyContact: '',
    itinerary: '',
    checkInDate: '',
    checkOutDate: ''
  })
  const [generatedID, setGeneratedID] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate unique ID
      const touristID = uuidv4()
      const blockchainHash = `0x${Math.floor(Math.random() * 1e16).toString(16)}`
      
      const digitalID = {
        id: touristID,
        ...formData,
        createdAt: new Date().toISOString(),
        validUntil: formData.checkOutDate,
        blockchainHash,
        status: 'active'
      }

      // Simulate blockchain storage
      localStorage.setItem('tourist_digital_id', JSON.stringify(digitalID))
      localStorage.setItem('tourist_authenticated', 'true')
      
      setGeneratedID(digitalID)
      
    } catch (error) {
      console.error('ID generation failed:', error)
      alert('Failed to generate ID. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  if (generatedID) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Digital ID Generated!</h1>
              <BlockchainBadge />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <QRCodeSVG value={JSON.stringify(generatedID)} size={200} className="mx-auto mb-4" />
              <div className="space-y-2 text-left">
                <div><strong>ID:</strong> {generatedID.id}</div>
                <div><strong>Name:</strong> {generatedID.name}</div>
                <div><strong>Valid Until:</strong> {new Date(generatedID.validUntil).toLocaleDateString()}</div>
                <div><strong>Blockchain Hash:</strong> <span className="font-mono text-xs">{generatedID.blockchainHash}</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDashboard}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={() => window.print()}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Print ID Card
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{t('digitalId')}</h1>
          <LanguageSelector />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600 font-medium"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600 font-medium"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <CreditCard size={16} className="inline mr-2" />
                  Aadhaar Number
                </label>
                <input
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600 font-medium"
                  placeholder="XXXX XXXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <CreditCard size={16} className="inline mr-2" />
                  Passport Number
                </label>
                <input
                  value={formData.passport}
                  onChange={(e) => setFormData({...formData, passport: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600 font-medium"
                  placeholder="Passport number (if applicable)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Check-in Date *
                </label>
                <input
                  required
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Check-out Date *
                </label>
                <input
                  required
                  type="date"
                  value={formData.checkOutDate}
                  onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                {t('emergencyContacts')} *
              </label>
              <input
                required
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600 font-medium"
                placeholder="Emergency contact phone numbers (comma-separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText size={16} className="inline mr-2" />
                {t('itinerary')} *
              </label>
              <textarea
                required
                value={formData.itinerary}
                onChange={(e) => setFormData({...formData, itinerary: e.target.value})}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600 font-medium"
                placeholder="Please describe your travel plans and places you intend to visit..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating ID...
                </div>
              ) : (
                <>{t('generateId')}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
