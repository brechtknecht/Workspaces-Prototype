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

</style>