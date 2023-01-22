<template lang="pug">
div.container
  nuxt-link(to="/start/starttwo")
    img(src="~/assets/images/start.svg")


</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style scoped>
a {
  width: 500px;
}
</style>
