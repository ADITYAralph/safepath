'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Users, Star, Share2, Heart, Navigation, Eye } from 'lucide-react'
import Image from 'next/image'

// Dynamic background doodles for each monument
const monumentBackgrounds = {
  '1': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center&auto=format&q=30', // Red Fort doodle pattern
  '2': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop&crop=center&auto=format&q=30', // Lotus Temple doodle pattern  
  '3': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&h=1080&fit=crop&crop=center&auto=format&q=30', // India Gate doodle pattern
  '4': 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1920&h=1080&fit=crop&crop=center&auto=format&q=30'  // Qutub Minar doodle pattern
}

// High-quality monument photos
const monumentData: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'Red Fort',
    location: 'Delhi, India',
    distance: '2.3 km',
    rating: 4.8,
    visitors: '12k',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=800&fit=crop&crop=center&auto=format&q=85',
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
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop&crop=center&auto=format&q=85',
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
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=800&fit=crop&crop=center&auto=format&q=85',
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
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&h=800&fit=crop&crop=center&auto=format&q=85',
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
  const [currentBackground, setCurrentBackground] = useState('')

  useEffect(() => {
    const id = params?.id as string
    if (id && monumentData[id]) {
      const monumentInfo = monumentData[id]
      setMonument(monumentInfo)
      // Set dynamic background based on monument ID
      setCurrentBackground(monumentBackgrounds[id as keyof typeof monumentBackgrounds] || monumentBackgrounds['1'])
    }
    setIsLoading(false)
  }, [params])

  const handleARView = () => {
    router.push(`/monument/${monument.id}/ar`)
  }

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
    <div 
      className="min-h-screen text-white relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('${currentBackground}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
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
          {/* Hero Section with High-Quality Monument Image */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 group shadow-2xl">
            <Image
              src={monument.image}
              alt={monument.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
              quality={95}
            />
            
            {/* AR View Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleARView}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl backdrop-blur-sm border border-white/20 flex items-center gap-3"
              >
                <Eye size={24} />
                AR Experience
              </motion.button>
            </div>

            {/* Floating AR Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleARView}
              className="absolute bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm border border-white/30 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
            >
              <Eye size={24} />
            </motion.button>
          </div>

          {/* Monument Info */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6 bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {monument.name}
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">{monument.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">History</h2>
                <p className="text-gray-300 leading-relaxed">{monument.history}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Highlights</h2>
                <ul className="space-y-3">
                  {monument.highlights.map((highlight: string, index: number) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Large AR View Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleARView}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
              >
                <Eye size={24} />
                <span>Experience in AR View</span>
                <div className="bg-white/20 px-2 py-1 rounded-full text-xs">3D</div>
              </motion.button>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Info</h3>
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
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl rounded-xl p-6 border border-green-500/50 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-green-300">Safety Score</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{monument.safetyScore}%</div>
                  <p className="text-green-200 text-sm">Very Safe</p>
                  <p className="text-green-300 text-xs mt-2">Crowd Level: {monument.crowdLevel}</p>
                </div>
              </div>

              {/* Visit Info */}
              <div className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-white">Visit Details</h3>
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
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Navigation size={20} />
                  Get Directions
                </button>
                
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition border border-white/20 shadow-lg"
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
