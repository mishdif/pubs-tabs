<template>
  <main>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="sendCode">
        <input v-model="phone" placeholder="+1234567890" required />
        <div id="recaptcha-container"></div>
        <button type="submit">Send Code</button>
      </form>

      <form v-if="codeSent" @submit.prevent="verifyCode">
        <input v-model="otp" placeholder="Enter OTP" required />
        <button type="submit">Verify Code</button>
      </form>

      <p>Don't have an account? <router-link to="/register">Sign Up</router-link></p>        
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </main>
</template>

<script>
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { createUserProfile } from '@/services/UserService';
import { auth } from "@/firebase";

export default {
  data() {
    return {
      phone: '',
      otp: '',
      error: '',
      codeSent: false,
      confirmationResult: null
    };
  },
  methods: {
    async sendCode() {
      this.error = '';

      try {
        const verifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible'
        }, auth);

        this.confirmationResult = await signInWithPhoneNumber(auth, this.phone, verifier);
        this.codeSent = true;
      } catch (err) {
        this.error = err.message;
      }
    },
    async verifyCode() {
      try {
        const result = await this.confirmationResult.confirm(this.otp);
        const user = result.user;

        await createUserProfile(user.uid, {
          phone: this.phone,
          role: 'user',
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
.login-page {
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
  box-sizing: border-box;
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
