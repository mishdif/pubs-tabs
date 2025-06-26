<template>
  <header>
    <TopHeader class="top-header"/>    
    <div v-if="loading">Loading users...</div>
    <div v-else-if="error">Error getting users: {{ error }}</div>
  </header>
  <main>
    <UserFolderCardList 
      :users="users"
      @update-punches="handlePunchChange"
    />
  </main>
</template>

<script>
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { listenToUsers } from '@/services/UserService.js';
import UserFolderCardList from './components/UserFolderCardList.vue';
import TopHeader from './components/TopHeader.vue';
export default {
  name: 'App',
  components: {
    TopHeader,
    UserFolderCardList
  },
  data() {
    return {
      users: [],
      loading: true,
      error: null,
      unsubscribe: null
    };
  },
  mounted() {
  this.startListening();
},
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  },
  methods: {
    async startListening() {
      this.loading = true;
      this.unsubscribe = listenToUsers(
        (users) => {
          this.users = users;
          this.loading = false;
        },
        (err) => {
          this.error = err.message || 'Failed to fetch users';
          this.loading = false;
        }
      );
    },
    async handlePunchChange({ id, punches }) {
      const userRef = doc(db, 'users', id);
      try {
        await updateDoc(userRef, { punches });
      } catch (err) {
        console.error('Failed to update punches:', err);
      }
    }
  }
};
</script>

<style>
:root {
  --header-height: 160px;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1000; /* to keep it above other elements */
}
main {
  padding-top: var(--header-height);
}
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/background-planks-texture.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1; /* Push it behind everything */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
/* .tabs-list {
  margin-top: 100px;
  margin-bottom: 100px;
} */
</style>
