<template>
    <div class="current-workspace">
        {{ this.workspace.properties.title }}
        <div class="image-wrapper">
            <div v-for="person in this.workspace.properties.members.slice(0, 3)" :key="person.name" class="image" :style="{
                    'background': 'url(' + person.image + ')',
                    'border': '2.5px solid' + person.color
            }"></div>
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