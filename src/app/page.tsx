'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Shield, Smartphone, Users, AlertTriangle, Eye, MapPin, Globe } from 'lucide-react'
import { AuthModal } from '@/components/auth/AuthModal'
import { MonumentSidebar } from '@/components/MonumentSidebar'
import { MonumentDetail } from '@/components/MonumentDetail'
import { LiveMap } from '@/components/LiveMap'
import { MonumentSlideshow } from '@/components/MonumentSlideshow'
import { useAuth } from '@/contexts/AuthContext'
import { Monument } from '@/data/monuments'
import UserProfile from '../components/UserProfile'

export default function HomePage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 500)
    const timer2 = setTimeout(() => setAnimationPhase(2), 1500)
    const timer3 = setTimeout(() => setAnimationPhase(3), 2500)
    const timer4 = setTimeout(() => setIsLoading(false), 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const handleMonumentSelect = (monument: Monument) => {
    setSelectedMonument(monument)
  }

  const closeMonumentDetail = () => {
    setSelectedMonument(null)
  }

  // Get user display name with fallback
  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  // Get user profile picture with fallback
  const getUserProfilePic = () => {
    if (user?.photoURL) return user.photoURL
    return '/api/placeholder/40/40' // Fallback placeholder
  }

  // Create user object for UserProfile component
  const userProfileData = {
    name: getUserDisplayName(),
    profilePic: getUserProfilePic(),
    email: user?.email || '',
    uid: user?.uid || '',
    emailVerified: user?.emailVerified || false
  }

  // Loading Screen Component
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-20 w-8 h-8 bg-white rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-white rounded-full animate-pulse"></div>
        </div>

        <div className={`text-center transition-all duration-1000 ease-in-out ${
          animationPhase === 3 ? 'transform -translate-y-[40vh] -translate-x-[45vw] scale-50' : ''
        }`}>
          <div className={`flex items-center gap-4 justify-center mb-4 transition-all duration-800 ${
            animationPhase >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            {/* Logo */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🛡️</span>
            </div>
            <h1 className="text-6xl font-bold text-white">SafePath</h1>
          </div>

          <p className={`text-xl text-white/90 mb-8 transition-all duration-800 delay-300 ${
            animationPhase >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            Smart Tourist Safety System
          </p>

          <div className={`transition-all duration-800 delay-500 ${
            animationPhase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            <p className="text-lg text-white/80 font-light">By</p>
            <p className="text-2xl font-bold text-white bg-white/10 px-6 py-2 rounded-full inline-block mt-2 backdrop-blur-sm">
              CodeBlooded
            </p>
          </div>

          {animationPhase >= 2 && (
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          )}
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className={`h-full bg-white rounded-full transition-all duration-3000 ease-out ${
            animationPhase >= 1 ? 'w-full' : 'w-0'
          }`}></div>
        </div>
      </div>
    )
  }

  // Show authentication modal if user is not authenticated
  if (!authLoading && !user) {
    return <AuthModal />
  }

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Main Website Content
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative animate-fadeIn">
      {/* MONUMENT BACKGROUND SLIDESHOW */}
      <MonumentSlideshow />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 bg-black/20 backdrop-blur-xl shadow-lg border-b border-white/10 animate-slideDown">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SafePath</h1>
              <p className="text-sm text-white/80">Smart Tourist Safety System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-white/80">Welcome back,</p>
              <p className="font-semibold text-white">{getUserDisplayName()}</p>
            </div>

            {/* REPLACE THE LOGOUT BUTTON WITH USER PROFILE COMPONENT */}
            <UserProfile 
              user={userProfileData}
              onLogout={logout}
            />
          </div>
        </div>
      </header>

      {/* Monument Sidebar */}
      <MonumentSidebar 
        onMonumentSelect={handleMonumentSelect}
        selectedMonument={selectedMonument}
      />

      {/* Monument Detail */}
      {selectedMonument && (
        <MonumentDetail 
          monument={selectedMonument}
          onClose={closeMonumentDetail}
        />
      )}

      {/* Live Map */}
      <LiveMap apiKey="AIzaSyCDQmLZczM7ClvdRqpjb3rYr0RK-Iea_jc" />

      {/* CENTERED MAIN CONTENT - FIXED */}
      <main className="w-full px-8 pt-24 relative z-10">
        <div className="max-w-none mx-auto relative">
          <div className={`transition-all duration-300 ${selectedMonument ? 'pr-80' : ''}`}>
            <div className="max-w-7xl mx-auto py-16">
              <div className="text-center mb-20 animate-slideUp">
                <h1 className="text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
                  Welcome to SafePath
                </h1>
                <p className="text-2xl text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                  Smart Tourist Safety Monitoring & Incident Response System
                </p>
                <p className="text-xl text-white/80 mb-16 max-w-5xl mx-auto leading-relaxed drop-shadow-md">
                  Advanced AI-powered platform ensuring tourist safety with blockchain-based digital IDs, 
                  real-time monitoring, geo-fencing alerts, and emergency response system.
                </p>

                <div className="flex gap-8 justify-center mb-20">
                  <button
                    onClick={() => router.push('/digital-id')}
                    className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md text-white px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 animate-slideUp border border-white/20"
                    style={{animationDelay: '0.2s'}}
                  >
                    Get Digital Tourist ID
                  </button>

                  <button
                    onClick={() => router.push('/dashboard/authority')}
                    className="border-3 border-white/40 bg-white/10 backdrop-blur-md text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg animate-slideUp"
                    style={{animationDelay: '0.4s'}}
                  >
                    Authority Dashboard
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                {[
                  { icon: Shield, color: 'blue', title: 'Blockchain Digital ID', desc: 'Secure, tamper-proof digital identification for tourists with KYC verification and blockchain storage.', delay: '0.1s' },
                  { icon: AlertTriangle, color: 'red', title: 'Panic Button', desc: 'One-tap emergency alert system with live location sharing to police and emergency contacts.', delay: '0.2s' },
                  { icon: MapPin, color: 'green', title: 'Geo-Fencing', desc: 'Smart alerts when entering high-risk zones with real-time location monitoring and safety scoring.', delay: '0.3s' },
                  { icon: Eye, color: 'purple', title: 'AI Anomaly Detection', desc: 'Advanced AI monitors travel patterns to detect unusual behavior and potential safety issues.', delay: '0.4s' },
                  { icon: Users, color: 'yellow', title: 'Authority Dashboard', desc: 'Real-time monitoring dashboard for police and tourism departments with incident management.', delay: '0.5s' },
                  { icon: Smartphone, color: 'indigo', title: 'Multilingual Support', desc: 'Available in 10+ Indian languages with voice/text emergency access for all users.', delay: '0.6s' }
                ].map((feature, index) => (
                  <div key={index} className={`bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-all duration-300 animate-slideUp border border-white/20 hover:bg-white/15`} style={{animationDelay: feature.delay}}>
                    <div className={`w-24 h-24 bg-${feature.color}-100/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20`}>
                      <feature.icon className={`text-${feature.color}-300`} size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">{feature.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* Large CTA Section */}
              <div className="bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-indigo-600/80 backdrop-blur-md rounded-3xl p-16 text-center text-white shadow-2xl animate-slideUp border border-white/20" style={{animationDelay: '0.8s'}}>
                <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">Ready to Travel Safely?</h2>
                <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto drop-shadow-md">
                  Register now and get your digital tourist ID in minutes. Complete safety coverage for your journey.
                </p>
                <button
                  onClick={() => router.push('/digital-id')}
                  className="bg-white text-blue-600 px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                >
                  Start Registration →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-xl text-white py-12 animate-slideUp border-t border-white/10" style={{animationDelay: '1s'}}>
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-2xl">🛡️</span>
            <h3 className="text-2xl font-bold">SafePath</h3>
          </div>
          <p className="text-lg opacity-80">© 2025 SafePath - Smart Tourist Safety System. All rights reserved.</p>
          <p className="text-sm opacity-60 mt-2">Powered by AI, Blockchain & Real-time Monitoring</p>
          <p className="text-xs opacity-50 mt-4">Developed by CodeBlooded</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        @media (max-width: 768px) {
          .pr-80 {
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  )
}