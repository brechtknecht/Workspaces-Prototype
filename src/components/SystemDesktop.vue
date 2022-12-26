<template>
    <div class="workspaces" @wheel="handleWheel">
        <div v-for="(workspace, index) in workspaces" :key="workspace.id" class="workspace active" :data-a="index">
            <Workspace :title="workspace.title" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    import { vElementVisibility } from '@vueuse/components'

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
                currentWorkspace: 0
            }
        },
        components : {
            Workspace
        },

        computed: {
            ...mapState([
                'workspaces'
            ]),
            numberOfWorkspaces: function () {
                return this.workspaces.length
            }
        },
        mounted() {
            this.$el.addEventListener('scroll', this.handleScroll);

            let workspaces = this.$el.children

            let options = {
                root: this.$el, // relative to document viewport 
                rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
                threshold: 0.7 // visible amount of item shown in relation to root
            };

            this.observer = new IntersectionObserver(this.intersectioHandler, options);
            for (let workspace of workspaces) {
                this.observer.observe(workspace)
            }
        },
        destroyed() {
            this.$el.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
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
                this.scrollPosition = event.target.scrollTop;
                this.windowHeight = window.innerHeight

                for(let i = 0; i < this.numberOfWorkspaces; i++) {
                    this.intervals[i] = {
                        pixel: i * this.windowHeight,
                        id: i
                    }
                }

                this.intervals.forEach((interval) => {
                    if(this.scrollPosition > interval.pixel) {
                        this.lastCrate = interval.id
                        return
                    }
                })

                if (this.preventScrollRead) {
                    return
                }

                this.preventScrollRead = true

                setTimeout(() => {
                    // Determine the closest edge
                    console.log("currentworkspace:", this.currentWorkspace)


                    let closestCorner = this.scrollPosition / (this.windowHeight)
                    let scrollTo = Math.round(closestCorner) * this.windowHeight + (40 * this.currentWorkspace)

                    // Scroll to Edge
                    this.$el.scrollTo({
                        top: scrollTo,
                        left: 0,
                        behavior: 'smooth'
                    })

                    // Activate the ability to ScrollRead again
                    this.preventScrollRead = false
                }, this.triggerTime)
            },
            handleAnimation() {
                // console.log(this.$el.querySelector('.workspace[data-a="' + this.lastCrate + '"]'))
                let scrollModifier = (this.scrollPosition % this.windowHeight)
                
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
        scroll-behavior: smooth;
        height: 100vh;
        // scroll-snap-stop: normal;
        // scroll-snap-type: y proximity;

        .workspace {
            width: 100%;
            height: 100vh;
            scroll-snap-align: start;
            background-size: cover;
            display: none;

            margin-bottom: 40px;

            &.active {
                display: block;
            }

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