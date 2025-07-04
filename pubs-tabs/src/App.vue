<template>
  <header>
    <TopHeader class="top-header"/>    
  </header>
  <router-view />
</template>

<script>
import TopHeader from './components/TopHeader.vue';
export default {
  name: 'App',
  components: {
    TopHeader,
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
  z-index: -1; /* Push it behind everything */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>