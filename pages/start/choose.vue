<template lang="pug">
.container
  img(src="~/assets/images/start-two.svg")
  .char-wrapper()
    a(href="/live-game/levels/one" v-for="char in characters" :key="char.name")
      img(:src="char.src" :alt="char.name" @click="setCharacter(char)")

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
      characters: [
        {
          src: require('~/assets/images/char-jenan.svg'),
          name: 'jenan',
          char: require('~/assets/images/jenan.svg'),
          result: require('~/assets/images/result-jenan.svg'),
          left: require('~/assets/images/jenan-left.svg'),
          right: require('~/assets/images/jenan-right.svg'),
        },
        {
          src: require('~/assets/images/char-sky-guard.svg'),
          name: 'sky-guard',
          char: require('~/assets/images/sky-guard.svg'),
          result: require('~/assets/images/result-sky-guard.svg'),
          left: require('~/assets/images/sky-guard-left.svg'),
          right: require('~/assets/images/sky-guard-right.svg'),
        },
        {
          src: require('~/assets/images/char-wingy.svg'),
          name: 'wingy',
          char: require('~/assets/images/wingy.svg'),
          result: require('~/assets/images/result-wingy.svg'),
          left: require('~/assets/images/wingy-left.svg'),
          right: require('~/assets/images/wingy-right.svg'),
        },
        {
          src: require('~/assets/images/char-light.svg'),
          name: 'light',
          char: require('~/assets/images/light.svg'),
          result: require('~/assets/images/result-light.svg'),
          left: require('~/assets/images/light-left.svg'),
          right: require('~/assets/images/light-right.svg'),
        },
      ],
    }
  },
  methods: {
    setCharacter(char) {
      this.$store.dispatch('setCharacter', char)
    },
  },
}
</script>

<style scoped lang="scss">
.char-wrapper {
  position: absolute;
  z-index: 1;
  left: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  a {
    cursor: pointer;
    transition: transform 1s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
