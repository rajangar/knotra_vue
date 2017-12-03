<template>
  <div class="hello">
    <div id="border">
    </div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'CenterPane',
  data () {
    return {
      msg: 'Welcome to CenterPane Page'
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
