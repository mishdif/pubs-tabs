<template>
  <main>
    <div class="auth-container">
      <h2>Register</h2>

      <form @submit.prevent="sendCode" v-if="!codeSent">
        <input v-model="name" placeholder="Name" required />
        <input v-model="phone" placeholder="+1234567890" required />
        <div id="recaptcha-container"></div>
        <button type="submit">Send Code</button>
      </form>

      <form @submit.prevent="verifyCode" v-else>
        <input v-model="otp" placeholder="Enter OTP" required />
        <button type="submit">Verify</button>
      </form>

      <p class="error" v-if="error">{{ error }}</p>
      <p>Already have an account? <router-link to="/login">Log in</router-link></p>      
    </div>
  </main>
</template>

<script>
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { createUserProfile } from '@/services/UserService';
import { auth } from "@/firebase";

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      phone: '',
      otp: '',
      error: '',
      codeSent: false,
      confirmationResult: null
    };
  },
  mounted() {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    }, auth);
  },
  beforeUnmount() {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  },
  methods: {
    async sendCode() {
      this.error = '';
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            { size: 'invisible' },
            auth
          );
        }

        const verifier = window.recaptchaVerifier;
        this.confirmationResult = await signInWithPhoneNumber(auth, this.phone, verifier);
        this.codeSent = true;
      } catch (err) {
        this.error = err.message;
        console.error('sendCode error:', err);
      }
    },
    async verifyCode() {
      try {
        const result = await this.confirmationResult.confirm(this.otp);
        const user = result.user;

        await createUserProfile(user.uid, {
          name: this.name,
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
