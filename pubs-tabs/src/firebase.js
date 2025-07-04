// src/firebase.js
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhGphKr-sFqqJdFC8t8rGSTZMUXqpb81U",
  authDomain: "pubs-tabs-dev.firebaseapp.com",
  projectId: "pubs-tabs-dev",
  storageBucket: "pubs-tabs-dev.firebasestorage.app",
  messagingSenderId: "310701373935",
  appId: "1:310701373935:web:800a7f69edf822196fde1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

