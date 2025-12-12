// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
  apiKey: "AIzaSyBw4ba8-MRddBtQ6kUxKCRwntm7nhlbw-w",
  authDomain: "portfolio-dev-d393d.firebaseapp.com",
  projectId: "portfolio-dev-d393d",
  storageBucket: "portfolio-dev-d393d.firebasestorage.app",
  messagingSenderId: "211166532700",
  appId: "1:211166532700:web:75bf63adbabc1d51a60299",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);