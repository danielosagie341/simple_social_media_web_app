// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyD1T_nBM9fCDg4fL6Tq8txiP-p9N8bgWaw",
  authDomain: "simple-socials-two.firebaseapp.com",
  projectId: "simple-socials-two",
  storageBucket: "simple-socials-two.appspot.com",
  messagingSenderId: "937752270697",
  appId: "1:937752270697:web:68c19c43d69a5f30334ff8",
  measurementId: "G-T1ZKEVVGFQ" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();