// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCouKkJQMdTTQNMjf7jZaEjqBntrVzvbmI",
  authDomain: "expensetracker-46524.firebaseapp.com",
  projectId: "expensetracker-46524",
  storageBucket: "expensetracker-46524.appspot.com",
  messagingSenderId: "85417291962",
  appId: "1:85417291962:web:dfde922d668cd5af3c9283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);