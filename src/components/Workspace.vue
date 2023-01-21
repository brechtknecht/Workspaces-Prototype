<template>
    <div class="spaces-wrapper">
        <!-- Instanciate Multiplayer Stage if activated -->
        <div v-if="workspaceObject.properties.multiplayer?.isMultiplayerSession" class="multiplayer">
            <span>{{message}}</span>
            <window-manager :windows="workspaceObject.properties.multiplayer.multiplayerWindows"/>
        </div>
        <div v-for="(space, index) in workspaceObject.properties.spaces" :key="space.title" class="space" :id="index" :data-a="index">
            <window-manager :windows="space.windows" />
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import WindowManager from '../managers/WindowManager.vue'

    import Multiplayer from '../components/fragments/Multiplayer.vue'

    import {
        createClient
    } from "@liveblocks/client";

    // Create a Liveblocks client
    // Replace this key with your secret key provided at
    // https://liveblocks.io/dashboard/projects/{projectId}/apikeys
    const client = createClient({
        publicApiKey: "pk_test_eIG6RaAPNwq3pfK_7rJ9ZPW6",
    });

    export default {
        data() {
            return {
                index: 0,

                users: [],

                lastCrate: 0,
                nextCrate: 1,
                preventScrollRead: false,
                scrollPosition: 0,
                windowWidth: 0,
                triggerTime: 1000,
                observer: null,
                scrollRight: null,
                intervals: [],
                currentSpace: 0,
                scrollTimeout: null,
                touchEndTimeout: null,
                previousSpace: 0,

                isInOverview: true,

                message: "You’re the only one here.",

                windows: ["1", "2", "3"],
                activeWindow: null,
            }
        },
        components: {
            WindowManager,
            Multiplayer
        },
        computed: {
            ...mapState([
                'workspace',
                'workspaces',
                'uiState'
            ]),
            numberOfWorkspaces: function () {
                return this.workspaceObject.properties.spaces?.length
            },
            roomId () {
                return this.workspaceObject.properties.multiplayer?.roomId
            }
        },
        props: {
            workspaceObject: Object,
            workspaceIndex: Number
        },
        mounted() {
            this.initLiveblocks();

            window.addEventListener('keydown', this.handleShortcuts);

            this.$el.addEventListener("wheel", (e) => {

                console.log("scrolling")

                clearTimeout(this.scrollTimeout);
                clearTimeout(this.touchEndTimeout);
                this.scrollTimeout = setTimeout(() => {
                    console.log("Scrolling has stopped.");
                    this.handleScroll(e)
                }, 100);
            });

            let workspaces = this.$el.children

            let options = {
                root: this.$el, // relative to document viewport 
                rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
                threshold: 0.5 // visible amount of item shown in relation to root
            };

            this.observer = new IntersectionObserver(this.intersectioHandler, options);
            for (let workspace of workspaces) {
                this.observer.observe(workspace)
            }
        },
        unmounted() {
            this._unsubscribeOthers();
            client.leave(this.roomId);
        },
        destroyed() {
            this.$el.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener("keydown", this.handleShortcuts);
        },
        methods: {
            initLiveblocks() {
                const room = client.enter(this.roomId, {
                    initialPresence: {}
                });
                this._unsubscribeOthers = room.subscribe("others", this.onOthersChange);
            },
            onOthersChange(others) {
                if (others.count === 0) {
                    this.message = "You’re the only one here.";
                } else if (others.count === 1) {
                    this.message = "There is one other person here.";
                } else {
                    this.message = "There are " + others.count + " other people here.";
                }
            },

            handleShortcuts(e) {
                if (e.shiftKey && e.key === 'ArrowRight') {
                    console.log('Shortcut Right Triggered!')
                    this.moveLeading()
                }
                
                if (e.shiftKey && e.key === 'ArrowLeft') {
                    console.log('Shortcut Left Triggered!')
                    this.moveTrailing()
                }
            },
            moveTrailing () {
                let element
                if(this.lastCrate > 0) {
                    element = this.$el.querySelector(`[id='${this.lastCrate - 1}']`)
                } else {
                    element = this.$el.querySelector(`[id=0']`)
                }
            
                this.$el.scrollTo({
                    left: element.offsetLeft,
                    behavior: 'smooth'
                })
                console.log("SPACE:", element.id)

                this.$store.commit('showPersonBar', 1500)
            },
            moveLeading() {
                let element;
                if(this.lastCrate < this.numberOfWorkspaces) {
                    element = this.$el.querySelector(`[id='${this.lastCrate + 1}']`)
                } else {
                    element = this.$el.querySelector(`[id='${this.numberOfWorkspaces}']`)
                }

                this.$el.scrollTo({
                    left: element.offsetLeft,
                    behavior: 'smooth'
                })

                let spacePosition = {workspacePosition: this.workspaceIndex, spacePosition: element.id}
                this.$store.commit('setSpacePosition', spacePosition)

                this.$store.commit('showPersonBar', 1500)
            },
            intersectioHandler([entries], observer) {
                // Sets lastCrate, when the intersection is made
                let intersectionIndex = entries.target.attributes["data-a"].value
                this.currentSpace = intersectionIndex
                this.lastCrate = parseInt(intersectionIndex)
                const state = {currentWorkspace : this.workspace.currentInt, currentSpace: this.currentSpace}
    
                this.$store.commit('setCurrentWorkspaceArray', state)
            },
            handleWheel(event) {
                if (event.deltaX > 0) {
                    this.scrollRight = true
                    this.nextCrate = this.mod(parseInt(this.lastCrate) + 1, this.numberOfWorkspaces)
                }
                if (event.deltaX < 0) {
                    this.scrollRight = false
                    this.nextCrate = this.mod(parseInt(this.lastCrate) - 1, this.numberOfWorkspaces)
                }

                this.handleAnimation()
            },
            handleScroll(event) {
                this.scrollPosition = this.$el.scrollLeft;
                this.windowWidth = window.innerWidth

                for (let i = 0; i < this.numberOfWorkspaces; i++) {
                    this.intervals[i] = {
                        pixel: i * this.windowWidth,
                        id: i
                    }
                }

                this.intervals.forEach((interval) => {
                    if (this.$el.scrollLeft > interval.pixel) {
                        this.lastCrate = interval.id
                        return
                    }
                })

                // Determine the closest edge
                // console.log("currentSpace:", this.currentSpace)

                let closestCorner = this.$el.scrollLeft / this.windowWidth
                let scrollTo = (Math.round(closestCorner) * (this.windowWidth + (40)))

                this.previousSpace = this.lastCrate

                this.$el.scrollTo({
                    left: scrollTo,
                    top: 0,
                    behavior: 'smooth'
                })

                // When scrolling is finished, hide the toolbar again
                this.$store.commit('hidePersonBarWithDelay', 3500)


            },
            handleAnimation() {
                // console.log(this.$el.querySelector('.workspace[data-a="' + this.lastCrate + '"]'))
                let scrollModifier = (this.$el.scrollLeft % this.windowWidth)

                // Add or remove styles from the elements

                // this.$el.querySelector('.workspace[data-a="' + this.lastCrate + '"]').style.clipPath = "inset( 0 0 " + scrollModifier + "px 0)"
            },
            mod(n, m) {
                return ((n % m) + m) % m;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .window-wrapper {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #ccc;
        padding: 20px;
        width: 50px;
        height: 50px;
        z-index: 10;
        /* this will make sure that the active window is on top of the others */
    }

    .spaces-wrapper {
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        max-height: 100vh;

        .space {
            min-width: 100vw;
            width: 100vw !important;
            height: 100vh;
            background: url('/assets/macOS-Background.png');
            background-size: cover;

            display: flex;
            align-items: center;
            justify-content: center
        }

        .space:not(:last-child) {
            margin-right: 40px;
        }
    }

    .multiplayer {
        background: url('/assets/macOS-Background.png');
        margin-right: 40px;
        box-shadow:inset 0px 0px 0px 6px #f00;
    }

    .window {
        position: absolute;
    }
</style>