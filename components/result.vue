<template lang="pug">
.result(v-if="result === 0 || result === 'loose'")
  template(v-if="this.$route.fullPath === '/levels/four' && result === 0")
    img(src="~/assets/images/final-result.svg")
    img(class="final-result" src="~/assets/images/result-jenan.svg")
    nuxt-link(to="/" class="home")
  template(v-else)
    img(src="~/assets/images/result.svg")
    h6 {{ result === 0 ? "!! رائع" : "خسرت!! جرب مرة اخري" }}
    img(class="char-result" :src="resultImg.result" :class="[result === 0 ? 'light' : 'dark']")
    div.buttons
      button(@click="refresh()")
        img(class="again" src="~/assets/images/again.svg")
      nuxt-link(:to="nextLevel" v-if="result === 0")
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
      if (this.$route.fullPath === '/levels/one') {
        return '/levels/two'
      } else if (this.$route.fullPath === '/levels/two') {
        return '/levels/three'
      } else if (this.$route.fullPath === '/levels/three') {
        return '/levels/four'
      } else {
        return '/levels/one'
      }
    },
    resultImg() {
      return this.$store.getters.character
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
  display: none;
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
  .buttons,
  .final-result {
    position: absolute;
  }
  h6 {
    bottom: 283px;
    font-size: 27px;
  }
  .final-result {
    bottom: 190px;
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
