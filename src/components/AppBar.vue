<template>
    <div class="app-bar">
        <div class="left">
            <div class="menu-element">
                <div class="app-entry">
                    <span><b>Finder</b></span>
                </div>
                <div class="menu-entry">
                    <span>File</span>
                </div>
                <div class="menu-entry">
                    <span>Edit</span>
                </div>
                <div class="menu-entry">
                    <span>View</span>
                </div>
                <div class="menu-entry">
                    <span>Help</span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="menu-element currentWorkspace" @click="toggleOverview">
                <span>{{ workspaces[workspace.currentInt].workspace.title }}</span>
            </div>
            <div class="menu-element sf-symbols">
                <p class="p1">􀪷</p>
                <p class="p1">􀙇</p>
                <p class="p1">􀉤</p>
                <p class="p1">􀺸</p>
            </div>
            <div class="menu-element">
                <span>Battery</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
    computed:  {
        ...mapState([
            'workspace',
            'workspaces'
        ])
    },
    methods: {
        toggleOverview () {
            this.$store.commit('toggleWorkspacesOverview')
        }
    }
}
</script>

<style lang="scss">
    .app-bar {
        position: fixed;
        margin: .75rem;

        display: flex;
        justify-content: space-between;

        width: 100%;
        max-width: calc(100vw - 2rem);

        .right {
            .menu-element:not(:last-child) {
                margin-right: .5em;
            }
        }

        .left,
        .right {
            display: flex;
            max-width: 50%;

            .menu-element {
                display: flex;
                padding: .5rem .75rem;
                background: rgba(255,255,255,.8);
                border-radius: 12px;
                max-width: 100%;
                transition: all 250ms; 
                animation-timing-function: cubic-bezier(0.5, 6.58, 0.5, -6.58);
                &.sf-symbols {
                    p:not(:last-child) {
                        margin-right: .75rem;
                    }
                }

                &.currentWorkspace {
                    transition: all 250ms; 
                    animation-timing-function: cubic-bezier(0.5, 6.58, 0.5, -6.58);
                    max-width: 100%;
                }

                .menu-entry {
                    &:not(:first-child) {
                        margin-left: 1rem;
                    }
                }
            }


        }
    }
</style>