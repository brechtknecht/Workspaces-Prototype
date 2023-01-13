<template>
    <div class="person-bar">
        <div class="person-bar-wrapper" :class={forceOut:isForcedOut}>
            <transition-group name="list" tag="ul">
                <div v-for="(member, index) in currentWorkspace.workspace.members" v-bind:key="member.name" class="list-complete-item">
                    <Person :person="member"/>
                </div>
            </transition-group>
        </div>
    </div>
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
    }
}
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .person-bar {
        position: fixed;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%) scale(.8);
        transition: 250ms; 
        animation-timing-function: cubic-bezier(0.5, 6.58, 0.5, -6.58);

        .person-bar-wrapper {
            transition: 250ms; 
            animation-timing-function: cubic-bezier(0.5, 6.58, 0.5, -6.58);
            transform: translateX(100%);
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

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(10rem);
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    .list-leave-active {
        position: absolute;
        transform: translateY(0);
    }

</style>