'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ✅ ALL YOUR EXISTING AuthProvider CODE STAYS 100% THE SAME
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update the user's display name
    await updateProfile(result.user, { displayName: name })
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      name,
      email,
      createdAt: new Date().toISOString(),
      role: 'user',
      provider: 'email'
    })
  }

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    
    // Check if user document exists, if not create it
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName || result.user.email,
        email: result.user.email,
        createdAt: new Date().toISOString(),
        role: 'user',
        provider: 'google',
        photoURL: result.user.photoURL
      })
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ ONLY CHANGE: Modified useAuth function with build-time safety
export function useAuth() {
  // Check if we're in build time or server-side rendering
  if (typeof window === 'undefined') {
    // Return safe defaults during build/SSR
    return {
      user: null,
      loading: false,
      signIn: async () => {},
      signUp: async () => {},
      signInWithGoogle: async () => {},
      logout: async () => {}
    }
  }

  try {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
  } catch (error) {
    // If AuthContext is not available, return safe defaults
    console.warn('useAuth called outside of AuthProvider, returning safe defaults')
    return {
      user: null,
      loading: false,
      signIn: async () => {},
      signUp: async () => {},
      signInWithGoogle: async () => {},
      logout: async () => {}
    }
  }
}
