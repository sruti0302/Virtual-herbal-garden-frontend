// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOA-wH8wFy4aT_oi8rXc0ESBnEBuT39IM",
  authDomain: "signup-page-cb7b6.firebaseapp.com",
  projectId: "signup-page-cb7b6",
  storageBucket: "signup-page-cb7b6.firebasestorage.app",
  messagingSenderId: "474722137177",
  appId: "1:474722137177:web:183c2b17cfb0189eeb2d48"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
