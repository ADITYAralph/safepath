'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Users, Star, Camera, Share2, Heart, Navigation } from 'lucide-react'

const monumentData: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'Red Fort',
    location: 'Delhi, India',
    distance: '2.3 km',
    rating: 4.8,
    visitors: '12k',
    description: 'The Red Fort is a historic fortified palace of the Mughal emperors that served as the main residence of the Mughal Emperors for nearly 200 years.',
    history: 'Built in 1648 by the fifth Mughal Emperor Shah Jahan, the Red Fort served as the main residence of the Mughal dynasty for nearly 200 years.',
    timings: '9:30 AM - 4:30 PM (Closed on Mondays)',
    entryFee: '₹30 for Indians, ₹500 for Foreigners',
    highlights: [
      'Diwan-i-Aam (Hall of Public Audience)',
      'Diwan-i-Khas (Hall of Private Audience)', 
      'Rang Mahal (Palace of Colors)',
      'Museum and Archaeological exhibits'
    ],
    safetyScore: 95,
    crowdLevel: 'Moderate',
    bestTime: 'October to March'
  },
  '2': {
    id: '2',
    name: 'Lotus Temple',
    location: 'Delhi, India',
    distance: '5.7 km',
    rating: 4.7,
    visitors: '8k',
    description: 'The Lotus Temple is a Baháʼí House of Worship notable for its flowerlike shape. It has become a prominent attraction in the city.',
    history: 'Completed in 1986, the Lotus Temple was designed by Iranian architect Fariborz Sahba and serves as the Mother Temple of the Indian subcontinent.',
    timings: '6:00 AM - 7:00 PM (Closed on Mondays)',
    entryFee: 'Free Entry',
    highlights: [
      'Unique lotus-shaped architecture',
      'Peaceful meditation environment',
      'Beautiful gardens and water features',
      'Architectural photography opportunities'
    ],
    safetyScore: 98,
    crowdLevel: 'High',
    bestTime: 'Early morning or evening'
  },
  '3': {
    id: '3',
    name: 'India Gate',
    location: 'Delhi, India',
    distance: '3.1 km',
    rating: 4.6,
    visitors: '15k',
    description: 'India Gate is a war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi.',
    history: 'Designed by Sir Edwin Lutyens, India Gate was inaugurated in 1931. It commemorates 70,000 soldiers of the British Indian Army who died in World War I.',
    timings: 'Open 24 hours (Best visited during daytime)',
    entryFee: 'Free Entry',
    highlights: [
      'War memorial with eternal flame',
      'Beautiful lawns and gardens',
      'Evening light and sound show',
      'Street food and local vendors'
    ],
    safetyScore: 92,
    crowdLevel: 'Very High',
    bestTime: 'Evening sunset hours'
  },
  '4': {
    id: '4',
    name: 'Qutub Minar',
    location: 'Delhi, India',
    distance: '8.2 km',
    rating: 4.5,
    visitors: '6k',
    description: 'Qutub Minar is a minaret and victory tower that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi.',
    history: 'Construction began in 1192 by Qutb-ud-Din Aibak and was completed by his successor Iltutmish. It stands 73 meters tall with 5 distinct stories.',
    timings: 'Sunrise to Sunset (Closed on Mondays)',
    entryFee: '₹30 for Indians, ₹500 for Foreigners',
    highlights: [
      'Tallest brick minaret in the world',
      'Indo-Islamic architecture',
      'Iron Pillar of Delhi',
      'Archaeological museum'
    ],
    safetyScore: 90,
    crowdLevel: 'Low to Moderate',
    bestTime: 'October to March'
  }
}

export default function MonumentPage() {
  const router = useRouter()
  const params = useParams()
  const [monument, setMonument] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const id = params?.id as string
    if (id && monumentData[id]) {
      setMonument(monumentData[id])
    }
    setIsLoading(false)
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!monument) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Monument Not Found</h2>
          <p className="text-gray-400 mb-6">The monument you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-xl font-bold">{monument.name}</h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg transition ${
                isFavorite ? 'text-red-400 bg-red-500/20' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-blue-400 rounded-lg transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Image */}
          <div className="w-full h-80 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-8">
            <div className="text-center">
              <Camera size={48} className="mx-auto mb-4 text-white/80" />
              <p className="text-white/80">Monument Photo</p>
            </div>
          </div>

          {/* Monument Info */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{monument.name}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{monument.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">History</h2>
                <p className="text-gray-300 leading-relaxed">{monument.history}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {monument.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Distance</p>
                      <p className="text-white">{monument.distance}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Star size={16} className="text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">Rating</p>
                      <p className="text-white">{monument.rating}/5</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Daily Visitors</p>
                      <p className="text-white">{monument.visitors}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-400">Timings</p>
                      <p className="text-white text-sm">{monument.timings}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Info */}
              <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-semibold mb-4 text-green-300">Safety Score</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{monument.safetyScore}%</div>
                  <p className="text-green-200 text-sm">Very Safe</p>
                  <p className="text-green-300 text-xs mt-2">Crowd Level: {monument.crowdLevel}</p>
                </div>
              </div>

              {/* Visit Info */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Visit Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Entry Fee</p>
                    <p className="text-white">{monument.entryFee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Best Time</p>
                    <p className="text-white">{monument.bestTime}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    alert(`🧭 Navigation started to ${monument.name}!\n\nDistance: ${monument.distance}\nEstimated time: 15 minutes\nSafe route selected.`)
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Navigation size={20} />
                  Get Directions
                </button>
                
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition border border-white/20"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
