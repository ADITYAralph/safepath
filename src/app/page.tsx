'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingScreen } from '@/components/UI/LoadingScreen'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('safepath_token')
      
      if (!token || token === 'null' || token === 'undefined') {
        // No token - redirect to signin
        console.log('No token found, redirecting to signin')
        router.push('/signin')
      } else {
        // Has token - redirect to dashboard
        console.log('Token found, redirecting to dashboard')
        router.push('/dashboard')
      }
    }

    // Small delay to ensure localStorage is available
    setTimeout(checkAuth, 100)
  }, [router])

  // Show loading screen while redirecting
  return <LoadingScreen onAnimationComplete={() => {}} />
}
