'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, IndianRupee, Users, Eye } from 'lucide-react';

const monumentData = [
  {
    id: '1',
    name: 'Red Fort',
    photoUrl: 'https://media.istockphoto.com/id/520840182/photo/red-fort-lal-qila-with-indian-flag-delhi-india.jpg?s=2048x2048&w=is&k=20&c=ZMUP4dTSDKrTi9IILtyQc8mrzpAGA8a4ld766I9VDIM=',
    history: `The Red Fort, also known as Lal Qila, is a historic Mughal fort located in the Old Delhi area of Delhi, India. It served as the main residence of the Mughal emperors. Commissioned by Emperor Shah Jahan on the 12th of May 1639, the fort was constructed following his decision to shift the Mughal capital from Agra to Delhi. Originally adorned in red and white, the fort's design is attributed to Ustad Ahmad Lahori, the architect of the Taj Mahal. The Red Fort is a prominent example of Mughal architecture from Shah Jahan's reign, combining Persian and Indian architectural styles.

Emperor Shah Jahan commissioned the construction of the Red Fort on 12 May 1639, following his decision to shift his capital from Agra to Delhi. The design of the Red Fort is attributed to the architect Ustad Ahmad Lahori, renowned for his work on the Taj Mahal. It straddles the Yamuna River, which once fed the moats surrounding most of the walls. Construction began in the sacred Islamic month of Muharram, on 13 May 1638. Supervised by Shah Jahan, it was completed on 6 April 1648. The fort was originally adorned in red and white. Unlike other Mughal forts, the Red Fort's boundary walls are asymmetrical to contain and subsume the older Salimgarh Fort.

During the invasion by Nadir Shah of the Afsharid Empire in 1739, the fort was plundered and stripped of its artwork and jewels. Following the Indian Rebellion of 1857, many of its marble structures were demolished by the British, although the defensive walls remained largely intact. The fort was later repurposed as a military garrison. The Persian emperor Nadir Shah decisively defeated the Mughal army, despite its considerable strength of approximately 200,000 soldiers. Following his victory, he plundered the Red Fort, seizing its treasures, including the legendary Peacock Throne. After three months, Nadir Shah returned to Persia, leaving the city significantly damaged and the Mughal Empire severely weakened.

On 15 August 1947, the first Prime Minister of India, Jawaharlal Nehru, hoisted the Indian flag above the Lahori Gate, the main entrance of the Red Fort. Since then, the Prime Minister of India has ceremonially raised the national tricolour at the main gate each year on Independence Day, then delivering a nationally broadcast address from its ramparts. After the 1857 rebellion was subdued, the British sacked the Red Fort before ordering its systematic demolition. As a result of this widespread destruction, 80% of the fort's structures were demolished, including the stone screen that once connected the pavilions along the river-facing façade of the fort. The Red Fort, as part of the Red Fort Complex, was recognized as a UNESCO World Heritage Site in 2007.`,
    distance: '2.3 km from your location',
    fare: '₹35 per person (Indian citizens), ₹500 per person (Foreign tourists)',
    gathering: 'High crowd density - Peak hours 10 AM to 4 PM. Best to visit early morning or late afternoon.',
    timings: 'Open: 9:30 AM - 4:30 PM (Closed on Mondays)',
    significance: 'UNESCO World Heritage Site since 2007'
  },
  {
    id: '2',
    name: 'Qutub Minar',
    photoUrl: 'https://images.unsplash.com/photo-1598024055266-e772e4393d2e?w=1200&h=800&fit=crop&q=80',
    history: `The Qutb Minar, also spelled Qutub Minar and Qutab Minar, is a minaret and victory tower comprising the Qutb complex, which lies at the site of Delhi's oldest fortified city, Lal Kot, founded by the Tomar Rajputs. It is a UNESCO World Heritage Site in the Mehrauli area of South Delhi, India. It was mostly built between 1199 and 1220, contains 399 steps, and is one of the most-frequented heritage spots in the city. After defeating Prithviraj Chauhan, the last Hindu ruler of Delhi before the Ghurid conquest of the region, Qutab-ud-din Aibak initiated the construction of the victory tower, but only managed to finish the first level.

The Qutb Minar was built over the ruins of the Lal Kot, the citadel of Dhillika. Qutub Minar was begun after the Quwwat-ul-Islam Mosque. Drawing references from their Ghurid homeland, Qutub-ud-Din Aibak and Shamsu'd-Din Iltutmish constructed a minar (minaret) at the south-eastern corner of the Quwwatu'l-Islam between 1199 and 1503. It is usually thought that the tower is named for Qutb-ud-din Aibak, who began it. It is also possible that it is named after Khwaja Qutbuddin Bakhtiar Kaki a 13th-century sufi saint, because Shamsuddin Iltutmish was a devotee of his.

The minar is made with numerous superimposed flanged and cylindrical shafts in the interior, and fluted columns on the exterior, which have a 40 cm thick veneer of red and buff coloured sandstone; all surrounded by bands of intricate carving in Kufic style of Islamic calligraphy, giving the minar the appearance of bundled reeds. It stands just outside the Quwwatul mosque, and an Arabic inscription suggests that it might have been built to serve as a place for the muezzin, to call the faithfuls for namaz. Also marking a progression in era, is the appearance of inscriptions in a bold and cursive Thuluth script of calligraphy on the Qutb Minar.

Inscriptions also indicate further repairs by Sultan Sikander Lodi in 1503, when it was struck by lightning once again. In 1802, the cupola on the top was thrown down and the whole pillar was damaged by an earthquake. It was repaired by Major R. Smith of the Royal Engineers who restored the Qutub Minar in 1823 replacing the cupola with a Bengali-style chhatri which was later removed by Governor General, Lord Hardinge in 1848, as it looked out of place, and now stands in the outer lawns of the complex, popularly known as Smith's Folly. The Minar is surrounded by several historically significant monuments of the Qutb complex.`,
    distance: '8.7 km from your location',
    fare: '₹30 per person (Indian citizens), ₹500 per person (Foreign tourists)',
    gathering: 'Moderate crowd density. Generally less crowded than other major monuments.',
    timings: 'Open: 7:00 AM - 5:00 PM (Daily)',
    significance: 'Tallest brick minaret in the world at 72.5 meters'
  },
  {
    id: '3',
    name: 'India Gate',
    photoUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=800&fit=crop&q=80',
    history: `India Gate is a war memorial located astride the Rajpath, on the eastern edge of the "ceremonial axis" of New Delhi. It stands as a memorial to 70,000 soldiers of the British Indian Army who died in the period 1914–21 in the First World War and the Afghan Wars. The memorial bears the names of more than 13,516 British and Indian soldiers killed in the Northwestern Frontier campaigns of 1919. The structure was designed by Sir Edwin Lutyens and the foundation stone was laid by the Duke of Connaught in 1921.

Originally called the All India War Memorial, it was built to commemorate the soldiers who died during World War I and the Third Afghan War. The memorial was built using red sandstone and granite, and stands 42 meters high. The arch has the Imperial Crown on the top, which was later replaced by a hollow crown following India's independence. The structure was designed to be simple and strong, embodying the sentiment of the memorial it represents.

The construction of India Gate began in 1921 and took 10 years to complete. The monument was inaugurated in 1931 by the then Viceroy, Lord Irwin. India Gate is built in the Indo-Saracenic architectural style, though it was constructed by the British. The memorial is built of red sandstone and granite. The arch of India Gate is similar to the Arc de Triomphe in Paris. However, India Gate was designed to be more than just a war memorial - it was conceived as a part of the grand vista of New Delhi.

After India's independence in 1947, India Gate became synonymous with the Republic Day parade and other important national events. The Amar Jawan Jyoti, an eternal flame, was added beneath the arch in 1971 to commemorate the soldiers who died in the Indo-Pakistani War of 1971. In recent years, India Gate has become a popular recreational spot for Delhi residents and tourists alike. The lawns around India Gate serve as a popular picnic spot, especially in the evenings when the monument is illuminated, creating a spectacular view.`,
    distance: '1.8 km from your location',
    fare: 'Free entry (No entry fee required)',
    gathering: 'Very high crowd density, especially in evenings and weekends. Peak hours: 5 PM to 8 PM.',
    timings: 'Open 24 hours (Best viewed in evening when illuminated)',
    significance: 'National war memorial and iconic symbol of New Delhi'
  },
  {
    id: '4',
    name: 'Lotus Temple',
    photoUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
    history: `The Lotus Temple, located in Delhi, India, is a Bahá'í House of Worship that was dedicated in December 1986. Notable for its flowerlike shape, it has become a prominent attraction in the city. Like all Bahá'í Houses of Worship, the Lotus Temple is open to all, regardless of religion or any other qualification. The building is composed of 27 free-standing marble-clad "petals" arranged in clusters of three to form nine sides, with nine doors opening onto a central hall capable of holding 2,500 people.

The Lotus Temple was designed by Iranian-Canadian architect Fariborz Sahba, who won several architectural awards for the design. The design consists of three ranks of nine petals each, totaling 27 petals, and was built using white Pentelic marble from Mount Pentelicus in Greece, the same marble used in the construction of the Parthenon and other ancient monuments. The temple's form draws inspiration from the lotus flower, which holds significance in many of the world's religions and represents purity, peace, and divine beauty.

Construction of the Lotus Temple began in 1980 and took six years to complete. The temple sits on 26 acres of landscaped gardens and is approached by nine walkways. The construction required considerable engineering innovation, as the complex curves and intersections of the petals required precise calculations and execution. The temple has no vertical supports, and the entire structure is held together by the interlocking of the marble petals and the steel frame beneath.

Since its dedication in 1986, the Lotus Temple has become one of the most visited buildings in the world, attracting visitors from all continents. It serves not only as a house of worship but also as a symbol of unity and peace. The temple follows the Bahá'í principle that all religions are one and all people are equal, welcoming visitors of all backgrounds to come and meditate or pray in silence. The gardens surrounding the temple feature fountains and walkways, providing a serene environment for contemplation and reflection.`,
    distance: '12.4 km from your location',
    fare: 'Free entry (No entry fee required)',
    gathering: 'High crowd density during peak hours. Best to visit early morning or late afternoon.',
    timings: 'Open: 9:00 AM - 7:00 PM (Closed on Mondays)',
    significance: 'Bahá\'í House of Worship, architectural marvel with lotus-inspired design'
  }
];

