// src/services/UserService.js
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

// Fetch all users
export async function fetchUsers() {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
