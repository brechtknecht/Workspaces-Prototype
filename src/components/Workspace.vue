<template>
  <div class="space">
    <span>{{ title }}</span>
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
    title: String
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
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
}
</style>
