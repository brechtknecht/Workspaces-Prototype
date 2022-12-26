<template>
  <div class="space">
    <span>{{ workspace.title }}</span>
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

.space {
  width: 100vw;
  height: 100vh;
  background: url('/assets/macOS-Background.png');
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center

}
</style>
