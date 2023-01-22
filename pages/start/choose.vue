<template lang="pug">
.container
  img(src="~/assets/images/start-two.svg")
  .char-wrapper
    nuxt-link(to="/levels/one")
      img(src="~/assets/images/char-jenan.svg")
    nuxt-link(to="/levels/one")
      img(src="~/assets/images/char-sky-guard.svg")
    nuxt-link(to="/levels/one")
      img(src="~/assets/images/char-wingy.svg")
    nuxt-link(to="/levels/one")
      img(src="~/assets/images/char-light.svg")

</template>

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
