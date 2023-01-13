<template>
    <div ref="container" style="height: 100vh; width: 100vw; position: relative" class="window-manager">
        <div v-for="(window, index) in windows" :key="index" class="window-wrapper" ref="window"
            @mousedown="startDrag(index)">
            <!-- content of the window goes here -->

            <window :properties="window"/> 
        </div>
    </div>
</template>


<script>
    import {
        mapState
    } from 'vuex';

    import Window from '../components/base/Window.vue'

    export default {
        data() {
            return {
                windows: ["1", "2", "3"],
                activeWindow: null,
            };
        },
        props: {
            windows: Object
        },
        components : {
            Window
        },
        methods: {
            startDrag(index) {
                this.activeWindow = index;
                this.$refs.window.forEach((w, i) => {
                    if (i !== this.activeWindow) {
                        w.style.zIndex = 10;
                    }
                });
                const window = this.$refs.window[index];
                window.style.zIndex = 1000;
                this.offsetX = event.clientX - window.offsetLeft;
                this.offsetY = event.clientY - window.offsetTop;
                this.$refs.container.addEventListener("mousemove", this.onMouseMove);
                this.$refs.container.addEventListener("mouseup", this.stopDrag);
            },
            onMouseMove(e) {
                const window = this.$refs.window[this.activeWindow];
                let top = e.clientY - this.offsetY;
                if (top < 0) {
                    top = 0;
                }
                window.style.left = `${e.clientX - this.offsetX}px`;
                window.style.top = `${top}px`;
            },
            stopDrag() {
                this.$refs.container.removeEventListener("mousemove", this.onMouseMove);
                this.$refs.container.removeEventListener("mouseup", this.stopDrag);
                const activeIndex = this.windows.indexOf(this.windows[this.activeWindow]);
                if (activeIndex !== 0) {
                    const before = this.windows.slice(0, activeIndex);
                    const after = this.windows.slice(activeIndex + 1);
                    this.windows = [...before, this.windows[activeIndex], ...after];
                }
            },
        },
    };
</script>

<style lang="scss">
    .window-wrapper {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0px 5px 10px rgba(0,0,0,.12);
        padding: 20px;
        width: auto;
        height: auto;
        z-index: 10;
        /* this will make sure that the active window is on top of the others */
    }

    .window-manager {
        margin-top: 6.5rem;
    }
</style>