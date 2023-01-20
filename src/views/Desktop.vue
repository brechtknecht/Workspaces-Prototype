<script setup>
  import AppBar from '../components/AppBar.vue'
  import SystemDesktop from '../components/SystemDesktop.vue'
  import PersonBar from '../components/PersonBar.vue'
  import MiniMap from '../components/fragments/MiniMap.vue'
  import { onMounted } from '@vue/runtime-core'

  import { computed } from 'vue'
  import { useStore } from 'vuex'

  
  const store = useStore()
  

  onMounted (() => {
    window.addEventListener('keydown', handleShortcuts);
  })

  function handleShortcuts(e) {
      if (e.shiftKey && e.key === '0') {
          store.commit('toggleWorkspacesOverview')
      }
  }
</script>

<template>
    <AppBar :v-if="store.state.uiState.isInOverview"/>
    <system-desktop/>
    <PersonBar/>    
    <mini-map/>
</template>
