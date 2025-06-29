<template>
  <main>
    <div class="auth-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="name" placeholder="Name" required />
        <input v-model="phone" placeholder="Phone" required />
        <button type="submit">Register</button>
        <p class="error" v-if="error">{{ error }}</p>
        <p>Already have an account? <router-link to="/login">Log in</router-link></p>
      </form>
    </div>
  </main>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProfile } from '@/services/UserService';
import { auth } from '@/firebase'; // Make sure you have firebase initialized in this file

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      phone: '',
      error: ''
    };
  },
  methods: {
  async register() {
    this.error = '';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      await createUserProfile(user.uid, {
        email: user.email,
        role: 'user',
        name: this.name,
        phone: this.phone,
        punches: Array(10).fill(false),
        createdAt: new Date()
        });

        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
:root {
  --header-height: 160px;
}
main {
  padding-top: var(--header-height);
}
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  background: #343434;
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input {
  display: block;
  margin-bottom: 16px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
}
.error {
  color: red;
  margin-top: 10px;
}
a {
  color: rgb(147, 224, 255);
}
</style>