// Background Animation Components
const CarAnimation = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-green-200">
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Road */}
      <defs>
        <pattern id="roadPattern" x="0" y="0" width="100" height="10" patternUnits="userSpaceOnUse">
          <rect width="50" height="5" fill="#fff" opacity="0.8"/>
          <rect x="50" width="50" height="5" fill="transparent"/>
        </pattern>
      </defs>
      <rect x="0" y="350" width="800" height="120" fill="#2c3e50" />
      <rect x="0" y="395" width="800" height="10" fill="url(#roadPattern)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-100 0; 0 0; -100 0"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Moving Car */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 600 0; 0 0"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect x="100" y="370" width="80" height="30" fill="#e74c3c" rx="5"/>
        <rect x="110" y="350" width="60" height="25" fill="#3498db" rx="5"/>
        <circle cx="120" cy="410" r="10" fill="#2c3e50"/>
        <circle cx="160" cy="410" r="10" fill="#2c3e50"/>
        <rect x="115" y="355" width="15" height="15" fill="#87ceeb"/>
        <rect x="150" y="355" width="15" height="15" fill="#87ceeb"/>
      </g>
      
      {/* Trees */}
      <circle cx="50" cy="300" r="30" fill="#2ecc71"/>
      <rect x="45" y="300" width="10" height="50" fill="#8b4513"/>
      <circle cx="700" cy="280" r="25" fill="#27ae60"/>
      <rect x="695" y="280" width="10" height="70" fill="#8b4513"/>
      
      {/* Clouds */}
      <g opacity="0.6">
        <circle cx="200" cy="80" r="20" fill="#fff"/>
        <circle cx="220" cy="80" r="25" fill="#fff"/>
        <circle cx="240" cy="80" r="20" fill="#fff"/>
        <circle cx="500" cy="100" r="18" fill="#fff"/>
        <circle cx="515" cy="100" r="22" fill="#fff"/>
        <circle cx="530" cy="100" r="18" fill="#fff"/>
      </g>
    </svg>
  </div>
);

