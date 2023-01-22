<template lang="pug">
.container
  img(src="~/assets/images/start-two.svg")
  nuxt-link.start-two-image(to="/start/choose")
    img(src="~/assets/images/start-two-image.svg")

</template>

<style scoped>
.start-two-image {
  position: absolute;
  z-index: 1;
}
</style>
