'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const monuments = [
  { 
    id: '1', 
    name: 'Red Fort', 
    lat: 28.6562, 
    lng: 77.2410, 
    distance: '2.3 km',
    image: '🏰'
  },
  { 
    id: '2', 
    name: 'Qutub Minar', 
    lat: 28.5244, 
    lng: 77.1855, 
    distance: '8.7 km',
    image: '🗼'
  },
  { 
    id: '3', 
    name: 'India Gate', 
    lat: 28.6129, 
    lng: 77.2295, 
    distance: '1.8 km',
    image: '🚪'
  },
  { 
    id: '4', 
    name: 'Lotus Temple', 
    lat: 28.5535, 
    lng: 77.2588, 
    distance: '12.4 km',
    image: '🏛️'
  },
];

export function MonumentSidebar() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className={`fixed left-0 top-20 bottom-0 bg-black/70 backdrop-blur-xl text-white flex flex-col z-40 transition-all duration-300 border-r border-white/10 ${
        expanded ? 'w-72 p-4' : 'w-12 p-2'
      }`}
    >
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setExpanded(!expanded)} 
        className="mb-6 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
      >
        <Building size={24} />
      </motion.button>
      
      {expanded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-y-auto"
        >
          <h3 className="text-lg font-bold mb-4 text-center">Nearby Monuments</h3>
          <div className="space-y-3">
            {monuments.map((monument) => (
              <motion.div
                key={monument.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/monument/${monument.id}`)}
                className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{monument.image}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{monument.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <MapPin size={12} />
                      <span>{monument.distance}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <div 
            className="text-white text-sm font-bold tracking-wider transform rotate-90 select-none"
            style={{ 
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            MONUMENTS
          </div>
        </div>
      )}
    </motion.div>
  );
}
