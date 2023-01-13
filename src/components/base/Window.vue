<template>
    <div ref="window" style="width: 200px; height: 200px;" @mousedown="startDrag" class="window-inner" :id="properties.id">
        {{ this.properties }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            offsetX: 0,
            offsetY: 0,
        };
    },
    props: {
        properties : Object
    },
    methods: {
        // startDrag(e) {
        //     this.$store.commit('disableSidebar', true)

        //     this.offsetX = e.clientX - this.$refs.window.offsetLeft;
        //     this.offsetY = e.clientY - this.$refs.window.offsetTop;
        //     this.$el.addEventListener('mousemove', this.onMouseMove);
        //     this.$el.addEventListener('mouseup', this.stopDrag);
        // },
        // onMouseMove(e) {
        //     this.$refs.window.style.left = `${e.clientX - this.offsetX}px`;
        //     this.$refs.window.style.top = `${e.clientY - this.offsetY}px`;
        // },
        // stopDrag() {
        //     this.$store.commit('disableSidebar', false)

        //     this.$el.removeEventListener('mousemove', this.onMouseMove);
        //     this.$el.removeEventListener('mouseup', this.stopDrag);
        // }
  }
}
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh; 
        width: 100vw;
        position: relative;
        top: 0;
        left: 0;
    }
    .window-inner {
        position: absolute;
        background: white;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #ccc;
        padding: 20px;
        width: 500px;
        height: 500px;
        position: relative;
    }

</style>