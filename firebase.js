// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCrfLKglyCG9oAlZ-FEkGlKBOBw0fNRy0",
  authDomain: "intersyncdb.firebaseapp.com",
  projectId: "intersyncdb",
  storageBucket: "intersyncdb.firebasestorage.app",
  messagingSenderId: "391372201684",
  appId: "1:391372201684:web:c0ea452acac1b134ea2541",
  //measurementId: "G-GXBGZPHPZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Add auth service functions
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};