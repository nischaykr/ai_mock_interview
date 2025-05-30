// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3MBbCKIgKZ9oKqAhYNPH7kqV3eoXUbUs",
  authDomain: "prepwise-59a45.firebaseapp.com",
  projectId: "prepwise-59a45",
  storageBucket: "prepwise-59a45.firebasestorage.app",
  messagingSenderId: "927832127139",
  appId: "1:927832127139:web:fe7e9f6ad45d36a22cf116",
  measurementId: "G-6V9BZN3DE7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);