// ALL INDIA MONUMENT COVERAGE - SafePath Zone Service
// File: src/services/AllIndiaZoneService.js

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  onSnapshot,
  GeoPoint,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export class AllIndiaZoneService {
  constructor() {
    this.zonesCollection = 'safety_zones';
    this.incidentsCollection = 'zone_incidents';
    this.analyticsCollection = 'zone_analytics';

    // All India monument cities coverage
    this.cities = [
      'Delhi', 'Agra', 'Jaipur', 'Mumbai', 'Pune', 'Aurangabad',
      'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Mysore',
      'Kochi', 'Thiruvananthapuram', 'Madurai', 'Thanjavur',
      'Bhubaneswar', 'Konark', 'Puri', 'Guwahati', 'Shillong',
      'Gangtok', 'Darjeeling', 'Patna', 'Varanasi', 'Lucknow',
      'Khajuraho', 'Bhopal', 'Indore', 'Ujjain', 'Gwalior',
      'Jodhpur', 'Udaipur', 'Pushkar', 'Mount Abu', 'Bikaner',
      'Jaisalmer', 'Ajmer', 'Chittorgarh', 'Amritsar', 'Chandigarh',
      'Shimla', 'Manali', 'Dharamshala', 'Haridwar', 'Rishikesh',
      'Dehradun', 'Nainital', 'Jammu', 'Srinagar', 'Leh',
      'Ahmedabad', 'Vadodara', 'Rajkot', 'Dwarka', 'Somnath',
      'Rann of Kutch', 'Goa', 'Hampi', 'Badami', 'Bijapur'
    ];
  }

  // Get all active zones for a city
  async getZonesByCity(city = 'Delhi') {
    try {
      const q = query(
        collection(db, this.zonesCollection),
        where('city', '==', city),
        where('isActive', '==', true),
        orderBy('updatedAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const zones = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lat: doc.data().location?.latitude,
        lng: doc.data().location?.longitude,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));

      console.log(`📍 Loaded ${zones.length} zones from Firebase for ${city}`);
      return zones;
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }

  // Get all cities with zones
  async getAvailableCities() {
    try {
      const q = query(
        collection(db, this.zonesCollection),
        where('isActive', '==', true)
      );

      const snapshot = await getDocs(q);
      const cities = [...new Set(snapshot.docs.map(doc => doc.data().city))].sort();
      return cities.length > 0 ? cities : this.cities.slice(0, 10); // Return first 10 as fallback
    } catch (error) {
      console.error('Error fetching cities:', error);
      return this.cities.slice(0, 10);
    }
  }

  // Get zones by state
  async getZonesByState(state) {
    try {
      const q = query(
        collection(db, this.zonesCollection),
        where('state', '==', state),
        where('isActive', '==', true),
        orderBy('updatedAt', 'desc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lat: doc.data().location?.latitude,
        lng: doc.data().location?.longitude
      }));
    } catch (error) {
      console.error('Error fetching zones by state:', error);
      throw error;
    }
  }

  // Add zone
  async addZone(zoneData) {
    try {
      const zone = {
        name: zoneData.name,
        type: zoneData.type,
        location: new GeoPoint(zoneData.lat, zoneData.lng),
        radius: zoneData.radius || 500,
        city: zoneData.city,
        state: zoneData.state,
        region: zoneData.region || this.getRegion(zoneData.state),
        country: 'India',
        description: zoneData.description || '',
        riskLevel: zoneData.riskLevel || 1,
        emergencyContacts: zoneData.emergencyContacts || ['100', '1090'],
        amenities: zoneData.amenities || [],
        metadata: {
          touristCount: zoneData.touristCount || 0,
          crimeRate: zoneData.crimeRate || 'low',
          monumentType: zoneData.monumentType || 'historic',
          era: zoneData.era || 'ancient',
          ...zoneData.metadata
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        createdBy: zoneData.createdBy || 'system'
      };

      const docRef = await addDoc(collection(db, this.zonesCollection), zone);
      console.log(`✅ Zone added: ${zone.name} in ${zone.city}`);
      return docRef.id;
    } catch (error) {
      console.error('Error adding zone:', error);
      throw error;
    }
  }

  // Get region based on state
  getRegion(state) {
    const regionMap = {
      'Delhi': 'North India',
      'Uttar Pradesh': 'North India',
      'Rajasthan': 'North India',
      'Punjab': 'North India',
      'Haryana': 'North India',
      'Himachal Pradesh': 'North India',
      'Uttarakhand': 'North India',
      'Jammu and Kashmir': 'North India',
      'Maharashtra': 'West India',
      'Gujarat': 'West India',
      'Goa': 'West India',
      'Madhya Pradesh': 'Central India',
      'Chhattisgarh': 'Central India',
      'Karnataka': 'South India',
      'Tamil Nadu': 'South India',
      'Kerala': 'South India',
      'Andhra Pradesh': 'South India',
      'Telangana': 'South India',
      'West Bengal': 'East India',
      'Odisha': 'East India',
      'Bihar': 'East India',
      'Jharkhand': 'East India',
      'Assam': 'Northeast India',
      'Meghalaya': 'Northeast India',
      'Sikkim': 'Northeast India'
    };

    return regionMap[state] || 'India';
  }

  // Seed all India monument zones
  async seedAllIndiaMonumentZones() {
    try {
      console.log('🌱 Seeding All India Monument Zones...');

      let totalCount = 0;

      // North India
      totalCount += await this.seedNorthIndiaZones();

      // West India  
      totalCount += await this.seedWestIndiaZones();

      // South India
      totalCount += await this.seedSouthIndiaZones();

      // East India
      totalCount += await this.seedEastIndiaZones();

      // Northeast India
      totalCount += await this.seedNortheastIndiaZones();

      // Central India
      totalCount += await this.seedCentralIndiaZones();

      console.log(`🎉 All India Coverage: ${totalCount} monument zones seeded!`);
      return totalCount;
    } catch (error) {
      console.error('Error seeding All India zones:', error);
      throw error;
    }
  }

  // North India Zones (Delhi, UP, Rajasthan, Punjab, etc.)
  async seedNorthIndiaZones() {
    const northZones = [
      // DELHI
      {
        name: "Red Fort Complex",
        type: "safe", lat: 28.6562, lng: 77.2410, radius: 600,
        city: "Delhi", state: "Delhi",
        description: "UNESCO World Heritage Mughal fort complex with high security",
        riskLevel: 1, monumentType: "fortress", era: "mughal",
        emergencyContacts: ["100", "1090", "011-23277705"],
        amenities: ["police_station", "hospital", "tourist_info", "parking"]
      },
      {
        name: "India Gate Memorial",
        type: "safe", lat: 28.6129, lng: 77.2295, radius: 700,
        city: "Delhi", state: "Delhi",
        description: "National war memorial with 24/7 security and regular patrols",
        riskLevel: 1, monumentType: "memorial", era: "british",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Qutub Minar Complex",
        type: "safe", lat: 28.5244, lng: 77.1855, radius: 500,
        city: "Delhi", state: "Delhi",
        description: "UNESCO World Heritage medieval Islamic monument",
        riskLevel: 1, monumentType: "tower", era: "medieval",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Lotus Temple",
        type: "safe", lat: 28.5535, lng: 77.2588, radius: 400,
        city: "Delhi", state: "Delhi",
        description: "Modern Bahai temple with excellent security",
        riskLevel: 1, monumentType: "temple", era: "modern",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Akshardham Temple",
        type: "safe", lat: 28.6127, lng: 77.2773, radius: 800,
        city: "Delhi", state: "Delhi",
        description: "Modern Hindu temple complex with world-class security",
        riskLevel: 1, monumentType: "temple", era: "modern",
        emergencyContacts: ["100", "1090"]
      },

      // AGRA
      {
        name: "Taj Mahal Complex",
        type: "safe", lat: 27.1751, lng: 78.0421, radius: 800,
        city: "Agra", state: "Uttar Pradesh",
        description: "UNESCO World Heritage ivory-white marble mausoleum",
        riskLevel: 1, monumentType: "mausoleum", era: "mughal",
        emergencyContacts: ["100", "1090", "0562-2226431"],
        metadata: { touristCount: 8000, worldHeritage: true }
      },
      {
        name: "Agra Fort",
        type: "safe", lat: 27.1795, lng: 78.0211, radius: 600,
        city: "Agra", state: "Uttar Pradesh",
        description: "UNESCO World Heritage Mughal fortress palace",
        riskLevel: 1, monumentType: "fortress", era: "mughal",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Fatehpur Sikri",
        type: "safe", lat: 27.0945, lng: 77.6613, radius: 1000,
        city: "Agra", state: "Uttar Pradesh",
        description: "UNESCO World Heritage abandoned Mughal city",
        riskLevel: 1, monumentType: "city", era: "mughal",
        emergencyContacts: ["100", "1090"]
      },

      // JAIPUR (Pink City)
      {
        name: "Hawa Mahal",
        type: "safe", lat: 26.9239, lng: 75.8267, radius: 300,
        city: "Jaipur", state: "Rajasthan",
        description: "Iconic pink sandstone palace with intricate windows",
        riskLevel: 1, monumentType: "palace", era: "rajput",
        emergencyContacts: ["100", "1090", "0141-2610494"]
      },
      {
        name: "City Palace Jaipur",
        type: "safe", lat: 26.9255, lng: 75.8235, radius: 500,
        city: "Jaipur", state: "Rajasthan", 
        description: "Royal palace complex with museums and courtyards",
        riskLevel: 1, monumentType: "palace", era: "rajput",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Amber Fort",
        type: "safe", lat: 26.9855, lng: 75.8513, radius: 700,
        city: "Jaipur", state: "Rajasthan",
        description: "Hilltop fort palace with elephant rides and mirror work",
        riskLevel: 1, monumentType: "fortress", era: "rajput",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Jantar Mantar Jaipur",
        type: "safe", lat: 26.9247, lng: 75.8249, radius: 300,
        city: "Jaipur", state: "Rajasthan",
        description: "UNESCO World Heritage astronomical observatory",
        riskLevel: 1, monumentType: "observatory", era: "rajput",
        emergencyContacts: ["100", "1090"]
      },

      // JODHPUR
      {
        name: "Mehrangarh Fort",
        type: "safe", lat: 26.2970, lng: 73.0167, radius: 800,
        city: "Jodhpur", state: "Rajasthan",
        description: "Massive hilltop fortress overlooking the Blue City",
        riskLevel: 1, monumentType: "fortress", era: "rajput",
        emergencyContacts: ["100", "1090", "0291-2548790"]
      },
      {
        name: "Umaid Bhawan Palace",
        type: "safe", lat: 26.2790, lng: 73.0371, radius: 600,
        city: "Jodhpur", state: "Rajasthan",
        description: "Art Deco palace, now luxury hotel and museum",
        riskLevel: 1, monumentType: "palace", era: "modern",
        emergencyContacts: ["100", "1090"]
      },

      // UDAIPUR (City of Lakes)
      {
        name: "City Palace Udaipur",
        type: "safe", lat: 24.5760, lng: 73.6832, radius: 500,
        city: "Udaipur", state: "Rajasthan",
        description: "Lakeside palace complex with stunning architecture",
        riskLevel: 1, monumentType: "palace", era: "rajput",
        emergencyContacts: ["100", "1090", "0294-2419021"]
      },
      {
        name: "Lake Pichola",
        type: "safe", lat: 24.5760, lng: 73.6756, radius: 1000,
        city: "Udaipur", state: "Rajasthan",
        description: "Scenic lake with island palaces and boat rides",
        riskLevel: 1, monumentType: "lake", era: "natural",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Jag Mandir Palace",
        type: "safe", lat: 24.5700, lng: 73.6700, radius: 400,
        city: "Udaipur", state: "Rajasthan",
        description: "Island palace on Lake Pichola",
        riskLevel: 1, monumentType: "palace", era: "rajput",
        emergencyContacts: ["100", "1090"]
      },

      // JAISALMER (Golden City)
      {
        name: "Jaisalmer Fort",
        type: "safe", lat: 26.9157, lng: 70.9083, radius: 600,
        city: "Jaisalmer", state: "Rajasthan",
        description: "Living fort with shops, hotels, and ancient havelis",
        riskLevel: 2, monumentType: "fortress", era: "rajput",
        emergencyContacts: ["100", "1090", "02992-252406"]
      },
      {
        name: "Patwon Ki Haveli",
        type: "safe", lat: 26.9146, lng: 70.9065, radius: 200,
        city: "Jaisalmer", state: "Rajasthan",
        description: "Ornate merchant mansion with intricate carvings",
        riskLevel: 1, monumentType: "haveli", era: "rajput",
        emergencyContacts: ["100", "1090"]
      },

      // AMRITSAR
      {
        name: "Golden Temple Complex",
        type: "safe", lat: 31.6200, lng: 74.8765, radius: 500,
        city: "Amritsar", state: "Punjab",
        description: "Holiest Sikh temple with golden dome and sacred pool",
        riskLevel: 1, monumentType: "temple", era: "sikh",
        emergencyContacts: ["100", "1090", "0183-2553954"],
        amenities: ["free_food", "accommodation", "medical"]
      },
      {
        name: "Jallianwala Bagh",
        type: "safe", lat: 31.6205, lng: 74.8792, radius: 300,
        city: "Amritsar", state: "Punjab",
        description: "Memorial garden commemorating 1919 massacre",
        riskLevel: 1, monumentType: "memorial", era: "british",
        emergencyContacts: ["100", "1090"]
      },

      // VARANASI
      {
        name: "Kashi Vishwanath Temple",
        type: "caution", lat: 25.3109, lng: 83.0107, radius: 400,
        city: "Varanasi", state: "Uttar Pradesh",
        description: "Sacred Hindu temple - crowded, watch belongings",
        riskLevel: 3, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "0542-2506062"]
      },
      {
        name: "Dashashwamedh Ghat",
        type: "caution", lat: 25.3080, lng: 83.0104, radius: 500,
        city: "Varanasi", state: "Uttar Pradesh",
        description: "Main ghat with evening aarti - very crowded",
        riskLevel: 3, monumentType: "ghat", era: "ancient",
        emergencyContacts: ["100", "1090"]
      },

      // KHAJURAHO
      {
        name: "Khajuraho Temples",
        type: "safe", lat: 24.8318, lng: 79.9199, radius: 800,
        city: "Khajuraho", state: "Madhya Pradesh",
        description: "UNESCO World Heritage medieval Hindu temples",
        riskLevel: 1, monumentType: "temple", era: "medieval",
        emergencyContacts: ["100", "1090", "07686-274051"]
      }
    ];

    return await this.bulkAddZones(northZones, 'North India');
  }

  // West India Zones
  async seedWestIndiaZones() {
    const westZones = [
      // MUMBAI
      {
        name: "Gateway of India",
        type: "safe", lat: 19.0728, lng: 72.8347, radius: 300,
        city: "Mumbai", state: "Maharashtra",
        description: "Iconic basalt arch monument overlooking Arabian Sea",
        riskLevel: 2, monumentType: "arch", era: "british",
        emergencyContacts: ["100", "1090", "022-22620111"]
      },
      {
        name: "Chhatrapati Shivaji Terminus",
        type: "caution", lat: 18.9398, lng: 72.8355, radius: 400,
        city: "Mumbai", state: "Maharashtra",
        description: "UNESCO World Heritage railway station - busy crowds",
        riskLevel: 3, monumentType: "station", era: "british",
        emergencyContacts: ["100", "139", "022-22620111"]
      },
      {
        name: "Elephanta Caves",
        type: "safe", lat: 18.9633, lng: 72.9315, radius: 500,
        city: "Mumbai", state: "Maharashtra",
        description: "UNESCO World Heritage rock-cut caves on island",
        riskLevel: 1, monumentType: "caves", era: "ancient",
        emergencyContacts: ["100", "1090"]
      },

      // AURANGABAD
      {
        name: "Ajanta Caves",
        type: "safe", lat: 20.5519, lng: 75.7033, radius: 800,
        city: "Aurangabad", state: "Maharashtra",
        description: "UNESCO World Heritage Buddhist cave paintings",
        riskLevel: 1, monumentType: "caves", era: "ancient",
        emergencyContacts: ["100", "1090", "0240-2431513"]
      },
      {
        name: "Ellora Caves",
        type: "safe", lat: 20.0267, lng: 75.1797, radius: 1000,
        city: "Aurangabad", state: "Maharashtra",
        description: "UNESCO World Heritage multi-religious cave complex",
        riskLevel: 1, monumentType: "caves", era: "ancient",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Bibi Ka Maqbara",
        type: "safe", lat: 19.9012, lng: 75.3164, radius: 400,
        city: "Aurangabad", state: "Maharashtra",
        description: "Mughal mausoleum known as Deccan Taj",
        riskLevel: 1, monumentType: "mausoleum", era: "mughal",
        emergencyContacts: ["100", "1090"]
      },

      // AHMEDABAD
      {
        name: "Sabarmati Ashram",
        type: "safe", lat: 23.0605, lng: 72.5799, radius: 300,
        city: "Ahmedabad", state: "Gujarat",
        description: "Gandhi's residence and museum of freedom struggle",
        riskLevel: 1, monumentType: "ashram", era: "modern",
        emergencyContacts: ["100", "1090", "079-27557277"]
      },
      {
        name: "Adalaj Stepwell",
        type: "safe", lat: 23.1645, lng: 72.4821, radius: 200,
        city: "Ahmedabad", state: "Gujarat",
        description: "Intricate Indo-Islamic stepwell architecture",
        riskLevel: 1, monumentType: "stepwell", era: "medieval",
        emergencyContacts: ["100", "1090"]
      },

      // DWARKA
      {
        name: "Dwarkadhish Temple",
        type: "safe", lat: 22.2442, lng: 68.9685, radius: 400,
        city: "Dwarka", state: "Gujarat",
        description: "Sacred Hindu temple dedicated to Lord Krishna",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "02892-234321"]
      },

      // SOMNATH
      {
        name: "Somnath Temple",
        type: "safe", lat: 20.8880, lng: 70.4017, radius: 300,
        city: "Somnath", state: "Gujarat",
        description: "One of twelve Jyotirlinga shrines of Shiva",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "02876-231482"]
      },

      // GOA
      {
        name: "Basilica of Bom Jesus",
        type: "safe", lat: 15.5007, lng: 73.9115, radius: 300,
        city: "Goa", state: "Goa",
        description: "UNESCO World Heritage Portuguese colonial church",
        riskLevel: 1, monumentType: "church", era: "colonial",
        emergencyContacts: ["100", "1090", "0832-2285790"]
      },
      {
        name: "Se Cathedral Goa",
        type: "safe", lat: 15.5005, lng: 73.9120, radius: 200,
        city: "Goa", state: "Goa",
        description: "Largest church in Asia from Portuguese era",
        riskLevel: 1, monumentType: "cathedral", era: "colonial",
        emergencyContacts: ["100", "1090"]
      }
    ];

    return await this.bulkAddZones(westZones, 'West India');
  }

  // South India Zones
  async seedSouthIndiaZones() {
    const southZones = [
      // HAMPI
      {
        name: "Virupaksha Temple Hampi",
        type: "safe", lat: 15.3350, lng: 76.4600, radius: 400,
        city: "Hampi", state: "Karnataka",
        description: "UNESCO World Heritage Vijayanagara Empire temple",
        riskLevel: 1, monumentType: "temple", era: "medieval",
        emergencyContacts: ["100", "1090", "08394-241339"]
      },
      {
        name: "Hampi Bazaar",
        type: "caution", lat: 15.3345, lng: 76.4605, radius: 300,
        city: "Hampi", state: "Karnataka",
        description: "Ancient market street - watch for touts",
        riskLevel: 2, monumentType: "bazaar", era: "medieval",
        emergencyContacts: ["100", "1090"]
      },

      // MYSORE
      {
        name: "Mysore Palace",
        type: "safe", lat: 12.3051, lng: 76.6551, radius: 500,
        city: "Mysore", state: "Karnataka",
        description: "Indo-Saracenic royal palace with spectacular illumination",
        riskLevel: 1, monumentType: "palace", era: "modern",
        emergencyContacts: ["100", "1090", "0821-2421051"]
      },

      // CHENNAI
      {
        name: "Kapaleeshwarar Temple",
        type: "safe", lat: 13.0339, lng: 80.2619, radius: 300,
        city: "Chennai", state: "Tamil Nadu",
        description: "Ancient Dravidian temple with towering gopuram",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "044-28114579"]
      },
      {
        name: "Fort St. George",
        type: "safe", lat: 13.0827, lng: 80.2707, radius: 400,
        city: "Chennai", state: "Tamil Nadu",
        description: "First British fortress in India with museum",
        riskLevel: 1, monumentType: "fortress", era: "british",
        emergencyContacts: ["100", "1090"]
      },

      // MAHABALIPURAM
      {
        name: "Shore Temple Mahabalipuram",
        type: "safe", lat: 12.6162, lng: 80.1999, radius: 300,
        city: "Mahabalipuram", state: "Tamil Nadu",
        description: "UNESCO World Heritage seaside temple complex",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "044-27442274"]
      },
      {
        name: "Arjuna Penance Rock Carving",
        type: "safe", lat: 12.6218, lng: 80.1928, radius: 200,
        city: "Mahabalipuram", state: "Tamil Nadu",
        description: "Massive rock relief sculpture",
        riskLevel: 1, monumentType: "sculpture", era: "ancient",
        emergencyContacts: ["100", "1090"]
      },

      // THANJAVUR
      {
        name: "Brihadeeswarar Temple",
        type: "safe", lat: 10.7823, lng: 79.1314, radius: 400,
        city: "Thanjavur", state: "Tamil Nadu",
        description: "UNESCO World Heritage Chola temple with massive dome",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "04362-230408"]
      },

      // MADURAI
      {
        name: "Meenakshi Amman Temple",
        type: "caution", lat: 9.9195, lng: 78.1194, radius: 500,
        city: "Madurai", state: "Tamil Nadu",
        description: "Massive temple complex with colorful gopurams - very crowded",
        riskLevel: 3, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "0452-2345777"]
      },

      // KOCHI
      {
        name: "Chinese Fishing Nets",
        type: "safe", lat: 9.9655, lng: 76.2530, radius: 300,
        city: "Kochi", state: "Kerala",
        description: "Iconic cantilever fishing nets at Fort Kochi",
        riskLevel: 1, monumentType: "heritage", era: "medieval",
        emergencyContacts: ["100", "1090", "0484-2668352"]
      },
      {
        name: "Mattancherry Palace",
        type: "safe", lat: 9.9574, lng: 76.2597, radius: 200,
        city: "Kochi", state: "Kerala",
        description: "Dutch Palace with Kerala murals and royal artifacts",
        riskLevel: 1, monumentType: "palace", era: "colonial",
        emergencyContacts: ["100", "1090"]
      },

      // HYDERABAD
      {
        name: "Charminar",
        type: "caution", lat: 17.3616, lng: 78.4747, radius: 400,
        city: "Hyderabad", state: "Telangana",
        description: "Iconic 16th-century mosque and monument - busy bazaar area",
        riskLevel: 3, monumentType: "mosque", era: "medieval",
        emergencyContacts: ["100", "1090", "040-24501234"]
      },
      {
        name: "Golconda Fort",
        type: "safe", lat: 17.3833, lng: 78.4011, radius: 800,
        city: "Hyderabad", state: "Telangana",
        description: "Ruined fortress city with acoustic marvels",
        riskLevel: 2, monumentType: "fortress", era: "medieval",
        emergencyContacts: ["100", "1090"]
      }
    ];

    return await this.bulkAddZones(southZones, 'South India');
  }

  // East India Zones
  async seedEastIndiaZones() {
    const eastZones = [
      // KOLKATA
      {
        name: "Victoria Memorial",
        type: "safe", lat: 22.5448, lng: 88.3426, radius: 400,
        city: "Kolkata", state: "West Bengal",
        description: "Grand British-era marble monument with museum",
        riskLevel: 1, monumentType: "memorial", era: "british",
        emergencyContacts: ["100", "1090", "033-22231890"]
      },
      {
        name: "Howrah Bridge",
        type: "caution", lat: 22.5958, lng: 88.3468, radius: 300,
        city: "Kolkata", state: "West Bengal",
        description: "Iconic cantilever bridge - heavy traffic and crowds",
        riskLevel: 3, monumentType: "bridge", era: "british",
        emergencyContacts: ["100", "1090"]
      },
      {
        name: "Dakshineswar Kali Temple",
        type: "caution", lat: 22.6553, lng: 88.3570, radius: 300,
        city: "Kolkata", state: "West Bengal",
        description: "Sacred temple associated with Ramakrishna - very crowded",
        riskLevel: 3, monumentType: "temple", era: "modern",
        emergencyContacts: ["100", "1090"]
      },

      // BHUBANESWAR
      {
        name: "Lingaraja Temple",
        type: "safe", lat: 20.2379, lng: 85.8335, radius: 400,
        city: "Bhubaneswar", state: "Odisha",
        description: "Ancient Hindu temple with towering spire",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "0674-2430299"]
      },
      {
        name: "Mukteshwar Temple",
        type: "safe", lat: 20.2442, lng: 85.8335, radius: 200,
        city: "Bhubaneswar", state: "Odisha",
        description: "10th-century temple known as gem of Odishan architecture",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090"]
      },

      // KONARK
      {
        name: "Konark Sun Temple",
        type: "safe", lat: 19.8877, lng: 86.0945, radius: 500,
        city: "Konark", state: "Odisha",
        description: "UNESCO World Heritage 13th-century sun temple",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "06758-236821"]
      },

      // PURI
      {
        name: "Jagannath Temple Puri",
        type: "caution", lat: 19.8135, lng: 85.8312, radius: 500,
        city: "Puri", state: "Odisha",
        description: "Sacred Hindu temple - extremely crowded during festivals",
        riskLevel: 4, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "06752-222394"]
      }
    ];

    return await this.bulkAddZones(eastZones, 'East India');
  }

  // Northeast India Zones
  async seedNortheastIndiaZones() {
    const northeastZones = [
      // GUWAHATI
      {
        name: "Kamakhya Temple",
        type: "caution", lat: 26.1665, lng: 91.7035, radius: 400,
        city: "Guwahati", state: "Assam",
        description: "Sacred Shakti Peetha temple on hilltop - crowded during festivals",
        riskLevel: 3, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "0361-2540644"]
      },

      // SHILLONG
      {
        name: "Don Bosco Museum",
        type: "safe", lat: 25.5680, lng: 91.8933, radius: 200,
        city: "Shillong", state: "Meghalaya",
        description: "Seven-story museum showcasing Northeast culture",
        riskLevel: 1, monumentType: "museum", era: "modern",
        emergencyContacts: ["100", "1090", "0364-2501087"]
      },

      // GANGTOK
      {
        name: "Rumtek Monastery",
        type: "safe", lat: 27.2907, lng: 88.5580, radius: 300,
        city: "Gangtok", state: "Sikkim",
        description: "Important Tibetan Buddhist monastery with mountain views",
        riskLevel: 1, monumentType: "monastery", era: "modern",
        emergencyContacts: ["100", "1090", "03592-202641"]
      }
    ];

    return await this.bulkAddZones(northeastZones, 'Northeast India');
  }

  // Central India Zones
  async seedCentralIndiaZones() {
    const centralZones = [
      // BHOPAL
      {
        name: "Bhojpur Temple",
        type: "safe", lat: 23.2372, lng: 77.6121, radius: 300,
        city: "Bhopal", state: "Madhya Pradesh",
        description: "11th-century incomplete Shiva temple with massive lingam",
        riskLevel: 1, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "0755-2778383"]
      },

      // SANCHI
      {
        name: "Sanchi Stupa",
        type: "safe", lat: 23.4793, lng: 77.7393, radius: 400,
        city: "Sanchi", state: "Madhya Pradesh",
        description: "UNESCO World Heritage Buddhist monument complex",
        riskLevel: 1, monumentType: "stupa", era: "ancient",
        emergencyContacts: ["100", "1090", "07482-266723"]
      },

      // UJJAIN
      {
        name: "Mahakaleshwar Temple",
        type: "caution", lat: 23.1765, lng: 75.7685, radius: 400,
        city: "Ujjain", state: "Madhya Pradesh",
        description: "One of twelve Jyotirlinga shrines - very crowded",
        riskLevel: 3, monumentType: "temple", era: "ancient",
        emergencyContacts: ["100", "1090", "0734-2515694"]
      }
    ];

    return await this.bulkAddZones(centralZones, 'Central India');
  }

  // Bulk add zones helper
  async bulkAddZones(zones, region) {
    let successCount = 0;
    console.log(`🌱 Seeding ${region} zones...`);

    for (const zone of zones) {
      try {
        zone.region = region;
        await this.addZone(zone);
        successCount++;
        console.log(`✅ ${region}: Added ${zone.name} in ${zone.city}`);
      } catch (error) {
        console.error(`❌ ${region}: Failed to add ${zone.name}:`, error);
      }
    }

    console.log(`🎉 ${region}: Successfully added ${successCount}/${zones.length} zones`);
    return successCount;
  }

  // Other utility methods remain the same...
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  checkUserInZones(userLat, userLng, zones) {
    const insideZones = [];

    zones.forEach(zone => {
      const distance = this.calculateDistance(userLat, userLng, zone.lat, zone.lng);
      const distanceInMeters = distance * 1000;

      if (distanceInMeters <= zone.radius) {
        insideZones.push({
          ...zone,
          distanceFromCenter: Math.round(distanceInMeters)
        });
      }
    });

    return insideZones;
  }

  // Real-time subscription
  subscribeToZones(city = 'Delhi', callback) {
    const q = query(
      collection(db, this.zonesCollection),
      where('city', '==', city),
      where('isActive', '==', true),
      orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const zones = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lat: doc.data().location?.latitude,
        lng: doc.data().location?.longitude,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));

      console.log(`🔄 Real-time update: ${zones.length} zones for ${city}`);
      callback(zones);
    });
  }

  // Record zone activity
  async recordZoneActivity(userId, zoneId, activity, location) {
    try {
      const activityData = {
        userId,
        zoneId,
        activity,
        location: new GeoPoint(location.lat, location.lng),
        timestamp: Timestamp.now(),
        userAgent: navigator.userAgent,
        accuracy: location.accuracy || null
      };

      await addDoc(collection(db, 'zone_activities'), activityData);
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  }
}

// Create singleton instance
export const allIndiaZoneService = new AllIndiaZoneService();
export default allIndiaZoneService;