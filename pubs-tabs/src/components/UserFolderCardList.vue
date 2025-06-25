<template>
  <div class="user-list">
    <div class="top-bar">
      <input
        type="text"
        v-model="searchQuery"
        class="search-input"
        placeholder="Search by name..."
      />
      <button @click="showModal = true" class="add-button">Add User</button>
    </div>
    
    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
      <div class="modal">
        <h2>Add New User</h2>
        <form @submit.prevent="submitUser">
          <input v-model="newUser.name" placeholder="Name" required />
          <input v-model="newUser.phone" placeholder="Phone" required />
          <button type="submit">Save</button>
          <button type="button" @click="showModal = false">Cancel</button>
        </form>
      </div>
    </div>
    
    <div class="cards-wrapper">
      <UserFolderCard
        v-for="(user, index) in filteredUsers"
        :key="user.id"
        :user="user"
        :index="index"
        @update-punches="$emit('update-punches', $event)"
        :isLast="index === filteredUsers.length - 1"
        @update-user="handleUpdateUser"
        @delete-user="handleDeleteUser"
      />
    </div>
  </div>
</template>

<script>
import UserFolderCard from './UserFolderCard.vue';
import axios from 'axios';
const api = process.env.VUE_APP_API_BASE_URL;
export default {
  components: { UserFolderCard },
  props: {
    users: {
        type: Array,
        required: true
    }
  },
  emits: ["refresh"],
  data() {
    return {
      searchQuery: '',
      showModal: false,
      newUser: {
        name: '',
        phone: ''
      }
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) return this.users;
      return this.users.filter(user =>
        user.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async submitUser() {
      const newUserData = {
        ...this.newUser,
        username: this.newUser.name.toLowerCase().replace(/\s+/g, ''),
        punches: [ false, false, false, false, false, false, false, false, false, false ]
      };

      try {
        await axios.post(`${api}/users`, newUserData);
        this.showModal = false;
        this.newUser.name = '';
        this.newUser.phone = '';
        this.$emit('refresh'); // ask App.vue to refetch users
      } catch (err) {
        console.error('Failed to add user:', err);
      }
    },

    async handleUpdateUser(updatedUser) {
      try {
        await axios.patch(`${api}/users/${updatedUser.id}`, updatedUser);
        this.$emit('refresh');
      } catch (err) {
        console.error('Update failed:', err);
      }
    },
    async handleDeleteUser(userId) {
      try {
        await axios.delete(`${api}/users/${userId}`);
        this.$emit('refresh');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 4px;
}

.add-button {
  padding: 12px 16px;
  background: white;
  color: #343434;
  font-weight: bolder;
  border: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  color: #343434;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
}

.modal input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
}

.modal button {
  margin-right: 10px;
  padding: 6px 12px;
}

.cards-wrapper {
  position: relative;
  margin-top: 205px; /* creates space between search and first card */
}

.user-list {
  position: relative;
  display: flex;
  flex-direction: column; /* stack cards vertically */
  width: 100%;
  background-color: #343434;
  border-radius: 15px;
  /* gap: 20px; */
  padding: 50px 20px;
  /* max-width: 1200px;       /* optional: limit for readability */
  margin: auto;
  box-sizing: border-box;
}
/* Give the first card a normal margin-top */
.user-list > .card:first-child {
  margin-top: 0;
}

.user-list > .card:last-child {
  margin-bottom: 0;
}
</style>