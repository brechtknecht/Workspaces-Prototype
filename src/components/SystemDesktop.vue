<template>
    <div class="workspaces" :class="{ overview: uiState.isInOverview }" @wheel="handleWheel">
        <div v-for="(workspace, index) in workspaces" :key="workspace.id" class="workspace" :data-a="index">
            <Workspace :workspace="workspace" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Workspace from './Workspace.vue'

    export default {
        data() {
            return {
                lastCrate: 0,
                nextCrate: 1,
                preventScrollRead: false,
                scrollPosition: 0,
                windowHeight: 0,
                triggerTime: 1000,
                observer: null,
                scrollDown: null,
                intervals: [],
                currentWorkspace: 0,
                scrollTimeout: null,
                touchEndTimeout: null,
                
                isInOverview : true
            }
        },
        components : {
            Workspace
        },
        computed: {
            ...mapState([
                'workspaces',
                'uiState'
            ]),
            numberOfWorkspaces: function () {
                return this.workspaces.length
            }
        },
        mounted() {
            window.addEventListener('keydown', this.handleShortcuts);

            this.$el.addEventListener("wheel", (e) => {

                // When scrolling, force the toobar to be out
                this.$store.commit('showPersonBar', 'infinite')

                clearTimeout(this.scrollTimeout);
                clearTimeout(this.touchEndTimeout);
                this.scrollTimeout = setTimeout(() => {
                    // console.log("Scrolling has stopped.");
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
        destroyed() {
            this.$el.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener("keydown", this.handleShortcuts);
        },
        methods: {
            handleShortcuts(e) {
                if (e.shiftKey && e.key === 'ArrowDown') {
                    console.log('Shortcut Down Triggered!')
                    this.moveDown()
                }

                if (e.shiftKey && e.key === 'ArrowUp') {
                    console.log('Shortcut Up Triggered!')
                    this.moveUp()
                }
            },
            moveUp () {
                let upperScrollPos = 0
                if(this.lastCrate > 0) {
                    upperScrollPos = this.$el.children[this.lastCrate - 1].offsetTop;
                    console.log(upperScrollPos)
                }
            
                this.$el.scrollTo({
                    top: upperScrollPos,
                    behavior: 'smooth'
                })

                this.$store.commit('showPersonBar', 1500)
            },
            moveDown() {
                let upperScrollPos = 0
                if(this.lastCrate < this.numberOfWorkspaces) {
                    upperScrollPos = this.$el.children[this.lastCrate + 1].offsetTop;
                }

                this.$el.scrollTo({
                    top: upperScrollPos,
                    behavior: 'smooth'
                })

                this.$store.commit('showPersonBar', 1500)
            },
            intersectioHandler([entries], observer) {
                // Sets lastCrate, when the intersection is made
                let intersectionIndex = entries.target.attributes["data-a"].value
                this.currentWorkspace = intersectionIndex
                this.lastCrate = parseInt(intersectionIndex)

                this.$store.commit('setCurrentWorkspace', this.currentWorkspace)
            },
            handleWheel(event) {
                if (event.deltaY > 0) {
                    this.scrollDown = true
                    this.nextCrate = this.mod(parseInt(this.lastCrate) + 1, this.numberOfWorkspaces)
                }
                if (event.deltaY < 0) {
                    this.scrollDown = false
                    this.nextCrate = this.mod(parseInt(this.lastCrate) - 1, this.numberOfWorkspaces)
                }

               this.handleAnimation()
            },
            handleScroll(event) {
                // Any code to be executed when the window is scrolled
                this.scrollPosition = this.$el.scrollTop;
                this.windowHeight = window.innerHeight

                for(let i = 0; i < this.numberOfWorkspaces; i++) {
                    this.intervals[i] = {
                        pixel: i * this.windowHeight,
                        id: i
                    }
                }

                this.intervals.forEach((interval) => {
                    if(this.$el.scrollTop > interval.pixel) {
                        this.lastCrate = interval.id
                        return
                    }
                })
                
                // Determine the closest edge
                // console.log("currentworkspace:", this.currentWorkspace)

                let closestCorner = this.$el.scrollTop / this.windowHeight
                let scrollTo = (Math.round(closestCorner) * (this.windowHeight + (40)))

                this.$el.scrollTo({
                    top: scrollTo,
                    left: 0,
                    behavior: 'smooth'
                })

                // When scrolling is finished, hide the toolbar again
                this.$store.commit('hidePersonBarWithDelay', 2500)
            },
            handleAnimation() {
                // console.log(this.$el.querySelector('.workspace[data-a="' + this.lastCrate + '"]'))
                let scrollModifier = (this.$el.scrollTop % this.windowHeight)
                
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
    .workspaces {
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100vw;
        max-width: 100vw;
        scroll-behavior: smooth;
        height: 100vh;
        transition: .25s; 
        animation-timing-function: cubic-bezier(0.5, 6.58, 0.5, -6.58);
        
        display: flex;
        flex-direction: column;

        background: #000000;
        // scroll-snap-stop: normal;
        // scroll-snap-type: y proximity;

        .workspace:not(:last-child) {
            margin-bottom: 40px;
        }

        .workspace {
            width: 100vw;
            height: 100vh;
            scroll-snap-align: start;
            background-size: cover;
            display: block;

            &__image {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 82rem;
                height: 60rem;
                max-height: 80vh;
                background-size: cover !important;
                background-position: center center;
            }

            .parallax::after {
                content: " ";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                transform: translateZ(-1px) scale(1.5);
                background-size: 100%;
                z-index: -1;
            }
        }
    }
</style>