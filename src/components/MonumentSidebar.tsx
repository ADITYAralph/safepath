'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronRight, MapPin, Clock, Users, Star } from 'lucide-react'

const monuments = [
  {
    id: '1',
    name: 'Red Fort',
    location: 'Delhi',
    distance: '2.3 km',
    rating: 4.8,
    visitors: '12k',
    description: 'Historic Mughal fortress and UNESCO World Heritage Site'
  },
  {
    id: '2', 
    name: 'Lotus Temple',
    location: 'Delhi',
    distance: '5.7 km',
    rating: 4.7,
    visitors: '8k',
    description: 'Architectural marvel known for its flower-like shape'
  },
  {
    id: '3',
    name: 'India Gate',
    location: 'Delhi', 
    distance: '3.1 km',
    rating: 4.6,
    visitors: '15k',
    description: 'War memorial and iconic landmark of New Delhi'
  },
  {
    id: '4',
    name: 'Qutub Minar',
    location: 'Delhi',
    distance: '8.2 km', 
    rating: 4.5,
    visitors: '6k',
    description: 'Tallest brick minaret in the world'
  }
]

export function MonumentSidebar() {
  const router = useRouter()
  const [selectedMonument, setSelectedMonument] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Fix SSR issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMonumentClick = async (id: string) => {
    if (!isMounted || isNavigating) return
    
    try {
      setIsNavigating(true)
      setSelectedMonument(id)
      
      // Safe navigation with error handling
      await router.push(`/monument/${id}`)
    } catch (error) {
      console.error('Navigation error:', error)
      
      // Fallback: show alert with monument info instead of navigation
      const monument = monuments.find(m => m.id === id)
      if (monument) {
        alert(`🏛️ ${monument.name}\n\n📍 ${monument.description}\n📊 Rating: ${monument.rating}/5\n👥 ${monument.visitors} daily visitors\n📐 ${monument.distance} away\n\n✨ Monument details page coming soon!`)
      }
      
      setSelectedMonument(null)
    } finally {
      setIsNavigating(false)
    }
  }

  // Don't render until mounted to prevent SSR issues
  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-black/60 backdrop-blur-xl border-r border-white/10 z-40 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white mb-2">Nearby Monuments</h2>
        <p className="text-gray-400 text-sm">Discover historical sites around you</p>
      </div>

      {/* Monument List */}
      <div className="p-4 space-y-4">
        {monuments.map((monument) => (
          <motion.div
            key={monument.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMonumentClick(monument.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
              selectedMonument === monument.id
                ? 'bg-blue-500/20 border-blue-500/50'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {/* Monument Image */}
            <div className="w-full h-32 rounded-lg mb-3 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative">
              <MapPin size={32} className="text-white" />
              <span className="ml-2 text-white font-medium">{monument.name}</span>
              
              {/* Loading indicator */}
              {isNavigating && selectedMonument === monument.id && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Monument Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">{monument.name}</h3>
                <ChevronRight size={20} className="text-gray-400" />
              </div>

              <p className="text-gray-300 text-sm">{monument.description}</p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <MapPin size={14} className="mr-1" />
                  {monument.distance}
                </div>
                
                <div className="flex items-center text-yellow-400">
                  <Star size={14} className="mr-1" />
                  {monument.rating}
                </div>
                
                <div className="flex items-center text-gray-400">
                  <Users size={14} className="mr-1" />
                  {monument.visitors}
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">{monument.location}</span>
                <div className="flex items-center text-xs text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  Open Now
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 mt-4">
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition">
          View All Monuments
        </button>
      </div>
    </div>
  )
}
