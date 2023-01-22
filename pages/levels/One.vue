<template lang="pug">
.container
  img(src="~/assets/images/level-two.svg")
  run-bar
  aside-steps
  .char
    img(src="~/assets/images/jenan.svg" @click="moves")
  .points-wrapper
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point higher" ref="condiOne")
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point higher jump-down")
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point")

</template>

<script>
import { gsap } from 'gsap'
const tl = gsap.timeline()

export default {
  data() {
    return {
      actions: [],
      visiblePoints: [28],
    }
  },
  computed: {},
  created() {
    this.$nuxt.$on('actions', (payload) => {
      this.actions = payload
      this.moves()
    })
  },
  methods: {
    moves() {
      if (
        (this.actions[0] === '2step-forward' &&
          this.actions[1] !== 'jump-up') ||
        (this.actions[0] === 'step-forward' &&
          this.actions[1] !== 'step-forward') ||
        this.actions[0] === 'jump-up'
      ) {
        this.twoStepsForward()
        console.log('loose')
        return ''
      } else {
        for (const action of this.actions) {
          if (action === 'step-forward') {
            this.stepForward()
          }
          if (action === '2step-forward') {
            this.twoStepsForward()
          }
          if (action === 'jump-up') {
            this.jumpUp()
          }
        }
      }
    },
    stepForward() {
      tl.to('.char', {
        duration: 1,
        left:
          '+=' + document.querySelectorAll('.points-wrapper img')[0].offsetLeft,
        onComplete: () => this.hidePoints(),
      })
    },
    twoStepsForward() {
      tl.to('.char', {
        duration: 1,
        left:
          '+=' +
          document.querySelectorAll('.points-wrapper img')[0].offsetLeft * 2,
        onComplete: () => this.hidePoints(),
      })
    },
    jumpUp() {
      tl.to('.char', {
        duration: 1,
        bottom: '+=' + '58px',
        left: '+=' + '40px',
        onComplete: () => this.hidePoints(),
      })
    },
    hidePoints() {
      const points = document.querySelectorAll('.points-wrapper img')
      const char = document.querySelector('.char').getBoundingClientRect()
      for (let point = 0; point < points.length; point++) {
        if (points[point].getBoundingClientRect().left <= char.left + 20) {
          if (points[point].classList.contains('jump-down')) {
            tl.pause()
            gsap.to('.char', { bottom: 100, duration: 1 })
            tl.play()
          }
          points[point].classList.add('hide')
        } else {
          this.visiblePoints = points[point].offsetLeft
          console.log(points[point].offsetLeft)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.char {
  position: absolute;
  bottom: 100px;
  left: 2px;
  img {
    height: 115px;
  }
}
.points-wrapper {
  position: absolute;
  left: 0px;
  padding-left: 64px;
  width: 95%;
  bottom: 100px;
  display: flex;
  justify-content: space-around;
  .higher {
    position: relative;
    top: -58px;
  }
  img.hide {
    visibility: hidden;
  }
}
</style>
