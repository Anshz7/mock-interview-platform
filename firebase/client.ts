import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuFfqD_knbE4nioYXBM8hPrJxPBAj3XZU",
  authDomain: "prepwise-2f1e1.firebaseapp.com",
  projectId: "prepwise-2f1e1",
  storageBucket: "prepwise-2f1e1.firebasestorage.app",
  messagingSenderId: "415041718159",
  appId: "1:415041718159:web:bde512b3562f54ae246dfa",
  measurementId: "G-GL1GBFB7FY"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);