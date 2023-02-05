<template lang="pug">
.container
  img(src="~/assets/images/level-four.svg")
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
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point higher jump-down" )
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point higher")
    img(src="~/assets/images/point.svg" class="point more-high ")

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
      numOfVisibles: 7,
      points: [],
      patternOne: [
        'step-forward',
        'step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
        '2jump-up',
        '2jump-up',
      ],
      patternTwo: [
        '2step-forward',
        'jump-up',
        'jump-up',
        'step-forward',
        '2jump-up',
        '2jump-up',
      ],
      compareOne: 0,
      compareTwo: 0,
    }
  },
  head() {
    return {
      title: 'Level Four',
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
    // ------------------
    moves() {
      for (let i = 0; i < this.actions.length; i++) {
        if (this.actions[i] === this.patternOne[i]) this.compareOne++
        if (this.actions[i] === this.patternTwo[i]) this.compareTwo++
      }

      const compares = [
        { value: this.compareOne, pattern: 'patternOne' },
        { value: this.compareTwo, pattern: 'patternTwo' },
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
      } else if (action === '2jump-up') {
        this.twoJumpUp()
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
        bottom: '+=' + '65px',
        left: () => {
          return '+=' + (this.points[1] - this.points[0])
        },
        onComplete: () => this.hidePoints(),
      })
    },
    twoJumpUp() {
      tl.to('.char', {
        duration: 1,
        bottom: () => {
          if (this.numOfVisibles !== 1) {
            return '+=' + '90px'
          } else {
            gsap.to('.char', {
              bottom: '+=' + '50px',
            })
            gsap.to('.char', {
              duration: 1,
              left: '+=' + (this.points[1] - this.points[0] + 90),
            })
            tl.pause()
            setTimeout(() => {
              gsap.to('.char', {
                top: '+=' + '50px',
                duration: 1,
              })
              tl.play()
            }, 1000)
          }
        },
        left: () => {
          if (this.numOfVisibles !== 1)
            return '+=' + (this.points[1] - this.points[0] - 40)
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
          if (points[point].getBoundingClientRect().left <= char.right - 30) {
            points[point].classList.add('hide')
          }
        }
      }, 300)
    },
    hidePoints() {
      const points = document.querySelectorAll('.points-wrapper img')
      const char = document.querySelector('.char').getBoundingClientRect()
      for (let point = 0; point < points.length; point++) {
        if (
          points[point].getBoundingClientRect().left <= char.right &&
          char.bottom < points[point].getBoundingClientRect().bottom + 100
        ) {
          if (points[point].classList.contains('jump-down')) {
            document.querySelector('.char').classList.add('down')
          }
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
  &.down {
    transition: transform 1s ease;
    transform: translate(-3px, 57px);
  }
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
  img:nth-child(1) {
    left: -14px;
  }
  img:nth-child(2) {
    left: -31px;
  }
  img:nth-child(3) {
    left: -49px;
  }
  img:nth-child(4) {
    top: -126px;
    left: -66px;
  }
  img:nth-child(5) {
    left: -78px;
  }
  img:nth-child(6) {
    left: -108px;
    top: -167px;
  }
  img:nth-child(7) {
    left: -44px;
    top: -167px;
  }
  .higher {
    position: relative;
    top: -74px;
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
