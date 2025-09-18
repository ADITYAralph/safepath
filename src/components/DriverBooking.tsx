import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Star } from 'lucide-react';

const driverInfo = {
  name: 'Rajesh Kumar',
  carNumber: 'DL9CAF1234',
  carModel: 'Toyota Innova Crysta',
  reviews: 4.8,
  totalRides: 1250,
  image: '/driver-avatar.png'
};

export function DriverBooking() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5, type: "spring" }}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)" 
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-48 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-2xl backdrop-blur-xl border-2 border-blue-400/20 flex items-center justify-center"
      >
        <Car size={22} />
      </motion.button>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-60"
          onClick={() => setOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Car size={32} className="text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{driverInfo.name}</h2>
              <p className="text-gray-600">{driverInfo.carModel}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Car Number:</span>
                <span className="font-semibold text-gray-900">{driverInfo.carNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{driverInfo.reviews}</span>
                  <span className="text-gray-500">({driverInfo.totalRides} rides)</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ETA:</span>
                <span className="font-semibold text-green-600">5-8 minutes</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setOpen(false)}
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('🚗 Driver Booked Successfully!\n\n👨‍💼 Driver: ' + driverInfo.name + '\n🚙 Car: ' + driverInfo.carModel + '\n📍 Arriving in 5-8 minutes\n📞 Contact: +91-9876543210')
                  setOpen(false)
                }}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
