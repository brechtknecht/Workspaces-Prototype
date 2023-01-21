<template>
  <div v-if="workspace.properties.multiplayer" class="multiplayer-options">
    <div @click="leaveMultiplayer" v-if="workspace.properties.multiplayer.isMultiplayerSession">
      Leave Multiplayer
    </div>
    <div v-else @click="startMultiplayer"> Start Multiplayer </div>
  </div>

  {{ workspace.properties.id }}
</template>

<script>
export default {
  props : {
    workspace: Object
  },
  methods : {
    startMultiplayer () {
      // Update the mutliplayer session property
      this.workspace.properties.multiplayer.isMultiplayerSession = true;
      this.$store.commit('updateWorkspace', this.workspace)
    },
    leaveMultiplayer () {
      this.workspace.properties.multiplayer.isMultiplayerSession = false;
      this.$store.commit('updateWorkspace', this.workspace)
    }
  }
}
</script>

<style lang="scss">

</style>