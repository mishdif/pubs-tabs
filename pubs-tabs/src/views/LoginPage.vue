<template>
  <main>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </main>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
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
:root {
  --header-height: 160px;
}
main {
  padding-top: var(--header-height);
}
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
  margin: 10px 0px;
  padding: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
