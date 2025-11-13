<!-- firebase-setup.js -->
<script type="module">
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
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyCloJB8y2ulkKohTMxPH32sDO9bKxp5J_8",
    authDomain: "tau-aweko.firebaseapp.com",
    projectId: "tau-aweko",
    storageBucket: "tau-aweko.firebasestorage.app",
    messagingSenderId: "740127816940",
    appId: "1:740127816940:web:22b867d470581625b1b9c9"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    doc,
    getDoc,
    setDoc,
    updateDoc
};
</script>
