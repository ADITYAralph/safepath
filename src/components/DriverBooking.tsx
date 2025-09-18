'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, User, Star, Phone, MapPin, X, Clock } from 'lucide-react'

const availableDrivers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 4.9,
    trips: 1250,
    carModel: 'Toyota Innova',
    carNumber: 'DL 12 AB 1234',
    distance: '2.3 km',
    eta: '5 mins',
    price: 120,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Mohammed Ali',
    rating: 4.8,
    trips: 980,
    carModel: 'Maruti Ertiga',
    carNumber: 'DL 10 CD 5678',
    distance: '1.8 km',
    eta: '3 mins', 
    price: 100,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Suresh Singh',
    rating: 4.7,
    trips: 750,
    carModel: 'Honda City',
    carNumber: 'DL 08 EF 9012',
    distance: '3.1 km',
    eta: '7 mins',
    price: 150,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  }
]

export function DriverBooking() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)
  const [bookingStep, setBookingStep] = useState<'list' | 'booking' | 'confirmed'>('list')

  const handleBookDriver = (driverId: string) => {
    setSelectedDriver(driverId)
    setBookingStep('booking')
    
    // Simulate booking process
    setTimeout(() => {
      setBookingStep('confirmed')
    }, 2000)
  }

  const resetBooking = () => {
    setSelectedDriver(null)
    setBookingStep('list')
    setIsOpen(false)
  }

  const selectedDriverData = availableDrivers.find(d => d.id === selectedDriver)

  return (
    <>
      {/* Floating Driver Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all z-50"
      >
        <Car size={24} />
      </motion.button>

      {/* Driver Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && resetBooking()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Book Safe Driver</h2>
                  <p className="text-gray-400 text-sm">Verified & trusted drivers nearby</p>
                </div>
                <button
                  onClick={resetBooking}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Driver List */}
              {bookingStep === 'list' && (
                <div className="space-y-4">
                  {availableDrivers.map((driver) => (
                    <motion.div
                      key={driver.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
                    >
                      <div className="flex items-start gap-4">
                        {/* Driver Photo */}
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>

                        {/* Driver Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-semibold">{driver.name}</h3>
                            <span className="text-green-400 font-bold">₹{driver.price}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                            <div className="flex items-center">
                              <Star size={12} className="text-yellow-400 mr-1" />
                              {driver.rating}
                            </div>
                            <span>{driver.trips} trips</span>
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {driver.eta}
                            </div>
                          </div>

                          <div className="text-xs text-gray-500 mb-3">
                            {driver.carModel} • {driver.carNumber}
                          </div>

                          <button
                            onClick={() => handleBookDriver(driver.id)}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Booking Process */}
              {bookingStep === 'booking' && selectedDriverData && (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">Booking {selectedDriverData.name}</h3>
                  <p className="text-gray-400 mb-4">Please wait while we confirm your booking...</p>
                  <div className="bg-white/5 rounded-lg p-4 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <User size={16} className="text-blue-400" />
                      <span className="text-white">{selectedDriverData.name}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Car size={16} className="text-green-400" />
                      <span className="text-gray-300">{selectedDriverData.carModel}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-orange-400" />
                      <span className="text-gray-300">ETA: {selectedDriverData.eta}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Confirmed */}
              {bookingStep === 'confirmed' && selectedDriverData && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-400 mb-4">{selectedDriverData.name} is on the way</p>
                  
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between text-white">
                        <span>Driver:</span>
                        <span>{selectedDriverData.name}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Vehicle:</span>
                        <span>{selectedDriverData.carModel}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Number:</span>
                        <span>{selectedDriverData.carNumber}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>ETA:</span>
                        <span className="text-green-400">{selectedDriverData.eta}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold">
                        <span>Fare:</span>
                        <span>₹{selectedDriverData.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                      <Phone size={16} />
                      Call Driver
                    </button>
                    <button 
                      onClick={resetBooking}
                      className="flex-1 bg-white/10 text-white py-2 rounded-lg font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
