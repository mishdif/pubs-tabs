<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // your firebase.js

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: #343434;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
