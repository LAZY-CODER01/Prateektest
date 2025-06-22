import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDkyQcFT338nIkdRi0mtNwFTDtRRBYQEo",
  authDomain: "mudrika-international.firebaseapp.com",
  projectId: "mudrika-international",
  storageBucket: "mudrika-international.firebasestorage.app",
  messagingSenderId: "1059286181361",
  appId: "1:1059286181361:web:e5913c5afb8cfc43ea5050",
  measurementId: "G-TQELEH66T3"
};

const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
