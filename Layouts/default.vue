<template lang="pug">
div.wrapper
  nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted() {
    const char = JSON.parse(localStorage.getItem('char'))
    if (char) {
      this.$store.dispatch('setCharacter', char)
    }
  },
}
</script>

<style>
.wrapper {
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 768px;
  min-width: 768px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: clip;
}
.char,
.hide {
  visibility: hidden;
}

.char {
  width: 89px;
  height: 115px;
}

.char img {
  height: 100% !important;
  width: 100% !important;
}

a {
  width: 100%;
}
</style>
