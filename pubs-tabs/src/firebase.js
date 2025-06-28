import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHgbyYVlW1ikzMAcnnIdKqhgwVnuYqxJ4",
  authDomain: "pubs-tabs.firebaseapp.com",
  projectId: "pubs-tabs",
  storageBucket: "pubs-tabs.firebasestorage.app",
  messagingSenderId: "883768752530",
  appId: "1:883768752530:web:adb38690bad6d21debe94b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

