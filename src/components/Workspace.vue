<template>
  <div class="spaces-wrapper">
    <div v-for="(space, index) in workspace.workspace.spaces" :key="space.title" class="space" :data-a="index">
      <span>{{ workspace.title }}</span>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  data() {
      return {
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
        currentWorkspace: 0,
        scrollTimeout: null,
        touchEndTimeout: null,
        

        isInOverview : true
      }
  },
  computed: {
      ...mapState([
          'workspaces',
          'uiState'
      ]),
      numberOfWorkspaces: function () {
          return this.workspace.workspace.spaces.length
      }
  },
  props: {
    workspace: Object
  },
  mounted() {
      this.$el.addEventListener("wheel", (e) => {

          // When scrolling, force the toobar to be out
          this.$store.commit('togglePersonBarForcedOut', true)

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
  },
  methods: {
      intersectioHandler([entries], observer) {
          // Sets lastCrate, when the intersection is made
          let intersectionIndex = entries.target.attributes["data-a"].value
          this.currentWorkspace = intersectionIndex
          this.lastCrate = parseInt(intersectionIndex)
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
          // Any code to be executed when the window is scrolled
          this.scrollPosition = this.$el.scrollLeft;
          this.windowWidth = window.innerWidth

          for(let i = 0; i < this.numberOfWorkspaces; i++) {
              this.intervals[i] = {
                  pixel: i * this.windowWidth,
                  id: i
              }
          }

          this.intervals.forEach((interval) => {
              if(this.$el.scrollLeft > interval.pixel) {
                  this.lastCrate = interval.id
                  return
              }
          })
          
          // Determine the closest edge
          // console.log("currentworkspace:", this.currentWorkspace)

          let closestCorner = this.$el.scrollLeft / this.windowWidth
          let scrollTo = (Math.round(closestCorner) * (this.windowWidth + (40)))

          this.$el.scrollTo({
              left: scrollTo,
              top: 0,
              behavior: 'smooth'
          })

          // When scrolling is finished, hide the toolbar again
          this.$store.commit('togglePersonBarForcedOut', false)


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
.spaces-wrapper {
  display: flex;
  overflow-x: scroll;
  
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
</style>
