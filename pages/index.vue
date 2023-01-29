<template lang="pug">
div.container
  nuxt-link(to="/start/starttwo")
    img(src="~/assets/images/start.svg")


</template>

<script>
import Vue from 'vue'
import { gsap } from 'gsap'
const tl = gsap.timeline()

export default Vue.extend({
  name: 'IndexPage',
  beforeRouteLeave(to, from, next) {
    tl.kill()
    next()
  },
})
</script>

<style scoped>
a {
  width: 500px;
}
</style>
