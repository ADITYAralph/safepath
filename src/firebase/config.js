import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "safepath-tourist-safety.firebaseapp.com",
  projectId: "safepath-tourist-safety",
  storageBucket: "safepath-tourist-safety.firebasestorage.app",
  messagingSenderId: "782428678601",
  appId: "1:782428678601:web:1d55431d8c7ee92f7be018"
};

// Check if we are running in the browser OR if we have the environment key available
const shouldInitialize = typeof window !== 'undefined' || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Initialize Firebase App instance safely without throwing errors on build server
const app = shouldInitialize 
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

// Initialize services with fallbacks so imports don't break page collection
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { app, db, auth };
export default firebaseConfig;
