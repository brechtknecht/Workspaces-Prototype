<template>
  <router-view />
</template>

<style lang="scss">  
    body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: url('/assets/macOS-Overlay-Background.png');
        width: 100%;
        height: 100vh;
        width: 100vw;
        max-width: 100vw;
        overflow: clip !important;

        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        
    }

    html {
      overflow: clip;
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


      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    *::-webkit-scrollbar {
      display: none;
    }

    #app {
      overflow-y: scroll;
      max-height: 100vh !important;
    }

    
  
</style>
