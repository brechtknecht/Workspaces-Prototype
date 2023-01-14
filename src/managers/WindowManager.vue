<template>
    <div ref="container" style="height: 100vh; width: 100vw; position: relative" class="window-manager">
        <div v-for="(window, index) in windows" :key="index" class="window-wrapper" ref="window" :style="{
                'left': window.frame.x + 'px',
                'top' : window.frame.y + 'px',
                'width' : window.frame.width + 'px',
                'height' : window.frame.height + 'px'
            }">
            <!-- content of the window goes here -->
            <div class="resize-handle resize-handle-top"            @mousedown="startResize('top')"></div>
            <div class="resize-handle resize-handle-bottom"         @mousedown="startResize('bottom')"></div>
            <div class="resize-handle resize-handle-left"></div>
            <div class="resize-handle resize-handle-right"          @mousedown="startResize('right')"></div>
            <div class="resize-handle resize-handle-top-left"></div>
            <div class="resize-handle resize-handle-top-right"></div>
            <div class="resize-handle resize-handle-bottom-left"></div>
            <div class="resize-handle resize-handle-bottom-right"   @mousedown="startResize('bottom-right')"></div>
            <div class="drag-handle" @mousedown="startDrag(index)"></div>
            <div class="window-content">
            <!-- Your window content here -->
            <window :properties="window" />
            </div>
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
                activeWindow: null,
                browserWindowHeight: window.innerHeight,
                browserWindow: window
            };
        },
        props: {
            windows: {}
        },
        components: {
            Window
        },
        methods: {
            /* RESIZING */
            startResize(edge) {
                console.log("Start Resize")
                this.resizing = true;
                this.resizingEdge = edge;
                this.offsetX = event.clientX;
                this.offsetY = event.clientY;
                this.$refs.container.addEventListener("mousemove", this.onMouseMoveResize);
                this.$refs.container.addEventListener("mouseup", this.stopResize);
            },
            onMouseMoveResize(e) {
                console.log("Resizing")
                const window = this.$refs.window[this.activeWindow];
                const windowOffsetTop = parseInt(window.style.top);
                const windowOffsetLeft = parseInt(window.style.left);

                const windowHeight = parseInt(window.style.height);
                const windowWidth = parseInt(window.style.width);

                /* Normal width and height manipulation */ 
                if (this.resizingEdge === "right") {
                    window.style.width = `${e.clientX - windowOffsetLeft - 5}px`;
                }
                if (this.resizingEdge === "bottom") {
                    window.style.height = `${e.clientY - windowOffsetTop - 62}px`;
                }
                if(this.resizingEdge === "bottom-right") {
                    window.style.width = `${e.clientX - windowOffsetLeft - 5}px`;
                    window.style.height = `${e.clientY - windowOffsetTop - 62}px`;
                }

                /* Offset and width/height manipulation */
                if(this.resizingEdge === "top") {
                    window.style.top = `${e.clientY - 62}px`;
                    window.style.height = `${e.clientY - 62}px`;

                    console.log(window.offsetHeight )
                }
            },
            stopResize() {
                this.resizing = false;
                this.resizingEdge = null;
                this.$refs.container.removeEventListener("mousemove", this.onMouseMoveResize);
                this.$refs.container.removeEventListener("mouseup", this.stopResize);
            },

            /* DRAGGING */
            startDrag(index) {
                console.log("Start Drag")
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
        box-shadow: 0px 5px 10px rgba(0, 0, 0, .12);
        padding: 5px;
        width: auto;
        height: auto;
        z-index: 10;
        /* this will make sure that the active window is on top of the others */
    }

    .window-content {
        width: 100%;
        height: 100%;
    }

    .resize-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #ccc;
        z-index: 1000;
    }

    .resize-handle-top {
        top: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: n-resize;
    }

    .resize-handle-bottom {
        bottom: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: s-resize;
    }

    .resize-handle-left {
        top: 50%;
        left: -5px;
        margin-top: -5px;
        cursor: w-resize;
    }

    .resize-handle-right {
        top: 50%;
        right: -5px;
        margin-top: -5px;
        cursor: e-resize;
    }

    .resize-handle-top-left {
        top: -5px;
        left: -5px;
        cursor: nw-resize;
    }

    .resize-handle-top-right {
        top: -5px;
        right: -5px;
        cursor: ne-resize;
    }

    .resize-handle-bottom-left {
        bottom: -5px;
        left: -5px;
        cursor: sw-resize;
    }

    .resize-handle-bottom-right {
        bottom: -5px;
        right: -5px;
        cursor: se-resize;
    }

    .drag-handle {
        position: absolute;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
    }

    .window-manager {
        margin-top: 6.5rem;
    }
</style>