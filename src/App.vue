<script setup>
  import AppBar from './components/AppBar.vue'
  import SystemDesktop from './components/SystemDesktop.vue'
  import PersonBar from './components/PersonBar.vue'
</script>

<template>
  <AppBar />
  <system-desktop/>
  <PersonBar/>
</template>

<style scoped>

body {
  body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }

  background: #000;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
