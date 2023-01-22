<template lang="pug">
div.wrapper
  nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
.wrapper {
  height: 100vh;
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
}

a {
  width: 100%;
}
</style>
