<!-- App.vue -->
<template>
  <header>
    <TopHeader class="top-header"/>
  </header>
  <router-view />
</template>

<script>
import TopHeader from './components/TopHeader.vue';
export default {
  name: "App",
  components: {
    TopHeader
  }
}
</script>

<style>

main {
  padding: 0;
}
</style>