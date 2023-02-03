<template lang="pug">
.container
  img(src="~/assets/images/level-two.svg")
  run-bar
  aside-steps
  result(:result="numOfVisibles")
  .char
    img(class="static" :src="character.char" :alt="character.name")
    img(class="moves left" :src="character.left" :alt="character.name")
    img(class="moves right" :src="character.right" :alt="character.name")
  a(href="/live-game/")
    img(src="~/assets/images/last-point.svg" class="last-point")
  .points-wrapper
    img(src="~/assets/images/point.svg" class="point" ref="p")
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point higher" )
    img(src="~/assets/images/point.svg" class="point higher")
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
  beforeRouteLeave(to, from, next) {
    tl.kill()
    next()
  },

  data() {
    return {
      actions: [],
      numOfVisibles: 8,
      points: [],
    }
  },
  head() {
    return {
      title: 'Level Two',
    }
  },
  computed: {
    character() {
      return this.$store.getters.character
    },
  },
  mounted() {
    const points = document.querySelectorAll('.points-wrapper img')
    for (let i = 0; i < points.length; i++) {
      this.points.push(points[i].offsetLeft)
    }
  },
  created() {
    this.$nuxt.$on('actions', (payload) => {
      this.actions = payload
      this.moves()
    })
  },
  methods: {
    // ------------------
    // ======  steps to win
    // ------------------
    moves() {
      if (
        (this.actions[0] === '2step-forward' &&
          this.actions[1] !== 'jump-up') ||
        (this.actions[0] === 'step-forward' &&
          this.actions[1] !== 'step-forward') ||
        this.actions[0] === 'jump-up'
      ) {
        if (this.actions[0] === 'step-forward') {
          this.stepForward()
        } else if (this.actions[0] === '2step-forward') {
          this.twoStepsForward()
        } else if (this.actions[0] === 'jump-up') {
          this.jumpUp()
        }
      } else {
        for (let i = 0; i < this.actions.length; i++) {
          if (this.actions[i] === 'step-forward') {
            this.stepForward()
          }
          if (this.actions[i] === '2step-forward') {
            this.twoStepsForward()
          }
          if (this.actions[i] === 'jump-up') {
            this.jumpUp()
          }
        }
      }
    },
    // ------------------
    // ======  animation
    // --------------
    stepForward() {
      tl.to('.char', {
        duration: 1,
        left: () => {
          return '+=' + (this.points[1] - this.points[0])
        },
        onComplete: () => this.hidePoints(),
      })
    },
    twoStepsForward() {
      tl.to('.char', {
        duration: 1,
        left: () => {
          return '+=' + (this.points[2] - this.points[0])
        },
        onComplete: () => this.hidePoints(),
      })
    },
    jumpUp() {
      tl.to('.char', {
        duration: 1,
        bottom: '+=' + '58px',
        left: '+=' + '100px',
        onComplete: () => this.hidePoints(),
      })
    },

    // ------------------
    // ======  how to hide points
    // --------------
    hidePoints() {
      const points = document.querySelectorAll('.points-wrapper img')
      const char = document.querySelector('.char').getBoundingClientRect()
      for (let point = 0; point < points.length; point++) {
        if (
          points[point].getBoundingClientRect().left <= char.right &&
          char.bottom < points[point].getBoundingClientRect().bottom + 100
        ) {
          const jumpdown = document.querySelector(
            '.points-wrapper img.jump-down'
          )

          if (
            points[point].classList.contains('jump-down') &&
            getComputedStyle(jumpdown).visibility !== 'hidden'
          ) {
            gsap.to('.char', { bottom: 100, duration: 1 })
          }
          points[point].classList.add('hide')
        }
      }
      let a = 0
      for (let point = 0; point < points.length; point++) {
        if (getComputedStyle(points[point]).visibility === 'visible') {
          a++
          this.numOfVisibles = a
        } else {
          this.numOfVisibles = 0
        }
      }

      if (this.points.length > 4) {
        const newPoints = this.points.filter((pos) => {
          return pos > document.querySelector('.char').offsetLeft
        })

        this.points = newPoints
      }

      tl.to('.char', {
        onComplete: () => {
          if (this.numOfVisibles !== 0) {
            this.numOfVisibles = 'loose'
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.char {
  position: absolute;
  bottom: 100px;
  left: 2px;
}

.last-point {
  position: absolute;
  bottom: 53px;
  width: 36px;
  right: 7px;
}

.points-wrapper {
  position: absolute;
  left: 0px;
  padding-left: 93px;
  width: 95%;
  bottom: 100px;
  display: flex;
  justify-content: space-around;
  img {
    position: relative;
  }
  img:nth-child(1) {
    left: 1px;
  }
  img:nth-child(2) {
    left: 2px;
  }
  img:nth-child(3) {
    left: 6px;
  }
  img:nth-child(4) {
    left: -16px;
  }
  img:nth-child(5) {
    left: -36px;
  }
  img:nth-child(6) {
    left: -53px;
  }
  img:nth-child(7) {
    left: -49px;
  }
  img:nth-child(8) {
    left: -42px;
  }
  img:nth-child(9) {
    left: -41px;
  }

  .higher {
    position: relative;
    top: -58px;
  }
  img.hide {
    visibility: hidden;
  }
}
</style>
