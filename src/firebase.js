// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkN_XMXuueCVojP_Da6sS16OIM6L1l4xA",
  authDomain: "clinc-bc44d.firebaseapp.com",
  projectId: "clinc-bc44d",
  storageBucket: "clinc-bc44d.firebasestorage.app",
  messagingSenderId: "1098512486554",
  appId: "1:1098512486554:web:a2a7dc41ad06cf0b9e4f23",
  measurementId: "G-Z2BDWEK1MX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ important


