<template>
    <div class="minimap">
        <div v-for="workspace in workspaces" :key="workspace.id" class="minimap-workspaces">
            <div class="minimap-workspace">
                <div v-for="space in workspace.properties.spaces" :key="space.id" class="minimap-spaces">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'
export default {
    computed:  {
        ...mapState([
            'workspaces'
        ])
    },
}
</script>

<style lang="scss">
    .minimap {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        border: .5px solid rgba(255,255,255, .4);
        background: rgba(255,255,255, .25);
        border-radius: 12px;
        padding: .5rem;
        backdrop-filter: blur(4px);

        z-index: 100;
        .minimap-workspace {
            display: flex;
            gap: .5rem;
            .minimap-spaces {
                width: 52px;
                height: 32px;
                width: 52px;
                height: 32px;
                border-radius: 8px;
                border-bottom: 1px solid rgba(0,0,0,.2);
                background: white;
            }
        }
    }
</style>