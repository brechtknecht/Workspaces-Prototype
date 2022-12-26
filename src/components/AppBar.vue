<template>
    <div class="app-bar">
        <div class="left">
            <div class="menu-element">
                <div class="app-entry">
                    <span>Finder</span>
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
            <div class="menu-element">
                <span>Workspace: </span>
            </div>
            <div class="menu-element">
                <span>Wifi</span>
            </div>
            <div class="menu-element">
                <span>Battery</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .app-bar {
        position: fixed;
        margin: 1rem;

        display: flex;
        justify-content: space-between;

        width: 100%;
        max-width: calc(100vw - 2rem);

        .left,
        .right {
            display: flex;
            max-width: 50%;

            .menu-element {
                display: flex;
                padding: .5rem .75rem;
                background: rgba(255,255,255,.15);
                border-radius: 12px;
                .menu-entry {
                    &:not(:first-child) {
                        margin-left: 1rem;
                    }
                }
            }


        }
    }
</style>