const TicketCounterAnimation = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-orange-200 to-yellow-100">
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Building */}
      <rect x="250" y="150" width="300" height="300" fill="#34495e" stroke="#2c3e50" strokeWidth="3"/>
      <rect x="270" y="130" width="260" height="30" fill="#e67e22"/>
      <text x="400" y="150" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">TICKET COUNTER</text>
      
      {/* Window */}
      <rect x="300" y="200" width="200" height="120" fill="#3498db" stroke="#2980b9" strokeWidth="2"/>
      <rect x="320" y="220" width="160" height="80" fill="#87ceeb"/>
      
      {/* Person */}
      <g>
        <rect x="180" y="320" width="30" height="60" fill="#e74c3c" rx="5"/>
        <circle cx="195" cy="310" r="15" fill="#f4d3a7"/>
        <rect x="170" y="330" width="20" height="8" fill="#f4d3a7" rx="4">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 180 334; -10 180 334; 0 180 334"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="210" y="330" width="20" height="8" fill="#f4d3a7" rx="4"/>
        <rect x="185" y="380" width="8" height="30" fill="#2c3e50"/>
        <rect x="197" y="380" width="8" height="30" fill="#2c3e50"/>
      </g>
      
      {/* Ticket booth person */}
      <circle cx="400" cy="250" r="12" fill="#f4d3a7"/>
      <rect x="390" y="260" width="20" height="40" fill="#3498db"/>
      
      {/* Money/Tickets */}
      <rect x="150" y="340" width="15" height="8" fill="#2ecc71">
        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
      </rect>
    </svg>
  </div>
);

