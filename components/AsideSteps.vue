<template lang="pug">
.aside-wrapper
  aside
    img(src="~/assets/images/arrange-them.svg")
    .pickables
      img(src="~/assets/images/step-forward.svg" @dragstart="drag($event)"  data-action="step-forward" draggable="true" id="1step")
      img(src="~/assets/images/2step-forward.svg" @dragstart="drag($event)"  data-action="2step-forward" draggable="true" id="2steps")
      img(src="~/assets/images/jump-up.svg" @dragstart="drag($event)"  data-action="jump-up" draggable="true" id="1jump")
      img(src="~/assets/images/2jump-up.svg" @dragstart="drag($event)"  data-action="2jump-up" draggable="true" id="2jumps")


</template>

<script>
export default {
  methods: {
    drag(ev) {
      ev.dataTransfer.setData('action', ev.target.dataset.action)
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 150px;
  background-color: rgba($color: #000000, $alpha: 0.2);
  .pickables {
    img {
      display: block;
      width: 60px;
      margin: 0 auto 20px;
      cursor: pointer;
    }
  }
}
</style>
