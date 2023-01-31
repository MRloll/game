<template lang="pug">
.container
  img(src="~/assets/images/level-three.svg")
  run-bar
  aside-steps
  result(:result="numOfVisibles")
  .char
    img(:src="character.char" :alt="character.name")
  a(href="/live-game/")
    img(src="~/assets/images/last-point.svg" class="last-point")
  .points-wrapper
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point")
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point higher" )
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point more-high jump-down")
    img(src="~/assets/images/point.svg" class="point more-high")
    img(src="~/assets/images/point.svg" class="point more-high")

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
      numOfVisibles: 9,
      points: [],
      patternOne: [
        'step-forward',
        'step-forward',
        'jump-up',
        'step-forward',
        'step-forward',
        'step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
      ],
      patternTwo: [
        '2step-forward',
        'jump-up',
        '2step-forward',
        'step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
      ],
      patternThree: [
        '2step-forward',
        'jump-up',
        'step-forward',
        '2step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
      ],
      patternFour: [
        '2step-forward',
        'jump-up',
        'step-forward',
        'step-forward',
        'step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
      ],
      patternFive: [
        'step-forward',
        'step-forward',
        'jump-up',
        'step-forward',
        '2step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
      ],
      patternSix: [
        'step-forward',
        'step-forward',
        'jump-up',
        '2step-forward',
        'step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
      ],
      compareOne: 0,
      compareTwo: 0,
      compareThree: 0,
      compareFour: 0,
      compareFive: 0,
      compareSix: 0,
    }
  },
  head() {
    return {
      title: 'Level Three',
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
      for (let i = 0; i < this.actions.length; i++) {
        if (this.actions[i] === this.patternOne[i]) this.compareOne++
        if (this.actions[i] === this.patternTwo[i]) this.compareTwo++
        if (this.actions[i] === this.patternThree[i]) this.compareThree++
        if (this.actions[i] === this.patternFour[i]) this.compareFour++
        if (this.actions[i] === this.patternFive[i]) this.compareFive++
        if (this.actions[i] === this.patternSix[i]) this.compareSix++
      }

      const compares = [
        { value: this.compareOne, pattern: 'patternOne' },
        { value: this.compareTwo, pattern: 'patternTwo' },
        { value: this.compareThree, pattern: 'patternThree' },
        { value: this.compareFour, pattern: 'patternFour' },
        { value: this.compareFive, pattern: 'patternFive' },
        { value: this.compareSix, pattern: 'patternSix' },
      ]

      let i = 0
      let superiority = {}
      for (const f of compares) {
        if (f.value > i) {
          i = f.value
          superiority = { value: f.value, pattern: f.pattern }
        }
      }

      for (let i = 0; i < this.actions.length; i++) {
        if (this.actions[0] === 'jump-up') {
          this.jumpUp()
          break
        } else if (this.actions[0] === '2jump-up') {
          this.twoJumpUp()
          break
        } else if (this.actions[i] === this[superiority.pattern][i]) {
          this.validate(this.actions[i])
        }
      }
    },
    validate(action) {
      if (action === '2step-forward') {
        this.twoStepsForward()
      } else if (action === 'step-forward') {
        this.stepForward()
      } else if (action === 'jump-up') {
        this.jumpUp()
      }
    },
    // ------------------
    // ======  animation
    // --------------
    stepForward() {
      tl.to('.char', {
        duration: 1,
        left: () => {
          if (this.numOfVisibles !== 2) {
            return '+=' + (this.points[1] - this.points[0])
          } else {
            return '+=' + (this.points[1] - this.points[0] + 50)
          }
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
        left: () => {
          if (this.numOfVisibles !== 2) {
            return '+=' + (this.points[1] - this.points[0])
          } else {
            return '+=' + (this.points[1] - this.points[0] + 50)
          }
        },
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
            setTimeout(() => {
              gsap.to('.char', {
                y: '-=' + '-48px',
                duration: 1,
              })
            }, 1000)
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
  img:nth-child(4) {
    left: -20px;
  }
  img:nth-child(5) {
    left: -40px;
  }
  img:nth-child(6) {
    left: -60px;
  }
  img:nth-child(7) {
    left: -70px;
  }
  img:nth-child(8) {
    left: -30px;
  }
  img:nth-child(9) {
    left: -50px;
  }
  .higher {
    position: relative;
    top: -58px;
  }
  .more-high {
    position: relative;
    top: -130px;
  }
  img.hide {
    visibility: hidden;
  }
}
</style>
