<template lang="pug">
.container
  img(src="~/assets/images/level-one.svg")
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
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point higher" )
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
      title: 'Level One',
    }
  },
  computed: {
    character() {
      return this.$store.getters.character
    },
  },
  mounted() {
    this.interval()
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
    // --------------
    moves() {
      for (const action of this.actions) {
        if (action === 'step-forward') {
          this.stepForward()
        }
        if (action === '2step-forward') {
          this.twoStepsForward()
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

    // ------------------
    // ======  how to hide points
    // --------------
    interval() {
      setInterval(function () {
        const points = document.querySelectorAll('.points-wrapper img')
        const char = document.querySelector('.char').getBoundingClientRect()
        for (let point = 0; point < points.length; point++) {
          if (points[point].getBoundingClientRect().left <= char.right - 10) {
            points[point].classList.add('hide')
          }
        }
      }, 300)
    },
    hidePoints() {
      const points = document.querySelectorAll('.points-wrapper img')
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
  bottom: 63px;
  width: 35px;
  right: 15px;
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
  img:nth-child(2) {
    left: -6px;
  }
  img:nth-child(3) {
    left: -12px;
  }
  img:nth-child(4) {
    left: -20px;
  }
  img:nth-child(5) {
    left: -24px;
  }
  img:nth-child(6) {
    left: -29px;
  }
  img:nth-child(7) {
    left: -37px;
  }
  img:nth-child(8) {
    left: -41px;
  }
}
</style>
