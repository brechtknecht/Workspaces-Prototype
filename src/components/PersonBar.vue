<template>
    <div class="person-bar">
        <transition-group name="list-complete" tag="p">
            <div v-for="member in currentWorkspace.workspace.members" v-bind:key="member" class="person list-complete-item">
                <h4>{{ member }}</h4>
            </div>
        </transition-group>
    </div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
    computed:  {
        ...mapState([
            'workspace',
            'workspaces'
        ]),
        currentWorkspace() {
            return this.workspaces[this.workspace.currentInt]
        }
    }
}
</script>

<style lang="scss">

    .person-bar {
        position: fixed;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%)
    }

    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }
    .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
    .list-complete-leave-active {
        position: absolute;
    }

</style>