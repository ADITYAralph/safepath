export interface Monument {
  id: string
  name: string
  location: string
  state: string
  type: string
  builtIn: string
  builtBy: string
  doodle: string
  mainImage: string
  gallery: string[]
  description: string
  history: string
  significance: string
  architecture: string
  timings: {
    days: string
    hours: string
    entryFee: {
      indian: string
      foreign: string
    }
  }
  location_details: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
    nearestStation: string
    nearestAirport: string
    distanceFromCity: string
  }
  howToReach: {
    byAir: string
    byTrain: string
    byRoad: string
  }
  reviews: {
    rating: number
    totalReviews: number
    highlights: string[]
    recentReviews: {
      author: string
      rating: number
      text: string
      date: string
    }[]
  }
}

export const indianMonuments: Monument[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra",
    state: "Uttar Pradesh",
    type: "Tomb",
    builtIn: "1632-1653 AD",
    builtBy: "Emperor Shah Jahan",
    doodle: "🕌",
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/6/68/Taj_Mahal%2C_Agra%2C_India.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Taj_Mahal%2C_Agra%2C_India.jpg",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5"
    ],
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India.",
    history: "Built between 1632 and 1653 AD, the Taj Mahal was commissioned by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, who died in childbirth in 1631.",
    significance: "UNESCO World Heritage Site since 1983, considered one of the New Seven Wonders of the World.",
    architecture: "Indo-Islamic architectural style combining elements from Islamic, Persian, Ottoman Turkish, and Indian architectural styles.",
    timings: {
      days: "Saturday to Thursday",
      hours: "Sunrise to Sunset (Closed on Fridays)",
      entryFee: {
        indian: "₹50",
        foreign: "₹1,100"
      }
    },
    location_details: {
      address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
      coordinates: { lat: 27.1751, lng: 78.0421 },
      nearestStation: "Agra Cantt Railway Station (6 km)",
      nearestAirport: "Agra Airport (12 km)",
      distanceFromCity: "5 km from Agra city center"
    },
    howToReach: {
      byAir: "Fly to Agra Airport or Delhi (200 km), then taxi/bus to Agra",
      byTrain: "Take train to Agra Cantt or Agra Fort railway stations",
      byRoad: "Well connected by NH2 from Delhi (200 km), Mumbai (760 km)"
    },
    reviews: {
      rating: 4.6,
      totalReviews: 284567,
      highlights: ["Stunning architecture", "Must visit at sunrise", "Rich history", "Beautiful gardens"],
      recentReviews: [
        {
          author: "Priya Sharma",
          rating: 5,
          text: "Absolutely breathtaking! The marble work is incredible and the history is fascinating. Go early morning to avoid crowds.",
          date: "2 weeks ago"
        },
        {
          author: "Michael Johnson",
          rating: 5,
          text: "One of the most beautiful buildings I've ever seen. The love story behind it makes it even more special.",
          date: "1 month ago"
        },
        {
          author: "Rajesh Kumar",
          rating: 4,
          text: "Amazing monument but very crowded. The architecture is mind-blowing though.",
          date: "3 weeks ago"
        }
      ]
    }
  },
  {
    id: "red-fort",
    name: "Red Fort",
    location: "Delhi",
    state: "Delhi",
    type: "Fort",
    builtIn: "1638-1648 AD",
    builtBy: "Emperor Shah Jahan",
    doodle: "🏰",
    mainImage: "https://www.alightindia.com/cdn/uploads/postimages/ORIGINAL/Lal%20Qila%20%20Wendy--e3656d.jpg",
    gallery: [
      "https://www.alightindia.com/cdn/uploads/postimages/ORIGINAL/Lal%20Qila%20%20Wendy--e3656d.jpg",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5"
    ],
    description: "The Red Fort is a historic fortified palace of the Mughal emperors that served as the main residence of the Mughal emperors for nearly 200 years.",
    history: "Built by Emperor Shah Jahan when he decided to shift his capital from Agra to Delhi in 1638. It served as the main residence of the Mughal emperors until 1857.",
    significance: "UNESCO World Heritage Site, symbol of Indian independence - Prime Minister hoists the flag here on Independence Day.",
    architecture: "Mughal architecture with a blend of Persian, Timurid, and Indian architectural styles.",
    timings: {
      days: "Tuesday to Sunday",
      hours: "9:30 AM - 4:30 PM (Closed on Mondays)",
      entryFee: {
        indian: "₹35",
        foreign: "₹500"
      }
    },
    location_details: {
      address: "Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006",
      coordinates: { lat: 28.6562, lng: 77.2410 },
      nearestStation: "Chandni Chowk Metro Station (1 km)",
      nearestAirport: "Indira Gandhi International Airport (20 km)",
      distanceFromCity: "In the heart of Old Delhi"
    },
    howToReach: {
      byAir: "Fly to Delhi Airport, then metro/taxi to Red Fort",
      byTrain: "Take train to New Delhi Railway Station, then metro to Chandni Chowk",
      byRoad: "Well connected by roads from all major cities"
    },
    reviews: {
      rating: 4.3,
      totalReviews: 156789,
      highlights: ["Historical significance", "Beautiful gardens", "Light & sound show", "Mughal architecture"],
      recentReviews: [
        {
          author: "Amit Singh",
          rating: 4,
          text: "Great historical place. The museum inside is very informative. Best to visit in winter months.",
          date: "1 week ago"
        },
        {
          author: "Sarah Wilson",
          rating: 5,
          text: "The architecture is stunning! Don't miss the light and sound show in the evening.",
          date: "2 weeks ago"
        }
      ]
    }
  },
  {
    id: "gateway-of-india",
    name: "Gateway of India",
    location: "Mumbai",
    state: "Maharashtra",
    type: "Monument",
    builtIn: "1924 AD",
    builtBy: "British Government",
    doodle: "⛩️",
    mainImage: "https://pohcdn.com/sites/default/files/styles/paragraph__hero_banner__hb_image__1280bp/public/hero_banner/Gateway-to-India_0.jpg",
    gallery: [
      "https://pohcdn.com/sites/default/files/styles/paragraph__hero_banner__hb_image__1280bp/public/hero_banner/Gateway-to-India_0.jpg",
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875"
    ],
    description: "The Gateway of India is an arch-monument built in the early 20th century in Mumbai, in the Indian state of Maharashtra.",
    history: "Built to commemorate the visit of King-Emperor George V and Queen-Empress Mary to Bombay in 1911. Construction began in 1913 and was completed in 1924.",
    significance: "Symbol of Mumbai, major tourist attraction, and historically significant as the ceremonial entrance to British India.",
    architecture: "Indo-Saracenic architectural style with elements of Muslim and Hindu architecture.",
    timings: {
      days: "All days",
      hours: "24 hours (best visited during daytime)",
      entryFee: {
        indian: "Free",
        foreign: "Free"
      }
    },
    location_details: {
      address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
      coordinates: { lat: 18.9220, lng: 72.8347 },
      nearestStation: "Churchgate Railway Station (3 km)",
      nearestAirport: "Chhatrapati Shivaji International Airport (30 km)",
      distanceFromCity: "In South Mumbai"
    },
    howToReach: {
      byAir: "Fly to Mumbai Airport, then taxi to Gateway of India",
      byTrain: "Take train to CST or Churchgate, then taxi/bus",
      byRoad: "Well connected by roads, parking available nearby"
    },
    reviews: {
      rating: 4.2,
      totalReviews: 89234,
      highlights: ["Iconic Mumbai landmark", "Great for photos", "Arabian Sea views", "Street food nearby"],
      recentReviews: [
        {
          author: "Neha Patil",
          rating: 4,
          text: "Beautiful monument with great sea views. Perfect for evening stroll and photography.",
          date: "5 days ago"
        },
        {
          author: "David Brown",
          rating: 5,
          text: "Must visit when in Mumbai! The architecture is impressive and the atmosphere is lively.",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    location: "Jaipur",
    state: "Rajasthan",
    type: "Palace",
    builtIn: "1799 AD",
    builtBy: "Maharaja Sawai Pratap Singh",
    doodle: "🏰",
    mainImage: "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-1-attr-hero?qlt=82&ts=1742186379435",
    gallery: [
      "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-1-attr-hero?qlt=82&ts=1742186379435",
      "https://images.unsplash.com/photo-1599661046827-dacde6885413"
    ],
    description: "Hawa Mahal is a palace in Jaipur, India, built with red and pink sandstone. It is on the edge of the City Palace, Jaipur, and extends to the Zenana.",
    history: "Built in 1799 by Maharaja Sawai Pratap Singh, grandson of Maharaja Sawai Jai Singh, the founder of Jaipur. It was designed to allow the royal ladies to observe everyday life and festivals on the street below without being seen.",
    significance: "Symbol of Jaipur, architectural marvel with unique honeycomb design, UNESCO World Heritage Site as part of Jaipur City.",
    architecture: "Rajputana architecture with 953 small windows called jharokhas decorated with intricate latticework.",
    timings: {
      days: "All days",
      hours: "9:00 AM - 4:30 PM",
      entryFee: {
        indian: "₹50",
        foreign: "₹200"
      }
    },
    location_details: {
      address: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
      coordinates: { lat: 26.9239, lng: 75.8267 },
      nearestStation: "Jaipur Railway Station (5 km)",
      nearestAirport: "Jaipur International Airport (15 km)",
      distanceFromCity: "In the heart of Pink City"
    },
    howToReach: {
      byAir: "Fly to Jaipur Airport, then taxi/bus to Pink City",
      byTrain: "Take train to Jaipur Railway Station, then auto-rickshaw",
      byRoad: "Well connected by NH8 from Delhi (280 km)"
    },
    reviews: {
      rating: 4.4,
      totalReviews: 167432,
      highlights: ["Stunning pink facade", "Unique architecture", "Great photography spot", "Historical significance"],
      recentReviews: [
        {
          author: "Kavita Gupta",
          rating: 5,
          text: "The Pink Palace is absolutely stunning! The intricate windows and the pink color make it magical.",
          date: "4 days ago"
        },
        {
          author: "James Miller",
          rating: 4,
          text: "Beautiful architecture and great views from inside. Visit early morning for best photos.",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    location: "Mysore",
    state: "Karnataka",
    type: "Palace",
    builtIn: "1912 AD",
    builtBy: "Maharaja Krishnaraja Wadiyar IV",
    doodle: "🏛️",
    mainImage: "https://www.japjitravel.com/resizer/resizer.php?file=../jap/media/uploads/Mysore-Palace.jpg&width=750&height=375&action=resize&quality=100",
    gallery: [
      "https://www.japjitravel.com/resizer/resizer.php?file=../jap/media/uploads/Mysore-Palace.jpg&width=750&height=375&action=resize&quality=100",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
    ],
    description: "The Mysore Palace is a historical palace and a royal residence at Mysore in the Indian State of Karnataka.",
    history: "The current palace was constructed between 1897 and 1912, after the old palace was burnt down. It was built during the reign of the 24th Wodeyar King, Krishnaraja Wadiyar IV.",
    significance: "One of the most famous tourist attractions in India, visited by millions of tourists annually, official residence of the Wadiyar dynasty.",
    architecture: "Indo-Saracenic style architecture with domes, turrets, arches and colonnades.",
    timings: {
      days: "All days",
      hours: "10:00 AM - 5:30 PM",
      entryFee: {
        indian: "₹70",
        foreign: "₹200"
      }
    },
    location_details: {
      address: "Sayyaji Rao Rd, Agrahara, Chamrajpura, Mysuru, Karnataka 570001",
      coordinates: { lat: 12.3051, lng: 76.6551 },
      nearestStation: "Mysore Railway Station (2 km)",
      nearestAirport: "Mysore Airport (10 km)",
      distanceFromCity: "In Mysore city center"
    },
    howToReach: {
      byAir: "Fly to Bangalore (150 km), then bus/taxi to Mysore",
      byTrain: "Take train to Mysore Railway Station",
      byRoad: "Well connected by roads from Bangalore (150 km)"
    },
    reviews: {
      rating: 4.5,
      totalReviews: 198765,
      highlights: ["Magnificent architecture", "Evening illumination", "Rich history", "Well maintained"],
      recentReviews: [
        {
          author: "Suresh Naidu",
          rating: 5,
          text: "Absolutely magnificent! The evening light show is spectacular. A must-visit in Karnataka.",
          date: "3 days ago"
        },
        {
          author: "Lisa Anderson",
          rating: 5,
          text: "The palace is breathtaking with intricate details everywhere. The Durbar Hall is amazing!",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "golden-temple",
    name: "Golden Temple",
    location: "Amritsar",
    state: "Punjab",
    type: "Temple",
    builtIn: "1604 AD",
    builtBy: "Guru Arjan",
    doodle: "🛕",
    mainImage: "https://media.istockphoto.com/id/535570117/photo/golden-temple-in-amritsar-punjab-india.jpg?s=2048x2048&w=is&k=20&c=OM4d72Yq8eEGPWOFfeR8usPcGu7eOsn71i9H7pZtXoo=",
    gallery: [
      "https://media.istockphoto.com/id/535570117/photo/golden-temple-in-amritsar-punjab-india.jpg?s=2048x2048&w=is&k=20&c=OM4d72Yq8eEGPWOFfeR8usPcGu7eOsn71i9H7pZtXoo=",
      "https://images.unsplash.com/photo-1599661046827-dacde6885413"
    ],
    description: "The Golden Temple, also known as Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab, India.",
    history: "The temple was built in the 16th century by Guru Arjan, the fifth Sikh Guru. The upper floors of the temple are covered with gold, giving it its distinctive appearance.",
    significance: "Holiest shrine of Sikhism, symbol of human brotherhood and equality, visited by millions of pilgrims annually.",
    architecture: "Sikh architecture with Indo-Islamic influences, featuring a golden dome and beautiful marble work.",
    timings: {
      days: "All days",
      hours: "24 hours (Open all day)",
      entryFee: {
        indian: "Free",
        foreign: "Free"
      }
    },
    location_details: {
      address: "Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab 143006",
      coordinates: { lat: 31.6200, lng: 74.8765 },
      nearestStation: "Amritsar Railway Station (2 km)",
      nearestAirport: "Sri Guru Ram Dass Jee International Airport (11 km)",
      distanceFromCity: "In Amritsar city center"
    },
    howToReach: {
      byAir: "Fly to Amritsar Airport, then taxi/bus to Golden Temple",
      byTrain: "Take train to Amritsar Railway Station, then auto-rickshaw",
      byRoad: "Well connected by Grand Trunk Road from Delhi (450 km)"
    },
    reviews: {
      rating: 4.8,
      totalReviews: 298756,
      highlights: ["Spiritual experience", "Golden architecture", "Free community kitchen", "Peaceful atmosphere"],
      recentReviews: [
        {
          author: "Gurpreet Singh",
          rating: 5,
          text: "Most beautiful and peaceful place on earth. The golden reflection in water is mesmerizing. Waheguru!",
          date: "2 days ago"
        },
        {
          author: "Jennifer Clarke",
          rating: 5,
          text: "Absolutely stunning! The hospitality and free food for everyone is incredible. A must-visit place.",
          date: "5 days ago"
        }
      ]
    }
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    location: "Delhi",
    state: "Delhi",
    type: "Minaret",
    builtIn: "1199-1220 AD",
    builtBy: "Qutub-ud-din Aibak",
    doodle: "🗼",
    mainImage: "https://s7ap1.scene7.com/is/image/incredibleindia/qutab-minar-delhi-attr-hero?qlt=82&ts=1742169673469",
    gallery: [
      "https://s7ap1.scene7.com/is/image/incredibleindia/qutab-minar-delhi-attr-hero?qlt=82&ts=1742169673469",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5"
    ],
    description: "The Qutub Minar is a minaret and \"victory tower\" that forms part of the Qutub complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi.",
    history: "Construction was begun in 1199 by Qutub-ud-din Aibak and was carried on by his successor Iltutmish. The minar was completed by Firoz Shah Tughlaq.",
    significance: "UNESCO World Heritage Site, tallest brick minaret in the world, symbol of Muslim conquest of India.",
    architecture: "Indo-Islamic architecture, made of red sandstone and marble, with verses from the Quran inscribed on it.",
    timings: {
      days: "All days",
      hours: "Sunrise to Sunset",
      entryFee: {
        indian: "₹35",
        foreign: "₹550"
      }
    },
    location_details: {
      address: "Qutub Minar Road, Mehrauli, New Delhi, Delhi 110030",
      coordinates: { lat: 28.5245, lng: 77.1855 },
      nearestStation: "Qutub Minar Metro Station (1 km)",
      nearestAirport: "Indira Gandhi International Airport (15 km)",
      distanceFromCity: "15 km from central Delhi"
    },
    howToReach: {
      byAir: "Fly to Delhi Airport, then metro/taxi to Qutub Minar",
      byTrain: "Take train to New Delhi, then metro to Qutub Minar station",
      byRoad: "Well connected by roads from all parts of Delhi"
    },
    reviews: {
      rating: 4.3,
      totalReviews: 201456,
      highlights: ["Tallest brick minaret", "Historic significance", "Beautiful gardens", "Great architecture"],
      recentReviews: [
        {
          author: "Mohammed Ali",
          rating: 4,
          text: "Impressive height and beautiful Islamic architecture. The complex has many other interesting ruins too.",
          date: "5 days ago"
        },
        {
          author: "Emma Thompson",
          rating: 5,
          text: "Amazing piece of history! The intricate carvings and the height of the minaret is breathtaking.",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "charminar",
    name: "Charminar",
    location: "Hyderabad",
    state: "Telangana",
    type: "Monument",
    builtIn: "1591 AD",
    builtBy: "Sultan Muhammad Quli Qutb Shah",
    doodle: "🕌",
    mainImage: "https://media.hitex.co.in/posts/2022/charminar-the-arc-de-triomphe-of-the-east.jpg?1658579435",
    gallery: [
      "https://media.hitex.co.in/posts/2022/charminar-the-arc-de-triomphe-of-the-east.jpg?1658579435",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    ],
    description: "The Charminar is a monument and mosque located in Hyderabad, Telangana, India. The landmark has become known globally as a symbol of Hyderabad.",
    history: "Built in 1591 by Muhammad Quli Qutb Shah, the fifth ruler of the Qutb Shahi dynasty, to commemorate the founding of Hyderabad and the end of a deadly plague.",
    significance: "Symbol of Hyderabad, iconic monument representing the city's Islamic heritage and architectural grandeur.",
    architecture: "Indo-Islamic architecture with four grand arches facing the cardinal directions, topped with minarets.",
    timings: {
      days: "All days",
      hours: "9:00 AM - 5:30 PM",
      entryFee: {
        indian: "₹25",
        foreign: "₹300"
      }
    },
    location_details: {
      address: "Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002",
      coordinates: { lat: 17.3616, lng: 78.4747 },
      nearestStation: "Hyderabad Deccan Railway Station (3 km)",
      nearestAirport: "Rajiv Gandhi International Airport (22 km)",
      distanceFromCity: "In the heart of Old City"
    },
    howToReach: {
      byAir: "Fly to Hyderabad Airport, then taxi/bus to Charminar",
      byTrain: "Take train to Hyderabad station, then auto/bus to Charminar",
      byRoad: "Well connected by roads from all major cities"
    },
    reviews: {
      rating: 4.1,
      totalReviews: 178342,
      highlights: ["Historic significance", "Bustling bazaar", "Night illumination", "Traditional food nearby"],
      recentReviews: [
        {
          author: "Fatima Sheikh",
          rating: 4,
          text: "Beautiful historic monument in the heart of Hyderabad. The surrounding bazaar is great for shopping.",
          date: "1 week ago"
        },
        {
          author: "John Watson",
          rating: 4,
          text: "Iconic symbol of Hyderabad! The architecture is impressive and the area is full of life.",
          date: "2 weeks ago"
        }
      ]
    }
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Temple",
    location: "Madurai",
    state: "Tamil Nadu",
    type: "Temple",
    builtIn: "1623-1655 AD",
    builtBy: "Tirumalai Naycker",
    doodle: "🛕",
    mainImage: "https://admin.southindiatoursandtravels.com/pages/gallery/24742.jpg",
    gallery: [
      "https://admin.southindiatoursandtravels.com/pages/gallery/24742.jpg",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
    ],
    description: "Arulmigu Meenakshi Sundareswarar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu.",
    history: "The temple has a rich history dating back to the 6th century CE. The current structure was built between 1623 and 1655 CE by Tirumalai Naycker.",
    significance: "One of the most important temples in Tamil Nadu, candidate for UNESCO World Heritage Site, major pilgrimage destination.",
    architecture: "Dravidian architecture with 14 colorful gopurams (gateway towers), ranging from 45-50m in height, covered in thousands of sculptures.",
    timings: {
      days: "All days",
      hours: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
      entryFee: {
        indian: "Free",
        foreign: "₹50"
      }
    },
    location_details: {
      address: "Madurai Main, Madurai, Tamil Nadu 625001",
      coordinates: { lat: 9.9195, lng: 78.1193 },
      nearestStation: "Madurai Junction Railway Station (2 km)",
      nearestAirport: "Madurai Airport (12 km)",
      distanceFromCity: "In Madurai city center"
    },
    howToReach: {
      byAir: "Fly to Madurai Airport, then taxi/bus to temple",
      byTrain: "Take train to Madurai Junction, then auto-rickshaw",
      byRoad: "Well connected by roads from Chennai (460 km), Bangalore (460 km)"
    },
    reviews: {
      rating: 4.7,
      totalReviews: 234567,
      highlights: ["Stunning gopurams", "Rich Hindu heritage", "Architectural marvel", "Spiritual experience"],
      recentReviews: [
        {
          author: "Lakshmi Iyer",
          rating: 5,
          text: "Divine experience! The colorful towers are breathtaking and the temple atmosphere is so peaceful.",
          date: "3 days ago"
        },
        {
          author: "Mark Davis",
          rating: 5,
          text: "Incredible architecture! The intricate sculptures and colors are amazing. A must-visit temple.",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "victoria-memorial",
    name: "Victoria Memorial",
    location: "Kolkata",
    state: "West Bengal",
    type: "Memorial",
    builtIn: "1921 AD",
    builtBy: "Lord Curzon",
    doodle: "🏛️",
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/500px-Victoria_Memorial_situated_in_Kolkata.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/500px-Victoria_Memorial_situated_in_Kolkata.jpg",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    ],
    description: "The Victoria Memorial is a large marble building in Central Kolkata, which was built between 1906 and 1921.",
    history: "Built in memory of Queen Victoria by Lord Curzon, Viceroy of India. It was conceived after Queen Victoria's death in 1901 and construction began in 1906.",
    significance: "National Museum under the Ministry of Culture, Government of India, symbol of British colonial architecture in India.",
    architecture: "Indo-Saracenic Revival architecture combining British and Mughal elements with Venetian, Egyptian, Deccani and Islamic architectural influences.",
    timings: {
      days: "Tuesday to Sunday",
      hours: "10:00 AM - 6:00 PM (Closed on Mondays)",
      entryFee: {
        indian: "₹30",
        foreign: "₹500"
      }
    },
    location_details: {
      address: "1, Queens Way, Maidan, Kolkata, West Bengal 700071",
      coordinates: { lat: 22.5448, lng: 88.3426 },
      nearestStation: "Park Street Metro Station (2 km)",
      nearestAirport: "Netaji Subhash Chandra Bose International Airport (17 km)",
      distanceFromCity: "In central Kolkata"
    },
    howToReach: {
      byAir: "Fly to Kolkata Airport, then taxi/metro to Victoria Memorial",
      byTrain: "Take train to Howrah/Sealdah stations, then metro/taxi",
      byRoad: "Well connected by roads, located on the Maidan"
    },
    reviews: {
      rating: 4.4,
      totalReviews: 145233,
      highlights: ["Beautiful white marble", "Rich museum collection", "Peaceful gardens", "Colonial architecture"],
      recentReviews: [
        {
          author: "Ananya Das",
          rating: 4,
          text: "Beautiful monument with interesting museum inside. The gardens are perfect for evening walks.",
          date: "6 days ago"
        },
        {
          author: "Robert Taylor",
          rating: 5,
          text: "Impressive colonial architecture! The museum has great artifacts from British era.",
          date: "2 weeks ago"
        }
      ]
    }
  },
  {
    id: "lotus-temple",
    name: "Lotus Temple",
    location: "Delhi",
    state: "Delhi",
    type: "Temple",
    builtIn: "1986 AD",
    builtBy: "Baháʼí Community",
    doodle: "🪷",
    mainImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    ],
    description: "The Lotus Temple is a Baháʼí House of Worship in Delhi, India. It is notable for its flowerlike shape.",
    history: "Completed in 1986, designed by Iranian architect Fariborz Sahba. It serves as the Mother Temple of the Indian subcontinent.",
    significance: "Architectural marvel, symbol of unity, welcomes people of all religions for meditation and prayer.",
    architecture: "Modern architecture inspired by lotus flower, made of white marble with 27 free-standing marble-clad petals.",
    timings: {
      days: "Tuesday to Sunday",
      hours: "9:00 AM - 7:00 PM (Closed on Mondays)",
      entryFee: {
        indian: "Free",
        foreign: "Free"
      }
    },
    location_details: {
      address: "Lotus Temple Rd, Bahapur, Shambhu Dayal Bagh, Kalkaji, New Delhi, Delhi 110019",
      coordinates: { lat: 28.5535, lng: 77.2588 },
      nearestStation: "Kalkaji Mandir Metro Station (2 km)",
      nearestAirport: "Indira Gandhi International Airport (18 km)",
      distanceFromCity: "18 km from central Delhi"
    },
    howToReach: {
      byAir: "Fly to Delhi Airport, then metro/taxi to Lotus Temple",
      byTrain: "Take train to New Delhi, then metro to Kalkaji Mandir",
      byRoad: "Well connected by roads from all parts of Delhi"
    },
    reviews: {
      rating: 4.5,
      totalReviews: 145678,
      highlights: ["Unique architecture", "Peaceful atmosphere", "Beautiful gardens", "Free entry"],
      recentReviews: [
        {
          author: "Sanjay Kumar",
          rating: 5,
          text: "Incredibly peaceful place! The lotus-shaped architecture is breathtaking and the gardens are beautiful.",
          date: "3 days ago"
        },
        {
          author: "Emily Roberts",
          rating: 5,
          text: "Must visit in Delhi! The design is unique and the atmosphere is so serene. Great for meditation.",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "india-gate",
    name: "India Gate",
    location: "Delhi",
    state: "Delhi",
    type: "War Memorial",
    builtIn: "1931 AD",
    builtBy: "British Government",
    doodle: "🏛️",
    mainImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523"
    ],
    description: "India Gate is a war memorial located astride the Rajpath, on the eastern edge of the ceremonial area of New Delhi.",
    history: "Built in 1931 to honor the 70,000 Indian soldiers who died serving the British Army during World War I and the Third Anglo-Afghan War.",
    significance: "National war memorial, symbol of sacrifice, Republic Day parade venue, iconic Delhi landmark.",
    architecture: "Triumphal arch design similar to Arc de Triomphe, made of red sandstone and granite.",
    timings: {
      days: "All days",
      hours: "24 hours (best visited evening/night)",
      entryFee: {
        indian: "Free",
        foreign: "Free"
      }
    },
    location_details: {
      address: "Rajpath, India Gate, New Delhi, Delhi 110001",
      coordinates: { lat: 28.6129, lng: 77.2295 },
      nearestStation: "Central Secretariat Metro Station (2 km)",
      nearestAirport: "Indira Gandhi International Airport (16 km)",
      distanceFromCity: "In central Delhi"
    },
    howToReach: {
      byAir: "Fly to Delhi Airport, then metro/taxi to India Gate",
      byTrain: "Take train to New Delhi, then metro to Central Secretariat",
      byRoad: "Located on Rajpath, well connected by roads"
    },
    reviews: {
      rating: 4.3,
      totalReviews: 234567,
      highlights: ["National symbol", "Evening illumination", "Great for picnics", "Historical significance"],
      recentReviews: [
        {
          author: "Rahul Singh",
          rating: 4,
          text: "Iconic Delhi landmark! Beautiful at night with illumination. Great place for evening walks.",
          date: "2 days ago"
        },
        {
          author: "Michelle Davis",
          rating: 4,
          text: "Impressive war memorial. The surrounding lawns are perfect for picnics. Very patriotic feeling.",
          date: "5 days ago"
        }
      ]
    }
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    location: "Jaipur",
    state: "Rajasthan",
    type: "Fort",
    builtIn: "1592 AD",
    builtBy: "Raja Man Singh I",
    doodle: "🏰",
    mainImage: "https://images.unsplash.com/photo-1599661046827-dacde6885413?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046827-dacde6885413",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
    ],
    description: "Amber Fort is a fort located in Amer, Rajasthan, India. It is the main tourist attraction in Jaipur.",
    history: "Built by Raja Man Singh I in 1592 and was later expanded by successive rulers. It served as the main residence of the Rajput Maharajas and their families.",
    significance: "UNESCO World Heritage Site as part of Hill Forts of Rajasthan, masterpiece of Rajput architecture.",
    architecture: "Rajput architecture blending Hindu and Mughal elements, built with red sandstone and marble.",
    timings: {
      days: "All days",
      hours: "8:00 AM - 6:00 PM",
      entryFee: {
        indian: "₹100",
        foreign: "₹550"
      }
    },
    location_details: {
      address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001",
      coordinates: { lat: 26.9855, lng: 75.8513 },
      nearestStation: "Jaipur Railway Station (11 km)",
      nearestAirport: "Jaipur International Airport (22 km)",
      distanceFromCity: "11 km from Jaipur city"
    },
    howToReach: {
      byAir: "Fly to Jaipur Airport, then taxi to Amber Fort",
      byTrain: "Take train to Jaipur, then taxi/bus to Amber",
      byRoad: "Drive from Jaipur city center (11 km)"
    },
    reviews: {
      rating: 4.5,
      totalReviews: 187654,
      highlights: ["Majestic architecture", "Elephant rides", "Mirror Palace", "Stunning views"],
      recentReviews: [
        {
          author: "Ritu Agarwal",
          rating: 5,
          text: "Absolutely magnificent! The Sheesh Mahal (Mirror Palace) is breathtaking. The elephant ride up is fun!",
          date: "4 days ago"
        },
        {
          author: "Tom Wilson",
          rating: 4,
          text: "Impressive fort with amazing views of the city. The architecture and details are incredible.",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    location: "Konark",
    state: "Odisha",
    type: "Temple",
    builtIn: "1250 AD",
    builtBy: "King Narasimhadeva I",
    doodle: "🛕",
    mainImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    ],
    description: "The Konark Sun Temple is a 13th-century CE Hindu Sun temple at Konark about 35 kilometres northeast of Puri.",
    history: "Built circa 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty. Designed as a gigantic chariot of Surya, the sun god.",
    significance: "UNESCO World Heritage Site, architectural marvel of ancient India, symbol on Indian currency, one of the Seven Wonders of India.",
    architecture: "Kalinga architecture designed as a colossal chariot with elaborately carved stone wheels, pillars, and walls.",
    timings: {
      days: "All days",
      hours: "Sunrise to Sunset",
      entryFee: {
        indian: "₹40",
        foreign: "₹600"
      }
    },
    location_details: {
      address: "Konark, Odisha 752111",
      coordinates: { lat: 19.8876, lng: 86.0947 },
      nearestStation: "Puri Railway Station (35 km)",
      nearestAirport: "Biju Patnaik International Airport, Bhubaneswar (65 km)",
      distanceFromCity: "35 km from Puri"
    },
    howToReach: {
      byAir: "Fly to Bhubaneswar Airport, then taxi/bus to Konark",
      byTrain: "Take train to Puri, then bus/taxi to Konark",
      byRoad: "Drive from Bhubaneswar (65 km) or Puri (35 km)"
    },
    reviews: {
      rating: 4.4,
      totalReviews: 76543,
      highlights: ["Architectural marvel", "Stone chariot design", "Intricate carvings", "Historical significance"],
      recentReviews: [
        {
          author: "Ravi Mohan",
          rating: 5,
          text: "Incredible stone carving! The chariot wheels are so detailed, they look like they could move.",
          date: "6 days ago"
        },
        {
          author: "Anna Johnson",
          rating: 4,
          text: "Amazing ancient temple! The architecture is mind-blowing and the history is fascinating.",
          date: "2 weeks ago"
        }
      ]
    }
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    location: "Aurangabad",
    state: "Maharashtra",
    type: "Caves",
    builtIn: "2nd century BC - 6th century AD",
    builtBy: "Buddhist Monks",
    doodle: "⛰️",
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
    ],
    description: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments which date from the 2nd century BC to about 480 AD.",
    history: "Built in two phases - the earlier group dating from the 2nd-1st centuries BC, and the later group from the 5th century AD.",
    significance: "UNESCO World Heritage Site, masterpieces of Buddhist religious art, finest examples of ancient Indian art and sculpture.",
    architecture: "Buddhist rock-cut architecture with chaityas (prayer halls) and viharas (monasteries), famous for ancient paintings and sculptures.",
    timings: {
      days: "Tuesday to Sunday",
      hours: "9:00 AM - 5:00 PM (Closed on Mondays)",
      entryFee: {
        indian: "₹40",
        foreign: "₹600"
      }
    },
    location_details: {
      address: "Ajanta, Maharashtra 431117",
      coordinates: { lat: 20.5519, lng: 75.7033 },
      nearestStation: "Jalgaon Railway Station (58 km)",
      nearestAirport: "Aurangabad Airport (99 km)",
      distanceFromCity: "99 km from Aurangabad"
    },
    howToReach: {
      byAir: "Fly to Aurangabad Airport, then bus/taxi to Ajanta Caves",
      byTrain: "Take train to Jalgaon, then bus/taxi to caves",
      byRoad: "Drive from Aurangabad (99 km) or Mumbai (350 km)"
    },
    reviews: {
      rating: 4.5,
      totalReviews: 87654,
      highlights: ["Ancient Buddhist art", "Rock-cut architecture", "Historical significance", "UNESCO World Heritage"],
      recentReviews: [
        {
          author: "Dr. Ramesh Patel",
          rating: 5,
          text: "Incredible ancient art! The paintings and sculptures are 1500+ years old but still so vivid and beautiful.",
          date: "1 week ago"
        },
        {
          author: "Maria Rodriguez",
          rating: 4,
          text: "Amazing historical site. The Buddhist art and architecture is mind-blowing. Worth the long journey.",
          date: "2 weeks ago"
        }
      ]
    }
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    location: "Aurangabad",
    state: "Maharashtra",
    type: "Caves",
    builtIn: "600-1000 AD",
    builtBy: "Hindu, Buddhist, and Jain Monks",
    doodle: "⛰️",
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
    ],
    description: "The Ellora Caves are a collection of 34 rock-cut temples and monasteries representing Hindu, Buddhist, and Jain faiths.",
    history: "Built between 600-1000 AD by various religious communities. The caves demonstrate the religious harmony that existed in ancient India.",
    significance: "UNESCO World Heritage Site, unique example of religious tolerance, masterpiece of Indian rock-cut architecture.",
    architecture: "Mix of Hindu, Buddhist, and Jain architecture. Cave 16 (Kailasa temple) is the largest single monolithic rock excavation in the world.",
    timings: {
      days: "Wednesday to Monday",
      hours: "6:00 AM - 6:00 PM (Closed on Tuesdays)",
      entryFee: {
        indian: "₹40",
        foreign: "₹600"
      }
    },
    location_details: {
      address: "Ellora, Maharashtra 431102",
      coordinates: { lat: 20.0263, lng: 75.1801 },
      nearestStation: "Aurangabad Railway Station (30 km)",
      nearestAirport: "Aurangabad Airport (30 km)",
      distanceFromCity: "30 km from Aurangabad"
    },
    howToReach: {
      byAir: "Fly to Aurangabad Airport, then taxi/bus to Ellora",
      byTrain: "Take train to Aurangabad, then bus/taxi to caves",
      byRoad: "Drive from Mumbai (350 km) or Pune (300 km)"
    },
    reviews: {
      rating: 4.6,
      totalReviews: 94532,
      highlights: ["Religious diversity", "Kailasa temple", "Ancient architecture", "UNESCO World Heritage"],
      recentReviews: [
        {
          author: "Vikash Sharma",
          rating: 5,
          text: "The Kailasa temple is unbelievable! How did ancient people carve such massive structures from solid rock?",
          date: "4 days ago"
        },
        {
          author: "Sophie Chen",
          rating: 5,
          text: "Amazing representation of religious harmony. Hindu, Buddhist, and Jain caves side by side!",
          date: "1 week ago"
        }
      ]
    }
  },
  {
    id: "khajuraho-temples",
    name: "Khajuraho Temples",
    location: "Khajuraho",
    state: "Madhya Pradesh",
    type: "Temple Complex",
    builtIn: "950-1050 AD",
    builtBy: "Chandela Dynasty",
    doodle: "🛕",
    mainImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    ],
    description: "The Khajuraho Group of Monuments is a group of Hindu and Jain temples in Chhatarpur district, Madhya Pradesh, India.",
    history: "Built between 950-1050 AD by the Chandela dynasty. Originally there were 85 temples, of which only about 25 survive today.",
    significance: "UNESCO World Heritage Site, famous for nagara-style architectural symbolism and erotic sculptures.",
    architecture: "Nagara style Hindu temple architecture with intricate sculptures depicting various aspects of life including erotic art.",
    timings: {
      days: "All days",
      hours: "Sunrise to Sunset",
      entryFee: {
        indian: "₹40",
        foreign: "₹600"
      }
    },
    location_details: {
      address: "Khajuraho, Madhya Pradesh 471606",
      coordinates: { lat: 24.8318, lng: 79.9199 },
      nearestStation: "Khajuraho Railway Station (5 km)",
      nearestAirport: "Khajuraho Airport (3 km)",
      distanceFromCity: "In Khajuraho town"
    },
    howToReach: {
      byAir: "Direct flights available to Khajuraho Airport from major cities",
      byTrain: "Take train to Khajuraho Railway Station",
      byRoad: "Drive from Bhopal (380 km) or Delhi (620 km)"
    },
    reviews: {
      rating: 4.3,
      totalReviews: 65432,
      highlights: ["Intricate sculptures", "UNESCO World Heritage", "Ancient art", "Architectural beauty"],
      recentReviews: [
        {
          author: "Deepak Agarwal",
          rating: 4,
          text: "Amazing stone work! The sculptures are incredibly detailed and tell stories of ancient life.",
          date: "1 week ago"
        },
        {
          author: "Catherine Moore",
          rating: 5,
          text: "Unique temples with extraordinary art. The craftsmanship is unbelievable for 1000-year-old structures.",
          date: "2 weeks ago"
        }
      ]
    }
  }
]
