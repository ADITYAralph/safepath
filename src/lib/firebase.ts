import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // Replace these with your actual Firebase config
  apiKey: "AIzaSyCXRg_yoB-B6nM84B33p7D2CmquWeCFPXs",
  authDomain: "safepath-tourist-safety.firebaseapp.com",
  projectId: "safepath-tourist-safety",
  storageBucket: "safepath-tourist-safety.firebasestorage.app",
  messagingSenderId: "782428678601",
  appId: "1:782428678601:web:1d55431d8c7ee92f7be018"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
