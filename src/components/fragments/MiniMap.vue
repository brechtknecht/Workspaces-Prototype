<template>
    <Transition name="fade">
        <div v-if="!this.uiState.isInOverview" class="minimap">
            <div v-for="(workspaceElement, index) in workspaces" :key="workspaceElement.id" class="minimap-workspaces">
                <div class="minimap-workspace" :class="{
                    private: workspaceElement.properties.type == 'Private' ? true : false,
                    active: workspace.currentInt == index
                }">
                    <div v-for="space in workspaceElement.properties.spaces" :key="space.id" class="minimap-spaces">
                        
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>

import {mapState} from 'vuex'
export default {
    computed:  {
        ...mapState([
            'workspace',
            'workspaces',
            'uiState'
        ])
    },
}
</script>

<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.22s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .minimap {
        position: fixed;
        bottom: 1.5rem;
        left: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: .25rem;
        border: .5px solid rgba(255,255,255, .4);
        background: rgba(255,255,255, .25);
        border-radius: 12px;
        padding: .5rem;
        backdrop-filter: blur(4px);

        z-index: 100;
        .minimap-workspace {
            display: flex;
            gap: .5rem;
            transition: all 120ms cubic-bezier(0.075, 0.82, 0.165, 1);
            padding: .2rem;
            .minimap-spaces {
                width: 52px;
                height: 32px;
                width: 52px;
                height: 32px;
                border-radius: 7px;
                border-bottom: 1px solid rgba(0,0,0,.2);
                background: white;
            }

            &.active {
                box-shadow: inset 0px 0px 0px 1px rgba(255,255,255, .25);
                border-radius: 9px;
                background: rgba(255,255,255, .4)
            }

            &.private {
                .minimap-spaces {
                    background: rgba(0,0,0,.6);
                    border-bottom: 1px solid rgba(255,255,255, 0.2);
                }
            }
        }
    }
</style>