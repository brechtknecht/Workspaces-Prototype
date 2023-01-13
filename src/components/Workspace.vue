<template>
  <div class="space-wrapper">
    <div v-for="space in workspace.workspace.spaces" :key="space.title"  class="space">
      <span>{{ workspace.title }}</span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: []
    }
  },
  props: {
    workspace: Object
  }
}

</script>

<style lang="scss" scoped>
.space-wrapper {
  display: flex;
  overflow: scroll;
  .space {
    width: 100vw;
    height: 100vh;
    background: url('/assets/macOS-Background.png');
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center
  }
}
</style>
