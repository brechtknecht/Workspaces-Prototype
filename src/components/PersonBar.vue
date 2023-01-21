<template>
    <Transition name="fade">
    <div v-if="currentWorkspace.properties.members">
        <div v-if="!uiState.personBarDisabled" class="person-bar">
            <div class="person-bar-wrapper forceOut" 
                @mouseover="startHover"
                @mouseleave="endHover"
            >
                <transition-group name="list" tag="ul">
                    <div v-for="(member, index) in currentWorkspace.properties.members" v-bind:key="member.name" class="list-complete-item">
                        <Person :person="member" :isHovered="this.isHovered"/>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</Transition>
</template>

<script>
import { mapState } from 'vuex' 

import Person from './base/Person.vue'

export default {
    components: {
        Person
    },
    computed:  {
        ...mapState([
            'workspace',
            'workspaces',
            'uiState'
        ]),
        currentWorkspace() {
            return this.workspaces[this.workspace.currentInt]
        },
        isForcedOut (){
            return this.uiState.personBarForcedOut
        }
    },
    data() {
        return {
            isHovered: false
        }
    },
    methods : {
        startHover () {
            this.isHovered = true
        },
        endHover () {
            this.isHovered = false
        }
    }
}
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: 0;
        margin: 0;
        transition: all 0.5s ease;
    }

    .person-bar {
        position: fixed;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.5s ease;

        z-index: 100000;

        .person-bar-wrapper {
            display: flex;
            transform: translateX(130%);

            background: rgba(255,255,255, .4);
            border: .5px solid rgba(255,255,255, .4);
            border-radius: 24px;
            padding: .5rem;

            max-height: 5000px;
            transition: max-height 0.5s ease-in-out;

            backdrop-filter: blur(32px);
            &.forceOut {
                transform: translateX(0) !important;
            }
        }

        &:hover {
            .person-bar-wrapper {
                transform: translateX(0);
            }
        }
    }

    .list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from{
        opacity: 0;
        transition: all 0.5s ease;
        transform: translateY(5rem);
    }

    .list-leave-to {
        transform: translateY(0);
        opacity: 0;
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    .list-leave-active {
        position: absolute;
        transform: translateY(5rem);
    }

</style>