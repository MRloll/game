<template lang="pug">
div.run-bar
  button(@click="stepBack()")
    img(src="~/assets/images/repeat-button.svg")
  span.picker(@dragover="allowDrop($event)" @drop="drop($event)")

  button(@click="sendActions")
    img(src="~/assets/images/run-button.svg")
</template>

<script>
import { gsap } from 'gsap'
const tl = gsap.timeline()
export default {
  data() {
    return {
      actions: [],
    }
  },
  mounted() {},
  methods: {
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault()
      const data = ev.dataTransfer.getData('action')
      if (data) {
        this.actions.push(data)
        const img = document.createElement('img')
        const picker = document.querySelector('span.picker')
        img.setAttribute('src', require(`~/assets/images/${data}.svg`))
        picker.appendChild(img)
      }
    },
    stepBack() {
      const picker = document.querySelector('span.picker')
      this.actions.pop()
      picker.removeChild(picker.lastChild)
    },
    sendActions() {
      if (this.actions.length > 0) {
        tl.to('.aside-wrapper', {
          x: '-100%',
          duration: 0.3,
          onComplete: () => {
            this.$nuxt.$emit('actions', this.actions)
          },
        })
        const moves = document.querySelectorAll('.char .moves')

        setInterval(() => {
          if (getComputedStyle(moves[0]).display === 'none') {
            moves[0].style.display = 'block'
            moves[1].style.display = 'none'
          } else {
            moves[0].style.display = 'none'
            moves[1].style.display = 'block'
          }
        }, 100)
        document.querySelector('.char .static').style.display = 'none'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.run-bar {
  position: absolute;
  top: 77px;
  left: 50%;
  z-index: 1;
  width: 59%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  button {
    padding: 0;
    outline: 0;
    border: none;
    background: none;
    cursor: pointer;
    img {
      display: block;
    }
  }
  .picker {
    width: 514px;
    background: white;
    height: 48px;
    border: 1px solid black;
    border-radius: 7px;
    margin: 0 5px;
    display: flex;
    align-items: center;
  }
}
</style>
