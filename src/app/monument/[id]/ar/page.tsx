'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Volume2, Info, Share2 } from 'lucide-react'

const monumentInfo = {
  '1': { name: 'Red Fort', era: '1648 CE', ruler: 'Shah Jahan' },
  '2': { name: 'Lotus Temple', era: '1986 CE', architect: 'Fariborz Sahba' },
  '3': { name: 'India Gate', era: '1931 CE', architect: 'Edwin Lutyens' },
  '4': { name: 'Qutub Minar', era: '1192 CE', ruler: 'Qutb-ud-Din Aibak' }
}

export default function ARPage() {
  const router = useRouter()
  const params = useParams()
  const [monument, setMonument] = useState<any>(null)
  const [isARActive, setIsARActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const id = params?.id as string
    
    if (id && monumentInfo[id as keyof typeof monumentInfo]) {
      setMonument({ 
        id, 
        ...monumentInfo[id as keyof typeof monumentInfo] 
      })
      
      // Simulate AR activation
      setTimeout(() => {
        setIsARActive(true)
      }, 3000)
    }
  }, [params])

  if (!isMounted || !monument) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading AR Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-blue-900/50"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/30">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition"
          >
            <ArrowLeft size={20} />
            <span>Exit AR</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AR LIVE</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert('📸 AR Photo captured!')}
              className="p-2 text-white hover:text-purple-400 rounded-lg transition"
            >
              <Camera size={20} />
            </button>
            <button className="p-2 text-white hover:text-purple-400 rounded-lg transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main AR Content */}
      <main className="pt-20 h-screen flex items-center justify-center relative">
        {!isARActive ? (
          // AR Loading State
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold mb-2">Activating AR Experience...</h2>
            <p className="text-gray-400">Point your device at the monument</p>
          </div>
        ) : (
          // AR Active State
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md"
          >
            {/* 3D Monument Representation */}
            <div className="relative mx-auto">
              <motion.div
                animate={{ 
                  rotateY: [0, 360]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-80 h-80 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="text-center z-10">
                  <h1 className="text-3xl font-bold mb-2">{monument.name}</h1>
                  <p className="text-lg opacity-90">{monument.era}</p>
                </div>
              </motion.div>

              {/* AR Info Labels */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-8 -left-8 bg-purple-600/90 backdrop-blur-sm rounded-xl p-3 border border-purple-400/50"
              >
                <p className="text-sm font-medium">Era: {monument.era}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-8 -right-8 bg-blue-600/90 backdrop-blur-sm rounded-xl p-3 border border-blue-400/50"
              >
                <p className="text-sm font-medium">
                  {monument.ruler || monument.architect}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </main>

      {/* AR Controls */}
      {isARActive && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <button
              onClick={() => alert('ℹ️ AR Information:\n\n' + monument.name + '\nBuilt: ' + monument.era + '\nBy: ' + (monument.ruler || monument.architect))}
              className="p-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition"
            >
              <Info size={20} />
            </button>
            
            <button 
              onClick={() => alert('🔊 Audio guide activated!')}
              className="p-3 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition"
            >
              <Volume2 size={20} />
            </button>
            
            <button
              onClick={() => alert('📸 AR Screenshot saved to gallery!')}
              className="p-3 bg-orange-500/20 text-orange-400 rounded-xl hover:bg-orange-500/30 transition"
            >
              <Camera size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
