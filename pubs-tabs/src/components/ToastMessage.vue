<template>
  <div v-if="visible" class="toast">{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: String
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 2000); // visible for 2s
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #444;
  color: #fff;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 9999;
  opacity: 0.95;
  font-size: 14px;
}
</style>
