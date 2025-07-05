<template>
    <div class="top-header">
        <img class="icon" alt="Beer logo" src="@/assets/beers-icon.png">
        <div>PUB'S TABS</div>
    </div>
    <div v-if="user" class="auth-bar">
      Logged in as: {{ user.email }}
      <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  name: "TopHeader",
  data() {
    return {
      user: null
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    async logout() {
      await signOut(auth);
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.top-header {
    background-color: #343434;
    overflow: hidden;
    color: white;
    float: left;
    width: 100%;
    display: flex;
    box-shadow: 0px 10px 10px 10px rgb(0, 0, 0, 0.78);
    margin-bottom: 32px;
}
.top-header div {
    padding-top: 32px;
    font-stretch: extra-condensed;
    font-weight: bolder;
    color: white;
    font-size: 36px;
}
.icon {
    width: 78px;
    height: 78px;
    padding: 16px;
}
.auth-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: white;
  padding: 10px 20px;
}
.auth-bar button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
}
</style>