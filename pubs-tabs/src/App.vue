<template>
  <TopHeader class="top-header"/>
  <router-view />
</template>

<script>
import TopHeader from '@/components/TopHeader.vue';
export default {
  name: 'App',
  components: {
    TopHeader,
  }
};
</script>

<style>
.top-header {
  position: fixed;
  top: 0;
  left: 0;
}body::before {
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
  z-index: -1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>