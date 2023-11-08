// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-57f52.firebaseapp.com",
  projectId: "mern-auth-57f52",
  storageBucket: "mern-auth-57f52.appspot.com",
  messagingSenderId: "262627682456",
  appId: "1:262627682456:web:d74aa74a386408db6588ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);