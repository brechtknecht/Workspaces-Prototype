<template>
    <div class="current-workspace" :class="{private : this.workspace.properties.type == 'Private' ? true : false}">
        <span>{{ this.workspace.properties.title }}</span>
        <div class="image-wrapper" v-if="this.workspace.properties.members">
            <div v-for="person in this.workspace.properties.members?.slice(0, 3)" :key="person.name" class="image" :style="{
                    'background': 'url(' + person.image + ')',
                    'border': '2.5px solid' + person.color
            }"></div>
        </div>
        <div v-if="this.workspace.properties.type == 'Private'" class="menu-element sf-symbols">
            <p class="p1">􀎡</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        workspace: Object
    }
}
</script>

<style lang="scss" scoped>
    .current-workspace {
        display: flex;
        gap: 1rem;
        align-items: center;

        &.private {
            span, p {
                color: rgba(255,255,255,.9)
            }
        }
        .image-wrapper {
            --gap: -0.35rem; /* 👈 gap control */
            display: flex;
            flex-wrap: wrap;
            margin-bottom: calc(-1 * var(--gap));
            margin-left: calc(-1 * var(--gap));
        }
        .image {
            /* Auto layout */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            isolation: isolate;
            border-radius: 100%;

            width: 20px;
            height: 20px;
            
            margin-bottom: var(--gap);
            margin-left: var(--gap);
            background-size: cover !important;
        }
    }
</style>