<template>
  <!-- <transition name="modl"> -->
  <div class="hello">
    <h1><img src="../assets/circle.gif" /></h1>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'WaitCircle'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, .5);
  display: block;
  // transition: opacity .3s ease;
}

img {
  display: inner-block;
  margin-top: 25%;
  width: 40px;
  height: 40px;
  opacity: 0.5;
}

.modl-enter {
  opacity: 0;
}

.modl-leave-active {
  opacity: 0;
}

</style>
