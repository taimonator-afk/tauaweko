// firebase-setup.js
// Firebase configuration and exports for Te Whare o Raukura - Tau Āweko

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Firebase project configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCloJB8y2ulkKohTMxPH32sDO9bKxp5J_8",
    authDomain: "tau-aweko.firebaseapp.com",
    projectId: "tau-aweko",
    storageBucket: "tau-aweko.firebasestorage.app",
    messagingSenderId: "740127816940",
    appId: "1:740127816940:web:22b867d470581625b1b9c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export all Firebase Auth functions
export {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile
};

// Export all Firebase Firestore functions
export {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    deleteDoc
};
