<template>
    <Transition name="move-top">
        <div v-if="!uiState.isInOverview" class="app-bar">
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
                <Transition name="list" mode="out-in">
                    <div class="workspace-item-wrapper" :key="workspace.currentInt">
                        <div class="currentWorkspace menu-element" @click="toggleWorkspaceOptions">
                            <current-workspace :workspace="workspaces[workspace.currentInt]" />
                        </div>
                        <div v-if="showWorkspaceOptions" class="workspace-options-wrapper">
                            <workspace-options />
                        </div>
                    </div>
                </Transition>

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
    </Transition>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    import WorkspaceOptions from './fragments/AppBar/WorkspaceOptions.vue'
    import CurrentWorkspace from './fragments/AppBar/CurrentWorkspace.vue'

    export default {
        components: {
            WorkspaceOptions,
            CurrentWorkspace
        },
        data() {
            return {
                showWorkspaceOptions: false
            }
        },
        computed: {
            ...mapState([
                'workspace',
                'workspaces',
                'uiState'
            ])
        },
        methods: {
            toggleWorkspaceOptions() {
                console.log(this.showWorkspaceOptions)
                this.showWorkspaceOptions = !this.showWorkspaceOptions
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-move,
    /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
        position: relative;
        transition: all 0.18s ease;
    }

    .list-enter-from {
        position: relative;
        opacity: 0;
        transform: translateY(.5rem);
    }

    .list-leave-to {
        position: relative;
        opacity: 0;
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    .list-leave-active {
        position: relative;
        opacity: 0;
    }


    /* App-Bar disable animation when the overview is triggered */
    .move-top-enter-active,
    .move-top-leave-active {
        transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .move-top-enter-from,
    .move-top-leave-to {
        opacity: 0;
        transform: translateY(-150%)
    }

    .app-bar {
        position: fixed;
        margin: .75rem;

        z-index: 100000;

        display: flex;
        justify-content: space-between;

        width: 100%;
        max-width: calc(100vw - 2rem);

        .right {
            div:not(:last-child) {
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
                background: rgba(255, 255, 255, .8);
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

                    span {
                        max-width: 12rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .menu-entry {
                    &:not(:first-child) {
                        margin-left: 1rem;
                    }
                }
            }
        }

        .workspace-item-wrapper {
            position: relative;
        }

        .workspace-options-wrapper {
            position: absolute;
            top: calc(100% + .5rem);
            display: block;
            width: calc(100% - 1.5rem);
            background: rgba(255, 255, 255, .8);
            border-radius: 12px;
            padding: .5rem;
        }
    }
</style>