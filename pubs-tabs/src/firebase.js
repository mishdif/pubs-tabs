// src/firebase.js
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHgbyYVlW1ikzMAcnnIdKqhgwVnuYqxJ4",
  authDomain: "pubs-tabs.firebaseapp.com",
  projectId: "pubs-tabs",
  storageBucket: "pubs-tabs.firebasestorage.app",
  messagingSenderId: "883768752530",
  appId: "1:883768752530:web:adb38690bad6d21debe94b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

