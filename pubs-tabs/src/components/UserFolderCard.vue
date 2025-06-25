<template>
  <div
    class="card"
    :class="{ expanded, lastExpanded: expanded && isLast }"
    :style="`--i: ${index}`"
  >
    <div class="tab" @click="expanded = !expanded">
      {{ user.name }}
    </div>
    <div class="content">
    <!-- <div class="content" v-if="expanded"> -->
      <div class="card-body">
        <div class="info">
          <p style="color: #aaa;"><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Phone:</strong></p>
          <p>{{ user.phone }}</p>
          <!-- <p><strong>Username:</strong> {{ user.username }}</p> -->
          <div class="card-actions">
            <button @click="editMode = !editMode">
              {{ editMode ? 'Cancel' : 'Edit' }}
            </button>
            <button @click="confirmDelete">Delete</button>
          </div>

          <!-- Edit form (shown in editMode) -->
          <div v-if="editMode" class="edit-form">
            <input v-model="editedUser.name" placeholder="Name" />
            <input v-model="editedUser.phone" placeholder="Phone" />
            <button @click="saveEdit">Save</button>
          </div>
        </div>
        <div class="tab-display">
          <p class="punches-header"><strong>{{ 10 - user.punches.filter(Boolean).length }} Punches Left</strong></p>
          <div class="punches">
            <ToastMessage ref="toast" :message="toastMessage" />
            <span
              v-for="(punched, index) in user.punches"
              :key="index"
              :class="['dot', { punched: punched }]"
              @click="togglePunch(index)"
              :title="`Punch ${index + 1}`"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToastMessage from './ToastMessage.vue';
export default {
  components: { ToastMessage },
  props: {
    user: Object,
    index: Number,
    isLast: Boolean
  },
  data() {
    return {
      expanded: false,
      toastMessage: '',
      editMode: false,
      editedUser: {
        name: '',
        phone: ''
      }
    };
  },
  watch: {
    editMode(newVal) {
      if (newVal) {
        this.editedUser = {
          name: this.user.name,
          phone: this.user.phone
        };
      }
    }
  },
  computed: {
    punchOrder() {
      // Creates row-first ordering: 1-5 on top, 6-10 below
      return [
        1, 2, 3, 4, 5,  // top row
        6, 7, 8, 9, 10  // bottom row
      ];
    }
  },
  methods: {
    togglePunch(index) {
      const newPunches = [...this.user.punches];
      newPunches[index] = !newPunches[index];

      this.$emit('update-punches', {
        id: this.user.id,
        punches: newPunches
      });

      this.toastMessage = `Tab updated`;
      this.$refs.toast.show();
    },
    
    saveEdit() {
      const updatedUser = {
        ...this.user,
        name: this.editedUser.name,
        phone: this.editedUser.phone
      };
      this.$emit('update-user', updatedUser);
      this.editMode = false;
    },
    confirmDelete() {
      if (confirm(`Delete user "${this.user.name}"?`)) {
        this.$emit('delete-user', this.user.id);
      }
    }
  }
};
</script>

<style scoped>
.card-actions {
  margin-top: 40px;
  display: flex;
  gap: 10px;
}

.card-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card-actions button:first-child {
  background-color: #1976d2;
  color: white;
}

.card-actions button:last-child {
  background-color: #d32f2f;
  color: white;
}

.edit-form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-form input {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.card {
  color: #343434;
  /* width: 95%; */
  /* margin: auto; */
  margin: -190px 0px 40px;
  position: relative;
  /* top: calc(-160px * var(--i)); /* each card is shifted up */
  /* margin-top: -160px; */
  z-index: calc(100 + var(--i)); /* higher cards are lower */
  transition: transform 0.4s ease-in-out;
  padding: 20px;
  /* padding-top: 40px; */
  border: 1px solid #ccc;
  border-top: 2px solid #ccc;
  border-radius: 0px 10px 10px 10px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.78);
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.card.expanded {
  z-index: 999;
  margin-bottom: 190px;
  /* bottom: calc(-24px * var(--i)); /* each card is shifted up */
  /* bottom: calc(300px * var(--i)); /* each card is shifted down */
  transform: scale(1.01);
  /* box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.78); */
}

.card.lastExpanded {
  margin-bottom: 0 !important;
}

.info {
  margin-top: 15px;
  text-align: left;
}

.tab-display {
  text-align: right;
  margin-right: 0px;
  margin-left: -16px;
}

.tab {
  position: absolute;
  top: -33px;
  left: -0.9px;
  /* background: #f7d674; */
  background: white;
  /* border: 1px solid #e0c252; */
  padding: 5px 15px;
  border-radius: 5px 5px 0 0;
  border-top: 2px solid #ccc;
  border-left: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  /* box-shadow: 0 2px 4px rgba(0,0,0,0.15); */
  box-shadow: 3px -3px 3px rgba(0,0,0,0.3);
}

.content p {
  margin: 8px 0;
}

.punches-header{
  margin-top: 10px !important;
}

.punches {
  border: 1px dotted #ccc;
  border-bottom: 1px dotted #aaa;
  border-left: 1px dotted #aaa;
  padding: 15px 15px 15px;
  border-radius: 3px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  justify-items: center;
  /* width: 120px; /* ensures consistent width */
  height: 60px;
  margin-top: 10px;
  margin-bottom: 40px;
  margin-left: -20px;
  grid-auto-flow: row
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  /* background: white; */
  box-shadow: none;
  border: 1px dashed #aaa;
  cursor: pointer;
  /* transition: background 0.2s, transform 0.1s; */
}

.dot:hover {
  transform: scale(1.1);
}

.dot.punched {
  background: rgba(0,0,0,0.2);
  box-shadow: inset 2px 2px 1px rgba(0,0,0,0.5);
}
</style>