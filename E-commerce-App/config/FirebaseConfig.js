// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKjJ42hx1ZDNGfUmps0-4U-yop0psS1kE",
  authDomain: "e-commerce-deb5f.firebaseapp.com",
  projectId: "e-commerce-deb5f",
  storageBucket: "e-commerce-deb5f.firebasestorage.app",
  messagingSenderId: "39576891887",
  appId: "1:39576891887:web:b01b7ffb12f1cc3e73461a",
  measurementId: "G-NDGYFG2NL8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
