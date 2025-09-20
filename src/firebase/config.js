// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here or use environment variables
  apiKey: "AIzaSyCXRg_yoB-B6nM84B33p7D2CmquWeCFPXs",
  authDomain: "safepath-tourist-safety.firebaseapp.com",
  projectId: "safepath-tourist-safety",
  storageBucket: "safepath-tourist-safety.firebasestorage.app",
  messagingSenderId: "782428678601",
  appId: "1:782428678601:web:1d55431d8c7ee92f7be018"

};

let app, db, auth;

// Only initialize if in browser environment
if (typeof window !== 'undefined') {
  try {
    const { initializeApp } = require('firebase/app');
    const { getFirestore } = require('firebase/firestore');
    const { getAuth } = require('firebase/auth');
    
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { app, db, auth };
export default firebaseConfig;
