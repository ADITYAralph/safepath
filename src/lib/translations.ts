export const translations = {
  en: {
    welcome: "Welcome to SafePath",
    digitalId: "Digital Tourist ID",
    dashboard: "Dashboard", 
    safetyScore: "Safety Score",
    panicButton: "Emergency Panic Button",
    alertSent: "Alert Sent!",
    securedByBlockchain: "Secured by Blockchain",
    enterHighRisk: "WARNING: You are entering a high-risk area!",
    generateId: "Generate Digital ID",
    itinerary: "Trip Itinerary",
    emergencyContacts: "Emergency Contacts"
  },
  hi: {
    welcome: "सेफपाथ में आपका स्वागत है",
    digitalId: "डिजिटल पर्यटक पहचान",
    dashboard: "डैशबोर्ड",
    safetyScore: "सुरक्षा स्कोर", 
    panicButton: "आपातकालीन पैनिक बटन",
    alertSent: "अलर्ट भेजा गया!",
    securedByBlockchain: "ब्लॉकचेन द्वारा सुरक्षित",
    enterHighRisk: "चेतावनी: आप एक उच्च जोखिम वाले क्षेत्र में प्रवेश कर रहे हैं!",
    generateId: "डिजिटल आईडी बनाएं",
    itinerary: "यात्रा कार्यक्रम",
    emergencyContacts: "आपातकालीन संपर्क"
  }
} as const

export function useTranslation() {
  const currentLang = 'en' as keyof typeof translations
  
  return {
    t: (key: keyof typeof translations.en) => {
      return translations[currentLang][key] || key
    }
  }
}
