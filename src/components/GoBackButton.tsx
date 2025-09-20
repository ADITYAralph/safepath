'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

interface GoBackButtonProps {
  variant?: 'default' | 'minimal' | 'floating' | 'header'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
  onClick?: () => void // Custom click handler (optional)
  fallbackUrl?: string // Fallback URL if no history
  label?: string
  showLabel?: boolean
  hideOnHomePage?: boolean // Hide when on homepage
}

export default function GoBackButton({ 
  variant = 'default',
  position = 'top-left',
  className = '',
  onClick,
  fallbackUrl = '/',
  label = 'Go Back',
  showLabel = true,
  hideOnHomePage = true // Default to hiding on homepage
}: GoBackButtonProps) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // ✅ FIXED: Check if there's history to go back to
    const hasHistory = typeof window !== 'undefined' && window.history.length > 1
    setCanGoBack(hasHistory)
    
    // ✅ FIXED: Only show if not on homepage or if explicitly allowed
    if (hideOnHomePage && typeof window !== 'undefined') {
      // Check if we're on homepage (root path)
      const isHomePage = window.location.pathname === '/' || window.location.pathname === ''
      // Only show if NOT on homepage AND has history or custom onClick
      setShouldShow(!isHomePage && (hasHistory || !!onClick))
    } else {
      // Always show if hideOnHomePage is false
      setShouldShow(true)
    }
  }, [hideOnHomePage, onClick]) // ✅ FIXED: Remove setCanGoBack from dependencies

  const handleGoBack = () => {
    if (onClick) {
      // If custom handler provided, use it
      onClick()
    } else if (canGoBack && typeof window !== 'undefined') {
      // Go back in browser history (no reload)
      window.history.back()
    } else {
      // Fallback to specific URL
      router.push(fallbackUrl)
    }
  }

  // Don't render if shouldn't show
  if (!shouldShow) {
    return null
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'p-2 hover:bg-gray-100 rounded-full transition-colors'
      
      case 'floating':
        return 'fixed z-50 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:bg-white hover:shadow-xl transition-all transform hover:scale-105'
      
      case 'header':
        return 'flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-colors'
      
      default:
        return 'flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
    }
  }

  const getPositionStyles = () => {
    if (variant !== 'floating') return ''
    
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      default:
        return 'top-4 left-4'
    }
  }

  const getIconComponent = () => {
    return variant === 'minimal' ? <ChevronLeft size={20} /> : <ArrowLeft size={18} />
  }

  const getTextColor = () => {
    return variant === 'header' ? 'text-white' : 'text-gray-700'
  }

  return (
    <button
      onClick={handleGoBack}
      className={`
        ${getVariantStyles()}
        ${getPositionStyles()}
        ${getTextColor()}
        ${className}
      `}
      title={label}
    >
      {getIconComponent()}
      {showLabel && variant !== 'minimal' && variant !== 'floating' && (
        <span className="font-medium">{label}</span>
      )}
    </button>
  )
}
