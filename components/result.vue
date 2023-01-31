<template lang="pug">
.result(v-show="result === 0 || result === 'loose'")
  template(v-if="this.$route.name === 'levels-Four' && result === 0")
    img(src="~/assets/images/final-result.svg")
    img(class="final-result char-result dark" :src="resultImg.result")
    a(href="/live-game/" class="home")
  template(v-else)
    img( src="~/assets/images/result.svg")
    img(class="great" v-if="result === 0" src="~/assets/images/great.svg")
    h6(v-else) خسرت!! جرب مرة اخري
    img(class="char-result dark" :src="resultImg.result")
    div.buttons
      button(@click="refresh()")
        img(class="again" src="~/assets/images/again.svg")
      a(:href="nextLevel" v-if="result === 0")
        img(class="next-level" src="~/assets/images/next-level.svg")

</template>

<script>
import { gsap } from 'gsap'
const tl = gsap.timeline()

export default {
  name: 'ShowResult',
  beforeRouteLeave(to, from, next) {
    tl.kill()
    next()
  },
  props: {
    result: {
      type: [String, Number],
      default: 'loose',
    },
  },
  computed: {
    nextLevel() {
      if (this.$route.name === 'levels-One') {
        return '/live-game/levels/two'
      } else if (this.$route.name === 'levels-Two') {
        return '/live-game/levels/three'
      } else if (this.$route.name === 'levels-Three') {
        return '/live-game/levels/four'
      } else {
        return '/live-game/levels/one'
      }
    },
    resultImg() {
      return this.$store.getters.character
    },
  },
  watch: {
    result(newVal) {
      if (newVal === 0) {
        const result = document.querySelectorAll('.char-result')[0]
        setTimeout(() => {
          result.classList.remove('dark')
          result.classList.add('light')
        }, 2)
      }
      if (newVal === 0 || newVal === 'loose') {
        tl.from('.result', { opacity: 0, x: '-100%', y: '-100%' })
      }
    },
  },
  methods: {
    refresh() {
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
.result {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .home {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    bottom: 348px;
    right: 210px;
  }
  .char-result,
  h6,
  .great,
  .buttons,
  .final-result {
    position: absolute;
  }
  h6 {
    bottom: 283px;
    font-size: 27px;
  }
  .great {
    bottom: 348px;
  }
  .final-result {
    bottom: 190px;
  }
  .char-result {
    transition: all 3s ease;
  }
  .dark {
    filter: brightness(0);
    -webkit-filter: brightness(0);
    -ms-filter: brightness(0);
  }
  .light {
    filter: brightness(1);
    -webkit-filter: brightness(1);
    -ms-filter: brightness(1);
    -moz-filter: brightness(1);
    -o-filter: brightness(1);
  }
  .buttons {
    bottom: 135px;
    width: 342px;
    display: flex;
    justify-content: space-around;
    a {
      cursor: pointer;
      width: auto;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
