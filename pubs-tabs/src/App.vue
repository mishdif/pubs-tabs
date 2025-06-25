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
      @refresh="fetchUsers"
    />
  </main>
</template>

<script>
import axios from 'axios';
const api = process.env.VUE_APP_API_BASE_URL;
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
      error: null
    }
  },
  mounted() {
  this.fetchUsers();
},
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${api}/users`);
        this.users = response.data;
      } catch (err) {
        this.error = err.message || 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },
    async handlePunchChange({ id, punches }) {
      try {
        await axios.patch(`${api}/users/${id}`, { punches });
        const user = this.users.find(u => u.id === id);
        if (user) user.punches = punches;
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
