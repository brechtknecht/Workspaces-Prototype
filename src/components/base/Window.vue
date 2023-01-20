<template>
    <div ref="window" @mousedown="startDrag" class="window-inner" :id="properties.id">
        <div v-if="this.properties.iframe">
            <iframe :src="this.properties.iframe.url" width="100%" height="100%"></iframe>
        </div>
        <div v-else-if="this.properties.imageURL">
            <div class="background-window">
                test
            </div>
        </div>
        <div v-else>
            {{ this.properties }}
        </div>
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
    computed: {
        proxyUrl() {
            if(typeof this.properties.iframe === 'undefined') {return}
            return '/proxy/' + this.properties.iframe.url
        }
    }
}
</script>

<style lang="scss" scoped>

    .window-inner {
        width: 100%;
        height: 100%;
        div {
            width: 100%;
            height: 100%;
        }
    }
    .container {
        height: 100vh; 
        width: 100vw;
        position: relative;
        top: 0;
        left: 0;
    }
    
    iframe {
        border: 0;
    }

 

</style>