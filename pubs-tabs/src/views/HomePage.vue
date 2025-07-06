<template>
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
import UserFolderCardList from '@/components/UserFolderCardList.vue';
export default {
  name: 'HomePage',
  components: {
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
          console.error(`Error loading users: ${this.errorr}`)
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
  --header-height: 130px
}
main {
  margin-top: var(--header-height);
}
</style>
