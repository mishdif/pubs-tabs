<template>
    <div v-if="true" class="top-header">
        <div class="headline">
            <img class="icon" alt="Beer logo" src="@/assets/beers-icon.png">
            <div>PUB'S TABS</div>
        </div>
        <div v-if="user" class="auth-bar">
          <button @click="logout">Logout</button>
          {{ user.email }}
        </div>
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
    color: white;
    float: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 10px 10px 10px rgb(0, 0, 0, 0.78);
    z-index: 1000;
}
.top-header div {
    padding: 16px;
    font-stretch: extra-condensed;
    font-weight: bolder;
    color: white;
    font-size: 30px;
}
.headline {
    display: flex;
}
.icon {
    width: 60px;
    height: 60px;
    padding: 4px;
}
.auth-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #343434;
  color: white;
  padding: 12px 12px;
}
.auth-bar button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 4px;
  margin: 10px;
  font-weight: bolder;
  font-size: large;
}
</style>