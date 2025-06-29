// src/services/UserService.js
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export function listenToUsers(callback, errorCallback) {
  const usersRef = collection(db, 'users');
  return onSnapshot(
    usersRef,
    (snapshot) => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(users);
    },
    errorCallback
  );
}

// Add new user
export async function addUser(user) {
  return await addDoc(collection(db, 'users'), user);
}

// Update user (general update, including punches or profile fields)
export async function updateUser(id, updatedData) {
  const userRef = doc(db, 'users', id);
  return await updateDoc(userRef, updatedData);
}

// Delete user
export async function deleteUser(id) {
  const userRef = doc(db, 'users', id);
  return await deleteDoc(userRef);
}

// Create user document with UID as ID
export async function createUserProfile(uid, userData) {
  const userRef = doc(db, 'users', uid); // UID as the document ID
  return await setDoc(userRef, userData); // setDoc instead of addDoc
}