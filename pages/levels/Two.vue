<template lang="pug">
.container
  img(src="~/assets/images/level-two.svg")
  run-bar
  aside-steps
  .win(v-show="numOfVisibles == 0 ") راءع لقد كسبت
  .loose(v-show="numOfVisibles == 'loose' ") lost
  .char
    img(:src="character.char" :alt="character.name")
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
  data() {
    return {
      actions: [],
      numOfVisibles: 8,
      points: [],
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
          points[point].getBoundingClientRect().left <= char.left + 20 &&
          char.bottom < points[point].getBoundingClientRect().bottom + 100
        ) {
          if (points[point].classList.contains('jump-down')) {
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

      // tl.to('.char', {
      //   onComplete: () => {
      //     if (this.numOfVisibles !== 0) {
      //       this.numOfVisibles = 'loose'
      //     }
      //   },
      // })
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
.win,
.loose {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #aba0a0;
  z-index: 1;
}

.points-wrapper {
  position: absolute;
  left: 0px;
  padding-left: 64px;
  width: 95%;
  bottom: 100px;
  display: flex;
  justify-content: space-around;
  img {
    position: relative;
  }
  img:nth-child(1) {
    left: 21px;
  }
  img:nth-child(2) {
    left: 32px;
  }
  img:nth-child(3) {
    left: 36px;
  }
  img:nth-child(4) {
    left: 16px;
  }
  img:nth-child(5) {
    left: -6px;
  }
  img:nth-child(6) {
    left: -23px;
  }
  img:nth-child(7) {
    left: -19px;
  }
  img:nth-child(8) {
    left: -12px;
  }
  img:nth-child(9) {
    left: -11px;
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
