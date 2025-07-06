<template>
  <main>
    <div class="auth-container">
      <h2>Admin Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p class="error" v-if="error">{{ error }}</p>
      </form>
    </div>
  </main>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      this.error = '';
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
main {
  padding-top: 130px;
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
</style>
