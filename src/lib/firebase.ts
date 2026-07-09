import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "safepath-tourist-safety.firebaseapp.com",
  projectId: "safepath-tourist-safety",
  storageBucket: "safepath-tourist-safety.firebasestorage.app",
  messagingSenderId: "782428678601",
  appId: "1:782428678601:web:1d55431d8c7ee92f7be018"
}

// Safety check: Prevents crashing Next.js during 'npm run build' when env keys are missing on the server
const shouldInitialize = typeof window !== 'undefined' || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Initialize Firebase App safely
const app = shouldInitialize 
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

// Initialize Firebase Authentication with a fallback for build time
export const auth = app ? getAuth(app) : null;

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

// Initialize Cloud Firestore with a fallback for build time
export const db = app ? getFirestore(app) : null;

export default app;
