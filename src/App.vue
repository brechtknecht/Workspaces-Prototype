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

<style lang="scss" scoped>  
    body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: #000;
        width: 100%;
        height: 100vh;
        width: 100vw;
        max-width: 100vw;
        overflow: hidden;

        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        
    }

    html {
      overflow: hidden;
      -webkit-user-select: none; /* Safari */        
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
    }

    * {
      -webkit-user-select: none; /* Safari */        
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
    }

    #app {
      overflow: hidden;
    }

    
  
</style>
