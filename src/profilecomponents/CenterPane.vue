<template>
  <div class="hello">
    <div id="border">
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CenterPane',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#border {
    height: 55px;
    background-color: #2f94a1;
}

</style>