const CrowdAnimation = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-purple-200 to-pink-100">
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Multiple people figures */}
      {[...Array(15)].map((_, i) => {
        const x = 50 + (i * 50);
        const delay = i * 0.2;
        return (
          <g key={i}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 ${Math.sin(i) * 10}; 0 ${Math.sin(i) * 10 + 5}; 0 ${Math.sin(i) * 10}`}
              dur="3s"
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <circle cx={x} cy="350" r="8" fill="#f4d3a7"/>
            <rect x={x-5} y="358" width="10" height="25" fill={`hsl(${i * 25}, 70%, 60%)`} rx="2"/>
            <rect x={x-3} y="383" width="3" height="20" fill="#2c3e50"/>
            <rect x={x+1} y="383" width="3" height="20" fill="#2c3e50"/>
          </g>
        );
      })}
      
      {/* Crowd indicators */}
      <text x="400" y="450" textAnchor="middle" fill="#7f8c8d" fontSize="24" fontWeight="bold" opacity="0.7">
        HIGH DENSITY AREA
      </text>
      
      {/* Movement indicators */}
      <g opacity="0.4">
        {[...Array(5)].map((_, i) => (
          <circle key={i} cx={100 + i * 150} cy="500" r="3" fill="#3498db">
            <animate attributeName="r" values="3;8;3" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </g>
    </svg>
  </div>
);

export default function MonumentPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const monument = monumentData.find(m => m.id === id);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('history');

  if (!monument) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Monument not found</h1>
          <button onClick={() => router.back()} className="bg-blue-600 px-4 py-2 rounded">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'history', label: 'History', icon: '📖' },
    { id: 'distance', label: 'Distance', icon: '📍' },
    { id: 'fare', label: 'Fare', icon: '💰' },
    { id: 'gathering', label: 'Crowd Info', icon: '👥' },
    { id: 'ar', label: 'AR View', icon: '🔮' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {activeTab === 'history' && (
            <motion.div
              key="history-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img 
                src={monument.photoUrl} 
                alt={monument.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          )}
          
          {activeTab === 'distance' && (
            <motion.div
              key="distance-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CarAnimation />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          )}
          
          {activeTab === 'fare' && (
            <motion.div
              key="fare-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <TicketCounterAnimation />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          )}
          
          {activeTab === 'gathering' && (
            <motion.div
              key="gathering-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CrowdAnimation />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          )}
          
          {activeTab === 'ar' && (
            <motion.div
              key="ar-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="bg-white/20 backdrop-blur-md p-3 rounded-full"
          >
            <ArrowLeft size={24} />
          </motion.button>
          
          <h1 className="text-2xl font-bold">{monument.name}</h1>
          
          <div className="w-12" />
        </header>

        {/* Tabs */}
        <div className="px-6 mb-6">
          <div className="flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-gray-200 hover:bg-white/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - ALL SECTIONS Transparent Glassmorphism */}
<div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 text-white shadow-2xl"
    style={{
      background: 'rgba(0, 0, 0, 0.15)',
      backdropFilter: 'saturate(180%) blur(25px)',
      WebkitBackdropFilter: 'saturate(180%) blur(25px)'
    }}
  >
    {activeTab === 'history' && (
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white drop-shadow-lg">
          📖 Historical Background
        </h3>
        <div className="text-gray-100 leading-relaxed text-lg space-y-4">
          {monument.history.split('\n\n').map((paragraph, index) => (
            <p key={index} className="backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="bg-blue-400/20 backdrop-blur-sm border border-blue-300/40 p-4 rounded-xl mt-6 shadow-lg">
          <p className="text-blue-100 font-semibold text-lg">
            <strong className="text-white">Cultural Significance:</strong> {monument.significance}
          </p>
        </div>
      </div>
    )}

    {activeTab === 'distance' && (
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white drop-shadow-lg">
          <MapPin className="text-green-300" />
          Location & Distance
        </h3>
        <div className="space-y-4">
          <div className="bg-green-400/20 backdrop-blur-sm border border-green-300/40 p-6 rounded-xl shadow-lg">
            <p className="text-green-100 text-2xl font-bold mb-2">{monument.distance}</p>
            <p className="text-green-200 text-sm">From your current location</p>
          </div>
          
          <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-yellow-100 flex items-center gap-2 font-semibold text-lg">
              <Clock size={18} />
              {monument.timings}
            </p>
          </div>
          
          <div className="bg-blue-400/20 backdrop-blur-sm border border-blue-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-blue-100 font-semibold flex items-center gap-2">
              🚗 <span>Estimated travel time: 8-12 minutes by car</span>
            </p>
          </div>
          
          <div className="bg-purple-400/20 backdrop-blur-sm border border-purple-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-purple-100 font-semibold flex items-center gap-2">
              🚶‍♂️ <span>Walking time: 25-30 minutes</span>
            </p>
          </div>
        </div>
      </div>
    )}

    {activeTab === 'fare' && (
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white drop-shadow-lg">
          <IndianRupee className="text-yellow-300" />
          Entry Fee & Costs
        </h3>
        
        <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/40 p-8 rounded-xl text-center shadow-lg mb-6">
          <div className="text-5xl font-bold text-yellow-100 mb-3">{monument.fare}</div>
          <p className="text-yellow-200 font-medium text-lg">Entry fee for Indian citizens</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-400/20 backdrop-blur-sm border border-green-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-green-100 font-semibold flex items-center gap-2">
              💳 <span>Digital payments accepted</span>
            </p>
          </div>
          
          <div className="bg-blue-400/20 backdrop-blur-sm border border-blue-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-blue-100 font-semibold flex items-center gap-2">
              🎫 <span>Online booking available</span>
            </p>
          </div>
          
          <div className="bg-orange-400/20 backdrop-blur-sm border border-orange-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-orange-100 font-semibold flex items-center gap-2">
              👥 <span>Group discounts available</span>
            </p>
          </div>
          
          <div className="bg-pink-400/20 backdrop-blur-sm border border-pink-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-pink-100 font-semibold flex items-center gap-2">
              🎒 <span>Student ID gets 50% off</span>
            </p>
          </div>
        </div>
      </div>
    )}

    {activeTab === 'gathering' && (
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white drop-shadow-lg">
          <Users className="text-purple-300" />
          Crowd Information
        </h3>
        
        <div className="bg-purple-400/20 backdrop-blur-sm border border-purple-300/40 p-6 rounded-xl shadow-lg mb-6">
          <p className="text-purple-100 text-xl font-semibold mb-4">{monument.gathering}</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-400/20 backdrop-blur-sm border border-green-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-green-100 font-semibold flex items-center gap-2">
              🕒 <span>Best visit time: Early morning (8-10 AM) or late afternoon (4-6 PM)</span>
            </p>
          </div>
          
          <div className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-yellow-100 font-semibold flex items-center gap-2">
              📅 <span>Weekdays generally less crowded than weekends</span>
            </p>
          </div>
          
          <div className="bg-red-400/20 backdrop-blur-sm border border-red-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-red-100 font-semibold flex items-center gap-2">
              🎭 <span>Avoid during festivals and public holidays</span>
            </p>
          </div>
          
          <div className="bg-blue-400/20 backdrop-blur-sm border border-blue-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-blue-100 font-semibold flex items-center gap-2">
              📊 <span>Current crowd level: {Math.random() > 0.5 ? 'Moderate' : 'High'}</span>
            </p>
          </div>
        </div>
      </div>
    )}

    {activeTab === 'ar' && (
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-white drop-shadow-lg">
          <Eye className="text-cyan-300" />
          Augmented Reality Experience
        </h3>
        
        <div className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-300/40 p-8 rounded-xl shadow-lg border-2 border-dashed border-cyan-300/50 mb-6">
          <div className="text-7xl mb-6">🔮</div>
          <p className="text-cyan-100 mb-4 text-2xl font-bold">Experience {monument.name} in AR</p>
          <p className="text-cyan-200 mb-8 text-lg">
            Get an immersive 360° view with historical overlays and interactive information points
          </p>
          
          <button 
            className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 backdrop-blur-sm hover:from-cyan-600/80 hover:to-blue-600/80 text-white px-10 py-4 rounded-xl font-bold text-xl transition-all shadow-2xl border border-cyan-300/40 transform hover:scale-105"
            onClick={() => alert('🚀 AR Experience Loading...\n\nFeatures:\n• 3D monument visualization\n• Historical timeline overlay\n• Interactive information points\n• Virtual guided tour\n• Audio narration in multiple languages\n• Virtual time travel through different eras\n\nPoint your camera at the monument to begin!')}
          >
            🎯 Launch AR Experience
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-400/20 backdrop-blur-sm border border-pink-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-pink-100 font-semibold flex items-center gap-2">
              📱 <span>Compatible with all smartphones</span>
            </p>
          </div>
          
          <div className="bg-green-400/20 backdrop-blur-sm border border-green-300/40 p-4 rounded-xl shadow-lg">
            <p className="text-green-100 font-semibold flex items-center gap-2">
              🎧 <span>Audio guide in 8 languages</span>
            </p>
          </div>
        </div>
      </div>
    )}
  </motion.div>
</div>

      </div>
    </div>
  );
}
